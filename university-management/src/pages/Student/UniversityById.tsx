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


export function UniversityById() {
    const { id } = useParams<{ id: string }>();
    const [university, setUniversity] = useState<University>();
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
            setUniversity(response.data);
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


    return (
        <>
            <div

                className="container pt-5 d-flex justify-content-center align-items-center">
                <div className="card p-4 "
                // style={{ backgroundColor: "#cde0fe" }}//cde0fe
                >
                    <div className='card-header d-flex align-items-center justify-content-between position-relative'>
                        <h2 className='m-0 text-decoration-underline fw-bold text-center flex-grow-1'>{university.name}</h2>
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
                            {university.course.length === 0 && (
                                <div className="col-12 text-center">
                                    <p className="text-muted">No courses available for this university OR Courses are Removed .
                                        <br />
                                        {isAdmin ? " Please add courses to this university." : " Please check back later."}
                                    </p>
                                </div>
                            )}
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
                        course: university.course.map((c) => c._id)
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
