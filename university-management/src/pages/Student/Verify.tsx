import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiCall } from "../../api/apiCaller";
import { errorToast } from "../../helper/helperToast";
import { ErrorComponent, LoadingComponent } from "../../components/helperComponents";

type Status = "loading" | "success" | "failed";

export default function Verify() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState<Status>("loading");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        const success = searchParams.get("success");
        const session_id = searchParams.get("session_id");

        if (success === "true" && session_id) {
            (async () => {
                try {
                    const response = await apiCall({
                        method: "get",
                        url: "v1/student/verifystripe",
                        params: { session_id },
                    });

                    if (response.success) {
                        setStatus("success");
                        setTimeout(() => {
                            navigate("/dashboard");
                        }, 4000);
                    }
                    else {
                        setStatus("failed");
                        const msg = response.message || "Payment verification failed.";
                        setError(msg);
                        errorToast(msg);
                        if (response.data.universityID) {
                            setTimeout(() => {
                                navigate(`/university/${response.data.universityID}`);
                            }, 4000);
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
        } else {
            setStatus("failed");
            setLoading(false);
        }
    }, []);

    if (error) return <ErrorComponent error={error} />
    if (loading) return (
        <div className="d-flex justify-content-center align-items-center z-1" style={{ height: "calc(100vh - 57.6px)" }}>
            <div className="border border-3 rounded-3 border-primary bg-white bg-opacity-50 p-4 text-center">
                <LoadingComponent h={false} />
                <h3 className="m-3 mb-0 justify-content-center">Verifying Payment...</h3>
            </div>
        </div>)


    if (status === "success") return (
        <div className="d-flex justify-content-center align-items-center z-1" style={{ height: "calc(100vh - 57.6px)" }}>
            <div className="border border-3 rounded-3 border-success bg-white bg-opacity-50 p-4 text-center">
                <h3 className="m-0 text-center text-success fw-bold">✅ Payment successful! Enrollment confirmed.</h3>
            </div>
        </div>
    )
    if (status === "failed")
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "calc(100vh - 57.6px)" }}>
                <div className="border border-3 rounded-3 border-danger bg-white bg-opacity-50 p-4 text-center">
                    <h3 className="m-0 text-center text-danger fw-bold" >❌ Payment failed or canceled.</h3>
                </div>
            </div>
        )
}
