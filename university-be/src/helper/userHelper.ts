import sgMail from "@sendgrid/mail";
import UserModel from "../models/user";
import { ObjectId } from "mongoose";


export const sendEmail = async (email: string, otp: string) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
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
    console.info("Email sent: ", info);
  } catch (error) {
    console.error("error", error);
  }
};

export const generateOTP = (): { otp: string; otpExpiry: Date } => {
  const otp: string = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry: Date = new Date(Date.now() + 5 * 60 * 1000); // 5 mins
  return { otp, otpExpiry };
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
