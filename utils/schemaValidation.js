const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Missing required Name field",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Missing required Email field",
  }),
  phone: Joi.string().required().messages({
    "any.required": "Missing required Phone field",
  }),
});

module.exports =  schema;
