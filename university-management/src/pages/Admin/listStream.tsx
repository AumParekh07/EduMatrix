import { Pencil, Trash2 } from "lucide-react";
import FetchCardList from "../../components/commonCard";
import ConfirmDeleteToast from "../../components/deleteToast";
import { useState } from "react";
import EditModal from "../../components/editModal";
import StreamFormFields from "../../components/streamFromFields";
import { streamSchema } from "../../helper/FormikValidation";
import { apiCall } from "../../api/apiCaller";
import { errorToast, successToast } from "../../helper/helperToast";
import type { FormikValues } from "formik";

export type Stream = {
    _id: string;
    name: string;
};

export function AdminStreams() {
    const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [reload, setReload] = useState(false);

    async function handleEdit(values: FormikValues) {
        try {
            const respons = await apiCall({
                method: "put",
                url: `/admin/update-stream/${selectedStream?._id}`,
                data: values
            })
            successToast(respons?.message)
        } catch (error: any) {
            errorToast(error || "Failed to fetch data");
        }
        triggerRefetch();
        setShowModal(false);
    };

    const triggerRefetch = () => setReload((prev) => !prev);

    return (
        <>
            <FetchCardList<Stream>
                key={reload ? 'reload-1' : 'reload-0'}
                title="All Streams"
                addLabel="Stream"
                addPath="/admin/create-stream"
                apiEndPoint="get-streams"
                totalLabel="Total Stream"
                renderItem={(stream) => (
                    <div key={stream._id} className="col-md-4 mb-3">
                        <div className="card shadow" style={{ backgroundColor: "#e4eaf2" }}>
                            <div className="card-body">
                                <div className="card-title  justify-content-between d-flex" >
                                    <h5 className="mb-0">{stream.name}</h5>
                                    <div>
                                        <Pencil className="btn p-0 me-2"
                                            onClick={() => {
                                                setSelectedStream(stream);
                                                setShowModal(true)
                                            }} />
                                        <Trash2 className="btn p-0"
                                            onClick={() => ConfirmDeleteToast({
                                                name: stream.name,
                                                apiPath: `delete-stream/${stream._id}`,
                                                toastId: 'delete stream',
                                                refetch: triggerRefetch,
                                            })} />
                                    </div>
                                </div>
                                <p className="card-text small"><strong>ID:</strong> {stream._id}</p>
                            </div>
                        </div>
                    </div>
                )}
            />

            {selectedStream && (
                <EditModal
                    title="Edit Stream"
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    initialValues={{ name: selectedStream.name }}
                    validationSchema={streamSchema}
                    onSubmit={handleEdit}
                    size="sm"
                >
                    {() => <StreamFormFields />}
                </EditModal>
            )}
        </>
    );
}
