import express from "express";

import {
  createUser, getAllUniversities, getUniversityByID,
  // getUniversities,
  getUniversityByPayload, loginUser, sendOtp, verifyOtp,
} from "../controller/userController";
import { createUserSchema, getUniversitiesSchema, getUniversityByPayloadSchema, loginUserSchema, sendOtpSchema, verifyOtpSchema } from "../validators/user.validator";
import { authenticateJWT } from "../middlerware/auth";
import { permission } from "../middlerware/permission";
import { idParamSchema } from "../validators/commenValidator";
import { validateInput } from "../middlerware/validator";

const router = express.Router();

router.post("/register", validateInput(createUserSchema, 'body'), createUser);
router.post("/login", validateInput(loginUserSchema, 'body'), loginUser);
router.post("/send-otp", validateInput(sendOtpSchema, 'body'), sendOtp);
router.post("/verify-otp", validateInput(verifyOtpSchema, 'body'), verifyOtp);

// router.get("/get-university", authenticateJWT, permission("university", "view"), getUniversities);
router.get("/get-university", authenticateJWT, permission("university", "view"), validateInput(getUniversitiesSchema, "query"), getAllUniversities);

router.get("/get-university/:id", authenticateJWT, permission("university", "view"), validateInput(idParamSchema, 'params'), getUniversityByID);
router.post("/get-university", authenticateJWT, permission("university", "view"), validateInput(getUniversityByPayloadSchema, 'body'), getUniversityByPayload);

export default router;
