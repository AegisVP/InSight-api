const bcrypt = require('bcrypt');
const { User } = require('../db/userModel');
const { signupError, createAuthError } = require('../utils/errorCreators');
const { createToken } = require('../utils/createToken');

const signupUser = async (name, email, password) => {
  if (await User.findOne({ email })) {
    throw signupError();
  }
  const user = new User({
    name,
    email,
    password,
  });

  const token = createToken(user);

  user.token = token;

  if (!password) {
    user.googleAuth = true;
  }
  await user.save();
  return { name: user.name, email: user.email, token };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createAuthError('Email or password is wrong');
  }

  if (user.googleAuth) {
    const token = createToken(user);
    await User.findByIdAndUpdate(user._id, { token }, { runValidators: true });

    return token;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw createAuthError('Email or password is wrong');
  }

  const token = createToken(user);
  const loggedInUser = await User.findByIdAndUpdate(user._id, { token }, { runValidators: true, new: true }).select({
    token: 1,
    email: 1,
    name: 1,
    _id: 0,
  });

  return loggedInUser;
};

const authWithGoogle = async (name, email) => {
  const user = await User.findOne({ email });
  if (!user) {
    const user = await signupUser(name, email);
    return user;
  } else if (user.googleAuth) {
    const token = createToken(user);
    const newUser = await User.findByIdAndUpdate(user._id, { token }, { runValidators: true, new: true });

    return newUser;
  }
};

module.exports = { signupUser, loginUser, authWithGoogle };
