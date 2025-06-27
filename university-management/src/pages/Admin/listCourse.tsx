import { useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";

import FetchCardList from "../../components/commonCard";
import ConfirmDeleteToast from "../../components/deleteToast";
import EditModal from "../../components/editModal";
import { CourseSchema } from "../../helper/FormikValidation";
import { token } from "../../components/RoleBasedRoute";
import CourseFormFields from "../../components/courseFromFields";
import type { FormikValues } from "formik";
import { apiCall } from "../../api/apiCaller";
import { successToast, errorToast } from "../../helper/helperToast";

type Subject = {
    _id: string;
    name: string;
    fullName: string;
};

type Option = {
    value: string;
    label: string;
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
    const [showModal, setShowModal] = useState(false);
    const [reload, setReload] = useState(false);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const triggerRefetch = () => setReload((prev) => !prev);

    async function handleEdit(values: FormikValues) {
        try {
            const respons = await apiCall({
                method: "put",
                url: `/admin/update-course/${selectedCourse?._id}`,
                data: values
            })
            successToast(respons?.message)
        } catch (error: any) {
            errorToast(error || "Failed to fetch data");
        }
        triggerRefetch();
        setShowModal(false);
    };

    const subjectOptions: Option[] = subjects.map((sub) => ({
        label: `${sub.fullName} (${sub.name})`,
        value: sub._id,
    }));

    async function fetchSubjects() {
        try {
            const res = await axios.get('http://localhost:3000/api/v1/admin/get-subjects', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setSubjects(res.data.data);
        } catch (err) {
            console.error("Failed to fetch subjects", err);
        }
    };

    // useEffect(() => {
    //     fetchSubjects();
    // }, []);

    return (
        <>


            <FetchCardList<Course>
                key={reload ? "reload-1" : "reload-0"}
                title="All Courses"
                addLabel="Course"
                addPath="/admin/create-course"
                apiEndPoint="get-courses"
                totalLabel="Total Course"
                renderItem={(course, refetch) => (
                    <div key={course._id} className="col-lg-5 m-3">
                        <div className="card shadow h-100" style={{ backgroundColor: "#e4eaf2" }}>
                            <div className="card-body">
                                <div className="card-title justify-content-between d-flex">
                                    <h5>{course.fullname} ({course.name})</h5>
                                    <div>
                                        <Pencil className="btn p-0 me-2"
                                            onClick={async () => {
                                                setSelectedCourse(course);
                                                setShowModal(true);
                                                fetchSubjects();
                                            }} />
                                        <Trash2 className="btn p-0"
                                            onClick={() => ConfirmDeleteToast({
                                                name: course.name,
                                                apiPath: `delete-course/${course._id}`,
                                                toastId: 'delete course',
                                                refetch,
                                            })} />
                                    </div>
                                </div>
                                <p className="text-muted">Type: {course.courseType}</p>

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
                    </div>
                )}
            />

            {selectedCourse && (
                <EditModal
                    title="Edit Course"
                    show={showModal}
                    onHide={() => {
                        setSelectedCourse(null);
                        setShowModal(false);
                    }}
                    initialValues={{
                        name: selectedCourse.name,
                        fullname: selectedCourse.fullname,
                        courseType: selectedCourse.courseType,
                        subjects: {
                            compulsory: selectedCourse.subjects.compulsory.map((s) => s._id),
                            optional: selectedCourse.subjects.optional.map((s) => s._id),
                        },
                    }}
                    validationSchema={CourseSchema}
                    onSubmit={handleEdit}
                    size="lg"
                >
                    {({ values, setFieldValue }) => (
                        <CourseFormFields
                            subjectOptions={subjectOptions}
                            values={values}
                            setFieldValue={setFieldValue}
                        />
                    )}
                </EditModal>
            )}
        </>
    );
}
