import express from "express";
import { enrollCourse, getStudentDetail, studentDetail } from "../controller/studentController";
import { ECSchema, studentDetailSchema } from "../validators/student.validator";
import { authenticateJWT } from "../middlerware/auth";
import { permission } from "../middlerware/permission";
import { validateInput } from "../middlerware/validator";

const router = express.Router();

router.post("/std-detail", authenticateJWT, validateInput(studentDetailSchema, 'body'), studentDetail)
router.post("/enroll-course", authenticateJWT, permission("enroll_course", "create"), validateInput(ECSchema, 'body'), enrollCourse);

router.get("/std-detail", authenticateJWT, getStudentDetail);
export default router