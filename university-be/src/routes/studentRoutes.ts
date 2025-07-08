import express from "express";
import { enrollCourse, getStudentDetail, studentDetail, updateStdDetail } from "../controller/studentController";
import { ECSchema, studentDetailSchema } from "../validators/student.validator";
import { authenticateJWT } from "../middlerware/auth";
import { permission } from "../middlerware/permission";
import { validateInput } from "../middlerware/validator";

const router = express.Router();

router.post("/std-detail", authenticateJWT, validateInput(studentDetailSchema, 'body'), studentDetail)
router.put("/update-stdDetail", authenticateJWT, validateInput(studentDetailSchema, 'body'), updateStdDetail)

router.post("/enroll-course", authenticateJWT, permission("enroll_course", "create"), validateInput(ECSchema, 'body'), enrollCourse);

router.get("/std-detail", authenticateJWT, getStudentDetail);
export default router