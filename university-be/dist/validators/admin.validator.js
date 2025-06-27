"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFeeCapacitySchema = exports.createCourseSchema = exports.createSubjectSchema = exports.createStreamSchema = exports.createUniversitySchema = void 0;
const joi_1 = __importDefault(require("joi"));
const commenValidator_1 = require("./commenValidator");
exports.createUniversitySchema = joi_1.default.object({
    name: commenValidator_1.name,
    jobPlacement: commenValidator_1.booleanItem,
    scholarship: commenValidator_1.booleanItem,
    nearbyUniversity: commenValidator_1.booleanItem,
    transportation: commenValidator_1.booleanItem,
    accommodation: commenValidator_1.booleanItem,
    address: commenValidator_1.addressSchema.required(),
    stream: commenValidator_1.ArrayObjectId,
    course: commenValidator_1.ArrayObjectId
});
exports.createStreamSchema = joi_1.default.object({
    name: commenValidator_1.name
});
exports.createSubjectSchema = joi_1.default.object({
    name: commenValidator_1.name,
    fullname: commenValidator_1.fullname
});
exports.createCourseSchema = joi_1.default.object({
    name: commenValidator_1.name,
    fullname: commenValidator_1.fullname,
    courseType: commenValidator_1.courseType,
    subject: joi_1.default.object({
        compulsory: commenValidator_1.ArrayObjectId,
        optional: commenValidator_1.ArrayObjectId
    }).required().custom(commenValidator_1.customValidation, "No duplication in subjects")
});
exports.createFeeCapacitySchema = joi_1.default.object({
    fee: joi_1.default.number().required(),
    capacity: joi_1.default.number().required(),
    universityId: commenValidator_1.objectId,
    courseId: commenValidator_1.objectId
});
