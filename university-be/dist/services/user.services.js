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
exports.getUniversityByIDService = exports.getAllUniversityService = exports.getUniversityService = exports.getUniversityByPayloadService = exports.verifyOtpService = exports.sendOtpService = exports.loginUserService = exports.createUserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userHelper_1 = require("../helper/userHelper");
const user_1 = __importDefault(require("../models/user"));
const university_1 = __importDefault(require("../models/university"));
const student_1 = __importDefault(require("../models/student"));
const createUserService = (name, username, email, password, userGrpId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userHelper_1.checkIfUserExists)(email);
        if (user)
            throw new Error("User Already Exists With This Email");
        const userwithUserName = yield user_1.default.findOne({ username: username });
        if (userwithUserName)
            throw new Error("This User Name Already Used");
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create new user
        const newUser = new user_1.default({
            name,
            username,
            email,
            password: hashedPassword,
            userGrpId,
        });
        yield newUser.save();
        return newUser;
    }
    catch (error) {
        throw error;
    }
});
exports.createUserService = createUserService;
const loginUserService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //find user
        const user = yield (0, userHelper_1.userExists)(email);
        if (user) {
            const validPassword = yield bcrypt_1.default.compare(password, user.password);
            if (!validPassword)
                throw new Error("Invalid Email Or Password");
            const jwtSecret = process.env.JWT_SECRET_KEY;
            const jwtToken = jsonwebtoken_1.default.sign({ userId: user._id }, jwtSecret, {
                expiresIn: "1d",
            });
            return { user, jwtToken };
        }
        else {
            throw new Error("User Not Found");
        }
    }
    catch (error) {
        throw error;
    }
});
exports.loginUserService = loginUserService;
const sendOtpService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userHelper_1.userExists)(email);
        if (user) {
            const otp = (0, userHelper_1.generateOTP)();
            const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 mins
            yield user_1.default.findByIdAndUpdate(user._id, { otp, otpExpiry });
            yield (0, userHelper_1.sendEmail)(email, otp);
            return { otp };
        }
        else {
            throw new Error("User Not Found");
        }
    }
    catch (error) {
        throw error;
    }
});
exports.sendOtpService = sendOtpService;
const verifyOtpService = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userHelper_1.userExists)(email);
        if (user) {
            if (!user.otp || !user.otpExpiry)
                throw new Error("No OTP Sent");
            if (user.otp !== otp)
                throw new Error("Invalid OTP");
            const now = new Date();
            if (now > user.otpExpiry)
                throw new Error("OTP expired. Please login Again");
            const jwtSecret = process.env.JWT_SECRET_KEY;
            const jwtToken = jsonwebtoken_1.default.sign({ userId: user._id }, jwtSecret, {
                expiresIn: "1d",
            });
            // Clear OTP  successful verification
            yield user_1.default.findByIdAndUpdate(user._id, {
                otp: null,
                otpExpiry: null,
            });
            return { user, jwtToken };
        }
        else {
            throw new Error("User Not Found");
        }
    }
    catch (error) {
        throw error;
    }
});
exports.verifyOtpService = verifyOtpService;
const getUniversityByPayloadService = (userId, page, pageLimit, jobPlacement, scholarship, nearbyUniversity, transportation, accommodation) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const User = yield (0, userHelper_1.IsUser)(userId);
        if (User) {
            const totalUniversities = yield university_1.default.countDocuments();
            const universities = yield university_1.default.find({
                jobPlacement: jobPlacement, scholarship: scholarship,
                nearbyUniversity: nearbyUniversity, transportation: transportation, accommodation: accommodation
            })
                .limit(pageLimit)
                .skip((page - 1) * pageLimit)
                .populate("course")
                .populate("stream")
                .populate({
                path: "course",
                populate: {
                    path: "subjects.compulsory",
                    model: "subject",
                },
            })
                .populate({
                path: "course",
                populate: {
                    path: "subjects.optional",
                    model: "subject",
                },
            });
            return { universities, totalUniversities };
        }
        else {
            throw new Error("User Not Found");
        }
    }
    catch (error) {
        throw error;
    }
});
exports.getUniversityByPayloadService = getUniversityByPayloadService;
const getUniversityService = (page, pageLimit, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const User = yield (0, userHelper_1.IsUser)(userId);
        // if (!User) {
        //   throw new Error("User Not Found");
        // }
        if (User) {
            let totalUniversities = yield university_1.default.countDocuments();
            const student = yield student_1.default.findOne({ userID: userId });
            if (student) {
                const universities = yield university_1.default.find({
                    jobPlacement: student === null || student === void 0 ? void 0 : student.preference.jobPlacement,
                    scholarship: student === null || student === void 0 ? void 0 : student.preference.scholarship,
                    nearbyUniversity: student === null || student === void 0 ? void 0 : student.preference.nearbyUniversity,
                    transportation: student === null || student === void 0 ? void 0 : student.preference.transportation,
                    accommodation: student === null || student === void 0 ? void 0 : student.preference.accommodation
                }).limit(pageLimit)
                    .skip((page - 1) * pageLimit)
                    .populate("course")
                    .populate("stream")
                    .populate({
                    path: "course",
                    populate: {
                        path: "subjects.compulsory",
                        model: "subject",
                    },
                })
                    .populate({
                    path: "course",
                    populate: {
                        path: "subjects.optional",
                        model: "subject",
                    },
                });
                totalUniversities = universities.length;
                return { universities, totalUniversities };
            }
            else {
                const universities = yield university_1.default.find()
                    .limit(pageLimit)
                    .skip((page - 1) * pageLimit)
                    .populate("course")
                    .populate("stream")
                    .populate({
                    path: "course",
                    populate: {
                        path: "subjects.compulsory",
                        model: "subject",
                    },
                })
                    .populate({
                    path: "course",
                    populate: {
                        path: "subjects.optional",
                        model: "subject",
                    },
                });
                return { universities, totalUniversities };
            }
        }
        else {
            throw new Error("User Not Found");
        }
        // const universities1 = await UniversityModel.aggregate([
        //   {
        //     $lookup: {
        //       from: "courses",
        //       localField: "course",
        //       foreignField: "_id",
        //       as: "course",
        //     },
        //   },
        //   { $unwind: { path: "$course", preserveNullAndEmptyArrays: true } },
        //   {
        //     $lookup: {
        //       from: "streams",
        //       localField: "stream",
        //       foreignField: "_id",
        //       as: "stream",
        //     },
        //   },
        //   { $unwind: { path: "$stream", preserveNullAndEmptyArrays: true } },
        //   {
        //     $lookup: {
        //       from: "subjects",
        //       localField: "course.subjects.compulsory",
        //       foreignField: "_id",
        //       as: "course.subjects.compulsory",
        //     },
        //   },
        //   {
        //     $lookup: {
        //       from: "subjects",
        //       localField: "course.subjects.optional",
        //       foreignField: "_id",
        //       as: "course.subjects.optional",
        //     },
        //   },
        //   {
        //     $facet: {
        //       metadata: [{ $count: 'totalCount' }],
        //       data: [{ $skip: (page - 1) * pageLimit }, { $limit: pageLimit }, {
        //         $project: { /*stream: 0, course: 0,*/ createdAt: 0, updatedAt: 0,
        //           __v: 0,
        //           "course.__v": 0,
        //           "stream.__v": 0,
        //           "course.subjects.compulsory.__v": 0,
        //           "course.subjects.optional.__v": 0,
        //         }
        //       }],
        //     }
        //   },
        // ])
        // return universities1
    }
    catch (error) {
        throw error;
    }
});
exports.getUniversityService = getUniversityService;
const getAllUniversityService = (page, pageLimit, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let totalUniversities = yield university_1.default.countDocuments();
        const User = yield (0, userHelper_1.IsUser)(userId);
        if (User) {
            const university = yield university_1.default.find()
                .populate("course")
                .populate("stream")
                .populate({
                path: "course",
                populate: {
                    path: "subjects.compulsory",
                    model: "subject",
                },
            })
                .populate({
                path: "course",
                populate: {
                    path: "subjects.optional",
                    model: "subject",
                },
            });
            if (!university) {
                throw new Error("University Not Found");
            }
            return { university, totalUniversities };
        }
        else {
            throw new Error("User Not Found");
        }
    }
    catch (error) {
        throw error;
    }
});
exports.getAllUniversityService = getAllUniversityService;
const getUniversityByIDService = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const User = yield (0, userHelper_1.IsUser)(userId);
        if (User) {
            const university = yield university_1.default.findById(id)
                .populate("course")
                .populate("stream")
                .populate({
                path: "course",
                populate: {
                    path: "subjects.compulsory",
                    model: "subject",
                },
            })
                .populate({
                path: "course",
                populate: {
                    path: "subjects.optional",
                    model: "subject",
                },
            });
            if (!university) {
                throw new Error("University Not Found");
            }
            return university;
        }
        else {
            throw new Error("User Not Found");
        }
    }
    catch (error) {
        throw error;
    }
});
exports.getUniversityByIDService = getUniversityByIDService;
