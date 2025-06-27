"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const FeeCapacitySchema = new mongoose_1.default.Schema({
    fee: {
        type: Number,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    universityId: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "collages",
    },
    courseId: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "courses",
    },
});
const FeeCapacityModel = mongoose_1.default.model("fee_capacity", FeeCapacitySchema);
exports.default = FeeCapacityModel;
