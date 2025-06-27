import Joi from "joi";
import { addressSchema, courseType, booleanItem, objectId, ArrayObjectId } from "./commenValidator";

export const studentDetailSchema = Joi.object({
    gender: Joi.string().valid("Male", "Female", "Others").required(),
    birthDate: Joi.date().required(),
    stream: objectId,
    address: addressSchema.required(),

    preference: Joi.object({

        profession: Joi.string().trim().required(),
        courseType: courseType,
        jobPlacement: booleanItem,
        scholarship: booleanItem,
        nearbyUniversity: booleanItem,
        transportation: booleanItem,
        accommodation: booleanItem,
        minFee: Joi.number().required(),
        maxFee: Joi.number().required(),
    }).required(),
})

export const ECSchema = Joi.object({
    universityID: objectId,
    courseID: objectId,
    optionalSubjectID: ArrayObjectId
})