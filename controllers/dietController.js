const { User } = require('../db/userModel');
const { dietCalculator } = require('../services/dietCalculator');
const { createNotFoundHttpError } = require('../utils/errorCreators');

const getDiet = async (req, res, next) => {
  const diet = await dietCalculator(req.body);
  return res.status(200).json(diet);
};

const getUserDiet = async (req, res, next) => {
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(_id, { ...req.body }, { new: true });

  if (!user) {
    return next(createNotFoundHttpError());
  }

  const diet = await dietCalculator(req.body);
  return res.status(200).json(diet);
};

module.exports = {
  getDiet,
  getUserDiet,
};
