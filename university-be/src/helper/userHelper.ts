import sgMail from "@sendgrid/mail";
import UserModel from "../models/user";
import { ObjectId } from "mongoose";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendEmail = async (email: string, otp: string) => {
  try {
    const msg = {
      to: email,
      from: process.env.EMAIL_USER!, // Use the verified sender
      subject: "Email Verification OTP",
      html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Email Verification</h2>
        <p>Your OTP for email verification is:</p>
        <h1 style="color:rgba(0, 158, 226, 0.94); letter-spacing: 5px;">${otp}</h1>
        <p>This OTP will expire in 5 minutes.</p>
      </div>`,
    };
    const info = await sgMail.send(msg);
    console.log("Email sent: ", info);
  } catch (error) {
    console.log(error);
  }
};

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const userExists = async (email: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User not found");
  return user;
};

export const checkIfUserExists = async (email: string) => {
  const user = await UserModel.findOne({ email });
  return user;
};

export const IsUser = async (userID: ObjectId) => {
  const user = await UserModel.findById(userID)
  if (!user) throw new Error("User Not Found");
  return user
}
