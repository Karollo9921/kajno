const Joi = require("joi");

const register = Joi.object({
  login: Joi.string().max(15).required().min(2),
  password: Joi.string().max(20).required().min(8),
});

const login = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { login, register };