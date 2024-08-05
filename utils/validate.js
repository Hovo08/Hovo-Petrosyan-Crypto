import Joi from "joi"

const userSchema = Joi.object({
  fName: Joi.string()
    .min(2)
    .max(100)
    .required()
    .pattern(/^([a-z])+$/i),

  lName: Joi.string()
    .min(2)
    .max(100)
    .required()
    .pattern(/^([a-z])+$/i),

  email: Joi.string().email().required(),

  password: Joi.string()
    .min(4)
    .max(32)
    .required()
    .pattern(/^[a-zA-Z0-9!@#$%^&*]{4,32}$/),
});

export default userSchema;