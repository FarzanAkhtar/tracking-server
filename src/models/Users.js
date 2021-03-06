const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (inputpassword) {
  const user = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(inputpassword, user.password, (err, isMatch) => {
      if (err) {
        reject(err);
      }
      if (!isMatch) {
        reject(false);
      }
      resolve(true);
    });
  });
};

mongoose.model('Users', userSchema);
