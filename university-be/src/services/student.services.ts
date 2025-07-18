import { ObjectId } from "mongoose";

import UniversityModel, { Address } from "../models/university";
import StudentModle, { Preference } from "../models/student";
import EnrollCourseModel from "../models/enrollCourse";
import FeeCapacityModel from "../models/feecapacity";
import { IsUser } from "../helper/userHelper";
import { UserProfileCompleted } from "../helper/stdHelper";
import { IsCourse, IsStream, IsUniversity } from "../helper/adminHelper";


export const studentDetailService = async (
    userId: ObjectId,
    gender: string,
    birthDate: Date,
    streamId: ObjectId,
    address: Address,
    preference: Preference
) => {

    try {
        const User = await IsUser(userId)

        const Stream = await IsStream(streamId.toString())

        const newStudent = new StudentModle({ userID: User._id, gender, birthDate, stream: Stream._id, address, preference })
        await newStudent.save()

        const user = await UserProfileCompleted(userId);

        return { newStudent, user };
    }
    catch (error) {
        throw error
    }

}

export const updateStdDetailService = async (
    userId: ObjectId,
    gender: string,
    birthDate: Date,
    streamId: string,
    address: Address,
    preference: Preference) => {

    try {
        const User = await IsUser(userId)

        const Stream = await IsStream(streamId)

        const updatedStudent = await StudentModle.findOneAndUpdate({ userID: User._id },
            { gender, birthDate, stream: Stream._id, address, preference, },
            { new: true }
        );

        return updatedStudent;
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

        const enrollCourseDetail = await EnrollCourseModel.find({ userID: User._id })
            .populate('subjects.compulsory')
            .populate('subjects.optional')
            .populate('universityID', 'address name')
            .populate('courseID', 'name fullname courseType')

        const FeeAndCapacity = await Promise.all(enrollCourseDetail.map(async (detail) => {
            const feeCap = await FeeCapacityModel.find({ universityId: detail.universityID, courseId: detail.courseID })
            return feeCap;
        })
        )
        if (!studentDetail && enrollCourseDetail.length == 0) {
            throw new Error(`${User.username} Detail Not Found!`);
        }

        return { studentDetail, enrollCourseDetail, FeeAndCapacity };
    } catch (error) {
        throw error
    }
}


export const enrollCourseService = async (userID: ObjectId, universityID: ObjectId, courseID: ObjectId, optionalSubjectID: ObjectId[]) => {

    try {

        const User = await IsUser(userID)

        const course = await IsCourse(courseID.toString())

        const university = await IsUniversity(universityID.toString())

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
            throw new Error(`${User.username} Already Enrolled For This Course`);
        }

        const FeeAndCapacity = await FeeCapacityModel.findOne({ universityId: university._id, courseId: course._id })
        const capacity = FeeAndCapacity?.capacity!
        console.log('capacity: ', capacity);

        const enrolledCount = await EnrollCourseModel.countDocuments({ universityID: university._id, courseID: course._id })
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