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
exports.getUniversityByID = exports.getAllUniversities = exports.verifyOtp = exports.sendOtp = exports.loginUser = exports.createUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const user_services_1 = require("../services/user.services");
// import { AuthenticatedRequest } from "../middlerware/auth";
dotenv_1.default.config();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, username, email, password, userGrpId } = req.body;
        const result = yield (0, user_services_1.createUserService)(name.trim(), username.trim(), email.trim(), password.trim(), userGrpId);
        res.status(201).json({
            success: true,
            message: "User created successfully",
            name: result.name,
            username: result.username,
            email: result.email,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: `${error}`,
        });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const result = yield (0, user_services_1.loginUserService)(email, password);
        res.status(200).json({
            success: true,
            message: `Welcome: ${result.user.name}`,
            profileCompleted: result.user.profileCompleted,
            token: result.jwtToken,
            role: result.role
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: `Login ${error}`,
        });
    }
});
exports.loginUser = loginUser;
const sendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const result = yield (0, user_services_1.sendOtpService)(email);
        res.status(200).json({
            success: true,
            message: "OTP sent to email",
            otp: result.otp,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: `${error}`,
        });
    }
});
exports.sendOtp = sendOtp;
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp } = req.body;
        const result = yield (0, user_services_1.verifyOtpService)(email, otp);
        res.status(200).json({
            success: true,
            message: `OTP verified successfully welcome: ${result.user.name}`,
            profileCompleted: result.user.profileCompleted,
            token: result.jwtToken,
            role: result.role
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: `Login ${error}`,
        });
    }
});
exports.verifyOtp = verifyOtp;
const getAllUniversities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, pageSize, jobPlacement, scholarship, nearbyUniversity, transportation, accommodation } = req.query;
        const userId = res.locals.userId;
        // const { userId } = (req as AuthenticatedRequest).user!;
        const pageNumber = parseInt(page, 10) || 1;
        const pageLimit = parseInt(pageSize, 10) || 2;
        const filter = {};
        if (jobPlacement === "true")
            filter.jobPlacement = true;
        if (scholarship === "true")
            filter.scholarship = true;
        if (nearbyUniversity === "true")
            filter.nearbyUniversity = true;
        if (transportation === "true")
            filter.transportation = true;
        if (accommodation === "true")
            filter.accommodation = true;
        const result = yield (0, user_services_1.getAllUniversityService)(pageNumber, pageLimit, userId, filter);
        res.status(200).json({
            success: true,
            message: "Universities fetched successfully",
            pagination: { TotalData: result.totalUniversities, PageNo: page, PageLimit: pageSize },
            data: result.university
        });
    }
    catch (error) {
        console.log("error: ", error);
        res.status(400).json({
            success: false,
            message: `${error}`,
        });
    }
});
exports.getAllUniversities = getAllUniversities;
const getUniversityByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = res.locals.userId;
        // const { userId } = (req as AuthenticatedRequest).user!;
        const result = yield (0, user_services_1.getUniversityByIDService)(id, userId);
        res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (error) {
        console.log('error: ', error);
        res.status(400).json({
            success: false,
            message: `${error}`,
        });
    }
});
exports.getUniversityByID = getUniversityByID;
