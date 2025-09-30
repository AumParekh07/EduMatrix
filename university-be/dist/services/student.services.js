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
exports.enrollCourseService = exports.getstudentDetailService = exports.updateStdDetailService = exports.studentDetailService = void 0;
const university_1 = __importDefault(require("../models/university"));
const student_1 = __importDefault(require("../models/student"));
const enrollCourse_1 = __importDefault(require("../models/enrollCourse"));
const feecapacity_1 = __importDefault(require("../models/feecapacity"));
const userHelper_1 = require("../helper/userHelper");
const stdHelper_1 = require("../helper/stdHelper");
const adminHelper_1 = require("../helper/adminHelper");
const studentDetailService = (userId, gender, birthDate, streamId, address, preference) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const User = yield (0, userHelper_1.IsUser)(userId);
        const Stream = yield (0, adminHelper_1.IsStream)(streamId.toString());
        const newStudent = new student_1.default({ userID: User._id, gender, birthDate, stream: Stream._id, address, preference });
        yield newStudent.save();
        const user = yield (0, stdHelper_1.UserProfileCompleted)(userId);
        return { newStudent, user };
    }
    catch (error) {
        throw error;
    }
});
exports.studentDetailService = studentDetailService;
const updateStdDetailService = (userId, gender, birthDate, streamId, address, preference) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const User = yield (0, userHelper_1.IsUser)(userId);
        const Stream = yield (0, adminHelper_1.IsStream)(streamId);
        const updatedStudent = yield student_1.default.findOneAndUpdate({ userID: User._id }, { gender, birthDate, stream: Stream._id, address, preference, }, { new: true });
        return updatedStudent;
    }
    catch (error) {
        throw error;
    }
});
exports.updateStdDetailService = updateStdDetailService;
const getstudentDetailService = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const User = yield (0, userHelper_1.IsUser)(userID);
        const studentDetail = yield student_1.default.findOne({ userID: User._id })
            .populate('stream')
            .populate('userID', 'name username email profileCompleted');
        const enrollCourseDetail = yield enrollCourse_1.default.find({ userID: User._id })
            .populate('subjects.compulsory')
            .populate('subjects.optional')
            .populate('universityID', 'address name')
            .populate('courseID', 'name fullname courseType');
        const FeeAndCapacity = yield Promise.all(enrollCourseDetail.map((detail) => __awaiter(void 0, void 0, void 0, function* () {
            const feeCap = yield feecapacity_1.default.find({ universityId: detail.universityID, courseId: detail.courseID });
            return feeCap;
        })));
        if (!studentDetail && enrollCourseDetail.length == 0) {
            throw new Error(`${User.username} Detail Not Found!`);
        }
        return { studentDetail, enrollCourseDetail, FeeAndCapacity };
    }
    catch (error) {
        throw error;
    }
});
exports.getstudentDetailService = getstudentDetailService;
const enrollCourseService = (userID, universityID, courseID, optionalSubjectID) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const User = yield (0, userHelper_1.IsUser)(userID);
        const isProfileComleted = User === null || User === void 0 ? void 0 : User.profileCompleted;
        if (!isProfileComleted)
            throw new Error("Complete Your Profile First");
        const course = yield (0, adminHelper_1.IsCourse)(courseID.toString());
        const university = yield (0, adminHelper_1.IsUniversity)(universityID.toString());
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
        const enrolledStd = yield enrollCourse_1.default.findOne({ userID: User._id, universityID: university._id, courseID: course._id });
        if (enrolledStd) {
            throw new Error(`${User.username} Already Enrolled For This Course`);
        }
        const FeeAndCapacity = yield feecapacity_1.default.findOne({ universityId: university._id, courseId: course._id });
        const capacity = FeeAndCapacity === null || FeeAndCapacity === void 0 ? void 0 : FeeAndCapacity.capacity;
        console.log('capacity: ', capacity);
        const enrolledCount = yield enrollCourse_1.default.countDocuments({ universityID: university._id, courseID: course._id });
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
