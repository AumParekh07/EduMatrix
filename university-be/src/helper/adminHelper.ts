import { ObjectId } from "mongoose";
import CourseModel, { Subject } from "../models/course";
import StreamModel from "../models/stream";
import SubjectModel from "../models/subject";
import UniversityModel from "../models/university";

export const IsStream = async (id: string) => {
    const Stream = await StreamModel.findById(id)
    if (!Stream) throw new Error("Stream Not Found");
    return Stream;
}

export const IsStreamName = async (name: string, id?: string) => {
    const Stream = await StreamModel.findOne({ name });
    if (Stream && id != Stream.id) throw new Error("Stream Name Already Exists");
}

export const ISSubject = async (id: string) => {
    const subject = await SubjectModel.findById(id);
    if (!subject) throw new Error("Subject Not Found");
    return subject;
}

export const IsSubjectName = async (name: string, id?: string) => {
    const subject = await SubjectModel.findOne({ name });
    if (subject && id != subject.id) throw new Error("Subject Name Already Exists");

}

export const IsCourse = async (id: string) => {
    const course = await CourseModel.findById(id);
    if (!course) throw new Error("Course Not Found");
    return course;
}

export const IsCourseName = async (name: string, id?: string) => {
    const course = await CourseModel.findOne({ name });
    if (course && id != course.id) throw new Error("Course Name Already Exists");

}

export const validateCourseSubjects = async (subjects: Subject) => {

    const compulsorySubjects = await SubjectModel.find({ _id: { $in: subjects.compulsory } });
    if (compulsorySubjects.length !== subjects.compulsory.length) {
        throw new Error("In Compulsory Subjects, one or more subjects not found");
    }

    const optionalSubjects = await SubjectModel.find({ _id: { $in: subjects.optional } });
    if (optionalSubjects.length !== subjects.optional.length) {
        throw new Error("In Optional Subjects, one or more subjects not found");
    }
};

export const validateUniversity = async (stream: ObjectId[], course: ObjectId[]) => {

    const Streams = await StreamModel.find({ _id: { $in: stream } });
    if (Streams.length !== stream.length) {
        throw new Error("One or more streams not found");
    }

    const Courses = await CourseModel.find({ _id: { $in: course } });
    if (Courses.length !== course.length) {
        throw new Error("One or more courses not found");
    }
}

export const IsUniversity = async (id: string) => {
    const university = await UniversityModel.findById(id);
    if (!university) throw new Error("University Not Found");
    return university;
}
export const IsUniversityName = async (name: string, id?: string) => {

    const university = await UniversityModel.findOne({ name });
    if (university && id != university.id) throw new Error("University Name Already Exists");

}