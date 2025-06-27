import mongoose, { Schema } from "mongoose";
export interface RolePermission {
    role: string;
    module_permission: permission
}
export interface permission {
    [key: string]: string[]
}


const userGroupSchema: Schema = new mongoose.Schema({
    role: { type: String, required: true, unique: true },
    module_permission: {
        enroll_course: { type: [String], required: true },
        university: { type: [String], required: true },
        stream: { type: [String], required: true },
        course: { type: [String], required: true },
        subject: { type: [String], required: true }
    },
})

const UserGroupModel = mongoose.model<RolePermission>("newusergroup", userGroupSchema)
export default UserGroupModel;

