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
exports.getStream = exports.createUserGroupService = exports.createFeeCapacityService = exports.createCourseService = exports.createSubjectService = exports.createStreamService = exports.createUniversityService = void 0;
const university_1 = __importDefault(require("../models/university"));
const stream_1 = __importDefault(require("../models/stream"));
const subject_1 = __importDefault(require("../models/subject"));
const course_1 = __importDefault(require("../models/course"));
const feecapacity_1 = __importDefault(require("../models/feecapacity"));
const user_group_1 = __importDefault(require("../models/user_group"));
const createUniversityService = (name, jobPlacement, scholarship, nearbyUniversity, transportation, accommodation, address, stream, course) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const streams = yield stream_1.default.find({ _id: { $in: stream } });
        if (streams.length !== stream.length) {
            throw new Error("One or more Streams not found");
        }
        const courses = yield course_1.default.find({ _id: { $in: course } });
        if (courses.length !== course.length) {
            throw new Error("One or more Courses not found");
        }
        const newUniversity = new university_1.default({
            name,
            jobPlacement,
            scholarship,
            nearbyUniversity,
            transportation,
            accommodation,
            address,
            stream,
            course,
        });
        yield newUniversity.save();
        return newUniversity;
    }
    catch (error) {
        throw error;
    }
});
exports.createUniversityService = createUniversityService;
const createStreamService = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newStream = new stream_1.default({ name });
        yield newStream.save();
        return newStream;
    }
    catch (error) {
        console.log("error: ", error);
        throw error;
    }
});
exports.createStreamService = createStreamService;
const createSubjectService = (name, fullName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newSubject = new subject_1.default({ name, fullName });
        yield newSubject.save();
        return newSubject;
    }
    catch (error) {
        throw error;
    }
});
exports.createSubjectService = createSubjectService;
const createCourseService = (name, fullname, courseType, subjects) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const compulsorySubjects = yield subject_1.default.find({ _id: { $in: subjects.compulsory } });
        if (compulsorySubjects.length !== subjects.compulsory.length) {
            throw new Error("One or more Subjects not found");
        }
        const optionalSubjects = yield subject_1.default.find({ _id: { $in: subjects.optional } });
        if (optionalSubjects.length !== subjects.optional.length) {
            throw new Error("One or more Subjects not found");
        }
        const newSubject = new course_1.default({
            name,
            fullname,
            courseType,
            subjects,
        });
        yield newSubject.save();
        return newSubject;
    }
    catch (error) {
        throw error;
    }
});
exports.createCourseService = createCourseService;
const createFeeCapacityService = (fee, capacity, universityId, courseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield course_1.default.findById(courseId);
        if (!courses) {
            throw new Error("Course Not Found");
        }
        const university = yield university_1.default.findById(universityId);
        if (!university) {
            throw new Error("University Not Found");
        }
        const newData = new feecapacity_1.default({
            fee,
            capacity,
            universityId: university._id,
            courseId: courses._id,
        });
        yield newData.save();
        return newData;
    }
    catch (error) {
        throw error;
    }
});
exports.createFeeCapacityService = createFeeCapacityService;
const createUserGroupService = (role, module_permission) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("UserGroupModel import:", user_group_1.default);
        const newUserGroup = new user_group_1.default({
            role, module_permission
        });
        yield newUserGroup.save();
        return newUserGroup;
    }
    catch (error) {
        throw error;
    }
});
exports.createUserGroupService = createUserGroupService;
const getStream = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Streams = yield stream_1.default.find();
        return Streams;
    }
    catch (error) {
        throw error;
    }
});
exports.getStream = getStream;
