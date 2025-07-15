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

export type FeeAndCapacity = {
    fee: number;
    capacity: number;
    courseId: string;
}[];

export function UniversityById() {
    const { id } = useParams<{ id: string }>();
    const [university, setUniversity] = useState<University>();
    const [feeCapacities, setFeeCapacities] = useState<FeeAndCapacity>([])
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const isAdmin: boolean = (localStorage.getItem('role') === 'admin')

    const navigate = useNavigate();

    async function fetchUniversity() {
        setLoading(true)
        try {
            const response = await apiCall({
                method: "get",
                url: `/get-university/${id}`
            });
            console.log('University BY ID Data:', response);
            setUniversity(response.data.university);
            setFeeCapacities(response.data.FeeAndCapacity)
        } catch (err: any) {
            const msg = err || "Failed to fetch University";
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

    if (loading) return <LoadingComponent />

    if (error) return <ErrorComponent error={error} />

    if (!university) return null;
    if (!feeCapacities) return <ErrorComponent error="Update course fee and capacity" />
    return (
        <>
            <div className="container py-5 px-lg-5 p-0 ">
                <div className="card p-4 rounded-5 ">
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
                        <div className="d-flex flex-wrap m-2 ms-3  gap-3">
                            <Facilities university={university} />
                        </div>
                    </div>
                    <div className="m-3 d-flex flex-wrap ">
                        <h4>💾 Stream :-</h4>
                        {university.stream.map((stream) => (
                            <span key={stream._id} className="list-inline-item m-1 ms-3">
                                ● {stream.name}
                            </span>
                        ))}
                    </div>
                    <div className="m-3">
                        <h4>📚 Courses Offered</h4>
                        <div className="row justify-content-center">
                            {university.course.length === 0 && (
                                <div className="col-12 text-center">
                                    <p className="text-muted">No courses available for this university OR Courses are Removed .
                                        <br />
                                        {isAdmin ? " Please add courses to this university." : " Please come back later."}
                                    </p>
                                </div>
                            )}
                            {university.course.map((course) => (
                                <div className="card cardbg shadow-sm shadow2 col-md-5 p-2 m-3 rounded-5 border-2 border-primary" key={course._id}
                                    style={{ cursor: isAdmin ? "default" : "pointer", backgroundColor: "" }}//94bdfe //#e4eaf2 //rgb(33 37 41 / 4%)
                                    onClick={
                                        isAdmin ? undefined :
                                            () => navigate(`/enroll-course/${course._id}`, { state: { course, universityID: university._id, feeCapacities } })}>
                                    <h5 className="fw-bold text-light bg-primary rounded-top-5  p-2 text-center">  👨🏻‍🏫 {course.fullname} ({course.name})</h5>
                                    <div className="d-flex gap-3 justify-content-center">
                                        <p>
                                            <strong>Fee:</strong>
                                            <span className="badge bg-warning">₹{feeCapacities.find((fc) => fc.courseId === course._id)?.fee}</span>
                                        </p>
                                        <p>
                                            <strong>Capacity:</strong>
                                            <span className="badge bg-success"> {feeCapacities.find((fc) => fc.courseId === course._id)?.capacity}</span>
                                        </p>
                                        <p>
                                            <strong>Type:</strong>
                                            <span className={`badge ${course.courseType === "FullTime" ? "bg-primary" : course.courseType === "PartTime" ? "bg-info" : "bg-success"}`}>{course.courseType}</span>
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
                            ))}
                        </div>
                    </div>
                    <span className="d-flex justify-content-end"> <BackButton /></span>
                </div>
            </div>
            {showEditModal && (
                <EditModal
                    title="Edit University"
                    apiPath={`/admin/update-university/${university._id}`}
                    show={showEditModal}
                    initialValues={{
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

                    }}
                    validationSchema={UniversitySchema}
                    size="lg"
                    onHide={() => setShowEditModal(false)}
                    reload={fetchUniversity}
                >
                    {({ values, setFieldValue }) => (
                        <UniversityFormFields
                            values={values}
                            setFieldValue={setFieldValue}
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
