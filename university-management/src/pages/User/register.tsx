import { Link, useNavigate } from "react-router-dom"
import { Form, Formik } from "formik";

import { RegisterSchema, RegisterInitialValues } from '../../helper/FormikValidation';
import { InputField, PassField, SubmitButton } from '../../components/helperComponents';
import { RegisterHandleSubmit } from "../../helper/SubmitHandle";

export function Register() {
    const navigate = useNavigate();

    return (
        <div className="container d-flex justify-content-center align-items-center flip-animation"
            style={{ height: "calc(100vh - 72px)" }}>

            <div className="card shadow-lg p-4 w-100 rounded-4" style={{ maxWidth: "350px", }} >
                <h2 className="text-center mb-4 fw-bold text-primary">Create Account</h2>
                <Formik
                    initialValues={RegisterInitialValues}
                    validationSchema={RegisterSchema}
                    onSubmit={(...arg) => RegisterHandleSubmit(...arg, navigate)}
                >
                    <Form id="registerForm">
                        <InputField title="Full Name" type="text" id="name" placeholder="Enter your full name" />
                        <InputField title="User Name" type="text" id="username" placeholder="Choose a username" />
                        <InputField title="Email" type="email" id="email" placeholder="Enter your email address" />
                        <PassField title="Password" id="password" placeholder="Create a strong password" />
                        <PassField title="confirm Password" id="confirmPassword" placeholder="Confirm your password" />
                        <SubmitButton title="Register" />
                    </Form>
                </Formik>

                <p className="text-center mt-3 mb-0">
                    Already have an account?{" "}
                    <Link to="/login" className=" fw-semibold">Login here</Link>
                </p>
            </div>
        </div>
    );
}