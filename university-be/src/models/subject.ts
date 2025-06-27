import mongoose, { Schema } from "mongoose";

interface subject {
  name: string;
  fullName: string;
}

const SubjectSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true, "This Subject name is already Present"],
  },
  fullName: {
    type: String,
    required: true,
    unique: true,
  },
});

const SubjectModel = mongoose.model<subject>("subject", SubjectSchema);
export default SubjectModel;
