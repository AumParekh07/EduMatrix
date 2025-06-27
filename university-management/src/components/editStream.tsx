// components/EditStreamModal.tsx
import { Formik, Form } from "formik";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { token } from "./RoleBasedRoute";
import StreamFormFields from "./streamFromFields";
import { SubmitButton } from "./helperComponents";
import { errorToast, successToast } from "../helper/helperToast";
import { streamSchema } from "../helper/FormikValidation";


export default function EditStreamModal({ show, onHide, stream, refetch }: {
    show: boolean;
    onHide: () => void;
    stream: { _id: string; name: string };
    refetch: () => void;
}) {
    const handleSubmit = async (values: { name: string }) => {
        try {
            await axios.put(`http://localhost:3000/api/v1/admin/update-stream/${stream._id}`,
                values,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            ).then((response) => {
                successToast(response?.data?.message);
            }).catch((error) => {
                console.error('Error occurred while Updating Stream', error)
                errorToast(error.response?.data?.message);
            }).finally(() => {
                refetch();
                onHide();
            })
        } catch (error) {
            console.error("Update failed", error);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered >
            <Modal.Header closeButton>
                <Modal.Title className="fw-bold text-primary text-center">Edit Stream</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Formik
                    initialValues={{ name: stream.name }}
                    validationSchema={streamSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize >
                    <Form>
                        <StreamFormFields />
                        <div className="text-end">
                            <button className="me-2 btn btn-secondary fw-semibold shadow-sm" onClick={onHide} >
                                Cancel
                            </button>
                            <SubmitButton title="Update" />
                        </div>
                    </Form>
                </Formik>
            </Modal.Body>
        </Modal>
    );
}
