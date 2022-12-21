const Joi = require('joi');
const { createValidationError } = require('../utils/errorCreators');

function productsValidationMiddleware(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().min(3).required()
  });

  const validationResult = schema.validate({ title: req.query.title });
  if (validationResult.error) {
    next(createValidationError(validationResult.error));
  }

  next();
};

module.exports = { productsValidationMiddleware };
