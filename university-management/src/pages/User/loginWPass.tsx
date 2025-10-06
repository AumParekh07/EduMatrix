import { Link } from "react-router-dom"
import { Form, Formik } from "formik"

import { SubmitButton, InputFiled1 } from "../../components/helperComponents"
import { LoginInitialValues, LoginSchema } from "../../helper/FormikValidation";
import { LoginHandleSubmit } from "../../helper/SubmitHendle";
import { useNavigate } from "react-router-dom";

export function Login() {
    const navigate = useNavigate();

    return (
        <div className="container d-flex justify-content-center align-items-center flip-animation "
            style={{ height: "calc(100vh - 72px)" }}>
            <div className="card shadow-lg p-4 w-100 rounded-4" style={{ maxWidth: "350px" }} >
                <h2 className="text-center mb-4 fw-bold text-primary" >Login</h2>
                <Formik
                    initialValues={LoginInitialValues}
                    validationSchema={LoginSchema}
                    onSubmit={(...arg) => LoginHandleSubmit(...arg, navigate)}
                >
                    <Form id="LoginForm">
                        <InputFiled1 title="Email" type="email" id="email" placeholder="Enter Your Email" />
                        <InputFiled1 title="Password" type="password" id="password" placeholder="Enter Password" />
                        <SubmitButton title="Login" />
                        <Link to="/send-otp" className="btn btn-outline-primary fw-semibold shadow-sm align-items-center rounded4 m-2">Login With Otp</Link>

                    </Form>

                </Formik>
                <p className="text-center mt-3 mb-0">
                    Don't Have An Account?{" "}
                    <Link to="/register" className="fw-semibold">Register Here</Link>
                </p>
            </div>
        </div >
    )
}