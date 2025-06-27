"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customValidation = exports.courseType = exports.booleanItem = exports.password = exports.email = exports.fullname = exports.name = exports.ArrayObjectId = exports.objectId = exports.addressSchema = exports.objectIdPattern = void 0;
const joi_1 = __importDefault(require("joi"));
exports.objectIdPattern = /^[a-fA-F0-9]{24}$/;
exports.addressSchema = joi_1.default.object({
    address: joi_1.default.string().trim().required(),
    city: joi_1.default.string().trim().required(),
    state: joi_1.default.string().trim().required(),
    country: joi_1.default.string().trim().required(),
    pincode: joi_1.default.number().required(),
});
exports.objectId = joi_1.default.string().pattern(exports.objectIdPattern).required();
exports.ArrayObjectId = joi_1.default.array().items(joi_1.default.string().required().pattern(exports.objectIdPattern)).required();
exports.name = joi_1.default.string().trim().required();
exports.fullname = joi_1.default.string().trim().required();
exports.email = joi_1.default.string().email().required();
exports.password = joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required();
exports.booleanItem = joi_1.default.boolean().required();
exports.courseType = joi_1.default.string().valid("FullTime", "PartTime", "E Learning").required();
const customValidation = (value, helpers) => __awaiter(void 0, void 0, void 0, function* () {
    const { compulsory, optional } = value;
    const allIds = [...compulsory, ...optional];
    const uniqueIds = new Set(allIds);
    // compare size of Array and Set,If its not equal, it means there are duplicates.
    if (uniqueIds.size !== allIds.length) {
        return helpers.message({ custom: "Subject duplication detected,Subject must not be same in Course" });
    }
    return value;
});
exports.customValidation = customValidation;
