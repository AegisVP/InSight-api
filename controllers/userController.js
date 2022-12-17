const { signupUser, loginUser } = require('../services/users');

const signupController = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await signupUser(name, email, password);
  console.log(user);
  res.status(201).json({ status: 'success', name: user.name, email: user.email, token: user.token });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const token = await loginUser(email, password);
  res.status(200).json({ status: 'success', token });
};

module.exports = { signupController, loginController };
