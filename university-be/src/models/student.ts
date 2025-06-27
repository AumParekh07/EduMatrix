import mongoose, { ObjectId, Schema } from "mongoose";
import { Address } from "./university";

export interface Preference {
    profession: string,
    courseType: string,
    jobPlacement: boolean,
    scholarship: boolean,
    nearbyUniversity: boolean,
    transportation: boolean,
    accommodation: boolean,
    minFee: number
    maxFee: number
}
interface Student {
    userID: ObjectId,
    gender: "Male" | "Female" | "Others",
    birthDate: Date,
    stream: ObjectId,
    address: Address,
    preference: Preference,
}

const StudentSchema: Schema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, required: true, unique: [true, "This Student is already Present"], ref: "User" },
    gender: { type: String, required: true, enum: ["Male", "Female", "Others"], },
    birthDate: { type: Date, required: true, },
    stream: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "stream" },
    address: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        pincode: { type: Number, required: true },
    },
    preference: {
        profession: { type: String, required: true },
        courseType: { type: String, required: true, enum: ["FullTime", "PartTime", "E Learning"] },
        jobPlacement: { type: Boolean, required: true },
        scholarship: { type: Boolean, required: true },
        nearbyUniversity: { type: Boolean, required: true },
        transportation: { type: Boolean, required: true },
        accommodation: { type: Boolean, required: true },
        minFee: { type: Number, required: true },
        maxFee: { type: Number, required: true }
    }
})

const StudentModle = mongoose.model<Student>("student", StudentSchema);
export default StudentModle;