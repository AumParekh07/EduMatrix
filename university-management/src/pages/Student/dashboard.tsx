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
import type { Address, Subject, Stream, Course, University, } from "./UniversityList";
import type { FeeAndCapacity } from "./UniversityById"
interface User {
    name: string;
    username: string;
    email: string;
}

interface Preference {
    profession: string;
    courseType: string;
    jobPlacement: boolean;
    scholarship: boolean;
    nearbyUniversity: boolean;
    transportation: boolean;
    accommodation: boolean;
    minFee: number;
    maxFee: number;
}

interface StudentDetail {
    userID: User;
    gender: string;
    birthDate: string;
    address: Address;
    stream: Stream;
    preference: Preference;
}

export interface EnrollCourse {
    _id: string;
    courseID: Course;
    universityID: University;
    subjects: {
        compulsory: Subject[];
        optional: Subject[];
    };
}

interface StudentData {
    studentDetail: StudentDetail;
    enrollCourseDetail: EnrollCourse[];
    FeeAndCapacity: FeeAndCapacity[];
}

export function StudentDashboard() {
    const [studentData, setStudentData] = useState<StudentData>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const navigate = useNavigate();

    async function fetchStudentData() {
        try {
            const response = await apiCall({
                method: "get",
                url: "v1/student/std-detail",
            });

            setStudentData(response.data);
            setLoading(false);
        } catch (err: any) {
            console.error("Dashboard error:", err);
            const msg = err || "Failed to fetch student details";
            setError(msg);
            errorToast(msg);
            navigate('/std-detail')
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudentData();
    }, []);



    if (loading) return <LoadingComponent />;
    if (error) return <ErrorComponent error={error} />;
    if (!studentData) return <LoadingComponent />;


    const { studentDetail, enrollCourseDetail, FeeAndCapacity } = studentData;
    const flatFeeAndCapacity = FeeAndCapacity.flat();
    const initialValues = {
        gender: studentDetail?.gender,
        birthDate: studentDetail?.birthDate.split('T')[0],
        stream: studentDetail?.stream._id,
        address: {
            address: studentDetail?.address.address,
            city: studentDetail?.address.city,
            state: studentDetail?.address.state,
            country: studentDetail?.address.country,
            pincode: studentDetail?.address.pincode,
        },
        preference: {
            profession: studentDetail?.preference.profession,
            courseType: studentDetail?.preference.courseType,
            jobPlacement: String(studentDetail?.preference.jobPlacement),
            scholarship: String(studentDetail?.preference.scholarship),
            nearbyUniversity: String(studentDetail?.preference.nearbyUniversity),
            transportation: String(studentDetail?.preference.transportation),
            accommodation: String(studentDetail?.preference.accommodation),
            minFee: studentDetail?.preference.minFee,
            maxFee: studentDetail?.preference.maxFee,
        }
    };



    return (
        <>
            <div className="container py-5 px-lg-5" data-aos="fade-in">
                <div className="card rounded-4 p-4">
                    <h2 className="text-center rounded-top-4 border-2 border-bottom p-2 pt-0 text-primary fw-bold" >
                        Student Dashboard
                    </h2>

                    <div className="m-3">
                        <div className="d-flex  justify-content-between">
                            <h4>👨‍💼 Student Information</h4>
                            <button onClick={() => setShowEditModal(true)} className="btn btn-outline-primary m-2 fw-semibold shadow-sm">Update</button>
                        </div>
                        {studentDetail ? (
                            <ul className="list-group list-group-flush container"
                            >
                                <li className="list-group-item"><strong>Name:</strong> {studentDetail.userID.name}</li>
                                <li className="list-group-item"><strong>User Name:</strong> {studentDetail.userID.username}</li>
                                <li className="list-group-item"><strong>Email:</strong> {studentDetail.userID.email}</li>
                                <li className="list-group-item"><strong>Gender:</strong> {studentDetail.gender}</li>
                                <li className="list-group-item"><strong>DOB:</strong> {new Date(studentDetail.birthDate).toLocaleDateString()}</li> {/*toDateString() */}
                                <li className="list-group-item"><strong>Stream:</strong> {studentDetail.stream.name}</li>
                                <li className="list-group-item"><strong>Location:</strong> {studentDetail.address.address},{studentDetail.address.city}, {studentDetail.address.state}</li>
                            </ul>
                        ) : (<p className="text-muted mx-3">Your Detail Not Found! Please update Your Profile</p>)}
                    </div>

                    <div className="m-3">
                        <div className="d-flex  justify-content-between" >
                            <h4>📚 Enrolled Courses</h4>
                            <Link to="/university" className="btn btn-outline-primary m-2 fw-semibold shadow-sm">Enroll New Course</Link>

                        </div>

                        {enrollCourseDetail.length > 0 ? (
                            <div className="row justify-content-center" >
                                {enrollCourseDetail.map((course, idx) => (
                                    <div className="col-md-5 d-flex align-items-center justify-content-center" data-aos="zoom-out-down" data-aos-anchor-placement="top-bottom"
                                        key={course._id}
                                    >
                                        <div className="card cardbg rounded-5 border-2 border-primary shadow-sm hoverShadowlg p-3 m-md-3 my-3 w-100"
                                        // style={{ backgroundColor: "#94bdfe" }}
                                        >
                                            {course.courseID ? course.universityID ? (
                                                <>
                                                    <h5 className="fw-bold text-center text-light bg-primary rounded-top-5 p-2"> {idx + 1}. {course.courseID?.fullname} ({course.courseID?.name})</h5>
                                                    <div className="ps-3">
                                                        <div className="d-flex gap-3 justify-content-center">

                                                            <p><strong>Type:</strong>
                                                                <span className={`badge ${course.courseID?.courseType === "FullTime" ? "bg-primary" : course.courseID?.courseType === "PartTime" ? "bg-info" : "bg-secondary"}`}>{course.courseID?.courseType}</span>
                                                            </p>
                                                            <p><strong>Fee:</strong>
                                                                <span className="badge bg-warning">₹{flatFeeAndCapacity.find(fc => fc.courseId === course.courseID?._id && fc.universityId === course.universityID?._id)?.fee}</span>
                                                            </p>
                                                        </div>
                                                        <p><strong>University:</strong> {course.universityID?.name}</p>
                                                        <p><strong>Location:</strong> {course.universityID?.address.address},{course.universityID?.address.city}, {course.universityID?.address.state}</p>

                                                        <strong>Compulsory Subjects:</strong>
                                                        <ul className="mb-2">
                                                            {course.subjects.compulsory.map((sub: Subject) => (
                                                                <li key={sub._id}>{sub.fullName} ({sub.name})</li>
                                                            ))}
                                                        </ul>

                                                        <strong>Optional Subjects:</strong>
                                                        <ul>
                                                            {course.subjects.optional.map((sub: Subject) => (
                                                                <li key={sub._id}>{sub.fullName} ({sub.name})</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </>
                                            )
                                                :
                                                (
                                                    <span className="text-danger text-center">University information not available</span>
                                                ) :
                                                (
                                                    <span className="text-danger text-center">Course information not available</span>
                                                )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted mx-3">{studentDetail.userID.name} does not Enrolled in any Course</p>
                        )}
                    </div>
                    <div className="d-flex justify-content-between border-top border-2">
                        <BackButton />
                        <button className="btn btn-primary m-2 fw-semibold shadow-sm"
                            onClick={() => LogoutHandle(navigate)}><LogOut /> Log out
                        </button>

                    </div>
                </div>
            </div >

            <EditModal
                title="Edit Subject"
                apiPath={'v1/student/update-stdDetail'}
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
