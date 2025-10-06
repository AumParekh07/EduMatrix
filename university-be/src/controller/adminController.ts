import { Request, Response } from "express";
import {
  createCourseService, createFeeCapacityService, createStreamService,
  createSubjectService, createUniversityService, createUserGroupService,
  deleteCourseService, deleteStreamService, deleteSubjectService,
  deleteUniversityService, updateCourseService, updateStreamService,
  updateSubjectService,
  updateUniversityService,
  upsertFeeCapacitiesService,
} from "../services/admin.services";

import StreamModel from "../models/stream";
import SubjectModel from "../models/subject";
import CourseModel from "../models/course";
import UniversityModel from "../models/university";
import StudentModel from "../models/student";

export const getCounts = async (req: Request, res: Response) => {
  try {
    const universityCount = await UniversityModel.countDocuments();
    const courseCount = await CourseModel.countDocuments();
    const studentCount = await StudentModel.countDocuments();

    res.status(200).json({
      success: true,
      message: "Counts fetched successfully",
      data: {
        universities: universityCount,
        courses: courseCount,
        students: studentCount,
      },
    });
  } catch (error) {
    console.error("Error fetching counts:", error);
    res.status(400).json({
      success: false,
      message: "Failed to fetch counts",
    });
  }
};

export const createUniversity = async (req: Request, res: Response) => {
  try {
    const { name, jobPlacement, scholarship,
      nearbyUniversity, transportation,
      accommodation, address, stream, course, courseDetails } = req.body;

    const university = await createUniversityService(name.trim(), jobPlacement, scholarship,
      nearbyUniversity, transportation, accommodation, address, stream, course);

    // fee and capacity per course
    const insertedFeeCaps = await Promise.all(
      courseDetails.map(async (detail: { courseId: string; fee: number; capacity: number; }) => {

        const mongoose = require("mongoose");
        const feecapacity = await createFeeCapacityService(
          detail.fee,
          detail.capacity,
          new mongoose.Types.ObjectId(university?._id),
          new mongoose.Types.ObjectId(detail.courseId)
        );
        return feecapacity;
      })
    );

    res.status(201).json({
      success: true,
      message: "University Created",
      University: university,
      feecapacity: insertedFeeCaps
    });

  } catch (error) {
    console.error("error: ", error);

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
    console.error("error: ", error);

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
    console.error("error: ", error);

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
    console.error("error: ", error);

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
    console.error("error: ", error);

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
    console.error("error: ", error);

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
    console.error("error: ", error);

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
    console.error("error: ", error);
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
    console.error("error: ", error);

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

    res.status(201).json({
      success: true,
      message: `${result?.name} Updated Successfully`,
      Stream: result?.name,
    });
  } catch (error) {
    console.error("error: ", error);

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

    res.status(201).json({
      success: true,
      message: `${result?.name} Updated Successfully`,
      Subject: result?.name,
    });
  } catch (error) {
    console.error("error: ", error);

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
      message: `${result?.name} Updated Successfully`,
      Course: result?.name,
    });
  } catch (error) {
    console.error("error: ", error);

    res.status(400).json({
      success: false,
      message: `${error}`,
    });
  }
}

export const updateUniversity = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;
    const { name, jobPlacement, scholarship,
      nearbyUniversity, transportation,
      accommodation, address, stream, course, courseDetails } = req.body;

    const university = await updateUniversityService(id, name, jobPlacement, scholarship,
      nearbyUniversity, transportation, accommodation, address, stream, course);

    if (!university) throw new Error(`Failed to Update ${name}`);

    const updatedFeeCaps = await upsertFeeCapacitiesService(university._id.toString(), courseDetails);

    res.status(201).json({
      success: true,
      message: `${university?.name} Updated Successfully`,
      University: university,
      feeCapacities: updatedFeeCaps
    });
  } catch (error) {
    console.error("error: ", error);

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
      message: `${result?.name} Deleted Successfully`,
      data: result?.name || result
    })
  } catch (error) {
    console.error("error: ", error);

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
      message: `${result?.name} Deleted Successfully`,
      data: result?.name || result
    })
  } catch (error) {
    console.error("error: ", error);

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
      message: `${result?.name} Deleted Successfully`,
      data: result?.name || result
    })
  } catch (error) {
    console.error("error: ", error);

    res.status(400).json({
      success: false,
      message: `${error}`,
    });
  }
}

export const deleteUniversity = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;

    const result = await deleteUniversityService(id);

    res.status(200).json({
      success: true,
      message: `${result?.name} Deleted Successfully`,
      data: result?.name || result
    })
  } catch (error) {
    console.error("error: ", error);

    res.status(400).json({
      success: false,
      message: `${error}`,
    });
  }
}