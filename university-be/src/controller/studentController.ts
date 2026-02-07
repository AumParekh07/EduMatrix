import { Request, Response } from "express";

import { enrollCourseService, getstudentDetailService, studentDetailService, updateStdDetailService, verifyPaymentService } from "../services/student.services";
// import { type AuthenticatedRequest } from "../middleware/auth";

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
        console.error("error: ", error);

        res.status(400).json({
            success: false,
            message: `${error}`,
        });
    }
}

export const getStudentDetail = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.userId;

        const result = await getstudentDetailService(userId)

        res.status(200).json({
            success: true,
            message: "Student Data fetched",
            data: result
        });
    } catch (error) {
        console.error("error: ", error);

        res.status(400).json({
            success: false,
            message: `${error}`,
        });
    }
}

export const updateStdDetail = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.userId;
        const { gender, birthDate, stream, address, preference } = req.body
        const result = await updateStdDetailService(userId, gender, birthDate, stream, address, preference)

        res.status(201).json({
            success: true,
            message: `Your Data Updated Successfully`,
            Student: result
        })
    } catch (error) {
        console.error("error: ", error);
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
        const { origin } = req.headers

        const result = await enrollCourseService(userId, universityID, courseID, optionalSubjectID, origin as string)

        res.status(200).json({
            success: true,
            message: "Enroll Complete",
            data: result
        })
    } catch (error) {
        console.error("error: ", error);

        res.status(400).json({
            success: false,
            message: `${error}`
        })
    }
}


export const verifyStripePayment = async (req: Request, res: Response) => {
    try {
        const { session_id } = req.query;

        const result = await verifyPaymentService(session_id! as string)

        res.status(200).json(result)
    }
    catch (error) {
        console.error("error: ", error);
        res.status(400).json({
            success: false,
            message: `${error}`
        })
    }
}