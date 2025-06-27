import { Slide, toast } from "react-toastify";

import { errorToast, successToast } from "../helper/helperToast";
import { apiCall } from "../api/apiCaller";

type ConfirmToastProps = {
    name: string;
    apiPath: string;
    toastId: string;
    refetch: () => void;
};

function ConfirmDeleteToast({ name, apiPath, toastId, refetch }: ConfirmToastProps) {
    toast(
        ({ closeToast }) => (
            <div>
                <p className="mb-2 text-danger fw-medium" >
                    Are You Sure You Want To Delete <strong>{name}</strong>?
                </p>
                < div className="d-flex justify-content-end" >
                    <button className="btn btn-sm btn-secondary me-2 fw-semibold" onClick={closeToast} >
                        Cancel
                    </button>
                    <button className="btn btn-sm btn-danger fw-semibold"
                        onClick={async () => {
                            try {
                                await apiCall({
                                    method: 'delete',
                                    url: `/admin/${apiPath}`,
                                })
                                closeToast();
                                successToast(`${name} Deleted Successfully`)
                                refetch();
                            } catch (err: any) {
                                errorToast(err.response?.data?.message || "Delete failed");
                                refetch();
                            }
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        ),
        {
            position: "top-center",
            autoClose: false,
            closeOnClick: false,
            closeButton: false,
            transition: Slide,
            toastId: toastId,

        }
    );
}

export default ConfirmDeleteToast