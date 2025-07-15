import { Field, ErrorMessage } from "formik";
import { ChevronLeft } from "lucide-react";

import type { University } from "../pages/Student/UniversityList";
import { useNavigate } from "react-router-dom";


export function SubmitButton({ title }: { title: string }) {
    return (
        <button type="submit" className="btn btn-outline-primary fw-semibold shadow-sm rounded4" >
            {title}
        </button>
    );
}

export function InputFiled1({ title, type, id, placeholder, min }: { title: string; type: string; id: string; placeholder: string, min?: string }) {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label fw-semibold">
                {title}
            </label>
            <Field type={type} id={id} name={id} min={min} className="form-control shadow-sm" placeholder={placeholder} />
            <ErrorMessage name={id} component="div" className="error" />
        </div>
    );
}

export function Preferencefield({ title, id1, id2, labelHtmlFor }: { labelHtmlFor: string, title: string, id1: string, id2: string }) {
    return (
        <div className="mb-2 ">
            <span className="form-label fw-semibold">{title}</span>
            <div className="btn-group btn-group-sm form-check " role="group" aria-label="Basic radio toggle button group">

                <Field type="radio" className="btn-check " name={labelHtmlFor} id={id1} value="true" />
                <label className="btn btn-outline-primary shadow-sm" htmlFor={id1}>Yes</label>

                <Field type="radio" className="btn-check" name={labelHtmlFor} id={id2} value="false" />
                <label className="btn btn-outline-primary shadow-sm" htmlFor={id2}>No</label>

            </div>
            <ErrorMessage name={labelHtmlFor} component="div" className="error" />
        </div>
    )
}

// import {DotLottieReact} from '@lottiefiles/dotlottie-react';
export function LoadingComponent({ h = true }: { h?: boolean }) {
    return (
        <div className="d-flex justify-content-center  align-items-center" style={{ height: `${h ? 'calc(100vh - 57.6px)' : ''}` }}>
            <div className="loader" id="otp-loader"></div>
        </div>

        // <DotLottieReact
        //     style={{ height: "calc(100vh - 57.6px)" }}
        //     src="https://lottie.host/af4641be-02b0-4c6a-a26b-ea4a2779f2ac/yM8keXXIg3.lottie"
        //     loop 
        //     autoplay
        // />
    );
}

export function ErrorComponent({ error, hw = true }: { error: string, hw?: boolean }) {
    return (
        <div
            className="d-flex justify-content-center align-items-center z-1"
            style={hw ? { margin: "0 auto", height: "calc(100vh - 57.6px)" } : {}}
        >
            <div className="border border-3 rounded-3 border-danger bg-white bg-opacity-50 p-4 text-center">
                <h2 className="fw-bold  p-1" style={{ color: "red" }}>{error}</h2>

                <div className=" justify-content-center ">
                    {!error.includes("Network Error") && (
                        <BackButton />
                    )}
                </div>
            </div>
        </div >
    )
}


export function BackButton() {
    const navigate = useNavigate();
    return (
        <button onClick={() => navigate(-1)} type="button" className="btn btn-primary align-items-center m-2 rounded4 fw-semibold shadow-sm">
            <ChevronLeft style={{ marginTop: '-3px', marginLeft: '-7px' }} />Back
        </button>
    );
}


export function Facilities({ university }: { university: University }) {
    return (
        <>
            {university.jobPlacement ? <span className="badge bg-success">Job Placement</span> : null}
            {university.scholarship ? <span className="badge bg-primary ">Scholarship</span> : null}
            {university.nearbyUniversity ? <span className="badge bg-info">Nearby Universities</span> : null}
            {university.transportation ? <span className="badge bg-warning ">Transportation</span> : null}
            {university.accommodation ? <span className="badge bg-danger">Accommodation</span> : null}
        </>
    )
}