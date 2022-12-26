const { signupUser, loginUser } = require('../services/users');
const { User } = require('../db/userModel');

const signupController = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await signupUser(name, email, password);
  return res.status(201).json(user);
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await loginUser(email, password);

  return res.status(200).json(user);
};

const logoutController = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null }, { runValidators: true });
  return res.status(204).send();
};

const currentUserController = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select({ password: 0, _id: 0, googleAuth: 0, __v: 0, token: 0 });
  return res.status(200).json(user);
};

module.exports = { signupController, loginController, logoutController, currentUserController };
