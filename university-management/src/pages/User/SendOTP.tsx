import { Link, useNavigate } from "react-router-dom"
import { Form, Formik } from "formik"


import { InputField, SubmitButton } from "../../components/helperComponents"
import { sendOptSchema, SendOtpInitialValues } from "../../helper/FormikValidation";
import { SendOtpHandleSubmit } from "../../helper/SubmitHendle";

export function SendOtp() {
    const navigate = useNavigate();

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100 flip-animation">

            <div className=" card shadow-lg p-4 w-100 rounded-4" style={{ maxWidth: "350px" }} >

                <h2 className="text-center mb-4 fw-bold text-primary ">
                    Login
                </h2>

                <Formik
                    initialValues={SendOtpInitialValues}
                    validationSchema={sendOptSchema}
                    onSubmit={(...arg) => SendOtpHandleSubmit(...arg, navigate)}>

                    <Form id="SendOtpForm">
                        <InputField title="Email" type="email" id="email" placeholder="Enter Your Email" />

                        <div className="text-center mt-3" id="button-container">
                            <SubmitButton title="Send OTP" />
                            <Link to="/login" className="btn btn-outline-primary align-items-center fw-semibold shadow-sm m-2">Login With Password</Link>
                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="loader d-none " id="otp-loader"></div>
                        </div>
                    </Form>
                </Formik>
                <p className="m-1 mb-0">Don't Have An Account?{" "}
                    <Link to="/register" className="fw-semibold">Register Here</Link></p>
            </div>
        </div>
    )
}