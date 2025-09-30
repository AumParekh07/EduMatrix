"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const StudentSchema = new mongoose_1.default.Schema({
    userID: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, unique: [true, "This Student is already Present"], ref: "User" },
    gender: { type: String, required: true, enum: ["Male", "Female", "Others"], },
    birthDate: { type: Date, required: true, },
    stream: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: "stream" },
    address: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        pincode: { type: Number, required: true },
    },
    preference: {
        profession: { type: String, required: true },
        courseType: { type: String, required: true, enum: ["FullTime", "PartTime", "E Learning"] },
        jobPlacement: { type: Boolean, required: true },
        scholarship: { type: Boolean, required: true },
        nearbyUniversity: { type: Boolean, required: true },
        transportation: { type: Boolean, required: true },
        accommodation: { type: Boolean, required: true },
        minFee: { type: Number, required: true },
        maxFee: { type: Number, required: true }
    }
});
const StudentModle = mongoose_1.default.model("student", StudentSchema);
exports.default = StudentModle;
