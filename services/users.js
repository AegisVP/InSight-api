const bcrypt = require('bcrypt');
const { User } = require('../db/userModel');
const { signupError, createAuthError } = require('../utils/errorCreators');
const { createToken, createRefreshToken } = require('../utils/createToken');

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
  const refresh_token = createRefreshToken(user);

  user.token = token;
  user.refresh_token = refresh_token;

  await user.save();
  return;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createAuthError('Email or password is wrong');
  }

  if (user.googleAuth) {
    return false;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw createAuthError('Email or password is wrong');
  }

  const token = createToken(user);
  const refresh_token = createRefreshToken(user);
  const loggedInUser = await User.findByIdAndUpdate(
    user._id,
    { token, refresh_token },
    { runValidators: true, new: true }
  ).select({
    token: 1,
    email: 1,
    name: 1,
    refresh_token: 1,
    _id: 0,
  });

  return loggedInUser;
};

const authWithGoogle = async (name, email) => {
  const user = await User.findOne({ email });
  if (!user) {
    const user = new User({
      name,
      email,
    });

    const token = createToken(user);
    const refresh_token = createRefreshToken(user);

    user.token = token;
    user.refresh_token = refresh_token;

    await user.save();
    return { name: user.name, email: user.email, token, refresh_token };
  } else if (user.googleAuth) {
    const token = createToken(user);
    const refresh_token = createRefreshToken(user);

    const newUser = await User.findByIdAndUpdate(
      user._id,
      { token, refresh_token },
      { runValidators: true, new: true }
    );

    return newUser;
  }
};

const refreshUserToken = async (user, refresh_token) => {
  const auditUser = await User.findById(user._id);
  if (!auditUser || refresh_token !== auditUser.refresh_token) {
    throw createAuthError();
  }
  const token = createToken(user);
  await User.findByIdAndUpdate(user._id, { token }, { runValidators: true });
  return { token, refresh_token };
};

module.exports = { signupUser, loginUser, authWithGoogle, refreshUserToken };
