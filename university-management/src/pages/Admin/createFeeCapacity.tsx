import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";

import { FeeCapInitialValues, FeeCapSchema } from "../../helper/FormikValidation";
import { ErrorComponent, SubmitButton } from "../../components/helperComponents";
import { FeeCapHandleSubmit } from "../../helper/SubmitHendle";
import FeeCapacityFields from "../../components/FormFields/feeCapacityFields";
import { useEffect, useState } from "react";
import { errorToast } from "../../helper/helperToast";

export const CreateFeeCapacity = () => {
    const [error, setError] = useState("");
    const { state } = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (!state) {
            errorToast("Invalid Navigation. Going back to University.");
            setError("Invalid Navigation. Going back to University.");
            // navigate("/university");
        }
    }, [state, navigate]);

    if (!state) return <ErrorComponent error={error} />;

    const { university } = state;
    console.log("Location state:", state);

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            {/* style={{ height: "calc(100vh - 57.6px)" }}> */}
            <div className=" card shadow-lg p-4 w-100 rounded-4 " style={{ maxWidth: "350px" }}>
                <h2 className="text-center mb-4 fw-bold text-primary">Fee & Capacity</h2>
                <p>university here {university?.name}{university?._id}</p>
                <Formik initialValues={FeeCapInitialValues}
                    validationSchema={FeeCapSchema}
                    onSubmit={FeeCapHandleSubmit}>
                    <Form id="StreamForm">
                        <FeeCapacityFields />

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
