import { ObjectId } from "mongoose";
import CourseModel, { Subject } from "../models/course";
import StreamModel from "../models/stream";
import SubjectModel from "../models/subject";
import UniversityModel from "../models/university";
import EnrollCourseModel from "../models/enrollCourse";

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

export const existSubjectInCourse = async (id: string) => {
    const existSub_Course = await CourseModel.findOne({
        $or: [
            { "subjects.compulsory": id },
            { "subjects.optional": id }
        ]
    });
    if (existSub_Course) throw new Error(`This subject cannot be deleted! Subject is used in Course: ${existSub_Course.name}.`);
}

export const existCourseInUni = async (id: string) => {
    const existCourse_Uni = await UniversityModel.findOne({ course: id });
    if (existCourse_Uni) throw new Error(`This course cannot be deleted! Course is used in University: ${existCourse_Uni.name}.`);
}

export const existStreamInUni = async (id: string) => {
    const existStream_Uni = await UniversityModel.findOne({ stream: id });
    if (existStream_Uni) throw new Error(`This Stream cannot be deleted! Stream is used in University: ${existStream_Uni.name}.`);
}

export const existUniversityInEnrollcourse = async (id: string) => {
    const existUni_Enrollcourse = await EnrollCourseModel.findOne({ universityID: id });
    if (existUni_Enrollcourse) throw new Error(`This university cannot be deleted! Student Enroll in this University's Course.`);
}