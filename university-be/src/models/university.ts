import mongoose, { ObjectId, Schema } from "mongoose";
export interface Address {
  address: string,
  city: string,
  state: string,
  country: string,
  pincode: number,
}

interface University {
  name: string,
  jobPlacement: boolean,
  scholarship: boolean,
  nearbyUniversity: boolean,
  transportation: boolean,
  accommodation: boolean,
  address: Address,
  streams: ObjectId[],
  course: ObjectId[],
}

const UniversitySchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, "This University name is already Present"],
    },
    jobPlacement: { type: Boolean, required: true },
    scholarship: { type: Boolean, required: true },
    nearbyUniversity: { type: Boolean, required: true },
    transportation: { type: Boolean, required: true },
    accommodation: { type: Boolean, required: true },
    address: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      pincode: { type: Number, required: true },
    },
    stream: [{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "stream"
    }],
    course:
      [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "course"
      }],
  },
  {
    timestamps: true,
  }
)
const UniversityModel = mongoose.model<University>("university", UniversitySchema);
export default UniversityModel;
