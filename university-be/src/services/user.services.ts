import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { checkIfUserExists, generateOTP, IsUser, sendEmail, userExists } from "../helper/userHelper";
import { ObjectId } from "mongoose";
import UserModel, { UserSchema } from "../models/user";
import UniversityModel from "../models/university";
import FeeCapacityModel from "../models/feecapacity";
import EnrollCourseModel from "../models/enrollCourse";


interface TCreateUserResponse {
  name: string;
  username: string;
  email: string;
  password: string;
  userGrpId: ObjectId;
}

interface TLoginUserResponse {
  user: UserSchema;
  jwtToken: string;
  role: string
}

interface TSendOtpResponse {
  otp: string;
}

export const createUserService = async (
  name: string,
  username: string,
  email: string,
  password: string,
  userGrpId: ObjectId
): Promise<TCreateUserResponse> => {
  try {
    const user = await checkIfUserExists(email);
    if (user) throw new Error("User Already Exists With This Email");

    const userwithUserName = await UserModel.findOne({ username: username })
    if (userwithUserName) throw new Error("This User Name Already Used");

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new UserModel({
      name,
      username,
      email,
      password: hashedPassword,
      userGrpId,
    });
    await newUser.save();
    return newUser;
  } catch (error) {
    throw error;
  }
};

export const loginUserService = async (
  email: string,
  password: string
): Promise<TLoginUserResponse> => {
  try {


    //find user
    const user = await userExists(email);

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Invalid Password");

    const jwtSecret = process.env.JWT_SECRET_KEY;

    const jwtToken = jwt.sign({ userId: user._id }, jwtSecret!, { expiresIn: "1d" });

    let role = 'student';

    if (user.userGrpId.toString() === '682c18dc2bb32dfa02ed0ea9') role = 'admin'

    return { user, jwtToken, role };

  } catch (error) {
    throw error;
  }
};

export const sendOtpService = async (
  email: string
): Promise<TSendOtpResponse> => {
  try {


    const user = await userExists(email);

    const otp: string = generateOTP();
    const otpExpiry: Date = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    await UserModel.findByIdAndUpdate(user._id, { otp, otpExpiry });
    await sendEmail(email, otp);

    return { otp };

  } catch (error) {
    throw error;
  }
};

export const verifyOtpService = async (email: string, otp: string): Promise<TLoginUserResponse> => {
  try {

    const user = await userExists(email);

    if (!user.otp || !user.otpExpiry) throw new Error("No OTP Sent");

    if (user.otp !== otp) throw new Error("Invalid OTP");

    const now: Date = new Date();
    if (now > user.otpExpiry)
      throw new Error("OTP expired. Please login Again");

    const jwtSecret = process.env.JWT_SECRET_KEY;

    const jwtToken = jwt.sign({ userId: user._id }, jwtSecret!, {
      expiresIn: "1d",
    });
    let role = 'student';

    if (user.userGrpId.toString() === '682c18dc2bb32dfa02ed0ea9') role = 'admin'


    // Clear OTP  successful verification
    await UserModel.findByIdAndUpdate(user._id, {
      otp: null as unknown as string,
      otpExpiry: new Date(0),
    });
    return { user, jwtToken, role };

  } catch (error) {
    throw error;
  }
};

//by default std preference
//         const universities = await UniversityModel.find({
//           jobPlacement: student?.preference.jobPlacement,
//           scholarship: student?.preference.scholarship,
//           nearbyUniversity: student?.preference.nearbyUniversity,
//           transportation: student?.preference.transportation,
//           accommodation: student?.preference.accommodation
//         })

// Using aggregation pipeline

// const universities1 = await UniversityModel.aggregate([
//   {
//     $lookup: {
//       from: "courses",
//       localField: "course",
//       foreignField: "_id",
//       as: "course",
//     },
//   },
//   { $unwind: { path: "$course", preserveNullAndEmptyArrays: true } },
//   {
//     $lookup: {
//       from: "streams",
//       localField: "stream",
//       foreignField: "_id",
//       as: "stream",
//     },
//   },
//   { $unwind: { path: "$stream", preserveNullAndEmptyArrays: true } },
//   {
//     $lookup: {
//       from: "subjects",
//       localField: "course.subjects.compulsory",
//       foreignField: "_id",
//       as: "course.subjects.compulsory",
//     },
//   },
//   {
//     $lookup: {
//       from: "subjects",
//       localField: "course.subjects.optional",
//       foreignField: "_id",
//       as: "course.subjects.optional",
//     },
//   },
//   {
//     $facet: {
//       metadata: [{ $count: 'totalCount' }],
//       data: [{ $skip: (page - 1) * pageLimit }, { $limit: pageLimit }, {
//         $project: { /*stream: 0, course: 0,*/ createdAt: 0, updatedAt: 0,
//           __v: 0,
//           "course.__v": 0,
//           "stream.__v": 0,
//           "course.subjects.compulsory.__v": 0,
//           "course.subjects.optional.__v": 0,
//         }
//       }],
//     }
//   },
// ])
// return universities1

export const getAllUniversityService = async (
  page: number, pageLimit: number, userId: ObjectId,
  filter: {
    jobPlacement?: boolean;
    scholarship?: boolean;
    nearbyUniversity?: boolean;
    transportation?: boolean;
    accommodation?: boolean;
  }
) => {
  try {
    let totalUniversities = await UniversityModel.countDocuments(filter);
    const User = await IsUser(userId)

    if (User) {
      const university = await UniversityModel.find(filter)
        .limit(pageLimit)
        .skip((page - 1) * pageLimit)
        .populate("course")
        .populate("stream")
        .populate({
          path: "course",
          populate: {
            path: "subjects.compulsory",
            model: "subject",
          },
        })
        .populate({
          path: "course",
          populate: {
            path: "subjects.optional",
            model: "subject",
          },
        });

      if (!university) {
        throw new Error("University Not Found");
      }
      return { university, totalUniversities };
    }
    else {
      throw new Error("User Not Found");
    }
  } catch (error) {
    throw error;
  }
};


export const getUniversityByIDService = async (id: string, userId: ObjectId) => {
  try {
    const User = await IsUser(userId)

    if (User) {
      const university = await UniversityModel.findById(id)
        .populate("course")
        .populate("stream")
        .populate({
          path: "course",
          populate: [{
            path: "subjects.compulsory",
            model: "subject",
          },
          {
            path: "subjects.optional",
            model: "subject",
          },
          ]
        })

      if (!university) {
        throw new Error("University Not Found");
      }
      const enrollCourses = await EnrollCourseModel.find({ userID: User._id, universityID: id })
      const FeeAndCapacity = await FeeCapacityModel.find({ universityId: id })
      // total std in university
      // const TotalEnrolledCount = await EnrollCourseModel.countDocuments({ universityID: university._id });

      const courseEnrollCounts = await Promise.all(university.course.map(async (course: any) => {

        const count = await EnrollCourseModel.countDocuments({ universityID: university._id, courseID: course._id, });

        return { courseId: course._id, enrollCount: count };
      })
      );
      return { university, FeeAndCapacity, courseEnrollCounts, enrollCourses }
    } else {
      throw new Error("User Not Found");
    }
  } catch (error) {
    throw error

  }
}