import Joi from "joi";
import { addressSchema, ArrayObjectId, courseType, fullname, booleanItem, name, objectId, customValidation, } from "./commenValidator";

export const createUniversitySchema = Joi.object({
    name: name,

    jobPlacement: booleanItem,
    scholarship: booleanItem,
    nearbyUniversity: booleanItem,
    transportation: booleanItem,
    accommodation: booleanItem,

    address: addressSchema.required(),

    stream: ArrayObjectId,
    course: ArrayObjectId,

    courseDetails: Joi.array().items(
        Joi.object({
            courseId: objectId,
            fee: Joi.number().min(3000).required().messages({
                "number.base": "Fee must be a number",
                "number.min": "Minimum ₹3000 Fee required",
                "any.required": "Fee is required",
            }),
            capacity: Joi.number().min(10).max(100).required().messages({
                "number.base": "Capacity must be a number",
                "number.min": "Minimum 10 students required",
                "number.max": "Maximum 100 students allowed",
                "any.required": "Capacity is required",
            }),
        })
    ).required()
})

export const createStreamSchema = Joi.object({
    name: name
})

export const createSubjectSchema = Joi.object({
    name: name,
    fullname: fullname
})


export const createCourseSchema = Joi.object({
    name: name,
    fullname: fullname,
    courseType: courseType,
    subjects: Joi.object({
        compulsory: ArrayObjectId,
        optional: ArrayObjectId
    }).required().custom(customValidation, "No duplication in subjects")
})

export const createFeeCapacitySchema = Joi.object({
    fee: Joi.number().required(),
    capacity: Joi.number().required(),
    universityId: objectId,
    courseId: objectId
})
