const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { User } = require('../db/userModel');

const signupUser = async (name, email, password) => {
  if (await User.findOne({ email })) {
    // TODO Write errors
    throw new Error('Email is use');
  }
  const user = new User({
    name,
    email,
    password,
  });

  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );

  user.token = token;
  await user.save();
  return user;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Email or password is wrong');
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new Error('Email or password is wrong');
  }

  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );
  await User.findByIdAndUpdate(user._id, { token }, { runValidators: true });

  return token;
};

module.exports = { signupUser, loginUser };
