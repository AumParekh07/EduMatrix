import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const mongoURI: string = process.env.MONGODB_URL as string;

if (!mongoURI) {
  throw new Error("Missing MONGODB_URI in .env file");
}

const connectDB = async () => {
  await mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
      process.exit(1); // Exit the process with failure
    });
};
export default connectDB;
