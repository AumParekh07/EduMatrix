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
    course: ArrayObjectId
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

export const deleteSchema = Joi.object({
    id: objectId
})
