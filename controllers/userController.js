const { signupUser, loginUser } = require('../services/users');
const { User } = require('../db/userModel');

const signupController = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await signupUser(name, email, password);
  console.log(user);
  res.status(201).json({ status: 'success', id: user._id, name: user.name, email: user.email, token: user.token });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await loginUser(email, password);
  res.status(200).json({ status: 'success', token: user.token, id: user._id });
};

const logoutController = async (req, res) => {
  const { _id } = req.body;
  await User.findByIdAndUpdate(_id, { token: null }, { runValidators: true });
  res.status(200).json({ status: 'Success logout' });
};

module.exports = { signupController, loginController, logoutController };
