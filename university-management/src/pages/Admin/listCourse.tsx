import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import FetchCardList from "../../components/commonCard";
import EditModal from "../../components/editModal";
import { CourseSchema } from "../../helper/FormikValidation";
import CourseFormFields from "../../components/FormFields/courseFormFields";
import DeleteModal from "../../components/deletModal";

type Subject = {
    _id: string;
    name: string;
    fullName: string;
};


export type Course = {
    _id: string;
    name: string;
    fullname: string;
    courseType: string;
    subjects: {
        compulsory: Subject[];
        optional: Subject[];
    };
};

export function AdminCourses() {
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [reload, setReload] = useState(false);

    return (
        <>
            <FetchCardList<Course>
                key={reload ? "reload-1" : "reload-0"}
                title="All Courses"
                addLabel="Course"
                addPath="/admin/create-course"
                apiEndPoint="get-courses"
                totalLabel="Total Course"
                renderItem={(course) => (
                    <div key={course._id} className="col-lg-5 m-3">
                        <div className="card cardbg rounded-4 shadow-sm shadow1 h-100">
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
            />

            {
                selectedCourse && (
                    <>
                        <EditModal
                            title="Edit Course"
                            apiPath={`/admin/update-course/${selectedCourse?._id}`}
                            show={showEditModal}
                            initialValues={{
                                name: selectedCourse.name,
                                fullname: selectedCourse.fullname,
                                courseType: selectedCourse.courseType,
                                subjects: {
                                    compulsory: selectedCourse.subjects.compulsory.map((sub) => sub._id),
                                    optional: selectedCourse.subjects.optional.map((sub) => sub._id),
                                },
                            }}
                            validationSchema={CourseSchema}
                            size="lg"
                            onHide={() => setShowEditModal(false)}
                            reload={() => setReload((prev) => !prev)}
                        >
                            {({ values, setFieldValue }) => (
                                <CourseFormFields
                                    values={values}
                                    setFieldValue={setFieldValue} />
                            )}
                        </EditModal>

                        <DeleteModal
                            title="Delete Course"
                            name={selectedCourse.name}
                            apiPath={`delete-course/${selectedCourse._id}`}
                            show={showDeleteModal}
                            onHide={() => setShowDeleteModal(false)}
                            reload={() => setReload((prev) => !prev)}
                        />
                    </>

                )
            }
        </>
    );
}
