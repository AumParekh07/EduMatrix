"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UniversitySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: [true, "This University name is already Present"],
    },
    jobPlacement: { type: Boolean, required: true },
    scholarship: { type: Boolean, required: true },
    nearbyUniversity: { type: Boolean, required: true },
    transportation: { type: Boolean, required: true },
    accommodation: { type: Boolean, required: true },
    address: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        pincode: { type: Number, required: true },
    },
    stream: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            required: true,
            ref: "stream"
        }],
    course: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            required: true,
            ref: "course"
        }],
}, {
    timestamps: true,
});
const UniversityModel = mongoose_1.default.model("university", UniversitySchema);
exports.default = UniversityModel;
