import { ObjectId } from "mongoose";
import UniversityModel, { Address } from "../models/university";
import StreamModel from "../models/stream";
import SubjectModel from "../models/subject";
import CourseModel, { Subject } from "../models/course";
import FeeCapacityModel from "../models/feecapacity";
import UserGroupModel, { permission } from "../models/user_group";

export const createStreamService = async (name: string) => {
  try {

    const newStream = new StreamModel({ name });

    await newStream.save();
    return newStream;
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
};

export const updateStreamService = async (id: string, name: string) => {
  try {

    const updatedStream = StreamModel.findByIdAndUpdate(id, { name }, { new: true, runValidators: true });


    return updatedStream;
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
};

export const deleteStreamService = async (id: string) => {
  try {
    const stream = await StreamModel.findById(id);

    if (!stream) {
      throw new Error("Stream not found");

    }
    const deleteStream = await StreamModel.findByIdAndDelete(id);

    return deleteStream
  } catch (error) {
    throw error

  }
}

export const createSubjectService = async (name: string, fullName: string) => {
  try {

    const newSubject = new SubjectModel({ name, fullName });

    await newSubject.save();
    return newSubject;
  } catch (error) {
    throw error;
  }
};

export const updateSubjectService = async (id: string, name: string, fullName: string) => {
  try {
    const updatedSubject = await SubjectModel.findByIdAndUpdate(id, { name, fullName }, { new: true });

    if (!updatedSubject) {
      throw new Error("Subject not found");
    }
    return updatedSubject
  } catch (error) {
    throw error

  }
}

export const deleteSubjectService = async (id: string) => {
  try {
    const subject = await SubjectModel.findById(id);

    if (!subject) {
      throw new Error("Subject not found");

    }
    const deleteSubject = await SubjectModel.findByIdAndDelete(id);

    return deleteSubject
  } catch (error) {
    throw error

  }
}

export const createCourseService = async (
  name: string,
  fullname: string,
  courseType: string,
  subjects: Subject
) => {
  try {

    const compulsorySubjects = await SubjectModel.find({ _id: { $in: subjects.compulsory } });
    if (compulsorySubjects.length !== subjects.compulsory.length) {
      throw new Error("One or more Subjects not found");
    }

    const optionalSubjects = await SubjectModel.find({ _id: { $in: subjects.optional } });
    if (optionalSubjects.length !== subjects.optional.length) {
      throw new Error("One or more Subjects not found");
    }

    const newSubject = new CourseModel({
      name,
      fullname,
      courseType,
      subjects,
    });

    await newSubject.save();
    return newSubject;
  } catch (error) {
    throw error;
  }
};

export const updateCourseService = async (
  id: string,
  name: string,
  fullname: string,
  courseType: string,
  subjects: Subject) => {
  try {
    const updatedCourse = await CourseModel.findByIdAndUpdate(id, { name, fullname, courseType, subjects })

    if (!updatedCourse) throw new Error("Course Not Found");
    return updatedCourse

  } catch (error) {
    throw error
  }

}

export const deleteCourseService = async (id: string) => {
  try {
    const course = await CourseModel.findById(id);

    if (!course) {
      throw new Error("Course not found");

    }
    const deleteCourse = await CourseModel.findByIdAndDelete(id);

    return deleteCourse
  } catch (error) {
    throw error

  }
}

export const createUniversityService = async (
  name: string,
  jobPlacement: boolean,
  scholarship: boolean,
  nearbyUniversity: boolean,
  transportation: boolean,
  accommodation: boolean,
  address: Address,
  stream: ObjectId[],
  course: ObjectId[]
) => {
  try {


    const streams = await StreamModel.find({ _id: { $in: stream } });
    if (streams.length !== stream.length) {
      throw new Error("One or more Streams not found");
    }

    const courses = await CourseModel.find({ _id: { $in: course } });
    if (courses.length !== course.length) {
      throw new Error("One or more Courses not found");
    }

    const newUniversity = new UniversityModel({
      name,
      jobPlacement,
      scholarship,
      nearbyUniversity,
      transportation,
      accommodation,
      address,
      stream,
      course,
    });
    await newUniversity.save();
    return newUniversity;
  }
  catch (error) {
    throw error;
  }
};


export const createFeeCapacityService = async (
  fee: number,
  capacity: number,
  universityId: ObjectId,
  courseId: ObjectId
) => {
  try {


    const courses = await CourseModel.findById(courseId)
    if (!courses) {
      throw new Error("Course Not Found");
    }

    const university = await UniversityModel.findById(universityId)
    if (!university) {
      throw new Error("University Not Found");
    }
    const newData = new FeeCapacityModel({
      fee,
      capacity,
      universityId: university._id,
      courseId: courses._id,
    });

    await newData.save();
    return newData;
  } catch (error) {
    throw error;
  }
};

export const createUserGroupService = async (role: string, module_permission: permission) => {
  try {
    console.log("UserGroupModel import:", UserGroupModel);

    const newUserGroup = new UserGroupModel({
      role, module_permission
    })
    await newUserGroup.save()

    return newUserGroup

  } catch (error) {
    throw error;
  }
}
