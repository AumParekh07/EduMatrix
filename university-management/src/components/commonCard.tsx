import { useEffect, useState } from "react";
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
                url: `v1/admin/${apiEndPoint}`,
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

    useEffect(() => {
        fetchData();
    }, [apiEndPoint, reload]);

    if (loading) return <LoadingComponent />;
    if (error) return <ErrorComponent error={error} />;

    return (
        <div className="container card rounded-4 p-4 pb-0 my-4" data-aos="" data-aos-duration="">
            <div className="border-2 border-bottom p-2 pt-0 justify-content-between d-flex">
                <h2 className="mb-0 text-primary fw-bold">{title}</h2>
                <Link to={addPath} className="btn btn-outline-primary fw-semibold shadow-sm">
                    <Plus style={{ marginTop: "-4.5px", marginLeft: "-6px" }} /> {addLabel}
                </Link>
            </div>
            {loading ? <LoadingComponent h={false} /> :
                <div className="row card-body justify-content-center">
                    {items.map((item) => renderItem(item, () => setReload(!reload)))}
                </div>
            }
            <p className="text-center border-2 border-top p-2 p-0 rounded-bottom-4 fw-semibold">{totalLabel}: {items.length}</p>
        </div>
    );
}

export default FetchCardList;