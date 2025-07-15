import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

import { ErrorComponent, Facilities, LoadingComponent } from "../../components/helperComponents";
import { errorToast } from "../../helper/helperToast";
import GetToken from "../../helper/authtoken";

export type University = {
    _id: string;
    name: string;
    jobPlacement: boolean;
    scholarship: boolean;
    nearbyUniversity: boolean;
    transportation: boolean;
    accommodation: boolean;
    address: {
        address: string;
        city: string;
        state: string;
        country: string;
        pincode: number;
    };
    stream: Array<{
        _id: string;
        name: string;
    }>;
    course: Array<{
        _id: string;
        name: string;
        fullname: string;
        courseType: string;
        subjects: {
            compulsory: Array<{ _id: string; name: string; fullName: string }>;
            optional: Array<{ _id: string; name: string; fullName: string }>;
        };
    }>;
};

export function UniversityList1() {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page") || "1";
    const pageSize = searchParams.get("pageSize") || "2";

    const [universities, setUniversities] = useState<University[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [totalData, setTotalData] = useState(0);
    const [filters, setFilters] = useState({
        jobPlacement: false,
        scholarship: false,
        nearbyUniversity: false,
        transportation: false,
        accommodation: false,
    });

    useEffect(() => {

        const token = GetToken()

        const query = new URLSearchParams({
            page,
            pageSize,
            ...Object.fromEntries(
                Object.entries(filters).filter(([_, v]) => v === true)
            ),
        }).toString();

        axios
            .get(`http://localhost:3000/api/v1/get-university?${query}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setUniversities(response.data.data);
                setTotalData(response.data.pagination.TotalData);
                setSearchParams(query);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.response?.data?.message || err.message);
                errorToast(err.response?.data?.message);
                setLoading(false);
            });
    }, [page, pageSize, filters, setSearchParams]);


    if (loading) return <LoadingComponent />;
    if (error) return <ErrorComponent error={error} />;

    const totalPages = Math.ceil(totalData / parseInt(pageSize));

    return (
        <div className="container pt-5 d-flex justify-content-center align-items-center">
            <div className="card shadow p-4 w-100" style={{ maxWidth: "1050px" }}>
                <h1 className="card-header fw-bold text-center">University</h1>

                <div className="card-body pb-0">
                    <div className="mb-4 d-flex flex-wrap gap-3 justify-content-center">
                        {Object.entries(filters).map(([key, value]) => (
                            <label key={key} className="form-check-label text-capitalize ">
                                <input
                                    type="checkbox"
                                    className="form-check-input me-1"
                                    name={key}
                                    checked={value}
                                    onChange={() =>
                                        setFilters((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
                                    }
                                />
                                {key}
                                {/* {key.replace(/([A-Z])/g, ' $1')} */}
                            </label>
                        ))}
                    </div>



                    <ul className="list-inline">

                        {universities.length == 0 && <p className="text-center text-danger">No universities match the selected filters.</p>}
                        {universities.map((uni) => (
                            <Link
                                to={`${localStorage.getItem("role") === "admin" ? `/admin/university/${uni._id}` : `/university/${uni._id}`}`}
                                key={uni._id}
                                className="text-decoration-none text-center"
                            >
                                <li className="card cardbg shadow text-center p-3 m-3">
                                    <strong className="card-title">{uni.name}</strong> — {uni.address.address}, {uni.address.city}, {uni.address.state}, {uni.address.country}, {uni.address.pincode}
                                    <div className="mt-2">
                                        <strong>Stream:</strong>
                                        <ul className="list-inline">
                                            {uni.stream.map((stream) => (
                                                <li key={stream._id} className="list-inline-item">
                                                    ● {stream.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="d-flex flex-wrap justify-content-center gap-2 mt-2">
                                        <Facilities university={uni} />
                                    </div>
                                </li>
                            </Link>
                        ))}

                    </ul>


                </div>
                <div className="card-footer d-flex justify-content-between">
                    <button
                        className="btn btn-outline-primary fw-semibold shadow-sm"
                        onClick={() => {
                            const newPage = parseInt(page) - 1;
                            if (newPage > 0) {
                                setSearchParams({
                                    page: newPage.toString(),
                                    pageSize,
                                    ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v === true)),
                                });
                            }
                        }}
                        disabled={parseInt(page) <= 1}
                    >
                        Previous
                    </button>
                    <span className="align-self-center fw-semibold">Page {page} of {totalPages}</span>
                    <button
                        className="btn btn-outline-primary fw-semibold shadow-sm"
                        onClick={() => {
                            const newPage = parseInt(page) + 1;
                            if (newPage <= totalPages) {
                                setSearchParams({
                                    page: newPage.toString(),
                                    pageSize,
                                    ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v === true)),
                                });
                            }
                        }}
                        disabled={parseInt(page) >= totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}