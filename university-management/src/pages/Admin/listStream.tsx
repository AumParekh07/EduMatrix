import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import FetchCardList from "../../components/commonCard";
import EditModal from "../../components/editModal";
import StreamFormFields from "../../components/FormFields/streamFormFields";
import { streamSchema } from "../../helper/FormikValidation";
import DeleteModal from "../../components/deletModal";

export type Stream = {
    _id: string;
    name: string;
};

export function AdminStreams() {
    const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [reload, setReload] = useState(false);
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
                    <div key={stream._id} className="col-md-4 mb-3" data-aos="fade-up">
                        <div className="card cardbg rounded-4 shadow-sm hoverShadowMd">
                            <div className="card-body">
                                <div className="card-title  justify-content-between d-flex" >
                                    <h5 className="mb-0">{stream.name}</h5>
                                    <div>
                                        <Pencil className="btn p-0 me-2"
                                            onClick={() => {
                                                setSelectedStream(stream);
                                                setShowEditModal(true)
                                            }} />
                                        <Trash2 className="btn p-0"
                                            onClick={() => {
                                                setSelectedStream(stream);
                                                setShowDeleteModal(true)
                                            }} />
                                    </div>
                                </div>
                                <p className="card-text small"><strong>ID:</strong> {stream._id}</p>
                            </div>
                        </div>
                    </div>
                )}
            />

            {selectedStream && (
                <>
                    <EditModal
                        title="Edit Stream"
                        show={showEditModal}
                        onHide={() => setShowEditModal(false)}
                        initialValues={{ name: selectedStream.name }}
                        validationSchema={streamSchema}
                        apiPath={`v1/admin/update-stream/${selectedStream._id}`}
                        reload={triggerRefetch}
                        size="sm" >
                        {() => <StreamFormFields />}
                    </EditModal>

                    <DeleteModal
                        title="Delete Stream"
                        name={selectedStream.name}
                        apiPath={`delete-stream/${selectedStream._id}`}
                        show={showDeleteModal}
                        onHide={() => setShowDeleteModal(false)}
                        reload={triggerRefetch} />
                </>
            )}
        </>
    );
}