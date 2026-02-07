import { Form, Formik } from "formik";

import { SubmitButton } from "../../components/helperComponents";
import { StdDetailInitialValues, StdSchema, type StdDetailI } from "../../helper/FormikValidation";
import { StdHandleSubmit } from "../../helper/SubmitHandle";
import { useNavigate } from "react-router-dom";
import StudentFormFields from "../../components/FormFields/studentFormFields";

export function StdDetail({ initialValues = StdDetailInitialValues }: { initialValues?: StdDetailI }) {
    const navigate = useNavigate();
    return (
        <div className=" container  p-4  d-flex justify-content-center align-items-center" >
            <div className=" card  rounded-5 shadow-lg p-4 w-100 " style={{ maxWidth: "850px", }} >
                <h2 className="text-center  mb-4 fw-bold text-primary" >Student Details</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={StdSchema}
                    onSubmit={(...arg) => StdHandleSubmit(...arg, navigate)}
                >
                    <Form id="stdDetailForm">
                        <StudentFormFields />
                        <SubmitButton title="Update" />
                    </Form>
                </Formik>
            </div>
        </div>
    )
}