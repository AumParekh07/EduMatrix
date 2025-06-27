import mongoose, { ObjectId } from "mongoose";
import { Subject } from "./course";
interface enrollCourse {
    userID: ObjectId,
    universityID: ObjectId,
    courseID: ObjectId,
    // optionalSubjectID: ObjectId[],
    subjects: Subject
}

export const EnrollCourseSchema = new mongoose.Schema({
    userID: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    universityID: { type: mongoose.Types.ObjectId, required: true, ref: "university" },
    courseID: { type: mongoose.Types.ObjectId, required: true, ref: "course" },
    // optionalSubjectID: [{ type: mongoose.Types.ObjectId, required: true, ref: "subject" }],
    subjects: {
        compulsory: [
            { type: mongoose.Types.ObjectId, required: true, ref: "subject" },
        ],
        optional: [
            { type: mongoose.Types.ObjectId, required: true, ref: "subject" },
        ],
    },
})

const EnrollCourseModel = mongoose.model<enrollCourse>("enrollCourse", EnrollCourseSchema)
export default EnrollCourseModel