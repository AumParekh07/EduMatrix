import { useState } from "react";
import FetchCardList from "../../components/commonCard";
import EditModal from "../../components/editModal";
import { CourseSchema } from "../../helper/FormikValidation";
import CourseFormFields from "../../components/FormFields/courseFormFields";
import DeleteModal from "../../components/deletModal";
import Courselist from "../../components/courselist";

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
                renderItem={(course) => {
                    return (
                        <Courselist {...course}
                            key={course._id}
                            setSelectedCourse={setSelectedCourse}
                            setShowEditModal={setShowEditModal}
                            setShowDeleteModal={setShowDeleteModal} />
                    )
                }
                }
            />

            {selectedCourse && (
                <>
                    <EditModal
                        title="Edit Course"
                        apiPath={`v1/admin/update-course/${selectedCourse?._id}`}
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