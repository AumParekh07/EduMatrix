"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollCourseSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.EnrollCourseSchema = new mongoose_1.default.Schema({
    userID: { type: mongoose_1.default.Types.ObjectId, required: true },
    universityID: { type: mongoose_1.default.Types.ObjectId, required: true },
    courseID: { type: mongoose_1.default.Types.ObjectId, required: true },
    // optionalSubjectID: [{ type: mongoose.Types.ObjectId, required: true, ref: "subject" }],
    subjects: {
        compulsory: [
            { type: mongoose_1.default.Types.ObjectId, required: true, ref: "subject" },
        ],
        optional: [
            { type: mongoose_1.default.Types.ObjectId, required: true, ref: "subject" },
        ],
    },
});
const EnrollCourseModel = mongoose_1.default.model("enrollCourse", exports.EnrollCourseSchema);
exports.default = EnrollCourseModel;
