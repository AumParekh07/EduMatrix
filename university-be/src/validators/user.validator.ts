import Joi from "joi";
import { booleanItem, email, name, objectId, password } from "./commenValidator";

export const createUserSchema = Joi.object({
    name: name,
    username: Joi.string().pattern(/^(?=.*\d)(?=.*[!@.&*_])[a-zA-Z0-9!@.&*_]{3,30}$/).required()
        .messages({ "string.pattern.base": `"username" must have at least one number and one special character from "!@.&*_"` }),

    email: email,
    password: password,
    userGrpId: objectId
})

export const loginUserSchema = Joi.object({
    email: email,
    password: password
})

export const sendOtpSchema = Joi.object({
    email: email
})

export const verifyOtpSchema = Joi.object({
    email: email,
    otp: Joi.string()
        .pattern(/^\d{6}$/)
        .message(`"otp" must be a 6-digit number`)
        .required()
})



export const getUniversityByPayloadSchema = Joi.object({
    jobPlacement: booleanItem,
    scholarship: booleanItem,
    nearbyUniversity: booleanItem,
    transportation: booleanItem,
    accommodation: booleanItem
})

const booleanString = Joi.string().valid("true");
export const getUniversitiesSchema = Joi.object({
    page: Joi.string().pattern(/^\d+$/).required(),
    pageSize: Joi.string().pattern(/^\d+$/).required(),
    jobPlacement: booleanString.optional(),
    scholarship: booleanString.optional(),
    nearbyUniversity: booleanString.optional(),
    transportation: booleanString.optional(),
    accommodation: booleanString.optional()
});