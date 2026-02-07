import mongoose, { ObjectId, Schema } from "mongoose";
import validator from "validator";

export interface UserSchema {
  name: string,
  username: string,
  email: string,
  password: string,
  userGrpId: ObjectId,
  otp?: string,
  otpExpiry?: Date,
  profileCompleted: boolean
}

const UserSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: [true, "This user name is already Present"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "User already exists with this email"],
      validate(value: any) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    // confirmPassword: {
    //   type: String,
    //   require: true
    // },
    userGrpId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_group",
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
    profileCompleted: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<UserSchema>("User", UserSchema);
export default UserModel;