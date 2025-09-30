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
exports.createUserGroupService = exports.createFeeCapacityService = exports.upsertFeeCapacitiesService = exports.deleteUniversityService = exports.updateUniversityService = exports.createUniversityService = exports.deleteCourseService = exports.updateCourseService = exports.createCourseService = exports.deleteSubjectService = exports.updateSubjectService = exports.createSubjectService = exports.deleteStreamService = exports.updateStreamService = exports.createStreamService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const university_1 = __importDefault(require("../models/university"));
const stream_1 = __importDefault(require("../models/stream"));
const subject_1 = __importDefault(require("../models/subject"));
const course_1 = __importDefault(require("../models/course"));
const feecapacity_1 = __importDefault(require("../models/feecapacity"));
const user_group_1 = __importDefault(require("../models/user_group"));
const adminHelper_1 = require("../helper/adminHelper");
const createStreamService = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, adminHelper_1.IsStreamName)(name);
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
const updateStreamService = (id, name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stream = yield (0, adminHelper_1.IsStream)(id);
        yield (0, adminHelper_1.IsStreamName)(name, id);
        const updatedStream = stream_1.default.findByIdAndUpdate(stream._id, { name }, { new: true });
        return updatedStream;
    }
    catch (error) {
        console.log("error: ", error);
        throw error;
    }
});
exports.updateStreamService = updateStreamService;
const deleteStreamService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stream = yield (0, adminHelper_1.IsStream)(id);
        yield (0, adminHelper_1.existStreamInUni)(stream._id.toString());
        const deleteStream = yield stream_1.default.findByIdAndDelete(stream._id);
        return deleteStream;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteStreamService = deleteStreamService;
const createSubjectService = (name, fullName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, adminHelper_1.IsSubjectName)(name);
        const newSubject = new subject_1.default({ name, fullName });
        yield newSubject.save();
        return newSubject;
    }
    catch (error) {
        throw error;
    }
});
exports.createSubjectService = createSubjectService;
const updateSubjectService = (id, name, fullName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subject = yield (0, adminHelper_1.ISSubject)(id);
        yield (0, adminHelper_1.IsSubjectName)(name, id);
        const updatedSubject = yield subject_1.default.findByIdAndUpdate(subject._id, { name, fullName }, { new: true });
        return updatedSubject;
    }
    catch (error) {
        throw error;
    }
});
exports.updateSubjectService = updateSubjectService;
const deleteSubjectService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subject = yield (0, adminHelper_1.ISSubject)(id);
        yield (0, adminHelper_1.existSubjectInCourse)(subject._id.toString());
        const deleteSubject = yield subject_1.default.findByIdAndDelete(subject._id);
        return deleteSubject;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteSubjectService = deleteSubjectService;
const createCourseService = (name, fullname, courseType, subjects) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, adminHelper_1.IsCourseName)(name);
        yield (0, adminHelper_1.validateCourseSubjects)(subjects);
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
const updateCourseService = (id, name, fullname, courseType, subjects) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield (0, adminHelper_1.IsCourse)(id);
        yield (0, adminHelper_1.IsCourseName)(name, id);
        yield (0, adminHelper_1.validateCourseSubjects)(subjects);
        const updatedCourse = yield course_1.default.findByIdAndUpdate(course._id, { name, fullname, courseType, subjects });
        return updatedCourse;
    }
    catch (error) {
        throw error;
    }
});
exports.updateCourseService = updateCourseService;
const deleteCourseService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield (0, adminHelper_1.IsCourse)(id);
        yield (0, adminHelper_1.existCourseInUni)(course._id.toString());
        const deleteCourse = yield course_1.default.findByIdAndDelete(course._id);
        return deleteCourse;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteCourseService = deleteCourseService;
const createUniversityService = (name, jobPlacement, scholarship, nearbyUniversity, transportation, accommodation, address, stream, course) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, adminHelper_1.IsUniversityName)(name);
        yield (0, adminHelper_1.validateUniversity)(stream, course);
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
const updateUniversityService = (id, name, jobPlacement, scholarship, nearbyUniversity, transportation, accommodation, address, stream, course) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const university = yield (0, adminHelper_1.IsUniversity)(id);
        yield (0, adminHelper_1.IsUniversityName)(name, id);
        yield (0, adminHelper_1.validateUniversity)(stream, course);
        const updatedUniversity = yield university_1.default.findByIdAndUpdate(university._id, {
            name,
            jobPlacement,
            scholarship,
            nearbyUniversity,
            transportation,
            accommodation,
            address,
            stream,
            course
        });
        return updatedUniversity;
    }
    catch (error) {
        throw error;
    }
});
exports.updateUniversityService = updateUniversityService;
const deleteUniversityService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const university = yield (0, adminHelper_1.IsUniversity)(id);
        yield (0, adminHelper_1.existUniversityInEnrollcourse)(university._id.toString());
        const deleteUniversity = yield university_1.default.findByIdAndDelete(university._id);
        return deleteUniversity;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteUniversityService = deleteUniversityService;
const upsertFeeCapacitiesService = (universityId, courseDetails) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedOrCreated = yield Promise.all(courseDetails.map((detail) => __awaiter(void 0, void 0, void 0, function* () {
        const existing = yield feecapacity_1.default.findOne({
            universityId,
            courseId: detail.courseId,
        });
        if (existing) {
            existing.fee = detail.fee;
            existing.capacity = detail.capacity;
            return yield existing.save();
        }
        const newEntry = new feecapacity_1.default({
            fee: detail.fee,
            capacity: detail.capacity,
            universityId: new mongoose_1.default.Types.ObjectId(universityId),
            courseId: new mongoose_1.default.Types.ObjectId(detail.courseId),
        });
        return yield newEntry.save();
    })));
    yield feecapacity_1.default.deleteMany({
        universityId,
        courseId: { $nin: courseDetails.map(d => d.courseId) },
    });
    return updatedOrCreated;
});
exports.upsertFeeCapacitiesService = upsertFeeCapacitiesService;
const createFeeCapacityService = (fee, capacity, universityId, courseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield (0, adminHelper_1.IsCourse)(courseId.toString());
        const university = yield (0, adminHelper_1.IsUniversity)(universityId.toString());
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
        const newUserGroup = new user_group_1.default({ role, module_permission });
        yield newUserGroup.save();
        return newUserGroup;
    }
    catch (error) {
        throw error;
    }
});
exports.createUserGroupService = createUserGroupService;
