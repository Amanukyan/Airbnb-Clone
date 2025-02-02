"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require("yup");
exports.emailNotLongEnough = 'email must be at least 3 characters';
exports.passwordNotLongEnough = 'password must be at least 3 characters';
exports.invalidEmail = 'email must be a valid email';
exports.registerPasswordValidation = yup
    .string()
    .min(3, exports.passwordNotLongEnough)
    .max(255)
    .required();
exports.validUserSchema = yup.object().shape({
    email: yup
        .string()
        .min(3, exports.emailNotLongEnough)
        .max(255)
        .email(exports.invalidEmail)
        .required(),
    firstName: yup
        .string()
        .max(255)
        .required(),
    lastName: yup
        .string()
        .max(255)
        .required(),
    password: exports.registerPasswordValidation,
});
const invalidLogin = 'invalid login';
exports.loginSchema = yup.object().shape({
    email: yup
        .string()
        .min(3, invalidLogin)
        .max(255, invalidLogin)
        .email(invalidLogin)
        .required(),
    password: yup
        .string()
        .min(3, invalidLogin)
        .max(255, invalidLogin)
        .required(),
});
exports.changePasswordSchema = yup.object().shape({
    newPassword: exports.registerPasswordValidation,
});
//# sourceMappingURL=user.js.map