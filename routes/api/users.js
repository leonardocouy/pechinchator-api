const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const settings = require('../../config/settings');
const router = express.Router();

const { User, UserValidator } = require('../../models/User');

router.post('/register', async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = UserValidator(req.body);

  if (error) return res.status(400).json({ errors: error.details });

  try {
    const user = new User({ email, password });
    await user.save();

    res.json({ success: true });
  } catch (error) {
    next(error)
  }
});

router.post('/login', async (req, res, next) => {
  const { error } = UserValidator(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  passport.authenticate('login', async(err, user, info) => {
    try {
      if(!user) return res.status(400).json(info);
      req.login(user, { session : false }, async(error) => {
        if(error) next(error);

        const payload = {
          id: user._id,
          email: user.email,
        }
        const token = jwt.sign(payload, settings.jwtSecret);

        res.cookie('jwt', jwt, { httpOnly: true, secure: true });
        return res.json({ ...payload, token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { _id, name, email } = req.user;

  res.json({ _id, name, email });
});

module.exports = router;
