import { Link } from "react-router-dom";
import { Form, Formik } from "formik";

import { CourseInitialValues, CourseSchema } from "../../helper/FormikValidation";
import { SubmitButton } from "../../components/helperComponents";
import { CourseHandleSubmit } from "../../helper/SubmitHandle";
import CourseFormFields from "../../components/FormFields/courseFormFields";

export const CreateCourse = () => {

    return (
        <div className="container-fluid pt-5 d-flex justify-content-center align-items-center vh-100 ">
            <div className="card shadow-lg p-4 w-100 rounded-4 fadeIn-animation" style={{ maxWidth: "750px", minWidth: "300px" }}>
                <h2 className="text-center mb-4 fw-bold text-primary">Create Course</h2>
                <Formik
                    initialValues={CourseInitialValues}
                    validationSchema={CourseSchema}
                    onSubmit={CourseHandleSubmit}
                >
                    {({ values, setFieldValue }) => {
                        return (
                            <Form id="CourseForm">
                                <CourseFormFields
                                    values={values}
                                    setFieldValue={setFieldValue} />
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