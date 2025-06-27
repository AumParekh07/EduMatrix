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
exports.enrollCourse = exports.studentDetail = void 0;
const student_services_1 = require("../services/student.services");
const studentDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { gender, birthDate, stream, address, preference } = req.body;
        const { userId } = req.user;
        console.log('userId: ', userId);
        const result = yield (0, student_services_1.studentDetailService)(userId, gender, birthDate, stream, address, preference);
        res.status(201).json({
            success: true,
            message: "Student Data updated",
            Student_Detail: result,
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
const enrollCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, universityID, courseID, optionalSubjectID } = req.body;
        const result = yield (0, student_services_1.enrollCourseService)(userID, universityID, courseID, optionalSubjectID);
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
