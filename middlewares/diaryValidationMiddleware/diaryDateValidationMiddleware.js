const Joi = require('joi');
const { createValidationError } = require('../../utils/errorCreators');

function diaryDateValidationMiddleware(req, res, next) {
  const errMessage = 'Invalid date in params. Valid format of date: DDMMYYYY (DD - day, MM - month, YYYY - year).';
  const dateSchema = Joi.string()
    .pattern(/^[0-9]+$/, 'numbers')
    .message(errMessage)
    .length(8)
    .message(errMessage);

  const dateValidationResult = dateSchema.validate(req.params.day);
  if (dateValidationResult.error) {
    return next(createValidationError(dateValidationResult.error));
  }

  next();
}

module.exports = { diaryDateValidationMiddleware };

//   Дата: строка, 6 символів, всі символи числові, обов'язкове значення
