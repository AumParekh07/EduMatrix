import type { FormikValues, FormikHelpers } from "formik";

import type {
    RegisterI, LoginI, SendOtpI, verifyOtpI,
    StdDetailI, StreamI, SubjectI, CourseI, UniversityI, FeeCapI
} from "./FormikValidation";
import { errorToast, successToast } from "./helperToast";
import { apiCall } from "../api/apiCaller";
// import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();

export async function RegisterHandleSubmit(
    values: FormikValues,
    { setSubmitting }: FormikHelpers<RegisterI>
) {
    console.log("Register form Data:", values);

    try {
        const response = await apiCall({
            method: "post",
            url: "/register",
            data: values,
        });

        console.log("Response from server:", response);
        successToast(response?.message || "Registration successful");

        setTimeout(() => {
            window.location.href = "/login";
        }, 1500);
    } catch (error: any) {
        errorToast(error?.message || "Registration failed");
        console.error("Error occurred while registering:", error);
    } finally {
        setTimeout(() => {
            setSubmitting(false);
        }, 500);
    }
}

export async function LoginHandleSubmit(
    values: FormikValues,
    { setSubmitting }: FormikHelpers<LoginI>
) {
    console.log("Login form Data:", values);

    try {
        const response = await apiCall({
            method: "post",
            url: "/login",
            data: values,
        });

        console.log("Response from server:", response);

        localStorage.setItem("token", response?.token);
        localStorage.setItem("role", response?.role);

        successToast(response?.message || "Login successful");

        setTimeout(() => {
            if (response?.role === "admin") {
                window.location.href = "/admin/stream";
            } else {
                if (response?.profileCompleted) {
                    window.location.href = "/university";
                } else {
                    window.location.href = "/std-detail";
                }
            }
        }, 1500);
    } catch (error: any) {
        errorToast(error?.message || "Login failed");
        console.error("Error occurred while Login:", error);
    } finally {
        setTimeout(() => {
            setSubmitting(false);
        }, 500);
    }
}

export async function SendOtpHandleSubmit(
    values: FormikValues,
    { setSubmitting }: FormikHelpers<SendOtpI>
) {
    const buttons = document.getElementById("button-container") as HTMLDivElement;
    const loader = document.getElementById("otp-loader");

    // Hide button, show loader
    if (buttons) buttons.style.display = "none";
    if (loader) loader.classList.remove("d-none");

    try {
        const response = await apiCall({
            method: "post",
            url: "/send-otp",
            data: values,
        });

        console.log("OTP sent:", response);
        successToast(response?.message || "OTP sent successfully");

        setTimeout(() => {
            localStorage.setItem("email", values.email);
            window.location.href = "/verify-otp";
        }, 1500);
    } catch (error: any) {
        console.error("Error sending OTP:", error);
        errorToast(error?.message || "Failed to send OTP");
    } finally {
        if (buttons) buttons.style.display = "flex";
        if (loader) loader.classList.add("d-none");
        setSubmitting(false);
    }
}

export async function VerifyOtpHandleSubmit(
    values: FormikValues,
    { setSubmitting }: FormikHelpers<verifyOtpI>
) {
    console.log("verify OTP form Data:", values);

    const email = localStorage.getItem("email");
    const payload = { email, otp: values.otp };
    try {
        const response = await apiCall({
            method: "post",
            url: "/verify-otp",
            data: payload,
        });

        console.log("Response from server:", response);

        localStorage.setItem("token", response?.token);
        localStorage.setItem("role", response?.role);
        localStorage.removeItem("email");

        successToast(response?.message || "OTP verified successfully");

        setTimeout(() => {
            if (response?.profileCompleted) {
                window.location.href = "/university";
            } else {
                window.location.href = "/std-detail";
            }
        }, 1500);
    } catch (error: any) {
        console.error("Error occurred while verifying OTP:", error);
        errorToast(error?.message || "OTP verification failed");
    } finally {

        setTimeout(() => {
            setSubmitting(false);
        }, 500);
    }
}

export function LogoutHandle() {

    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login';
}


export async function StdHandleSubmit(
    values: FormikValues,
    { setSubmitting }: FormikHelpers<StdDetailI>
) {
    console.log("std detail form Data:", values);

    try {
        const response = await apiCall({
            method: "post",
            url: "/student/std-detail",
            data: values,
        });

        console.log("Response from server:", response);
        successToast(response?.message || "Student details submitted");

        setTimeout(() => {
            window.location.href = "/university";
        }, 1500);
    } catch (error: any) {
        console.error("Error occurred while Updating Student Data:", error);
        errorToast(error?.message || "Failed to submit student details");
    } finally {
        setTimeout(() => {
            setSubmitting(false);
        }, 500);
    }
}

export function StreamHandleSubmit(
    values: FormikValues, formikHelpers: FormikHelpers<StreamI>
) {
    return genericHandleSubmit<StreamI>(values, formikHelpers, "/admin/create-stream");
}

export function SubjectHandleSubmit(
    values: FormikValues, formikHelpers: FormikHelpers<SubjectI>
) {
    return genericHandleSubmit<SubjectI>(values, formikHelpers, "/admin/create-subject");
}

export function CourseHandleSubmit(
    values: FormikValues, formikHelpers: FormikHelpers<CourseI>
) {
    return genericHandleSubmit<CourseI>(values, formikHelpers, "/admin/create-course");
}

export function UniversityHandleSubmit(
    values: FormikValues, formikHelpers: FormikHelpers<UniversityI>
) {
    return genericHandleSubmit<UniversityI>(values, formikHelpers, "/admin/create-university");
}

export function FeeCapHandleSubmit(
    values: FormikValues, formikHelpers: FormikHelpers<FeeCapI>
) {
    return genericHandleSubmit<FeeCapI>(values, formikHelpers, "/admin/create-feecapacity");
}


export async function genericHandleSubmit<T>(
    values: FormikValues,
    formikHelpers: FormikHelpers<T>,
    endpoint: string
) {
    const { setSubmitting } = formikHelpers;

    console.log(`Form data for ${endpoint}:`, values);

    try {
        const response = await apiCall({
            method: "post",
            url: `${endpoint}`,
            data: values
        })

        console.log("Response from server:", response);
        successToast(response?.message);
    } catch (error: any) {
        console.error(`Error occurred while submitting to ${endpoint}:`, error);
        errorToast(error.response?.data?.message || "Something went wrong");
    } finally {
        setTimeout(() => {
            setSubmitting(false);
        }, 500);
    }
}

