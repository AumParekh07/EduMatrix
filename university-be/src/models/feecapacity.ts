import mongoose, { ObjectId, Schema } from "mongoose";
interface feecapacity {
  fee: number,
  capacity: number,
  universityID: ObjectId,
  courseId: ObjectId,
}

const FeeCapacitySchema: Schema = new mongoose.Schema({
  fee: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  universityId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "collages",
  },
  courseId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "courses",
  },
});
const FeeCapacityModel = mongoose.model<feecapacity>(
  "fee_capacity",
  FeeCapacitySchema
);
export default FeeCapacityModel;
