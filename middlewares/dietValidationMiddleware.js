const Joi = require('joi');
const { createValidationError } = require('../utils/errorCreators');

function dietValidationMiddleware(req, res, next) {
  const schema = Joi.object({
    height: Joi.number().integer().min(100).max(250).required(),
    age: Joi.number().integer().min(18).max(100).required(),
    currentWeight: Joi.number().min(20).max(500).required(),
    desireWeight: Joi.number().required().min(20).max(500).required(),
    bloodType: Joi.number().integer().valid(1, 2, 3, 4).required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return next(createValidationError(validationResult.error));
  }

  next();
}

module.exports = { dietValidationMiddleware };

// - зріст:       ціле число, 100 (min) - 250 (max), обов'язкове значення
// - вік:         ціле число, 18 (min) - 100 (max), обов'язкове значення
//   вага:        число, 20(min) 500(max), обов'язкове значення
// - бажана вага: число, 20 (min) - 500 (max), обов'язкове значення
// - група крові: ціле число, обов'язкове значення, допустимі значення: 1, 2, 3, 4
