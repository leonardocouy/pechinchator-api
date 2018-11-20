const passport = require('passport');
const passportJWT = require('passport-jwt');
const bcrypt = require('bcrypt');
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

const { User } = require('../models/User');

module.exports = (settings) => {
  passport.use('login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      const passwordsMatch = await user && bcrypt.compare(password, user.password);
      if(!user ||!passwordsMatch)
        return done(null, false, { error: 'Incorrect email or password.'});

      done(null, user, { success: true });
    } catch (error) {
      done(error);
    }
  }));

  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : settings.jwtSecret,
  }, async(jwtPayload, done) => {
    try {
      const user = await User.findOneById(jwtPayload.id);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));
}
