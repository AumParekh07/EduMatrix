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
exports.enrollCourseService = exports.studentDetailService = void 0;
const university_1 = __importDefault(require("../models/university"));
const student_1 = __importDefault(require("../models/student"));
const course_1 = __importDefault(require("../models/course"));
const enrollCourse_1 = __importDefault(require("../models/enrollCourse"));
const feecapacity_1 = __importDefault(require("../models/feecapacity"));
const stream_1 = __importDefault(require("../models/stream"));
const userHelper_1 = require("../helper/userHelper");
const studentDetailService = (userID, gender, birthDate, stream, address, preference) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const User = yield (0, userHelper_1.IsUser)(userID);
        const isuserId = User._id;
        const Stream = yield stream_1.default.findOne({ _id: stream });
        if (!Stream) {
            throw new Error("Stream Not Found");
        }
        const StreamId = Stream._id;
        // const newStudent = new StudentModle({ userID: isuserId, gender, birthDate, stream: StreamId, address, preference })
        // await newStudent.save()
        // return newStudent
        const newStudent = yield student_1.default.findOneAndUpdate({ userID: isuserId }, { gender, birthDate, stream: StreamId, address, preference, }, { new: true, upsert: true });
        if (!newStudent) {
            throw new Error("Failed to create or update student details");
        }
        return newStudent;
    }
    catch (error) {
        throw error;
    }
});
exports.studentDetailService = studentDetailService;
const enrollCourseService = (userID, universityID, courseID, optionalSubjectID) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const User = yield (0, userHelper_1.IsUser)(userID);
        const course = yield course_1.default.findOne({ _id: courseID });
        if (!course) {
            throw new Error("Course Not Found");
        }
        const university = yield university_1.default.findOne({ _id: universityID });
        if (!university) {
            throw new Error("University Not Found");
        }
        const exsitCourseUni = yield university_1.default.findOne({ course: courseID });
        if (!exsitCourseUni) {
            throw new Error("This Course is Not Available in This University");
        }
        const optionalSubject = (_a = course === null || course === void 0 ? void 0 : course.subjects) === null || _a === void 0 ? void 0 : _a.optional.map(id => id.toString());
        const allValid = optionalSubjectID.map(id => id.toString()).every(id => optionalSubject.includes(id));
        if (!allValid) {
            throw new Error("One or more optional subjects are not valid for the selected course");
        }
        const compulsorySubject = (_b = course === null || course === void 0 ? void 0 : course.subjects) === null || _b === void 0 ? void 0 : _b.compulsory.map(id => id.toString());
        const allIdsArray = [...compulsorySubject, ...optionalSubjectID];
        const uniqueIDs = new Set(allIdsArray);
        if (uniqueIDs.size !== allIdsArray.length) {
            throw new Error("Subject duplication detected,Subject must have in Course already");
        }
        const enrolledStd = yield enrollCourse_1.default.find({ userID: User._id, universityID: university._id, courseID: course._id });
        if (enrolledStd) {
            throw new Error("Student Already Enrolled for this Course");
        }
        const FeeAndCapacity = yield feecapacity_1.default.findOne({ universityId: university._id, courseId: course._id });
        const capacity = FeeAndCapacity === null || FeeAndCapacity === void 0 ? void 0 : FeeAndCapacity.capacity;
        console.log('capacity: ', capacity);
        const enrolledCount = yield enrollCourse_1.default.find({ universityID: university._id, courseID: course._id }).countDocuments();
        console.log('enrolledCount: ', enrolledCount);
        if (enrolledCount > capacity) {
            throw new Error("This course's Seats are Full");
        }
        const subjects = {
            compulsory: compulsorySubject,
            optional: optionalSubjectID
        };
        const newEnroll = new enrollCourse_1.default({ userID: User._id, universityID: university._id, courseID: course._id, subjects });
        yield newEnroll.save();
        return newEnroll;
    }
    catch (error) {
        throw error;
    }
});
exports.enrollCourseService = enrollCourseService;
