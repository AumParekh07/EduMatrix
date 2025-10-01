"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniversitiesSchema = exports.getUniversityByPayloadSchema = exports.verifyOtpSchema = exports.sendOtpSchema = exports.loginUserSchema = exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const commenValidator_1 = require("./commenValidator");
exports.createUserSchema = joi_1.default.object({
    name: commenValidator_1.name,
    username: joi_1.default.string().pattern(/^(?=.*\d)(?=.*[!@.&*_])[a-zA-Z0-9!@.&*_]{3,30}$/).required()
        .messages({ "string.pattern.base": `"username" must have at least one number and one special character from "!@.&*_"` }),
    email: commenValidator_1.email,
    password: commenValidator_1.password,
    confirmPassword: joi_1.default.string().valid(joi_1.default.ref('password')).required()
        .messages({ 'string.only': '"confirmPassword" does not match' }),
    userGrpId: commenValidator_1.objectId
});
exports.loginUserSchema = joi_1.default.object({
    email: commenValidator_1.email,
    password: commenValidator_1.password
});
exports.sendOtpSchema = joi_1.default.object({
    email: commenValidator_1.email
});
exports.verifyOtpSchema = joi_1.default.object({
    email: commenValidator_1.email,
    otp: joi_1.default.string()
        .pattern(/^\d{6}$/)
        .message(`"otp" must be a 6-digit number`)
        .required()
});
exports.getUniversityByPayloadSchema = joi_1.default.object({
    jobPlacement: commenValidator_1.booleanItem,
    scholarship: commenValidator_1.booleanItem,
    nearbyUniversity: commenValidator_1.booleanItem,
    transportation: commenValidator_1.booleanItem,
    accommodation: commenValidator_1.booleanItem
});
const booleanString = joi_1.default.string().valid("true");
exports.getUniversitiesSchema = joi_1.default.object({
    page: joi_1.default.string().pattern(/^\d+$/).required(),
    pageSize: joi_1.default.string().pattern(/^\d+$/).required(),
    jobPlacement: booleanString.optional(),
    scholarship: booleanString.optional(),
    nearbyUniversity: booleanString.optional(),
    transportation: booleanString.optional(),
    accommodation: booleanString.optional()
});
