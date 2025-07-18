import { Link, useNavigate } from "react-router-dom"
import { Form, Formik } from "formik";


import { RegisterSchema, RegisterInitialValues } from '../../helper/FormikValidation';
import { InputFiled1, SubmitButton } from '../../components/helperComponents';
import { RegisterHandleSubmit } from "../../helper/SubmitHendle";

export function Register() {
    const navigate = useNavigate();

    return (
        <div className="container d-flex justify-content-center align-items-center"
            style={{ height: "calc(100vh - 57.6px)" }}>

            <div className="card shadow-lg p-4 w-100 rounded-4" style={{ maxWidth: "350px", }} >
                <h2 className="text-center mb-4 fw-bold text-primary">Create Account</h2>
                <Formik
                    initialValues={RegisterInitialValues}
                    validationSchema={RegisterSchema}
                    onSubmit={(...arg) => RegisterHandleSubmit(...arg, navigate)}
                >
                    <Form id="registerForm">
                        <InputFiled1 title="Full Name" type="text" id="name" placeholder="Enter your full name" />
                        <InputFiled1 title="User Name" type="text" id="username" placeholder="Choose a username" />
                        <InputFiled1 title="Email" type="email" id="email" placeholder="Enter your email address" />
                        <InputFiled1 title="Password" type="password" id="password" placeholder="Create a strong password" />

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