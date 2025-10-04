import { Request, Response } from "express";
import dotenv from "dotenv";
import Joi from "joi";

import {
  createUserService,
  getAllUniversityService,
  getUniversityByIDService,
  loginUserService,
  sendOtpService,
  verifyOtpService,
} from "../services/user.services";

// import { AuthenticatedRequest } from "../middlerware/auth";


dotenv.config();

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, username, email, password, userGrpId } = req.body;

    const result = await createUserService(name.trim(), username.trim(), email.trim(), password.trim(), userGrpId);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      name: result.name,
      username: result.username,
      email: result.email,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: `${error}`,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await loginUserService(email, password);

    res.status(200).json({
      success: true,
      message: `Welcome: ${result.user.name}`,
      profileCompleted: result.user.profileCompleted,
      token: result.jwtToken,
      role: result.role
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: `Login ${error}`,
    });
  }
};

export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const result = await sendOtpService(email);

    res.status(200).json({
      success: true,
      message: "OTP sent to email successfully! Check in your spam also",
      otp: result.otp,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: `${error}`,
    });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    const result = await verifyOtpService(email, otp);

    res.status(200).json({
      success: true,
      message: `OTP verified successfully welcome: ${result.user.name}`,
      profileCompleted: result.user.profileCompleted,
      token: result.jwtToken,
      role: result.role
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: `Login ${error}`,
    });
  }
};


export const getAllUniversities = async (req: Request, res: Response) => {
  try {
    const { page, pageSize, jobPlacement, scholarship, nearbyUniversity, transportation, accommodation } = req.query;

    const userId = res.locals.userId;

    // const { userId } = (req as AuthenticatedRequest).user!;


    const pageNumber = parseInt(page as string, 10) || 1;
    const pageLimit = parseInt(pageSize as string, 10) || 2;



    const filter: any = {};

    if (jobPlacement === "true") filter.jobPlacement = true;
    if (scholarship === "true") filter.scholarship = true;
    if (nearbyUniversity === "true") filter.nearbyUniversity = true;
    if (transportation === "true") filter.transportation = true;
    if (accommodation === "true") filter.accommodation = true;

    const result = await getAllUniversityService(
      pageNumber,
      pageLimit,
      userId,
      filter
    );
    res.status(200).json({
      success: true,
      message: "Universities fetched successfully",
      pagination: { TotalData: result.totalUniversities, PageNo: page, PageLimit: pageSize },
      data: result.university
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({
      success: false,
      message: `${error}`,
    });
  }
};

export const getUniversityByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const userId = res.locals.userId;

    // const { userId } = (req as AuthenticatedRequest).user!;

    const result = await getUniversityByIDService(id, userId);

    res.status(200).json({
      success: true,
      data: result
    })
  } catch (error) {
    console.log('error: ', error);
    res.status(400).json({
      success: false,
      message: `${error}`,
    })

  }
}
