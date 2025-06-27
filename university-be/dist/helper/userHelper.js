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
exports.IsUser = exports.checkIfUserExists = exports.userExists = exports.generateOTP = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const user_1 = __importDefault(require("../models/user"));
const sendEmail = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        const info = yield transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Email Verification OTP",
            html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Email Verification</h2>
        <p>Your OTP for email verification is:</p>
        <h1 style="color:rgba(0, 158, 226, 0.94); letter-spacing: 5px;">${otp}</h1>
        <p>This OTP will expire in 5 minutes.</p>
      </div>`,
        });
        console.log("Email info: ", info);
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendEmail = sendEmail;
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
exports.generateOTP = generateOTP;
const userExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ email });
    if (!user)
        throw new Error("User not found");
    return user;
});
exports.userExists = userExists;
const checkIfUserExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ email });
    return user;
});
exports.checkIfUserExists = checkIfUserExists;
const IsUser = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(userID);
    if (!user)
        throw new Error("User Not Found");
    return user;
});
exports.IsUser = IsUser;
