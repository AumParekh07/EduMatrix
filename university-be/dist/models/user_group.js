"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userGroupSchema = new mongoose_1.default.Schema({
    role: { type: String, required: true, unique: true },
    module_permission: {
        enroll_course: { type: [String], required: true },
        university: { type: [String], required: true },
        stream: { type: [String], required: true },
        course: { type: [String], required: true },
        subject: { type: [String], required: true }
    },
});
const UserGroupModel = mongoose_1.default.model("newusergroup", userGroupSchema);
exports.default = UserGroupModel;
