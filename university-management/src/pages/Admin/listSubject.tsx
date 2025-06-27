import { Pencil, Trash2 } from "lucide-react";
import FetchCardList from "../../components/commonCard";
import ConfirmDeleteToast from "../../components/deleteToast";
import { useState } from "react";
import EditModal from "../../components/editModal";
import { subjectSchema } from "../../helper/FormikValidation";
import SubjectFormFields from "../../components/subjectFromFields";
import type { FormikValues } from "formik";
import { apiCall } from "../../api/apiCaller";
import { successToast, errorToast } from "../../helper/helperToast";


export type Subject = {
    _id: string;
    name: string;
    fullName: string;
};

export function AdminSubjects() {
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [reload, setReload] = useState(false);

    const triggerRefetch = () => setReload((prev) => !prev);
    async function handleEdit(values: FormikValues) {
        try {
            const respons = await apiCall({
                method: "put",
                url: `/admin/update-subject/${selectedSubject?._id}`,
                data: values
            })
            successToast(respons?.message)
        } catch (error: any) {
            errorToast(error || "Failed to fetch data");
        }
        triggerRefetch();
        setShowModal(false);
    };
    return (
        <>
            <FetchCardList<Subject>
                key={reload ? "reload-1" : "reload-0"}
                title="All Subjects"
                addLabel="Subject"
                addPath="/admin/create-subject"
                apiEndPoint="get-subjects"
                totalLabel="Total Subject"
                renderItem={(subject, refetch) => (
                    <div key={subject._id} className="col-md-4 mb-3">
                        <div className="card shadow h-100" style={{ backgroundColor: "#e4eaf2" }}>
                            <div className="card-body">
                                <div className="card-title justify-content-between d-flex" >
                                    <h5 className="mb-0">{subject.name}</h5>
                                    <div>
                                        <Pencil className="btn p-0 me-2"
                                            onClick={() => {
                                                setSelectedSubject(subject);
                                                setShowModal(true)
                                            }} />
                                        <Trash2 className="btn p-0"
                                            onClick={() => ConfirmDeleteToast({
                                                name: subject.name,
                                                apiPath: `delete-subject/${subject._id}`,
                                                toastId: 'delete subject',
                                                refetch,
                                            })} />

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
                <EditModal
                    title="Edit Subject"
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    initialValues={{ name: selectedSubject.name, fullname: selectedSubject.fullName }}
                    validationSchema={subjectSchema}
                    onSubmit={handleEdit}

                >
                    {() => <SubjectFormFields />}
                </EditModal>
            )}
        </>
    );
}
