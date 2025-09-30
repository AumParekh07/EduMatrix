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
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollCourse = exports.updateStdDetail = exports.getStudentDetail = exports.studentDetail = void 0;
const student_services_1 = require("../services/student.services");
// import { type AuthenticatedRequest } from "../middlerware/auth";
const studentDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { gender, birthDate, stream, address, preference } = req.body;
        const userId = res.locals.userId;
        // const { userId } = (req as AuthenticatedRequest).user!;
        const result = yield (0, student_services_1.studentDetailService)(userId, gender, birthDate, stream, address, preference);
        res.status(201).json({
            success: true,
            message: "Student Data updated",
            Student_Detail: result.newStudent,
            profileCompleted: result.user.profileCompleted
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
exports.studentDetail = studentDetail;
const getStudentDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.userId;
        // const { userId } = (req as AuthenticatedRequest).user!;
        const result = yield (0, student_services_1.getstudentDetailService)(userId);
        res.status(200).json({
            success: true,
            message: "Student Data fetched",
            data: result
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
exports.getStudentDetail = getStudentDetail;
const updateStdDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.userId;
        const { gender, birthDate, stream, address, preference } = req.body;
        const result = yield (0, student_services_1.updateStdDetailService)(userId, gender, birthDate, stream, address, preference);
        res.status(201).json({
            success: true,
            message: `Your Data Updated Successfully`,
            Student: result
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
exports.updateStdDetail = updateStdDetail;
const enrollCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { universityID, courseID, optionalSubjectID } = req.body;
        const userId = res.locals.userId;
        // const { userId } = (req as AuthenticatedRequest).user!;
        const result = yield (0, student_services_1.enrollCourseService)(userId, universityID, courseID, optionalSubjectID);
        res.status(200).json({
            success: true,
            message: "Enroll Complete",
            data: result
        });
    }
    catch (error) {
        console.log('error: ', error);
        res.status(400).json({
            success: false,
            message: `${error}`
        });
    }
});
exports.enrollCourse = enrollCourse;
