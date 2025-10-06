import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiCall } from "../../api/apiCaller";
import { errorToast, successToast } from "../../helper/helperToast";
import { ErrorComponent, LoadingComponent } from "../../components/helperComponents";
import PageNotFound from "../../components/PageNotFound";

type Status = "NotFound" | "success" | "failed";

export default function Verify() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState<Status>("NotFound");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
        const success = searchParams.get("success");
        const session_id = searchParams.get("session_id");
        const enrollId = searchParams.get("enrollId");

        if (session_id && (success === "true" || success === "false") && enrollId) {
            (async () => {
                try {
                    setLoading(true);
                    const response = await apiCall({
                        method: "get",
                        url: "v1/student/verifystripe",
                        params: { session_id },
                    });

                    if (response.success) {
                        setStatus("success");
                        successToast("Successfully enrolled in the course!");
                        setTimeout(() => navigate("/dashboard"), 4000);
                    }
                    else {
                        setStatus("failed");
                        const msg = response.message || "Payment verification failed.";
                        setError(msg);
                        errorToast(msg);
                        const uniId = response.data?.universityId;
                        if (uniId) {
                            setTimeout(() => navigate(`/university/${uniId}`), 4000);
                        }
                    }
                } catch (err: any) {
                    console.error("Payment verification error:", err);
                    setStatus("failed");
                    setError(err);
                    errorToast(err);
                } finally {
                    setLoading(false);
                }
            })();
        }
    }, []);

    if (error) return <ErrorComponent error={error} />
    if (loading) return (
        <div className="d-flex justify-content-center align-items-center z-1" style={{ height: "calc(100vh - 72px)" }}>
            <div className="border border-3 rounded-3 border-primary bg-white bg-opacity-50 p-4 text-center">
                <LoadingComponent h={false} />
                <h3 className="m-3 mb-0 justify-content-center">Verifying Payment...</h3>
            </div>
        </div>)


    if (status === "success") return (
        <div className="d-flex justify-content-center align-items-center z-1" style={{ height: "calc(100vh - 72px)" }}>
            <div className="border border-3 rounded-3 border-success bg-white bg-opacity-50 p-4 text-center">
                <h3 className="m-0 text-center text-success fw-bold">✅ Payment successful! Enrollment confirmed.</h3>
                <p className="mt-2 mb-0">You will be redirected to your <b>Dashboard</b> shortly...</p>
            </div>
        </div>
    )

    if (status === "failed")
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "calc(100vh - 72px)" }}>
                <div className="border border-3 rounded-3 border-danger bg-white bg-opacity-50 p-4 text-center">
                    <h3 className="m-0 text-center text-danger fw-bold" >❌ Payment failed or canceled.</h3>
                    <p className="mt-2 mb-0">Please try enrolling again.</p>
                </div>
            </div>
        )

    if (status === "NotFound") return <PageNotFound h={false} />;
}
