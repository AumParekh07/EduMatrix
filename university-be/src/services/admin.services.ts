import mongoose, { ObjectId } from "mongoose";
import UniversityModel, { Address } from "../models/university";
import StreamModel from "../models/stream";
import SubjectModel from "../models/subject";
import CourseModel, { Subject } from "../models/course";
import FeeCapacityModel from "../models/feecapacity";
import UserGroupModel, { permission } from "../models/user_group";
import {
  existCourseInUni,
  existStreamInUni,
  existSubjectInCourse,
  existUniversityInEnrollcourse,
  IsCourse, IsCourseName, IsStream, IsStreamName,
  ISSubject, IsSubjectName, IsUniversity, IsUniversityName,
  validateCourseSubjects, validateUniversity
} from "../helper/adminHelper";

export const createStreamService = async (name: string) => {
  try {
    await IsStreamName(name);

    const newStream = new StreamModel({ name });

    await newStream.save();
    return newStream;
  } catch (error) {
    console.error("error: ", error);
    throw error;
  }
};

export const updateStreamService = async (id: string, name: string) => {
  try {

    const stream = await IsStream(id);
    await IsStreamName(name, id);

    const updatedStream = StreamModel.findByIdAndUpdate(stream._id, { name }, { new: true });

    return updatedStream;
  } catch (error) {
    console.error("error: ", error);
    throw error;
  }
};

export const deleteStreamService = async (id: string) => {
  try {
    const stream = await IsStream(id);
    await existStreamInUni(stream._id.toString())

    const deleteStream = await StreamModel.findByIdAndDelete(stream._id);

    return deleteStream
  } catch (error) {
    throw error

  }
}

export const createSubjectService = async (name: string, fullName: string) => {
  try {
    await IsSubjectName(name);
    const newSubject = new SubjectModel({ name, fullName });

    await newSubject.save();
    return newSubject;
  } catch (error) {
    throw error;
  }
};

export const updateSubjectService = async (id: string, name: string, fullName: string) => {
  try {
    const subject = await ISSubject(id);
    await IsSubjectName(name, id);

    const updatedSubject = await SubjectModel.findByIdAndUpdate(subject._id, { name, fullName }, { new: true });

    return updatedSubject
  } catch (error) {
    throw error

  }
}

export const deleteSubjectService = async (id: string) => {
  try {
    const subject = await ISSubject(id);
    await existSubjectInCourse(subject._id.toString())

    const deleteSubject = await SubjectModel.findByIdAndDelete(subject._id);


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
    await IsCourseName(name);
    await validateCourseSubjects(subjects);

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

    const course = await IsCourse(id);
    await IsCourseName(name, id);
    await validateCourseSubjects(subjects);

    const updatedCourse = await CourseModel.findByIdAndUpdate(course._id, { name, fullname, courseType, subjects }, { new: true })

    return updatedCourse

  } catch (error) {
    throw error
  }

}

export const deleteCourseService = async (id: string) => {
  try {

    const course = await IsCourse(id);
    await existCourseInUni(course._id.toString())

    const deleteCourse = await CourseModel.findByIdAndDelete(course._id);

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
  course: ObjectId[],

) => {
  try {

    await IsUniversityName(name);
    await validateUniversity(stream, course);


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

export const updateUniversityService = async (
  id: string,
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

    const university = await IsUniversity(id);

    await IsUniversityName(name, id);

    await validateUniversity(stream, course);

    const updatedUniversity = await UniversityModel.findByIdAndUpdate(university._id, {
      name,
      jobPlacement,
      scholarship,
      nearbyUniversity,
      transportation,
      accommodation,
      address,
      stream,
      course
    }, { new: true })

    return updatedUniversity
  } catch (error) {
    throw error;
  }
}

export const deleteUniversityService = async (id: string) => {
  try {
    const university = await IsUniversity(id);
    await existUniversityInEnrollcourse(university._id.toString())

    const deleteUniversity = await UniversityModel.findByIdAndDelete(university._id);

    return deleteUniversity
  } catch (error) {
    throw error

  }
}

type FeeCapPayload = {
  courseId: string;
  fee: number;
  capacity: number;
}

export const upsertFeeCapacitiesService = async (
  universityId: string,
  courseDetails: FeeCapPayload[]
) => {
  const updatedOrCreated = await Promise.all(
    courseDetails.map(async (detail) => {
      const existing = await FeeCapacityModel.findOne({
        universityId,
        courseId: detail.courseId,
      });

      if (existing) {
        existing.fee = detail.fee;
        existing.capacity = detail.capacity;
        return await existing.save();
      }

      const newEntry = new FeeCapacityModel({
        fee: detail.fee,
        capacity: detail.capacity,
        universityId: new mongoose.Types.ObjectId(universityId),
        courseId: new mongoose.Types.ObjectId(detail.courseId),
      });

      return await newEntry.save();
    })
  );
  await FeeCapacityModel.deleteMany({
    universityId,
    courseId: { $nin: courseDetails.map(d => d.courseId) },
  });

  return updatedOrCreated;
};

export const createFeeCapacityService = async (
  fee: number,
  capacity: number,
  universityId: ObjectId,
  courseId: ObjectId
) => {
  try {


    const courses = await IsCourse(courseId.toString());

    const university = await IsUniversity(universityId.toString());

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

    const newUserGroup = new UserGroupModel({ role, module_permission })
    await newUserGroup.save()

    return newUserGroup

  } catch (error) {
    throw error;
  }
}