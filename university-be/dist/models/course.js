"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CourseSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: [true, "This course name is already Present"],
    },
    fullname: {
        type: String,
        required: true,
    },
    courseType: {
        type: String,
        required: true,
        enum: ["FullTime", "PartTime", "E Learning"],
    },
    subjects: {
        compulsory: [
            { type: mongoose_1.default.Types.ObjectId, required: true, ref: "subject" },
        ],
        optional: [
            { type: mongoose_1.default.Types.ObjectId, required: true, ref: "subject" },
        ],
    },
});
const CourseModel = mongoose_1.default.model("course", CourseSchema);
exports.default = CourseModel;
