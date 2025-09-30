"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: [true, "This user name is already Present"],
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "User already exists with this email"],
        validate(value) {
            if (!validator_1.default.isEmail(value)) {
                throw new Error("Invalid email");
            }
        },
    },
    password: {
        type: String,
        required: true,
    },
    // confirmPassword: {
    //   type: String,
    //   require: true
    // },
    userGrpId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user_group",
    },
    otp: {
        type: String,
    },
    otpExpiry: {
        type: Date,
    },
    profileCompleted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});
const UserModel = mongoose_1.default.model("User", UserSchema);
exports.default = UserModel;
