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
exports.deleteUniversity = exports.deleteCourse = exports.deleteSubject = exports.deleteStream = exports.updateUniversity = exports.updateCourse = exports.updateSubject = exports.updateStream = exports.getCourses = exports.getSubjects = exports.getStreams = exports.createFeeCapacity = exports.createCourse = exports.createUserGroup = exports.createSubject = exports.createStream = exports.createUniversity = exports.getCounts = void 0;
const admin_services_1 = require("../services/admin.services");
const stream_1 = __importDefault(require("../models/stream"));
const subject_1 = __importDefault(require("../models/subject"));
const course_1 = __importDefault(require("../models/course"));
const university_1 = __importDefault(require("../models/university"));
const student_1 = __importDefault(require("../models/student"));
const getCounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const universityCount = yield university_1.default.countDocuments();
        const courseCount = yield course_1.default.countDocuments();
        const studentCount = yield student_1.default.countDocuments();
        res.status(200).json({
            success: true,
            message: "Counts fetched successfully",
            data: {
                universities: universityCount,
                courses: courseCount,
                students: studentCount,
            },
        });
    }
    catch (error) {
        console.error("Error fetching counts:", error);
        res.status(400).json({
            success: false,
            message: "Failed to fetch counts",
        });
    }
});
exports.getCounts = getCounts;
const createUniversity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, jobPlacement, scholarship, nearbyUniversity, transportation, accommodation, address, stream, course, courseDetails } = req.body;
        const university = yield (0, admin_services_1.createUniversityService)(name.trim(), jobPlacement, scholarship, nearbyUniversity, transportation, accommodation, address, stream, course);
        // fee and capacity per course
        const insertedFeeCaps = yield Promise.all(courseDetails.map((detail) => __awaiter(void 0, void 0, void 0, function* () {
            const mongoose = require("mongoose");
            const feecapacity = yield (0, admin_services_1.createFeeCapacityService)(detail.fee, detail.capacity, new mongoose.Types.ObjectId(university === null || university === void 0 ? void 0 : university._id), new mongoose.Types.ObjectId(detail.courseId));
            return feecapacity;
        })));
        res.status(201).json({
            success: true,
            message: "University Created",
            University: university,
            feecapacity: insertedFeeCaps
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
exports.createUniversity = createUniversity;
const createStream = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const result = yield (0, admin_services_1.createStreamService)(name.trim());
        res.status(201).json({
            success: true,
            message: "Stream Created",
            Stream: result.name,
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
exports.createStream = createStream;
const createSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, fullname } = req.body;
        const result = yield (0, admin_services_1.createSubjectService)(name.trim(), fullname.trim());
        res.status(201).json({
            success: true,
            message: "Subject Created",
            Subject: result.name + ":" + result.fullName,
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
exports.createSubject = createSubject;
const createUserGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role, module_permission } = req.body;
        const result = yield (0, admin_services_1.createUserGroupService)(role, module_permission);
        res.status(201).json({
            success: true,
            message: "UserGroup Created",
            Course: result,
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
exports.createUserGroup = createUserGroup;
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, fullname, courseType, subjects } = req.body;
        const result = yield (0, admin_services_1.createCourseService)(name.trim(), fullname.trim(), courseType, subjects);
        res.status(201).json({
            success: true,
            message: "Course Created",
            Course: result.name + ":" + result.fullname,
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
exports.createCourse = createCourse;
const createFeeCapacity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fee, capacity, universityId, courseId } = req.body;
        const result = yield (0, admin_services_1.createFeeCapacityService)(fee, capacity, universityId, courseId);
        res.status(201).json({
            success: true,
            message: "Data Entered",
            Data: result,
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
exports.createFeeCapacity = createFeeCapacity;
const getStreams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Streams = yield stream_1.default.find();
        res.status(200).json({
            success: true,
            message: "Streams fetched successfully",
            data: Streams,
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
exports.getStreams = getStreams;
const getSubjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subjects = yield subject_1.default.find();
        res.status(200).json({
            success: true,
            message: "Subjects fetched successfully",
            data: subjects,
        });
    }
    catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            success: false,
            message: `${error}`,
        });
    }
});
exports.getSubjects = getSubjects;
const getCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Courses = yield course_1.default.find()
            .populate({
            path: "subjects.compulsory",
            model: "subject"
        })
            .populate({
            path: "subjects.optional",
            model: "subject",
        });
        res.status(200).json({
            success: true,
            message: "Courses fetched successfully",
            data: Courses,
        });
    }
    catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            success: false,
            message: `${error}`,
        });
    }
});
exports.getCourses = getCourses;
const updateStream = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const result = yield (0, admin_services_1.updateStreamService)(id, name);
        res.status(201).json({
            success: true,
            message: `${result === null || result === void 0 ? void 0 : result.name} Updated Successfully`,
            Stream: result === null || result === void 0 ? void 0 : result.name,
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
exports.updateStream = updateStream;
const updateSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, fullname } = req.body;
        const result = yield (0, admin_services_1.updateSubjectService)(id, name, fullname);
        res.status(201).json({
            success: true,
            message: `${result === null || result === void 0 ? void 0 : result.name} Updated Successfully`,
            Subject: result === null || result === void 0 ? void 0 : result.name,
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
exports.updateSubject = updateSubject;
const updateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, fullname, courseType, subjects } = req.body;
        const result = yield (0, admin_services_1.updateCourseService)(id, name, fullname, courseType, subjects);
        res.status(201).json({
            success: true,
            message: `${result === null || result === void 0 ? void 0 : result.name} Updated Successfully`,
            Course: result === null || result === void 0 ? void 0 : result.name,
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
exports.updateCourse = updateCourse;
const updateUniversity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, jobPlacement, scholarship, nearbyUniversity, transportation, accommodation, address, stream, course, courseDetails } = req.body;
        const university = yield (0, admin_services_1.updateUniversityService)(id, name, jobPlacement, scholarship, nearbyUniversity, transportation, accommodation, address, stream, course);
        if (!university)
            throw new Error(`Failed to Update ${name}`);
        const updatedFeeCaps = yield (0, admin_services_1.upsertFeeCapacitiesService)(university._id.toString(), courseDetails);
        res.status(201).json({
            success: true,
            message: `${university === null || university === void 0 ? void 0 : university.name} Updated Successfully`,
            University: university,
            feeCapacities: updatedFeeCaps
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
exports.updateUniversity = updateUniversity;
const deleteStream = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, admin_services_1.deleteStreamService)(id);
        res.status(200).json({
            success: true,
            message: `${result === null || result === void 0 ? void 0 : result.name} Deleted Successfully`,
            data: (result === null || result === void 0 ? void 0 : result.name) || result
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
exports.deleteStream = deleteStream;
const deleteSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, admin_services_1.deleteSubjectService)(id);
        res.status(200).json({
            success: true,
            message: `${result === null || result === void 0 ? void 0 : result.name} Deleted Successfully`,
            data: (result === null || result === void 0 ? void 0 : result.name) || result
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
exports.deleteSubject = deleteSubject;
const deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, admin_services_1.deleteCourseService)(id);
        res.status(200).json({
            success: true,
            message: `${result === null || result === void 0 ? void 0 : result.name} Deleted Successfully`,
            data: (result === null || result === void 0 ? void 0 : result.name) || result
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
exports.deleteCourse = deleteCourse;
const deleteUniversity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, admin_services_1.deleteUniversityService)(id);
        res.status(200).json({
            success: true,
            message: `${result === null || result === void 0 ? void 0 : result.name} Deleted Successfully`,
            data: (result === null || result === void 0 ? void 0 : result.name) || result
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
exports.deleteUniversity = deleteUniversity;
