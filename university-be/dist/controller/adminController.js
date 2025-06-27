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
exports.getCourses = exports.getSubjects = exports.getStreams = exports.createFeeCapacity = exports.createCourse = exports.createUserGroup = exports.createSubject = exports.createStream = exports.createUniversity = exports.objectIdPattern = void 0;
const admin_services_1 = require("../services/admin.services");
const stream_1 = __importDefault(require("../models/stream"));
const subject_1 = __importDefault(require("../models/subject"));
const course_1 = __importDefault(require("../models/course"));
exports.objectIdPattern = /^[a-fA-F0-9]{24}$/;
const createUniversity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, jobPlacement, scholarship, nearbyUniversity, transportation, accommodation, address, stream, course, } = req.body;
        const result = yield (0, admin_services_1.createUniversityService)(name.trim(), jobPlacement, scholarship, nearbyUniversity, transportation, accommodation, address, stream, course);
        res.status(201).json({
            success: true,
            message: "University Created",
            University: result,
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
        res.status(500).json({
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
            model: "subject",
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
