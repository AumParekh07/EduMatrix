import express from "express";
import { enrollCourse, getStudentDetail, studentDetail, updateStdDetail, verifyStripePayment } from "../controller/studentController";
import { ECSchema, studentDetailSchema } from "../validators/student.validator";
import { authenticateJWT } from "../middleware/auth";
import { permission } from "../middleware/permission";
import { validateInput } from "../middleware/validator";

const router = express.Router();

router.post("/std-detail", authenticateJWT, validateInput(studentDetailSchema, 'body'), studentDetail)
router.put("/update-stdDetail", authenticateJWT, validateInput(studentDetailSchema, 'body'), updateStdDetail)

router.post("/enroll-course", authenticateJWT, permission("enroll_course", "create"), validateInput(ECSchema, 'body'), enrollCourse);
router.get('/verify-stripe', authenticateJWT, permission("enroll_course", "update"), verifyStripePayment);

router.get("/std-detail", authenticateJWT, getStudentDetail);
export default router