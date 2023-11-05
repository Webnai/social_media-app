import Joi from "joi";

const authSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required()
});

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

const logoutSchema = Joi.object({
    refreshToken: Joi.string().required()
});

const accessTokenSchema = Joi.object({
    accessToken: Joi.string().required()
});

const refreshTokenSchema = Joi.object({
    refreshToken: Joi.string().required()
});

const refreshTokens = Joi.object({
    refreshToken: Joi.string().required(),
});

const verifyEmail = Joi.object({
token: Joi.string().required(),
});

const forgotPassword = Joi.object({
email: Joi.string().email().required(),
});

const resetPassword = Joi.object({
token: Joi.string().required(),
});

export default { authSchema, loginSchema, logoutSchema, accessTokenSchema, refreshTokenSchema, refreshTokens, verifyEmail, forgotPassword, resetPassword };