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
exports.existUniversityInEnrollcourse = exports.existStreamInUni = exports.existCourseInUni = exports.existSubjectInCourse = exports.IsUniversityName = exports.IsUniversity = exports.validateUniversity = exports.validateCourseSubjects = exports.IsCourseName = exports.IsCourse = exports.IsSubjectName = exports.ISSubject = exports.IsStreamName = exports.IsStream = void 0;
const course_1 = __importDefault(require("../models/course"));
const stream_1 = __importDefault(require("../models/stream"));
const subject_1 = __importDefault(require("../models/subject"));
const university_1 = __importDefault(require("../models/university"));
const enrollCourse_1 = __importDefault(require("../models/enrollCourse"));
const IsStream = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const Stream = yield stream_1.default.findById(id);
    if (!Stream)
        throw new Error("Stream Not Found");
    return Stream;
});
exports.IsStream = IsStream;
const IsStreamName = (name, id) => __awaiter(void 0, void 0, void 0, function* () {
    const Stream = yield stream_1.default.findOne({ name });
    if (Stream && id != Stream.id)
        throw new Error("Stream Name Already Exists");
});
exports.IsStreamName = IsStreamName;
const ISSubject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const subject = yield subject_1.default.findById(id);
    if (!subject)
        throw new Error("Subject Not Found");
    return subject;
});
exports.ISSubject = ISSubject;
const IsSubjectName = (name, id) => __awaiter(void 0, void 0, void 0, function* () {
    const subject = yield subject_1.default.findOne({ name });
    if (subject && id != subject.id)
        throw new Error("Subject Name Already Exists");
});
exports.IsSubjectName = IsSubjectName;
const IsCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_1.default.findById(id);
    if (!course)
        throw new Error("Course Not Found");
    return course;
});
exports.IsCourse = IsCourse;
const IsCourseName = (name, id) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_1.default.findOne({ name });
    if (course && id != course.id)
        throw new Error("Course Name Already Exists");
});
exports.IsCourseName = IsCourseName;
const validateCourseSubjects = (subjects) => __awaiter(void 0, void 0, void 0, function* () {
    const compulsorySubjects = yield subject_1.default.find({ _id: { $in: subjects.compulsory } });
    if (compulsorySubjects.length !== subjects.compulsory.length) {
        throw new Error("In Compulsory Subjects, one or more subjects not found");
    }
    const optionalSubjects = yield subject_1.default.find({ _id: { $in: subjects.optional } });
    if (optionalSubjects.length !== subjects.optional.length) {
        throw new Error("In Optional Subjects, one or more subjects not found");
    }
});
exports.validateCourseSubjects = validateCourseSubjects;
const validateUniversity = (stream, course) => __awaiter(void 0, void 0, void 0, function* () {
    const Streams = yield stream_1.default.find({ _id: { $in: stream } });
    if (Streams.length !== stream.length) {
        throw new Error("One or more streams not found");
    }
    const Courses = yield course_1.default.find({ _id: { $in: course } });
    if (Courses.length !== course.length) {
        throw new Error("One or more courses not found");
    }
});
exports.validateUniversity = validateUniversity;
const IsUniversity = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const university = yield university_1.default.findById(id);
    if (!university)
        throw new Error("University Not Found");
    return university;
});
exports.IsUniversity = IsUniversity;
const IsUniversityName = (name, id) => __awaiter(void 0, void 0, void 0, function* () {
    const university = yield university_1.default.findOne({ name });
    if (university && id != university.id)
        throw new Error("University Name Already Exists");
});
exports.IsUniversityName = IsUniversityName;
const existSubjectInCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existSub_Course = yield course_1.default.findOne({
        $or: [
            { "subjects.compulsory": id },
            { "subjects.optional": id }
        ]
    });
    if (existSub_Course)
        throw new Error(`This subject cannot be deleted! Subject is used in Course: ${existSub_Course.name}.`);
});
exports.existSubjectInCourse = existSubjectInCourse;
const existCourseInUni = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existCourse_Uni = yield university_1.default.findOne({ course: id });
    if (existCourse_Uni)
        throw new Error(`This course cannot be deleted! Course is used in University: ${existCourse_Uni.name}.`);
});
exports.existCourseInUni = existCourseInUni;
const existStreamInUni = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existStream_Uni = yield university_1.default.findOne({ stream: id });
    if (existStream_Uni)
        throw new Error(`This Stream cannot be deleted! Stream is used in University: ${existStream_Uni.name}.`);
});
exports.existStreamInUni = existStreamInUni;
const existUniversityInEnrollcourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existUni_Enrollcourse = yield enrollCourse_1.default.findOne({ universityID: id });
    if (existUni_Enrollcourse)
        throw new Error(`This university cannot be deleted! Student Enroll in this University's Course.`);
});
exports.existUniversityInEnrollcourse = existUniversityInEnrollcourse;
