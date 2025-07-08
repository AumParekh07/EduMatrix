import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

import { LoadingComponent, ErrorComponent, BackButton } from "../../components/helperComponents";
import { LogoutHandle } from "../../helper/SubmitHendle";
import { apiCall } from "../../api/apiCaller";
import { errorToast } from "../../helper/helperToast";
import EditModal from "../../components/editModal";
import { StdSchema } from "../../helper/FormikValidation";
import StudentFormFields from "../../components/FormFields/studentFormFields";


export function StudentDashboard() {
    const [studentData, setStudentData] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const navigate = useNavigate();

    async function fetchStudentData() {
        try {
            const response = await apiCall({
                method: "get",
                url: "/student/std-detail",
            });

            console.log("Student Dashboard Data:", response.data);
            setStudentData(response.data);
            setLoading(false);
        } catch (err: any) {
            console.error("Dashboard error:", err);
            const msg = err || "Failed to fetch student details";
            setError(msg);
            errorToast(msg);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudentData();
    }, []);



    if (loading) return <LoadingComponent />;
    if (error) return <ErrorComponent error={error} />;


    const { studentDetail, enrollCourseDetail, emptyenrollCourseDetail } = studentData;

    const initialValues = {
        gender: studentDetail.gender,
        birthDate: studentDetail.birthDate.split('T')[0],
        stream: studentDetail.stream._id,
        address: {
            address: studentDetail.address.address,
            city: studentDetail.address.city,
            state: studentDetail.address.state,
            country: studentDetail.address.country,
            pincode: studentDetail.address.pincode,
        },
        preference: {
            profession: studentDetail.preference.profession,
            courseType: studentDetail.preference.courseType,
            jobPlacement: String(studentDetail.preference.jobPlacement),
            scholarship: String(studentDetail.preference.scholarship),
            nearbyUniversity: String(studentDetail.preference.nearbyUniversity),
            transportation: String(studentDetail.preference.transportation),
            accommodation: String(studentDetail.preference.accommodation),
            minFee: studentDetail.preference.minFee,
            maxFee: studentDetail.preference.maxFee,
        }
    };



    return (
        <>
            <div className="container pt-5">
                <div className="card p-4"
                // style={{ backgroundColor: "#cde0fe" }}
                >
                    <h2 className="text-center card-header text-decoration-underline fw-bold">
                        Student Dashboard
                    </h2>

                    <div className="m-3">
                        <div className="d-flex  justify-content-between">
                            <h4>👨‍💼 Student Information</h4>
                            <button onClick={() => setShowEditModal(true)} className="btn btn-outline-primary m-2 fw-semibold shadow-sm">Update</button>

                        </div>
                        <ul className="list-group list-group-flush container"
                        >
                            <li className="list-group-item"><strong>Name:</strong> {studentDetail.userID.name}</li>
                            <li className="list-group-item"><strong>Username:</strong> {studentDetail.userID.username}</li>
                            <li className="list-group-item"><strong>Email:</strong> {studentDetail.userID.email}</li>
                            <li className="list-group-item"><strong>Gender:</strong> {studentDetail.gender}</li>
                            <li className="list-group-item"><strong>DOB:</strong> {new Date(studentDetail.birthDate).toLocaleDateString()}</li> {/*toDateString() */}
                            <li className="list-group-item"><strong>Stream:</strong> {studentDetail.stream.name}</li>
                            <li className="list-group-item"><strong>Location:</strong> {studentDetail.address.address},{studentDetail.address.city}, {studentDetail.address.state}</li>
                        </ul>
                    </div>

                    <div className="m-3">
                        <div className="d-flex  justify-content-between" >
                            <h4>📚 Enrolled Courses</h4>
                            <Link to="/university" className="btn btn-outline-primary m-2 fw-semibold shadow-sm">Enroll New Course</Link>

                        </div>

                        {enrollCourseDetail ? (
                            <div className="row justify-content-center">
                                {enrollCourseDetail.map((course: any, idx: number) => (
                                    <div className="card shadow col-md-5 p-3 m-3 bg-opacity-50"
                                        // style={{ backgroundColor: "#94bdfe" }}
                                        style={{ backgroundColor: "#e4eaf2", }}
                                        key={course._id}>
                                        <h6>👨🏻‍🏫 {idx + 1}. {course.courseID.fullname} ({course.courseID.name})</h6>
                                        <p><strong>Type:</strong> {course.courseID.courseType}</p>
                                        <p><strong>University:</strong> {course.universityID?.name}</p>
                                        <p><strong>Location:</strong> {course.universityID?.address.address},{course.universityID?.address.city}, {course.universityID?.address.state}</p>

                                        <strong>Compulsory Subjects:</strong>
                                        <ul className="mb-2">
                                            {course.subjects.compulsory.map((sub: any) => (
                                                <li key={sub._id}>{sub.fullName} ({sub.name})</li>
                                            ))}
                                        </ul>

                                        <strong>Optional Subjects:</strong>
                                        <ul>
                                            {course.subjects.optional.map((sub: any) => (
                                                <li key={sub._id}>{sub.fullName} ({sub.name})</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted mx-3">{emptyenrollCourseDetail}</p>
                        )}
                    </div>
                    <div className="d-flex justify-content-between border-top border-2">
                        <BackButton />
                        <button className="btn btn-primary m-2 fw-semibold shadow-sm"
                            onClick={() => LogoutHandle(navigate)}><LogOut /> Log out
                        </button>

                    </div>
                </div>
            </div>

            <EditModal
                title="Edit Subject"
                apiPath={'/student/update-stdDetail'}
                initialValues={initialValues}
                validationSchema={StdSchema}
                size="lg"
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                reload={() => fetchStudentData()}
            >
                {() => <StudentFormFields />}
            </EditModal>

        </>
    );
}
