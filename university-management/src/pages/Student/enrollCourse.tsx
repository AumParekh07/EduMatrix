import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { LoadingComponent, ErrorComponent, BackButton } from "../../components/helperComponents";
import { errorToast, successToast } from "../../helper/helperToast";
import { apiCall } from "../../api/apiCaller";
import { EnrollCourseinitialValues, EnrollCourseSchema, type EnrollCourseI } from "../../helper/FormikValidation";
import type { Subject } from "../Admin/listSubject";

export function EnrollCourse() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Handle invalid route access
    useEffect(() => {
        if (!state) {
            errorToast("Invalid Navigation. Going back to University.");
            setError("Invalid Navigation. Going back to University.");
            navigate("/university");
        }
    }, [state, navigate]);

    if (!state) return <ErrorComponent error={error} />;

    const { course, universityID } = state;


    const handleSubmit = async (values: EnrollCourseI) => {
        try {
            setLoading(true);
            setError("");

            const payload = {
                universityID,
                courseID: course._id,
                optionalSubjectID: values.optionalSubjectID,
            };

            const response = await apiCall({
                method: "post",
                url: "/student/enroll-course",
                data: payload,
            });

            if (response.success) {
                successToast("Successfully enrolled in the course!");
                navigate("/dashboard");
            } else {
                const msg = response.data.message || "Failed to enroll.";
                errorToast(msg);
                setError(msg);
            }
        } catch (err: any) {
            console.error("Enroll Error:", err);
            const msg = err || "Error occurred during enrollment.";
            errorToast(msg);
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingComponent />;
    if (error) return <ErrorComponent error={error} />;

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: "calc(100vh - 57.6px)" }}>
            <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "850px" }}>
                <h2 className="text-center card-header mb-4">Enroll Course</h2>
                <h2>Enroll in {course.fullname}</h2>
                <p><strong>Course Code:</strong> {course.name}</p>
                <p><strong>Type:</strong> {course.courseType}</p>

                <div>
                    <h5>📘 Compulsory Subjects</h5>
                    <ul>
                        {course.subjects.compulsory.map((sub: Subject) => (
                            <li key={sub._id}>{sub.fullName} ({sub.name})</li>
                        ))}
                    </ul>
                </div>

                <Formik
                    initialValues={EnrollCourseinitialValues}
                    validationSchema={EnrollCourseSchema}
                    onSubmit={handleSubmit}>
                    <Form>
                        <div>
                            <h5>📗 Optional Subjects</h5>
                            {course.subjects.optional.map((sub: Subject) => (
                                <div className="container" key={sub._id}>
                                    <label>
                                        <Field
                                            type="checkbox"
                                            name="optionalSubjectID"
                                            value={sub._id}
                                        />
                                        {sub.fullName} ({sub.name})
                                    </label>
                                </div>
                            ))}
                            <ErrorMessage name="optionalSubjectID" component="div" className="text-danger small" />
                            <p className="m-0 text-muted">Need to select at least one subject.</p>
                        </div>

                        <div className="d-flex justify-content-between">
                            <BackButton />
                            <button type="submit" className="btn btn-primary m-2 fw-semibold shadow-sm">
                                Enroll
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}
