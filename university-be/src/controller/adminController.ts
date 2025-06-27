import { Request, Response } from "express";
import {
  createCourseService, createFeeCapacityService,
  createStreamService, createSubjectService,
  createUniversityService, createUserGroupService,
  deleteCourseService,
  deleteStreamService,
  deleteSubjectService,
  updateCourseService,
  updateStreamService,
  updateSubjectService,
} from "../services/admin.services";

import StreamModel from "../models/stream";
import SubjectModel from "../models/subject";
import CourseModel from "../models/course";
import Joi from "joi";
import { objectId } from "../validators/commenValidator";

export const createUniversity = async (req: Request, res: Response) => {
  try {
    const { name, jobPlacement, scholarship,
      nearbyUniversity, transportation,
      accommodation, address, stream, course } = req.body;

    const result = await createUniversityService(name.trim(), jobPlacement, scholarship,
      nearbyUniversity, transportation, accommodation, address, stream, course);

    res.status(201).json({
      success: true,
      message: "University Created",
      University: result,
    });

  } catch (error) {
    console.log("error: ", error);

    res.status(400).json({
      success: false,
      message: `${error}`,
    });
  }
};

export const createStream = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const result = await createStreamService(name.trim());

    res.status(201).json({
      success: true,
      message: "Stream Created",
      Stream: result.name,
    });
  } catch (error) {
    console.log("error: ", error);

    res.status(400).json({
      success: false,
      message: `${error}`,
    });
  }
};

export const createSubject = async (req: Request, res: Response) => {
  try {
    const { name, fullname } = req.body;

    const result = await createSubjectService(name.trim(), fullname.trim());

    res.status(201).json({
      success: true,
      message: "Subject Created",
      Subject: result.name + ":" + result.fullName,
    });
  } catch (error) {
    console.log("error: ", error);

    res.status(400).json({
      success: false,
      message: `${error}`,
    });
  }
};

export const createUserGroup = async (req: Request, res: Response) => {
  try {
    const { role, module_permission } = req.body
    const result = await createUserGroupService(role, module_permission)

    res.status(201).json({
      success: true,
      message: "UserGroup Created",
      Course: result,
    });
  } catch (error) {
    console.log("error: ", error);

    res.status(400).json({
      success: false,
      message: `${error}`,
    });
  }
}

export const createCourse = async (req: Request, res: Response) => {
  try {
    const { name, fullname, courseType, subjects } = req.body;

    const result = await createCourseService(name.trim(), fullname.trim(), courseType, subjects);

    res.status(201).json({
      success: true,
      message: "Course Created",
      Course: result.name + ":" + result.fullname,
    });
  } catch (error) {
    console.log("error: ", error);

    res.status(400).json({
      success: false,
      message: `${error}`,
    });
  }
};

export const createFeeCapacity = async (req: Request, res: Response) => {
  try {
    const { fee, capacity, universityId, courseId } = req.body;

    const result = await createFeeCapacityService(fee, capacity, universityId, courseId);

    res.status(201).json({
      success: true,
      message: "Data Entered",
      Data: result,
    });
  } catch (error) {
    console.log("error: ", error);

    res.status(400).json({
      success: false,
      message: `${error}`,
    });
  }
};

export const getStreams = async (req: Request, res: Response) => {
  try {
    const Streams = await StreamModel.find();

    res.status(200).json({
      success: true,
      message: "Streams fetched successfully",
      data: Streams,
    });
  } catch (error) {
    console.log("error: ", error);

    res.status(400).json({
      success: false,
      message: `${error}`,
    });
  }
};

export const getSubjects = async (req: Request, res: Response) => {
  try {
    const subjects = await SubjectModel.find();

    res.status(200).json({
      success: true,
      message: "Subjects fetched successfully",
      data: subjects,
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({
      success: false,
      message: `${error}`,
    });
  }
};

export const getCourses = async (req: Request, res: Response) => {
  try {
    const Courses = await CourseModel.find()
      .populate({
        path: "subjects.compulsory",
        model: "subject"
      })
      .populate({
        path: "subjects.optional",
        model: "subject",
      });

    res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: Courses,
    });
  } catch (error) {
    console.log("error: ", error);

    res.status(500).json({
      success: false,
      message: `${error}`,
    });
  }
};


export const updateStream = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body

    const result = await updateStreamService(id, name);


    if (!result) {
      throw new Error("Stream not found");
    }
    res.status(201).json({
      success: true,
      message: `${result?.name} Updated`,
      Stream: result?.name,
    });
  } catch (error) {
    console.log("error: ", error);

    res.status(400).json({
      success: false,
      message: `${error}`,
    });
  }
}

export const updateSubject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, fullname } = req.body

    const result = await updateSubjectService(id, name, fullname);

    if (!result) {
      throw new Error("Subject not found");
    }
    res.status(201).json({
      success: true,
      message: `${result?.name} Updated`,
      Stream: result?.name,
    });
  } catch (error) {
    console.log("error: ", error);

    res.status(400).json({
      success: false,
      message: `${error}`,
    });
  }
}

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, fullname, courseType, subjects } = req.body;

    const result = await updateCourseService(id, name, fullname, courseType, subjects)
    res.status(201).json({
      success: true,
      message: `${result?.name} Updated`,
      Stream: result?.name,
    });
  } catch (error) {
    console.log("error: ", error);

    res.status(400).json({
      success: false,
      message: `${error}`,
    });
  }
}

export const deleteStream = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;

    const result = await deleteStreamService(id);


    res.status(200).json({
      success: true,
      message: "Stream Deleted",
      data: result?.name || result
    })
  } catch (error) {
    console.log("error: ", error);

    res.status(400).json({
      success: false,
      message: `${error}`,
    });
  }
}

export const deleteSubject = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;
    const result = await deleteSubjectService(id);


    res.status(200).json({
      success: true,
      message: "Subject Deleted",
      data: result?.name || result
    })
  } catch (error) {
    console.log("error: ", error);

    res.status(400).json({
      success: false,
      message: `${error}`,
    });
  }
}

export const deleteCourse = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;
    const result = await deleteCourseService(id);


    res.status(200).json({
      success: true,
      message: "Course Deleted",
      data: result?.name || result
    })
  } catch (error) {
    console.log("error: ", error);

    res.status(400).json({
      success: false,
      message: `${error}`,
    });
  }
}