import { Modal } from "react-bootstrap";
import { Formik, Form, type FormikValues } from "formik";
import { SubmitButton } from "./helperComponents";

type EditModalProps<T extends FormikValues> = {
    title: string;
    show: boolean;
    onHide: () => void;
    initialValues: T;
    validationSchema: any;
    onSubmit: (values: T) => Promise<void>;
    children: (args: {
        values: T;
        setFieldValue: (field: string, value: any) => void;
    }) => React.ReactNode;
    size?: 'sm' | 'lg'
};

export default function EditModal<T extends FormikValues>({
    title,
    show,
    onHide,
    initialValues,
    validationSchema,
    onSubmit,
    children,
    size
}: EditModalProps<T>) {
    return (
        <Modal size={size} show={show} onHide={onHide} centered >
            <Modal.Header closeButton>
                <Modal.Title className="fw-bold text-primary text-center">{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
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
