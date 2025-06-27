import express from "express";

import {
  createCourse, createStream, createSubject, createUniversity, createFeeCapacity,
  getStreams, getCourses, getSubjects, createUserGroup,
  deleteStream, deleteSubject, deleteCourse,
  updateStream, updateSubject, updateCourse,
  deleteUniversity
} from "../controller/adminController";
import {
  createCourseSchema, createFeeCapacitySchema,
  createStreamSchema, createSubjectSchema, createUniversitySchema,
  deleteSchema
} from "../validators/admin.validator";
import { authenticateJWT } from "../middlerware/auth";
import { permission } from "../middlerware/permission";
// import { validateParams } from "../middlerware/validateParams";
import { idParamSchema } from "../validators/commenValidator";
import { validateInput } from "../middlerware/validator";

const router = express.Router();

router.post("/create-university", authenticateJWT, permission("university", "create"), validateInput(createUniversitySchema, 'body'), createUniversity);
router.post("/create-stream", authenticateJWT, permission("stream", "create"), validateInput(createStreamSchema, 'body'), createStream);
router.post("/create-subject", authenticateJWT, permission("subject", "create"), validateInput(createSubjectSchema, 'body'), createSubject);
router.post("/create-course", authenticateJWT, permission("course", "create"), validateInput(createCourseSchema, 'body'), createCourse);
router.post("/create-feecapacity", authenticateJWT, permission("feecapacity", "create"), validateInput(createFeeCapacitySchema, 'body'), createFeeCapacity);
router.post("/create-usergroup", authenticateJWT, permission("usergroup", "create"), createUserGroup);

router.get("/get-streams", authenticateJWT, permission("stream", "view"), getStreams);
router.get("/get-courses", authenticateJWT, permission("course", "view"), getCourses);
router.get("/get-subjects", authenticateJWT, permission("subject", "view"), getSubjects);

router.put("/update-stream/:id", authenticateJWT, permission("stream", "update"), validateInput(idParamSchema, 'params'), validateInput(createStreamSchema, 'body'), updateStream);
router.put("/update-subject/:id", authenticateJWT, permission("subject", "update"), validateInput(idParamSchema, 'params'), validateInput(createSubjectSchema, 'body'), updateSubject);
router.put("/update-course/:id", authenticateJWT, permission("course", "update"), validateInput(idParamSchema, 'params'), validateInput(createCourseSchema, 'body'), updateCourse);


router.delete('/delete-stream/:id', authenticateJWT, permission("stream", "delete"), validateInput(idParamSchema, 'params'), deleteStream)
router.delete('/delete-subject/:id', authenticateJWT, permission("subject", "delete"), validateInput(idParamSchema, 'params'), deleteSubject)
router.delete('/delete-course/:id', authenticateJWT, permission("course", "delete"), validateInput(idParamSchema, 'params'), deleteCourse)
router.delete('/delete-university/:id', authenticateJWT, permission("university", "delete"), validateInput(idParamSchema, 'params'), deleteUniversity)


export default router;
