import { Link } from "react-router-dom";
import { Form, Formik } from "formik";

import { StreamInitialValues, streamSchema } from "../../helper/FormikValidation";
import { SubmitButton } from "../../components/helperComponents";
import { StreamHandleSubmit } from "../../helper/SubmitHendle";
import StreamFormFields from "../../components/FormFields/streamFormFields";

export const CreateStream = () => {
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100" >
            {/* style={{ height: "calc(100vh - 57.6px)" }}> */}
            <div className=" card shadow-lg p-4 w-100 rounded-4 " data-aos="fade-in" style={{ maxWidth: "350px" }}>
                <h2 className="text-center mb-4 fw-bold text-primary">Create Stream</h2>
                <Formik initialValues={StreamInitialValues}
                    validationSchema={streamSchema}
                    onSubmit={StreamHandleSubmit}>
                    <Form id="StreamForm">
                        <StreamFormFields />
                        <SubmitButton title="Create" />
                        <Link to="/admin/stream" className="btn btn-outline-primary m-2 fw-semibold shadow-sm">
                            View Stream
                        </Link>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};
