import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { ErrorComponent, Facilities, LoadingComponent } from "../../components/helperComponents";
import { errorToast } from "../../helper/helperToast";
import { apiCall } from "../../api/apiCaller";

export type Address = {
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: number;
}

export type Stream = {
    _id: string;
    name: string;
}

export type Subject = {
    _id: string;
    name: string;
    fullName: string;
}

export type Course = {
    _id: string;
    name: string;
    fullname: string;
    courseType: string;
    subjects: {
        compulsory: Subject[];
        optional: Subject[];
    };
}
export type University = {
    _id: string;
    name: string;
    jobPlacement: boolean;
    scholarship: boolean;
    nearbyUniversity: boolean;
    transportation: boolean;
    accommodation: boolean;
    address: Address;
    stream: Stream[];
    course: Course[];
};

export function UniversityList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page") || "1";
    const pageSize = searchParams.get("pageSize") || "2";

    const initialFilters = {
        jobPlacement: searchParams.get("jobPlacement") === "true",
        scholarship: searchParams.get("scholarship") === "true",
        nearbyUniversity: searchParams.get("nearbyUniversity") === "true",
        transportation: searchParams.get("transportation") === "true",
        accommodation: searchParams.get("accommodation") === "true",
    };

    const [universities, setUniversities] = useState<University[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [totalData, setTotalData] = useState(0);
    const [filters, setFilters] = useState(initialFilters);

    const fetchData = async () => {
        setLoading(true);
        const query = new URLSearchParams({
            page,
            pageSize,
            ...Object.fromEntries(
                Object.entries(filters).filter(([_, v]) => v === true)
            ),
        }).toString();

        try {
            const response = await apiCall({
                method: "get",
                url: `v1/get-university?${query}`
            })

            setUniversities(response.data);
            setTotalData(response.pagination.TotalData);
        } catch (err: any) {
            const msg = err || "Failed to fetch University"
            setError(msg);
            errorToast(msg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, pageSize, filters]);

    const totalPages = Math.ceil(totalData / parseInt(pageSize));

    // if (loading) return <LoadingComponent />;
    if (error) return <ErrorComponent error={error} />;

    const updateSearchParams = (updatedPage: string, updatedFilters = filters) => {
        const params = {
            page: updatedPage,
            pageSize,
            ...Object.fromEntries(
                Object.entries(updatedFilters).filter(([_, v]) => v === true)
            ),
        };
        setSearchParams(params);
    };

    return (
        <div className="container pt-5 d-flex justify-content-center align-items-center">
            <div className="card rounded-4 shadow p-4 w-100" data-aos="fade-in" style={{ maxWidth: "1050px" }}>
                <h1 className="pb-2 rounded-top-4 border-2 border-bottom fw-bold text-primary text-center">University</h1>
                <div className="card-body pb-0">

                    {/* Filter */}
                    <div className="d-flex flex-wrap gap-3 justify-content-center">
                        {Object.entries(filters).map(([key, value]) => (
                            <label key={key} className="text-capitalize fw-medium p-2 border border-1 border-primary shadow-sm rounded-pill btn" style={{ background: '#e4eaf2', color: '#0d6efd' }}>
                                <input
                                    type="checkbox"
                                    className="form-check-input me-1"
                                    name={key}
                                    checked={value}
                                    onChange={() => {
                                        const updatedFilters = {
                                            ...filters,
                                            [key]: !filters[key as keyof typeof filters],
                                        };
                                        setFilters(updatedFilters);
                                        updateSearchParams("1", updatedFilters);
                                    }}
                                />
                                {key}
                            </label>
                        ))}
                    </div>

                    {loading ? <LoadingComponent h={false} /> :
                        <ul className="list-inline">
                            {universities.length === 0 && (
                                <p className="text-center p-4 text-danger">
                                    No Universities match the selected filters.
                                </p>
                            )}
                            {universities.map((uni) => (
                                <Link
                                    to={`${localStorage.getItem("role") === "admin"
                                        ? `/admin/university/${uni._id}`
                                        : `/university/${uni._id}`
                                        }`}
                                    key={uni._id}
                                    className="text-decoration-none text-center"
                                    data-aos="fade-up"
                                >
                                    <li className="card cardbg shadow rounded-4 p-3 m-3">
                                        <strong className="card-title">{uni.name}</strong> — {uni.address.address},{" "}
                                        {uni.address.city}, {uni.address.state}, {uni.address.country},{" "}
                                        {uni.address.pincode}
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
                    }
                </div>

                {/* Pagination */}
                <div className="card-footer d-flex justify-content-center gap-3 rounded-bottom-4">
                    <button
                        className="btn btn-sm p-0 btn-outline-primary fw-semibold shadow-sm"
                        onClick={() => {
                            const newPage = (parseInt(page) - 1).toString();
                            if (parseInt(newPage) > 0) {
                                updateSearchParams(newPage);
                            }
                        }}
                        disabled={parseInt(page) <= 1}
                    >
                        <ChevronLeft />
                    </button>
                    <span className="align-self-center fw-semibold">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        className="btn btn-sm p-0 btn-outline-primary fw-semibold shadow-sm"
                        onClick={() => {
                            const newPage = (parseInt(page) + 1).toString();
                            if (parseInt(newPage) <= totalPages) {
                                updateSearchParams(newPage);
                            }
                        }}
                        disabled={parseInt(page) >= totalPages}
                    >
                        <ChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
}
