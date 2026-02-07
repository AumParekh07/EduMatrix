import { Link } from "react-router-dom"
import { Form, Formik } from "formik"

import { SubjectInitialValues, subjectSchema } from "../../helper/FormikValidation";
import { SubmitButton } from "../../components/helperComponents";
import { SubjectHandleSubmit } from "../../helper/SubmitHandle";
import SubjectFormFields from "../../components/FormFields/subjectFormFields";

export const CreateSubject = () => {
    return (
        <div className="container-fluid  d-flex justify-content-center align-items-center vh-100 ">
            <div className=" card shadow-lg p-4 w-100 rounded-4 fadeIn-animation" style={{ maxWidth: "350px", minWidth: "300px" }} >

                <h2 className="text-center mb-4 fw-bold text-primary">Create Subject</h2>
                <Formik
                    initialValues={SubjectInitialValues}
                    validationSchema={subjectSchema}
                    onSubmit={SubjectHandleSubmit}
                >
                    <Form id="SubjectForm">

                        <SubjectFormFields />

                        <SubmitButton title="Create" />
                        <Link to="/admin/subject" className="btn btn-outline-primary m-2 fw-semibold shadow-sm">View Subject</Link>
                    </Form>

                </Formik>
            </div>
        </div>
    )
};