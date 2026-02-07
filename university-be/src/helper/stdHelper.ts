import { ObjectId } from "mongoose";
import UserModel from "../models/user";

export const UserProfileCompleted = async (userID: ObjectId) => {
    const user = await UserModel.findByIdAndUpdate(userID, { profileCompleted: true }, { new: true });

    if (!user) throw new Error("User Not Found");
    return user;
};