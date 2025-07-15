import Joi, { CustomHelpers } from "joi";
import { ObjectId } from "mongoose";

export const objectIdPattern = /^[a-fA-F0-9]{24}$/;


export const name = Joi.string().trim().required();
export const fullname = Joi.string().trim().required();

export const addressSchema = Joi.object({
    address: name,
    city: name,
    state: name,
    country: name,
    pincode: Joi.number().required(),
});



export const ArrayObjectId = Joi.array().items(Joi.string().required().pattern(objectIdPattern)).required();

export const objectId = Joi.string().pattern(objectIdPattern).required()
    .messages({ "string.pattern.base": `"Id" Must Be Valid MongoDB ObjectId` });


export const email = Joi.string().email().required();

export const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,15}$')).required();


export const booleanItem = Joi.boolean().required();

export const courseType = Joi.string().valid("FullTime", "PartTime", "E Learning").required();

export const idParamSchema = Joi.object({ id: objectId });

export const customValidation = async (
    subjects: { compulsory: ObjectId[]; optional: ObjectId[] },
    helpers: CustomHelpers
) => {
    const { compulsory, optional } = subjects;
    const allIds = [...compulsory, ...optional];
    const uniqueIds = new Set(allIds);

    // compare size of Array and Set,If its not equal, it means there are duplicates.
    if (uniqueIds.size !== allIds.length) {
        return helpers.message({ custom: "Subject duplication detected,Subject must not be same in Course" });
    }
    return subjects;
}

