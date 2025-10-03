import nodemailer from "nodemailer";
import UserModel from "../models/user";
import { ObjectId } from "mongoose";

export const sendEmail = async (email: string, otp: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification OTP",
      html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Email Verification</h2>
        <p>Your OTP for email verification is:</p>
        <h1 style="color:rgba(0, 158, 226, 0.94); letter-spacing: 5px;">${otp}</h1>
        <p>This OTP will expire in 5 minutes.</p>
      </div>`,
    });
    console.log("Email info: ", info);
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
