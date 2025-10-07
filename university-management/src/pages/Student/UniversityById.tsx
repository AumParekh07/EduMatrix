import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

import type { University } from "./UniversityList";
import { BackButton, ErrorComponent, Facilities, LoadingComponent } from "../../components/helperComponents";
import { errorToast } from "../../helper/helperToast";
import EditModal from "../../components/editModal";
import UniversityFormFields from "../../components/FormFields/universityFormFields";
import { UniversitySchema } from "../../helper/FormikValidation";
import DeleteModal from "../../components/deletModal";
import { apiCall } from "../../api/apiCaller";
import { GetRole } from "../../helper/getAuth";

export type FeeAndCapacity = {
    fee: number;
    capacity: number;
    universityId: string;
    courseId: string;
};

type CourseEnrollCounts = {
    courseId: string;
    enrollCount: number;
}[];

type EnrolledCourse = {
    userID: string
    universityID: string
    courseID: string
}

export function UniversityById() {
    const { id } = useParams<{ id: string }>();
    const [university, setUniversity] = useState<University>();
    const [feeCapacities, setFeeCapacities] = useState<FeeAndCapacity[]>([])
    const [courseEnrollCounts, setCourseEnrollCounts] = useState<CourseEnrollCounts>([])
    const [enrollCourses, setEnrollCourses] = useState<EnrolledCourse[]>([])
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const isAdmin: boolean = (GetRole() === 'admin')
    const isStudent: boolean = (GetRole() === 'student')

    const navigate = useNavigate();

    async function fetchUniversity() {
        setLoading(true);
        setError("");
        try {
            const response = await apiCall({
                method: "get",
                url: `v1/get-university/${id}`
            });

            setUniversity(response.data.university);
            setFeeCapacities(response.data.FeeAndCapacity)
            setCourseEnrollCounts(response.data.courseEnrollCounts)
            setEnrollCourses(response.data.enrollCourses)
        } catch (err: any) {
            const msg = err
            console.error('err: ', err);
            setError(msg);
            errorToast(msg);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchUniversity()
    }, []);

    const remainingCapacity = (courseId: string) => {

        const capacity = feeCapacities.find((fc) => fc.courseId === courseId)?.capacity ?? 0;
        const enrolled = courseEnrollCounts.find((count) => count.courseId === courseId)?.enrollCount ?? 0;
        const remain = capacity - enrolled;

        return { remain, capacity, enrolled };
    }

    const handleCourseClick = (course: any) => {
        const remain = remainingCapacity(course._id).remain;
        if (remain > 0) {
            navigate(`/enroll-course/${course._id}`, {
                state: {
                    course,
                    universityID: university?._id,
                    feeCapacities,
                    remainingCapacity: remain
                }
            });
        } else {
            errorToast("No Seats Available");
        }
    };

    if (loading) return <LoadingComponent />

    if (error) return <ErrorComponent error={error} />

    if (!university) return <ErrorComponent error="Error Fetching University By ID" />;

    const initialValues = {
        name: university.name,
        jobPlacement: String(university.jobPlacement),
        scholarship: String(university.scholarship),
        nearbyUniversity: String(university.nearbyUniversity),
        transportation: String(university.transportation),
        accommodation: String(university.accommodation),
        address: {
            address: university.address.address,
            city: university.address.city,
            state: university.address.state,
            country: university.address.country,
            pincode: university.address.pincode,
        },
        stream: university.stream.map((s) => s._id),
        course: university.course.map((c) => c._id),
        courseDetails: feeCapacities.map((fc) => ({
            courseId: fc.courseId,
            fee: fc.fee,
            capacity: fc.capacity
        }))

    }

    return (
        <>
            <div className="container py-5 px-lg-5">
                <div className="card p-4 rounded-5 " style={{ minWidth: "300px" }}>
                    <div className='d-flex border-2 border-bottom p-2 pt-0 align-items-center justify-content-between'>
                        <h2 className='m-0  text-primary fw-bold text-center flex-grow-1'>{university.name}</h2>
                        {isAdmin && (
                            <div className="d-flex gap-2 justify-content-end">
                                <Pencil className="btn p-0"
                                    onClick={() => setShowEditModal(true)
                                    }
                                />
                                <Trash2 className="btn p-0"
                                    onClick={() =>
                                        setShowDeleteModal(true)
                                    } />
                            </div>
                        )}
                    </div>
                    <div className="m-3 d-flex flex-wrap">
                        <h4>📍 Address :-</h4>
                        <span className="m-1 ms-3 ">{university.address.address}, {university.address.city}, {university.address.state}, {university.address.country} - {university.address.pincode}
                        </span>
                    </div>

                    <div className="m-3 d-flex flex-wrap">
                        <h4>🏫 Facilities :-</h4>
                        <div className="d-flex flex-wrap m-2 ms-3 gap-3">
                            <Facilities university={university} />
                        </div>
                    </div>
                    <div className="m-3 d-flex flex-wrap ">
                        <h4>💾 Stream :-</h4>
                        {university.stream.map((stream) => (
                            <span key={stream._id} className="fw-medium border border-2 border-black  bg-primary text-white p-1 rounded-4  ms-3">
                                {stream.name}
                            </span>
                        ))}
                    </div>
                    <div className="m-3">
                        <h4>📚 Courses Offered</h4>
                        <div className="row justify-content-center" >
                            {university.course.length === 0 && (
                                <div className="col-12 text-center">
                                    <p className="text-muted">No courses available for this university OR Courses are Removed .
                                        <br />
                                        {isAdmin ? " Please add courses to this university." : " Please come back later."}
                                    </p>
                                </div>
                            )}
                            {university.course.map((course) => {
                                const isEnrolled = !!enrollCourses.find(ec => ec.courseID === course._id);
                                return (
                                    <div className="col-md-5" data-aos="zoom-in-up" key={course._id}>
                                        <div className="card position-relative cardbg p-2 m-md-3 my-3 shadow-sm hoverShadowlg rounded-5 border-2 border-primary"
                                            style={{ cursor: (isAdmin || remainingCapacity(course._id).remain <= 0) || isEnrolled ? "default" : "pointer", backgroundColor: "" }}//94bdfe //#e4eaf2 //rgb(33 37 41 / 4%)
                                            onClick={() => {
                                                if (isStudent) {
                                                    if (isEnrolled) return errorToast("You Already Enrolled")
                                                    handleCourseClick(course)
                                                }
                                            }
                                            }>
                                            <div className="position-absolute m-4 bottom-0 end-0">
                                                {isEnrolled && (
                                                    <p><span className="p-2 rounded-pill text-white fw-medium bg-danger">Already Enrolled</span></p>
                                                )}
                                            </div>

                                            <h5 className="fw-bold text-light bg-primary rounded-top-5 p-2 text-center">  👨🏻‍🏫 {course.fullname} ({course.name})</h5>
                                            <div className="d-flex flex-wrap justify-content-evenly">
                                                <p>
                                                    <strong>Fee:</strong> <span className="badge bg-warning">₹{feeCapacities.find((fc) => fc.courseId === course._id)?.fee}</span>
                                                </p>
                                                <p>
                                                    <strong>Seats:</strong> <span className="badge bg-success">{remainingCapacity(course._id).remain} / {remainingCapacity(course._id).capacity} </span>
                                                </p>
                                                <p>
                                                    <strong>Type:</strong> <span className={`badge ${course.courseType === "FullTime" ? "bg-primary" : course.courseType === "PartTime" ? "bg-info" : "bg-success"}`}>{course.courseType}</span>
                                                </p>

                                            </div>
                                            <div className="p-2">
                                                <strong>Compulsory Subjects:</strong>
                                                <ul className="mb-2 ">
                                                    {course.subjects.compulsory.map((subject) => (
                                                        <li className="ms-2" key={subject._id}>{subject.fullName} ({subject.name})</li>
                                                    ))}
                                                </ul>
                                                <strong>Optional Subjects:</strong>
                                                <ul>
                                                    {course.subjects.optional.map((subject) => (
                                                        <li className="ms-2" key={subject._id}>{subject.fullName} ({subject.name})</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <span className="d-flex justify-content-end"> <BackButton /></span>
                </div>
            </div >

            {showEditModal && (
                <EditModal
                    title="Edit University"
                    apiPath={`v1/admin/update-university/${university._id}`}
                    show={showEditModal}
                    initialValues={initialValues}
                    validationSchema={UniversitySchema}
                    size="lg"
                    onHide={() => setShowEditModal(false)}
                    reload={fetchUniversity}
                >
                    {({ values, setFieldValue }) => (
                        <UniversityFormFields
                            values={{ ...values, enrollCourseDetails: remainingCapacity, courseEnrollCounts }}
                            setFieldValue={setFieldValue}

                            courseEnrollCounts={courseEnrollCounts}
                        />
                    )}
                </EditModal>
            )}

            {showDeleteModal && (
                <DeleteModal
                    title="Delete University"
                    name={university.name}
                    apiPath={`delete-university/${university._id}`}
                    show={showDeleteModal}
                    onHide={() => setShowDeleteModal(false)}
                    reload={() => navigate(-1)}
                />
            )}

        </>
    );
}
