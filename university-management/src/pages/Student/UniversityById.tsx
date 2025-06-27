import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import type { University } from "./UniversityList";
import { BackButton, ErrorComponent, Facilities, LoadingComponent } from "../../components/helperComponents";
import { errorToast } from "../../helper/helperToast";
import { token } from "../../components/RoleBasedRoute";


export function UniversityById() {
    const { id } = useParams<{ id: string }>();
    const [university, setUniversity] = useState<University>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const hasFetched = useRef(false);

    const isAdmin: boolean = (localStorage.getItem('role') === 'admin')

    const navigate = useNavigate();
    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            axios.get(`http://localhost:3000/api/v1/get-university/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((response) => {
                    console.log('University BY ID Data:', response);
                    setUniversity(response.data.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log('err: ', err);
                    setError(err.response?.data?.message || err.message);
                    errorToast(err.response?.data?.message || err.message);
                    setLoading(false);
                });
        }
    }, []);

    if (loading) return <LoadingComponent />

    if (error) return <ErrorComponent error={error} />

    if (!university) return null;

    return (
        <div className="container pt-5 d-flex justify-content-center align-items-center">
            <div className="card p-4 "
            // style={{ backgroundColor: "#cde0fe" }}//cde0fe
            >
                <h2 className="text-center card-header text-decoration-underline fw-bold ">{university.name}</h2>

                <div className="m-3">
                    <h4>📍 Address</h4>
                    <p className=" m-3 mb-0 container">{university.address.address}, {university.address.city}, {university.address.state}, {university.address.country} - {university.address.pincode}
                    </p>
                </div>

                <div className="m-3">
                    <h4>🏫 Facilities & Features</h4>
                    <div className="d-flex flex-wrap m-4 mb-2 gap-3">
                        <Facilities university={university} />
                    </div>
                </div>

                <div className="m-3">
                    <h4>📚 Courses Offered</h4>
                    <div className="row justify-content-center">
                        {university.course.map((course) => (

                            <div className="card shadow col-md-5 p-3 m-3 bg-opacity-50 " key={course._id}

                                style={{ cursor: isAdmin ? "default" : "pointer", backgroundColor: "#e4eaf2" }}//94bdfe //#e4eaf2 //rgb(33 37 41 / 4%)
                                onClick={
                                    isAdmin ? undefined :
                                        () => navigate(`/enroll-course/${course._id}`, { state: { course, universityID: university._id } })}>
                                <h5>  👨🏻‍🏫 {course.fullname} ({course.name})</h5>
                                <p><strong>Type:</strong> {course.courseType}</p>
                                <div>
                                    <strong>Compulsory Subjects:</strong>
                                    <ul className="mb-2 ">
                                        {course.subjects.compulsory.map((subject) => (
                                            <li key={subject._id}>{subject.fullName} ({subject.name})</li>
                                        ))}
                                    </ul>
                                    <strong>Optional Subjects:</strong>
                                    <ul>
                                        {course.subjects.optional.map((subject) => (
                                            <li key={subject._id}>{subject.fullName} ({subject.name})</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="d-flex  border-top border-2"> <BackButton /></div>
            </div>
        </div>
    );
}
