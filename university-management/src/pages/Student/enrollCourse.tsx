import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { LoadingComponent, ErrorComponent, BackButton } from "../../components/helperComponents";
import { errorToast, successToast } from "../../helper/helperToast";
import { token } from "../../components/RoleBasedRoute";




export function EnrollCourse() {
    const { state } = useLocation();

    const [selectedOptionals, setSelectedOptionals] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!state) {
        useEffect(() => {
            errorToast("Invalid Navigation.Going Back To University");
            setError('Invalid Navigation.Going Back To University')
            setTimeout(() => {
                window.location.href = '/university';
            }, 2500);
        }, []);
        return <ErrorComponent error={error} />
    }
    const { course, universityID } = state;

    const handleCheckboxChange = (subjectId: string) => {
        setSelectedOptionals(prev =>
            prev.includes(subjectId) ? prev.filter(id => id !== subjectId) : [...prev, subjectId]
        );
    };
    const handleEnroll = async () => {
        if (selectedOptionals.length === 0) {
            errorToast('Please Select At Least One Optional Subject.')
            return;
        }

        try {
            setLoading(true);
            setError("");


            const payload = {
                universityID,
                courseID: course._id,
                optionalSubjectID: selectedOptionals,
            };

            const response = await axios.post(
                "http://localhost:3000/api/v1/student/enroll-course",
                payload,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.data.success) {
                successToast('Successfully enrolled in the course!')

                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 1500);
            } else {
                setError(response.data.message || "Failed to enroll.");
            }

        } catch (err: any) {
            console.log("Enroll Error:", err);
            setError(err.response?.data?.message || "Error occurred during enrollment.");
            errorToast(err.response?.data?.message);
        }
        finally {
            setLoading(false)
        }
    }
    if (loading) return <LoadingComponent />

    if (error) return <ErrorComponent error={error} />

    return (
        <div className="container d-flex justify-content-center align-items-center "
            style={{ height: "calc(100vh - 57.6px)" }} >
            <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "850px" }}>
                <h2 className="text-center card-header mb-4">Enroll Course</h2>
                <h2>Enroll in {course.fullname}</h2>
                <p><strong>Course Code:</strong> {course.name}</p>
                <p><strong>Type:</strong> {course.courseType}</p>

                <div>
                    <h5>📘 Compulsory Subjects</h5>
                    <ul>
                        {course.subjects.compulsory.map((sub: any) => (
                            <li key={sub._id}>{sub.fullName} ({sub.name})</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h5>📗 Optional Subjects</h5>

                    {course.subjects.optional.map((sub: any) => (
                        <div className="container" key={sub._id}>
                            <label>
                                <input type="checkbox" value={sub._id} checked={selectedOptionals.includes(sub._id)}
                                    onChange={() => handleCheckboxChange(sub._id)} />
                                {sub.fullName} ({sub.name})
                            </label>
                        </div>
                    ))}
                    <p className="m-0 text-muted">need to select atleast one subject </p>

                </div>
                <div className="d-flex justify-content-between">
                    <BackButton />
                    <button className="btn btn-primary m-2 fw-semibold shadow-sm" onClick={handleEnroll} > Enroll </button>
                </div>
            </div>
        </div>
    );
}