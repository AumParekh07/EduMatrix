import { Modal } from "react-bootstrap";
import { Formik, Form, type FormikValues } from "formik";
import { SubmitButton } from "./helperComponents";
import { apiCall } from "../api/apiCaller";
import { errorToast, successToast } from "../helper/helperToast";

type EditModalProps<T extends FormikValues> = {
    title: string;
    show: boolean;
    onHide: () => void;
    initialValues: T;
    validationSchema: any;
    children: (args: {
        values: T;
        setFieldValue: (field: string, value: any) => void;
    }) => React.ReactNode;
    size?: 'sm' | 'lg',
    apiPath: string;
    reload: () => void;
};

export default function EditModal<T extends FormikValues>({
    title,
    show,
    onHide,
    initialValues,
    validationSchema,
    children,
    size,
    apiPath,
    reload
}: EditModalProps<T>) {

    async function handleSubmit(values: T) {
        try {
            const respons = await apiCall({
                method: "put",
                url: apiPath,
                data: values
            })
            successToast(respons?.message)
            onHide();
            reload();
        } catch (error: any) {
            errorToast(error || "Failed to update data");
        }
    }
    return (
        <Modal size={size} show={show} onHide={onHide} centered >
            <Modal.Header closeButton>
                <Modal.Title className="fw-bold text-primary">{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            {children({ values, setFieldValue })}
                            <div className="text-end">

                                <button type="button" className="me-2 btn btn-secondary fw-semibold shadow-sm" onClick={onHide} >
                                    Cancel
                                </button>
                                <SubmitButton title="Update" />

                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}
