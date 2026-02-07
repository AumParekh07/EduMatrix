import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import FetchCardList from "../../components/commonCard";
import EditModal from "../../components/editModal";
import { subjectSchema } from "../../helper/FormikValidation";
import SubjectFormFields from "../../components/FormFields/subjectFormFields";
import DeleteModal from "../../components/deletModal";

export type Subject = {
    _id: string;
    name: string;
    fullName: string;
};

export function AdminSubjects() {
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [reload, setReload] = useState(false);

    const triggerReload = () => setReload((prev) => !prev);
    return (
        <>
            <FetchCardList<Subject>
                key={reload ? "reload-1" : "reload-0"}
                title="All Subjects"
                addLabel="Subject"
                addPath="/admin/create-subject"
                apiEndPoint="get-subjects"
                totalLabel="Total Subject"
                renderItem={(subject) => (
                    <div key={subject._id} className="col-md-4 mb-3" data-aos="fade-up">
                        <div className="card cardbg shadow-sm hoverShadowMd rounded-4 ">
                            <div className="card-body">
                                <div className="card-title justify-content-between d-flex" >
                                    <h5 className="mb-0">{subject.name}</h5>
                                    <div>
                                        <Pencil className="btn p-0 me-2"
                                            onClick={() => {
                                                setSelectedSubject(subject);
                                                setShowEditModal(true)
                                            }} />
                                        <Trash2 className="btn p-0"
                                            onClick={() => {
                                                setSelectedSubject(subject);
                                                setShowDeleteModal(true)
                                            }} />
                                    </div>
                                </div>
                                <p className="card-text"><strong>Full Name:</strong> {subject.fullName}</p>
                                <p className="card-text small"><strong>ID:</strong> {subject._id}</p>
                            </div>
                        </div>
                    </div>
                )}
            />


            {selectedSubject && (
                <>
                    <EditModal
                        title="Edit Subject"
                        apiPath={`v1/admin/update-subject/${selectedSubject._id}`}
                        initialValues={{ name: selectedSubject.name, fullname: selectedSubject.fullName }}
                        validationSchema={subjectSchema}
                        show={showEditModal}
                        onHide={() => setShowEditModal(false)}
                        reload={triggerReload}
                    >
                        {() => <SubjectFormFields />}
                    </EditModal>

                    <DeleteModal
                        title="Delete Subject"
                        name={selectedSubject.name}
                        apiPath={`delete-subject/${selectedSubject._id}`}
                        show={showDeleteModal}
                        onHide={() => setShowDeleteModal(false)}
                        reload={triggerReload} />
                </>
            )}
        </>
    );
}