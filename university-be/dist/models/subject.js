"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SubjectSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: [true, "This Subject name is already Present"],
    },
    fullName: {
        type: String,
        required: true,
        unique: true,
    },
});
const SubjectModel = mongoose_1.default.model("subject", SubjectSchema);
exports.default = SubjectModel;
