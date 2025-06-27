import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";

import { CourseInitialValues, CourseSchema } from "../../helper/FormikValidation";
import { LoadingComponent, ErrorComponent, SubmitButton } from "../../components/helperComponents";
import { CourseHandleSubmit } from "../../helper/SubmitHendle";
import { token } from "../../components/RoleBasedRoute";
import type { Subject } from "./listSubject";
import CourseFormFields from "../../components/courseFromFields";

export type Option = {
    value: string;
    label: string;
};

export const CreateCourse = () => {
    const [subject, setSubject] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchData = async () => {
        setLoading(true);
        try {
            await axios.get("http://localhost:3000/api/v1/admin/get-subjects", {
                headers: { Authorization: `Bearer ${token}` },
            }).then((response) => {
                setSubject(response.data.data);
            }).catch((err) => {
                setError(err.response?.data?.message || err.message);
            }).finally(() => {
                setLoading(false);
            });
        } catch (err) {
            console.error(err)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <LoadingComponent />;
    if (error) return <ErrorComponent error={error} />;

    const subjectOptions: Option[] = subject.map((sub) => ({
        label: `${sub.fullName} (${sub.name})`,
        value: sub._id,
    }));


    return (
        <div className="container-fluid pt-5 d-flex justify-content-center align-items-center vh-100 ">
            <div className="card shadow-lg p-4 w-100 rounded-4" style={{ maxWidth: "750px" }}>
                <h2 className="text-center mb-4 fw-bold text-primary">Create Course</h2>
                <Formik
                    initialValues={CourseInitialValues}
                    validationSchema={CourseSchema}
                    onSubmit={CourseHandleSubmit}
                >
                    {({ values, setFieldValue }) => {
                        // const compulsorySelected = subjectOptions.filter(opt =>
                        //     values.subjects.compulsory.includes(opt.value)
                        // );
                        // const optionalSelected = subjectOptions.filter(opt =>
                        //     values.subjects.optional.includes(opt.value)
                        // );

                        return (
                            <Form id="CourseForm">
                                <CourseFormFields
                                    subjectOptions={subjectOptions}
                                    values={values}
                                    setFieldValue={setFieldValue}
                                />
                                <SubmitButton title="Create" />
                                <Link to="/admin/course" className="btn btn-outline-primary m-2 fw-semibold shadow-sm">View Course</Link>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};
