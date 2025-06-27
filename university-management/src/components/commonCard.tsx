import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

import { LoadingComponent, ErrorComponent } from "./helperComponents";
import { apiCall } from "../api/apiCaller";
import { errorToast } from "../helper/helperToast";

type FetchCardListProps<T> = {
    title: string;
    addLabel: string;
    addPath: string;
    apiEndPoint: string;
    renderItem: (item: T, refetch: () => void) => React.ReactNode;
    totalLabel: string;
};

function FetchCardList<T>({
    title,
    addLabel,
    addPath,
    apiEndPoint,
    renderItem,
    totalLabel,
}: FetchCardListProps<T>) {
    const [items, setItems] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [reload, setReload] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const Response = await apiCall({
                method: "get",
                url: `/admin/${apiEndPoint}`,
            });

            setItems(Response.data);

        } catch (err: any) {
            const msg = err || "Failed to fetch data";
            setError(msg);
            errorToast(msg);
        } finally {
            setLoading(false);
        }
    };

    const hasFetched = useRef(false);

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            fetchData();
        }
    }, [apiEndPoint, reload]);

    if (loading) return <LoadingComponent />;
    if (error) return <ErrorComponent error={error} />;

    return (
        <div className="container card p-4 pb-0 my-4">
            <div className="card-header justify-content-between d-flex">
                <h2 className="mb-0">{title}</h2>
                <Link to={addPath} className="btn btn-outline-primary fw-semibold shadow-sm">
                    <Plus style={{ marginTop: "-4.5px", marginLeft: "-6px" }} /> {addLabel}
                </Link>
            </div>
            <div className="row card-body justify-content-center">
                {items.map((item) => renderItem(item, () => setReload(!reload)))}
            </div>
            <p className="text-center card-footer fw-semibold">{totalLabel}: {items.length}</p>
        </div>
    );
}

export default FetchCardList;
