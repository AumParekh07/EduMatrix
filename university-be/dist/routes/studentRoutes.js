"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = require("../controller/studentController");
const validate_1 = require("../middlerware/validate");
const student_validator_1 = require("../validators/student.validator");
const auth_1 = require("../middlerware/auth");
const permission_1 = require("../middlerware/permission");
const router = express_1.default.Router();
router.post("/std-detail", auth_1.authenticateJWT, (0, validate_1.validateBody)(student_validator_1.studentDetailSchema), studentController_1.studentDetail);
router.post("/enroll-course", auth_1.authenticateJWT, (0, permission_1.permission)("enroll_course", "create"), (0, validate_1.validateBody)(student_validator_1.ECSchema), studentController_1.enrollCourse);
exports.default = router;
