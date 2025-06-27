import mongoose, { Schema } from "mongoose";

interface stream {
  name: string
}

const StreamSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true, "This Stream name is already Present"],
  },
});

const StreamModel = mongoose.model<stream>("stream", StreamSchema);
export default StreamModel;
