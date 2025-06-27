"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const StreamSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: [true, "This Stream name is already Present"],
    },
});
const StreamModel = mongoose_1.default.model("stream", StreamSchema);
exports.default = StreamModel;
