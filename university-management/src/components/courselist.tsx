import { Pencil, Trash2 } from "lucide-react";
import type { Course } from "../pages/Admin/listCourse";

type CourselistProps = Course & {
    setSelectedCourse: React.Dispatch<React.SetStateAction<Course | null>>;
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function Courselist({
    setSelectedCourse,
    setShowEditModal,
    setShowDeleteModal,
    ...course
}: CourselistProps) {
    return (
        <div key={course._id} className="col-lg-5 m-3" data-aos="fade-up">
            <div className="card cardbg rounded-4 shadow-sm hoverShadowMd h-auto">
                <div className="card-body">
                    <div className="card-title justify-content-between d-flex">
                        <h5>{course.fullname} ({course.name})</h5>
                        <div>
                            <Pencil className="btn p-0 me-2"
                                onClick={async () => {
                                    setSelectedCourse(course);
                                    setShowEditModal(true);
                                }} />
                            <Trash2 className="btn p-0"
                                onClick={() => {
                                    setSelectedCourse(course);
                                    setShowDeleteModal(true)
                                }} />
                        </div>
                    </div>

                    <p className="fw-medium">
                        🎯 Course Type: <span className={`badge ${course.courseType === "FullTime" ? "bg-primary" : course.courseType === "PartTime" ? "bg-info" : "bg-secondary"}`}>
                            {course.courseType}
                        </span></p>

                    <div className="row">
                        <div className="col">
                            <h6>📘 Compulsory Subjects</h6>
                            <ul>
                                {course.subjects.compulsory.map((subject) => (
                                    <li key={subject._id}>
                                        <strong>{subject.name}</strong> : {subject.fullName}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col">
                            <h6>📗 Optional Subjects</h6>
                            <ul>
                                {course.subjects.optional.map((subject) => (
                                    <li key={subject._id}>
                                        <strong>{subject.name}</strong> : {subject.fullName}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Courselist;