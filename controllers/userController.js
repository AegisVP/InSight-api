const { signupUser, loginUser, refreshUserToken } = require('../services/users');
const { User } = require('../db/userModel');
const { createAuthError } = require('../utils/errorCreators');
const jwt = require('jsonwebtoken');
const { BACKEND_URL, JWT_SECRET } = process.env;

const signupController = async (req, res) => {
  const { name, email, password } = req.body;

  await signupUser(name, email, password);
  res.status(201).json({ message: 'User created' });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await loginUser(email, password);

  if (!user) {
    res.redirect(`${BACKEND_URL}/user/google`);
  }
  res.status(200).json(user);
};

const logoutController = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null, refresh_token: null }, { runValidators: true });
  res.status(204);
};

const currentUserController = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select({ password: 0, _id: 0, googleAuth: 0, __v: 0, token: 0 });
  res.status(200).json(user);
};

const refreshUserTokenController = async (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token) {
    next(createAuthError());
  }

  const user = jwt.decode(refresh_token, JWT_SECRET);

  const newTokens = await refreshUserToken(user, refresh_token);

  res.status(200).json(newTokens);
};

module.exports = {
  signupController,
  loginController,
  logoutController,
  currentUserController,
  refreshUserTokenController,
};
