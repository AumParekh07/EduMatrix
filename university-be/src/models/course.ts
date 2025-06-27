import mongoose, { ObjectId, Schema } from "mongoose";
export interface Subject {
  compulsory: ObjectId[],
  optional: ObjectId[]
}

interface course {
  name: string,
  fullname: string,
  courseType: string,
  subjects: Subject,
}

const CourseSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true, "This course name is already Present"],
  },
  fullname: {
    type: String,
    required: true,
  },
  courseType: {
    type: String,
    required: true,
    enum: ["FullTime", "PartTime", "E Learning"],
  },
  subjects: {
    compulsory: [
      { type: mongoose.Types.ObjectId, required: true, ref: "subject" },
    ],
    optional: [
      { type: mongoose.Types.ObjectId, required: true, ref: "subject" },
    ],
  },
})

const CourseModel = mongoose.model<course>("course", CourseSchema);
export default CourseModel;
