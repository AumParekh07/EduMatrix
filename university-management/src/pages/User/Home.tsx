import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiCall } from "../../api/apiCaller";
import { LoadingComponent } from "../../components/helperComponents";
import CountUp from "react-countup";

export function Home() {
    const [counts, setCounts] = useState({ universities: 0, courses: 0, students: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const admin: boolean = (localStorage.getItem('role') === 'admin')

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const response = await apiCall({
                    method: "get",
                    url: "v1/get-counts",
                });
                if (response.success) {
                    setCounts(response.data);
                } else {
                    setError("Failed to fetch counts");
                }
            } catch (err) {
                setError("Error fetching counts");
            } finally {
                setLoading(false);
            }
        };
        fetchCounts();
    }, []);

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center  pt-md-5 pb-md-3" style={{ height: "calc(100vh - 72px )" }} >
                <div className="card rounded-4 shadow p-4 w-100" style={{ maxWidth: "900px" }}>
                    <h1 className=" pb-2 rounded-top-4 border-2 border-bottom fw-bold text-primary text-center">
                        Welcome to University Management System
                    </h1>
                    <div className="card-body text-center">
                        <p className="lead">
                            Manage and explore universities, courses, and student enrollments with ease.
                        </p>
                        {loading ? (
                            <LoadingComponent h={false} />
                        ) : error ? (
                            <p style={{ color: "red" }}>{error}</p>
                        ) : (
                            <>
                                <section className="d-flex flex-wrap justify-content-center gap-md-5 gap-sm-4 gap-3 my-4">
                                    <div data-aos="fade-up">
                                        <h3>Top <CountUp end={counts.universities} /></h3>
                                        <span className="fw-medium">Universities</span>
                                    </div>
                                    <div>
                                        <h3>with</h3>
                                    </div>
                                    <div data-aos="fade-up">
                                        <h3>Best <CountUp end={counts.courses} /></h3>
                                        <span className="fw-medium">Courses</span>
                                    </div>
                                    <div>
                                        <h3>with</h3>
                                    </div>
                                    <div data-aos="fade-up">
                                        <h3> <CountUp end={counts.students} /></h3>
                                        <span className="fw-medium">Students</span>
                                    </div>

                                </section>
                                <div>
                                    <h4>Get Your Course With University  You Want</h4>
                                </div>
                            </>
                        )}
                        <div className="d-flex justify-content-center gap-3 mt-4">
                            {admin ?
                                <Link to="/admin/university" className="btn btn-outline-primary btn-lg">
                                    Admin Site
                                </Link>
                                :
                                <Link to="/university" className="btn btn-outline-primary btn-lg">
                                    ENROLL NOW
                                </Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}