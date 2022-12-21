const Joi = require('joi');
const { createValidationError } = require('../../utils/errorCreators');

function diaryBodyValidationMiddleware(req, res, next) {
  const bodySchema = Joi.object({
    id: Joi.string().required(),
    weight: Joi.number().integer().min(1).max(5000).required(),
  });

  const bodyValidationResult = bodySchema.validate(req.body);
  if (bodyValidationResult.error) {
    return next(createValidationError(bodyValidationResult.error));
  }

  next();
}

module.exports = { diaryBodyValidationMiddleware };

//   вага: ціле число в грамах, 1 (min) - 5000 (max), обов'язкове значення
