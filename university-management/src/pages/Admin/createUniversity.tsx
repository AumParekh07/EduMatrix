import { Link } from "react-router-dom"
import { Form, Formik } from "formik"
import { UniversityInitialValues, UniversitySchema } from "../../helper/FormikValidation";
import { SubmitButton } from "../../components/helperComponents";
import { UniversityHandleSubmit } from "../../helper/SubmitHandle";
import UniversityFormFields from "../../components/FormFields/universityFormFields";

export const CreateUniversity = () => {
    return (
        <div className="container-fluid pt-5 d-flex justify-content-center align-items-center">
            <div className=" card shadow-lg p-4 w-100 rounded-4 fadeIn-animation" style={{ maxWidth: "750px", minWidth: "300px" }} >

                <h2 className="text-center mb-4 fw-bold text-primary">Create University</h2>
                <Formik
                    initialValues={UniversityInitialValues}
                    validationSchema={UniversitySchema}
                    onSubmit={UniversityHandleSubmit}
                >
                    {({ values, setFieldValue }) => (
                        <Form id="UniversityForm">
                            <UniversityFormFields
                                values={values}
                                setFieldValue={setFieldValue}
                            />
                            <SubmitButton title="Create" />
                            <Link to="/admin/university" className="btn btn-outline-primary m-2 fw-semibold shadow-sm">View University</Link>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
};