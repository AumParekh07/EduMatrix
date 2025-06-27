import { Form, Formik } from "formik"


import { SubmitButton, InputFiled1 } from "../../components/helperComponents"
import { verifyOtpInitialValues, verifyOtpSchema } from "../../helper/FormikValidation";
import { VerifyOtpHandleSubmit } from "../../helper/SubmitHendle";

export function VerifyOtp() {
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className=" card shadow-lg p-4 w-75 rounded-4" style={{ maxWidth: "350px" }} >
                <h2 className="text-center mb-4 fw-bold text-primary">Verify Your OTP</h2>
                <Formik
                    initialValues={verifyOtpInitialValues}
                    validationSchema={verifyOtpSchema}
                    onSubmit={VerifyOtpHandleSubmit}
                >
                    <Form id="LoginForm">
                        {/* <InputFiled1 title="Email" type="email" id="email" placeholder="Enter Your Email" /> */}
                        <InputFiled1 title="OTP" type="string" id="otp" placeholder="Enter Your OTP" />
                        <SubmitButton title="Verify OTP" />
                    </Form>
                </Formik>
            </div>
        </div>
    )
}