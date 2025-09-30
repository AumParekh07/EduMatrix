"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = require("../controller/studentController");
const student_validator_1 = require("../validators/student.validator");
const auth_1 = require("../middlerware/auth");
const permission_1 = require("../middlerware/permission");
const validator_1 = require("../middlerware/validator");
const router = express_1.default.Router();
router.post("/std-detail", auth_1.authenticateJWT, (0, validator_1.validateInput)(student_validator_1.studentDetailSchema, 'body'), studentController_1.studentDetail);
router.put("/update-stdDetail", auth_1.authenticateJWT, (0, validator_1.validateInput)(student_validator_1.studentDetailSchema, 'body'), studentController_1.updateStdDetail);
router.post("/enroll-course", auth_1.authenticateJWT, (0, permission_1.permission)("enroll_course", "create"), (0, validator_1.validateInput)(student_validator_1.ECSchema, 'body'), studentController_1.enrollCourse);
router.get("/std-detail", auth_1.authenticateJWT, studentController_1.getStudentDetail);
exports.default = router;
