const Joi = require("@hapi/joi");

const validateRegistration = (data) => {
  const Schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().min(12).max(255).required(),

    phone: Joi.string().min(7).max(15).required(),
    password: Joi.string().min(8).max(1024),
  });

  return Schema.validate(data);
};

const validateLogin = (data) => {
  const Schema = Joi.object({
    email: Joi.string().min(12).max(255).required(),
    password: Joi.string().min(8).max(1024).required(),
  });

  return Schema.validate(data);
};

module.exports.validateRegistration = validateRegistration;
module.exports.validateLogin = validateLogin;
