import type { FormikValues, FormikHelpers } from "formik";

import type {
    RegisterI, LoginI, SendOtpI, verifyOtpI,
    StdDetailI, StreamI, SubjectI, CourseI, UniversityI,
} from "./FormikValidation";
import { errorToast, successToast } from "./helperToast";
import { apiCall } from "../api/apiCaller";

export async function RegisterHandleSubmit(
    values: FormikValues,
    { setSubmitting }: FormikHelpers<RegisterI>,
    navigate: (url: string) => void

) {

    try {
        const response = await apiCall({
            method: "post",
            url: "v1/register",
            data: values,
        });

        successToast(response?.message || "Registration successful");
        navigate("/login");

    } catch (error: any) {
        errorToast(error || "Registration failed");
        console.error("Error occurred while registering:", error);
    } finally {
        setTimeout(() => {
            setSubmitting(false);
        }, 500);
    }
}

export async function LoginHandleSubmit(
    values: FormikValues,
    { setSubmitting }: FormikHelpers<LoginI>,
    navigate: (url: string) => void

) {

    try {
        const response = await apiCall({
            method: "post",
            url: "v1/login",
            data: values,
        });

        localStorage.setItem("token", response?.token);
        localStorage.setItem("role", response?.role);

        successToast(response?.message || "Login successful");


        if (response?.role === "admin") {
            navigate("/admin/university")
        } else {
            if (response?.profileCompleted) {
                navigate("/university");
            } else {
                navigate("/std-detail");
            }
        }
    } catch (error: any) {
        errorToast(error || "Login failed");
        console.error("Error occurred while Login:", error);
    } finally {
        setTimeout(() => {
            setSubmitting(false);
        }, 500);
    }
}

export async function SendOtpHandleSubmit(
    values: FormikValues,
    { setSubmitting }: FormikHelpers<SendOtpI>,
    navigate: (url: string) => void

) {
    const buttons = document.getElementById("button-container") as HTMLDivElement;
    const loader = document.getElementById("otp-loader");

    // Hide button, show loader
    if (buttons) buttons.style.display = "none";
    if (loader) loader.classList.remove("d-none");

    try {
        const response = await apiCall({
            method: "post",
            url: "v1/send-otp",
            data: values,
        });

        successToast(response?.message || "OTP sent successfully! Check in your spam also");

        localStorage.setItem("email", values.email);
        navigate("/verify-otp");
    } catch (error: any) {
        console.error("Error sending OTP:", error);
        errorToast(error || "Failed to send OTP");
    } finally {
        if (buttons) buttons.style.display = "flex";
        if (loader) loader.classList.add("d-none");
        setSubmitting(false);
    }
}

export async function VerifyOtpHandleSubmit(
    values: FormikValues,
    { setSubmitting }: FormikHelpers<verifyOtpI>,
    navigate: (url: string) => void
) {

    const email = localStorage.getItem("email");
    const payload = { email, otp: values.otp };
    try {
        const response = await apiCall({
            method: "post",
            url: "v1/verify-otp",
            data: payload,
        });

        localStorage.setItem("token", response?.token);
        localStorage.setItem("role", response?.role);
        localStorage.removeItem("email");

        successToast(response?.message || "OTP verified successfully");

        if (response?.profileCompleted) {
            navigate('/university')
        } else {
            navigate('/std-detail')
        }

    } catch (error: any) {
        console.error("Error occurred while verifying OTP:", error);
        errorToast(error || "OTP verification failed");
    } finally {

        setTimeout(() => {
            setSubmitting(false);
        }, 500);
    }
}

export function LogoutHandle(navigate: (url: string) => void) {

    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login')
}


export async function StdHandleSubmit(
    values: FormikValues, { setSubmitting }: FormikHelpers<StdDetailI>, navigate: (url: string) => void) {

    try {
        const response = await apiCall({
            method: "post",
            url: "v1/student/std-detail",
            data: values,
        });

        successToast(response?.message || "Student details submitted");
        navigate('/university')

    } catch (error: any) {
        console.error("Error occurred while Updating Student Data:", error);
        errorToast(error || "Failed to submit student details");
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

export async function UniversityHandleSubmit(
    values: FormikValues, { setSubmitting }: FormikHelpers<UniversityI>
) {

    try {
        const response = await apiCall({
            method: "post",
            url: "v1/admin/create-university",
            data: values,
        });

        successToast(response?.message || "University Created successfully");
    } catch (error: any) {
        errorToast(error || "Something went wrong");
        console.error("Error occurred while creating University:", error);
    } finally {
        setTimeout(() => {
            setSubmitting(false);
        }, 500);
    }
}


export async function genericHandleSubmit<T>(
    values: FormikValues,
    formikHelpers: FormikHelpers<T>,
    endpoint: string
) {
    const { setSubmitting } = formikHelpers;

    try {
        const response = await apiCall({
            method: "post",
            url: `${endpoint}`,
            data: values
        })

        successToast(response?.message);
    } catch (error: any) {
        console.error(`Error occurred while submitting to ${endpoint}:`, error);
        errorToast(error || "Something went wrong");
    } finally {
        setTimeout(() => {
            setSubmitting(false);
        }, 500);
    }
}