const Joi = require('joi');
const { createValidationError } = require('../utils/errorCreators');

module.exports = {
  signupValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      password: Joi.string().required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      next(createValidationError(validationResult.error));
    }

    next();
  },
  loginValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      password: Joi.string().required(),
    });
  },
};
