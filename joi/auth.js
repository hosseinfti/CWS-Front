import Joi from "react-joi";

const signup = Joi.object({
  firstName: Joi.string().min(1).max(50).required(),
  lastName: Joi.string().min(1).max(50).required(),
  phoneNumber: Joi.string().pattern(new RegExp("^(09)\\d{9}$")).required(), // TODO: Check this
  password: Joi.string()
    .pattern(new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,32}$"))
    .min(1)
    .max(50)
    .required(),
  email: Joi.string().min(1).max(100).email().required().lowercase(),
});

const login = Joi.object({
  email: Joi.string().min(1).max(100).email().required().lowercase(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,32}$"))
    .required(),
});

const forgotPassword = Joi.object({
  email: Joi.string().min(1).max(100).email().required().lowercase(),
});

const resetPassword = Joi.object({
  email: Joi.string().min(1).max(100).email().required().lowercase(),
  code: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,32}$"))
    .required(),
});
s;

const changePassword = Joi.object({
  oldPassword: Joi.string()
    .pattern(new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,32}$"))
    .required(),
  newPassword: Joi.string()
    .pattern(new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,32}$"))
    .required(),
});

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
};
