import { useEffect, useState } from "react";
import axios from "axios";
import { token } from "../../components/RoleBasedRoute";

type Subject = {
    _id: string;
    name: string;
    fullName: string;
};

type Course = {
    _id: string;
    name: string;
    fullname: string;
    courseType: string;
    subjects: {
        compulsory: Subject[];
        optional: Subject[];
    };
};

type Address = {
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: number;
};

type University = {
    _id: string;
    name: string;
    address: Address;
    jobPlacement: boolean;
    scholarship: boolean;
    nearbyUniversity: boolean;
    transportation: boolean;
    accommodation: boolean;
    course: Course[];
};

type ApiResponse = {
    data: University[];
    pagination: {
        TotalData: number;
        PageNo: number;
        PageLimit: number;
    };
};

export const AdminUniversityList = () => {
    const [universities, setUniversities] = useState<University[]>([]);
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
    const [page, setPage] = useState<number>(1);
    const [pageLimit] = useState<number>(2); // Set your preferred limit
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUniversities = () => {


        setLoading(true);
        axios
            .get<ApiResponse>(`http://localhost:3000/api/v1/get-university?page=${page}&limit=${pageLimit}`, {
                headers: { Authorization: `Bearer ${token}` },

            }
            )
            .then((res) => {
                setUniversities(res.data.data);
                setTotal(res.data.pagination.TotalData);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.response?.data?.message || "Error loading data");
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchUniversities();
    }, [page]);

    const toggleExpand = (id: string) => {
        const newSet = new Set(expandedIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setExpandedIds(newSet);
    };

    const totalPages = Math.ceil(total / pageLimit);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container card p-4 mt-4">
            <h2 className="mb-3 text-center card-header">University</h2>

            {universities.map((uni) => (
                <div key={uni._id} className="card mb-4 shadow-sm">
                    <div className="card-header d-flex justify-content-between align-items-center bg-primary text-white">
                        <h5 className="mb-0">{uni.name}</h5>
                        <button
                            className="btn btn-light btn-sm"
                            onClick={() => toggleExpand(uni._id)}
                        >
                            {expandedIds.has(uni._id) ? "Hide Courses" : "Show Courses"}
                        </button>
                    </div>
                    <div className="card-body">
                        <p className="mb-1">
                            📍 {uni.address.address}, {uni.address.city},{" "}
                            {uni.address.state} - {uni.address.pincode},{" "}
                            {uni.address.country}
                        </p>

                        <div className="mt-2">
                            <strong>🎯 Features:</strong>
                            <ul className="list-inline mb-2">
                                <li className="list-inline-item">
                                    ✅ Job Placement: {uni.jobPlacement ? "Yes" : "No"}
                                </li>
                                <li className="list-inline-item">
                                    🎓 Scholarship: {uni.scholarship ? "Yes" : "No"}
                                </li>
                                <li className="list-inline-item">
                                    🏫 Nearby University: {uni.nearbyUniversity ? "Yes" : "No"}
                                </li>
                                <li className="list-inline-item">
                                    🚗 Transportation: {uni.transportation ? "Yes" : "No"}
                                </li>
                                <li className="list-inline-item">
                                    🛏️ Accommodation: {uni.accommodation ? "Yes" : "No"}
                                </li>
                            </ul>
                        </div>

                        {expandedIds.has(uni._id) && (
                            <>
                                <h6 className="mt-3">📘 Courses Offered</h6>
                                {uni.course.map((course) => (
                                    <div key={course._id} className="border rounded p-2 mb-3">
                                        <h6 className="fw-bold">
                                            {course.fullname} ({course.name}) - {course.courseType}
                                        </h6>
                                        <div>
                                            <strong>Compulsory Subjects:</strong>
                                            <ul className="mb-1">
                                                {course.subjects.compulsory.map((subj) => (
                                                    <li key={subj._id}>
                                                        {subj.name} - {subj.fullName}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <strong>Optional Subjects:</strong>
                                            <ul>
                                                {course.subjects.optional.map((subj) => (
                                                    <li key={subj._id}>
                                                        {subj.name} - {subj.fullName}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            ))}

            {/* Pagination Controls */}
            <div className="d-flex card-footer justify-content-between align-items-center mt-4">
                <button
                    className="btn btn-outline-primary"
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                >
                    ← Previous
                </button>
                <span>
                    Page {page} of {totalPages}
                </span>
                <button
                    className="btn btn-outline-primary"
                    disabled={page === totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    Next →
                </button>
            </div>
        </div>
    );
};
