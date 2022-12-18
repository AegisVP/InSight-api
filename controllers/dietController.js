const { dietCalculator } = require('../services/dietCalculator');
const { createServerError } = require('../utils/errorCreators')

const getDiet = async (req, res, next) => {
  try { 
  const diet = await dietCalculator(req.body)
  return res.status(200).json(diet);
  } catch (err) {
    return next(createServerError(err.message))
  }
};

const getUserDiet = async (req, res, next) => {
  try { 
    // TODO add updating by User.params id 
   
    const diet = await dietCalculator(req.body)
    return res.status(200).json(diet);
    } catch (err) {
      return next(createServerError(err.message))
    }
 };

module.exports = {
  getDiet,
  getUserDiet,
};
