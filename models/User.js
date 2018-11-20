const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 5,
    required: true
  },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

UserSchema.pre('save', async function(next) {
  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  } catch (e) {
    next(e);
  }
});

UserSchema.pre('update', async function(next) {
  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  } catch (e) {
    next(e);
  }
});

UserSchema.methods.checkPassword = async(password) => {
  const user = this;

  return await bcrypt.compare(password, user.password);
};

function validator(user) {
  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }),
    password: Joi.string().min(5)
  }

  return Joi.validate(user, schema);
}

const User = mongoose.model('users', UserSchema);

module.exports.User = User;
module.exports.UserValidator = validator;
