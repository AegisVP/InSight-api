const Joi = require('joi');
const { createValidationError } = require('../utils/errorCreators');

module.exports = {
  loginValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string().email({ minDomainSegments: 2 }),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      next(createValidationError(validationResult.error));
    }

    next();
  },
};
