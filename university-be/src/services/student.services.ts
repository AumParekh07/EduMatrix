import { ObjectId } from "mongoose";

import UniversityModel, { Address } from "../models/university";
import StudentModle, { Preference } from "../models/student";
import CourseModel from "../models/course";
import EnrollCourseModel from "../models/enrollCourse";
import FeeCapacityModel from "../models/feecapacity";
import StreamModel from "../models/stream";
import { IsUser, UserProfileCompleted } from "../helper/userHelper";


export const studentDetailService = async (
    userID: ObjectId,
    gender: string,
    birthDate: Date,
    stream: ObjectId,
    address: Address,
    preference: Preference
) => {

    try {
        const User = await IsUser(userID)
        const isuserId = User._id
        const Stream = await StreamModel.findOne({ _id: stream })
        if (!Stream) {
            throw new Error("Stream Not Found");
        }

        const StreamId = Stream._id

        // const newStudent = new StudentModle({ userID: isuserId, gender, birthDate, stream: StreamId, address, preference })
        // await newStudent.save()
        // return newStudent

        const newStudent = await StudentModle.findOneAndUpdate(
            { userID: isuserId },
            { gender, birthDate, stream: StreamId, address, preference, },
            { new: true, upsert: true }
        );

        if (!newStudent) {
            throw new Error("Failed to update student details");
        }
        const user = await UserProfileCompleted(userID);

        return { newStudent, user };
    }
    catch (error) {
        throw error
    }

}


export const getstudentDetailService = async (userID: ObjectId) => {
    try {
        const User = await IsUser(userID)

        const studentDetail = await StudentModle.findOne({ userID: User._id })
            .populate('stream')
            .populate('userID', 'name username email profileCompleted')

        if (!studentDetail) {
            throw new Error(`${User.username} Detail Not Found`);
        }
        const enrollCourseDetail = await EnrollCourseModel.find({ userID: User._id })
            .populate('subjects.compulsory')
            .populate('subjects.optional')
            .populate('universityID', 'address name')
            .populate('courseID', 'name fullname courseType')


        if (enrollCourseDetail.length == 0) {
            const emptyenrollCourseDetail = `${User.username} does not Enrolled in Any Course`;
            return { studentDetail, emptyenrollCourseDetail }
        }

        return { studentDetail, enrollCourseDetail };
    } catch (error) {
        throw error
    }
}

export const enrollCourseService = async (userID: ObjectId, universityID: ObjectId, courseID: ObjectId, optionalSubjectID: ObjectId[]) => {

    try {

        const User = await IsUser(userID)

        const course = await CourseModel.findOne({ _id: courseID })
        if (!course) {
            throw new Error("Course Not Found");
        }

        const university = await UniversityModel.findOne({ _id: universityID })
        if (!university) {
            throw new Error("University Not Found");
        }

        const exsitCourseUni = await UniversityModel.findOne({ course: courseID })
        if (!exsitCourseUni) {
            throw new Error("This Course is Not Available in This University");
        }

        const optionalSubject = course?.subjects?.optional.map(id => id.toString())!

        const allValid = optionalSubjectID.map(id => id.toString()).every(id => optionalSubject.includes(id));

        if (!allValid) {
            throw new Error("One or more optional subjects are not valid for the selected course");
        }
        const compulsorySubject = course?.subjects?.compulsory.map(id => id.toString())!

        const allIdsArray = [...compulsorySubject, ...optionalSubjectID]

        const uniqueIDs = new Set(allIdsArray)

        if (uniqueIDs.size !== allIdsArray.length) {
            throw new Error("Subject duplication detected,Subject must have in Course already");
        }

        const enrolledStd = await EnrollCourseModel.findOne({ userID: User._id, universityID: university._id, courseID: course._id })
        if (enrolledStd) {
            throw new Error(`${User.username} Already Enrolled for this Course`);
        }

        const FeeAndCapacity = await FeeCapacityModel.findOne({ universityId: university._id, courseId: course._id })
        const capacity = FeeAndCapacity?.capacity!
        console.log('capacity: ', capacity);

        const enrolledCount = await EnrollCourseModel.find({ universityID: university._id, courseID: course._id }).countDocuments()
        console.log('enrolledCount: ', enrolledCount);

        if (enrolledCount > capacity) {
            throw new Error("This course's Seats are Full");
        }


        const subjects = {
            compulsory: compulsorySubject,
            optional: optionalSubjectID
        }

        const newEnroll = new EnrollCourseModel({ userID: User._id, universityID: university._id, courseID: course._id, subjects })

        await newEnroll.save()
        return newEnroll
    } catch (error) {
        throw error
    }
}