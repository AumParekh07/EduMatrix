import { Request, Response } from "express";

import { enrollCourseService, getstudentDetailService, studentDetailService } from "../services/student.services";
// import { type AuthenticatedRequest } from "../middlerware/auth";

export const studentDetail = async (req: Request, res: Response) => {
    try {
        const { gender, birthDate, stream, address, preference } = req.body
        const userId = res.locals.userId;

        // const { userId } = (req as AuthenticatedRequest).user!;

        const result = await studentDetailService(userId, gender, birthDate, stream, address, preference)

        res.status(201).json({
            success: true,
            message: "Student Data updated",
            Student_Detail: result.newStudent,
            profileCompleted: result.user.profileCompleted
        });
    } catch (error) {
        console.log("error: ", error);

        res.status(400).json({
            success: false,
            message: `${error}`,
        });
    }
}
export const getStudentDetail = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.userId;

        // const { userId } = (req as AuthenticatedRequest).user!;
        const result = await getstudentDetailService(userId)

        res.status(200).json({
            success: true,
            message: "Student Data fetched",
            data: result
        });
    } catch (error) {
        console.log("error: ", error);

        res.status(400).json({
            success: false,
            message: `${error}`,
        });
    }
}

export const enrollCourse = async (req: Request, res: Response) => {
    try {
        const { universityID, courseID, optionalSubjectID } = req.body

        const userId = res.locals.userId;

        // const { userId } = (req as AuthenticatedRequest).user!;

        const result = await enrollCourseService(userId, universityID, courseID, optionalSubjectID)

        res.status(200).json({
            success: true,
            message: "Enroll Complete",
            data: result
        })
    } catch (error) {
        console.log('error: ', error);

        res.status(400).json({
            success: false,
            message: `${error}`
        })
    }
}