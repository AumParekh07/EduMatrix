import mongoose, { Schema } from "mongoose";

interface permission {
  name: string,
  permissions: string[],
}
const moduleSchema: Schema = new Schema({
  moduleName: {
    type: String,
    require: true,
  },
  permissions: {
    type: [String],
    require: true,
  },
});
const PermissionModel = mongoose.model<permission>(
  "module_permission",
  moduleSchema
);
export default PermissionModel;
