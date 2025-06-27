import { Link } from "react-router-dom";
import { Form, Formik } from "formik";

import { FeeCapInitialValues, FeeCapSchema } from "../../helper/FormikValidation";
import { InputFiled1, SubmitButton } from "../../components/helperComponents";
import { FeeCapHandleSubmit } from "../../helper/SubmitHendle";

export const CreateFeeCapacity = () => {
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            {/* style={{ height: "calc(100vh - 57.6px)" }}> */}
            <div className=" card shadow-lg p-4 w-100 rounded-4 " style={{ maxWidth: "350px" }}>
                <h2 className="text-center mb-4 fw-bold text-primary">Fee & Capacity</h2>
                <Formik initialValues={FeeCapInitialValues}
                    validationSchema={FeeCapSchema}
                    onSubmit={FeeCapHandleSubmit}>
                    <Form id="StreamForm">
                        <InputFiled1 title="Fee" type="number" id="fee" placeholder="Enter Fee" />
                        <InputFiled1 title="Student Capacity" type="number" id="capacity" placeholder="Enter Capacity" />

                        <SubmitButton title="Create" />
                        <Link to="/admin/course" className="btn btn-outline-primary m-2 fw-semibold shadow-sm">
                            View Course
                        </Link>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};
