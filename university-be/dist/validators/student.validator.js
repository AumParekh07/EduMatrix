"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECSchema = exports.studentDetailSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const commenValidator_1 = require("./commenValidator");
exports.studentDetailSchema = joi_1.default.object({
    gender: joi_1.default.string().valid("Male", "Female", "Others").required(),
    birthDate: joi_1.default.date().required(),
    stream: commenValidator_1.objectId,
    address: commenValidator_1.addressSchema.required(),
    preference: joi_1.default.object({
        profession: joi_1.default.string().trim().required(),
        courseType: commenValidator_1.courseType,
        jobPlacement: commenValidator_1.booleanItem,
        scholarship: commenValidator_1.booleanItem,
        nearbyUniversity: commenValidator_1.booleanItem,
        transportation: commenValidator_1.booleanItem,
        accommodation: commenValidator_1.booleanItem,
        minFee: joi_1.default.number().required(),
        maxFee: joi_1.default.number().required(),
    }).required(),
});
exports.ECSchema = joi_1.default.object({
    userID: commenValidator_1.objectId,
    universityID: commenValidator_1.objectId,
    courseID: commenValidator_1.objectId,
    optionalSubjectID: commenValidator_1.ArrayObjectId
});
