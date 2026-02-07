import { Modal } from "react-bootstrap";
import { apiCall } from "../api/apiCaller";
import { errorToast, successToast } from "../helper/helperToast";
import { useNavigate } from "react-router-dom";

type DeleteModalProps = {
    title: string;
    show: boolean;
    name: string;
    onHide: () => void;
    apiPath: string;
    reload: () => void;
};

export default function DeleteModal({
    title,
    show,
    name,
    onHide,
    apiPath,
    reload
}: DeleteModalProps) {
    const navigate = useNavigate();

    async function deleteData() {
        try {
            const respons = await apiCall({
                method: 'delete',
                url: `v1/admin/${apiPath}`,
            })
            successToast(respons?.message);
            onHide();
            if (title.includes('University')) navigate(-1)
            else reload();
        } catch (error: any) {
            errorToast(error || "Delete failed");
        }
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title className="fw-bold text-primary text-center">{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="mb-2 text-danger fw-medium" >
                    Are you sure you want to <b>Delete {name}</b>?
                    <br />
                    <span className="text-muted fw-normal small mb-0">
                        This action cannot be undone.
                    </span>
                </p>
            </Modal.Body>
            <Modal.Footer>

                <button type="button" className="me-2 btn btn-secondary fw-semibold shadow-sm" onClick={onHide} >
                    Cancel
                </button>
                <button title="Delete" className="me-2 btn btn-danger fw-semibold shadow-sm" onClick={deleteData} >
                    Delete
                </button>
            </Modal.Footer>
        </Modal>
    )
}