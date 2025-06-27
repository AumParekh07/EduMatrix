// components/CourseFormFields.tsx
import { Field, ErrorMessage } from "formik";
import Select from "react-select";
import type { Option } from "../pages/Admin/createCourse";

type Props = {
    subjectOptions: Option[];
    values: {
        subjects: {
            compulsory: string[];
            optional: string[];
        };
    };
    setFieldValue: (field: string, value: any) => void;
};

export default function CourseFormFields({ subjectOptions, values, setFieldValue }: Props) {
    const compulsorySelected = subjectOptions.filter(opt =>
        values.subjects.compulsory.includes(opt.value)
    );
    const optionalSelected = subjectOptions.filter(opt =>
        values.subjects.optional.includes(opt.value)
    );

    const customStyles = {
        multiValue: (base: any) => ({
            ...base,
            backgroundColor: '#73cef8c9',
            borderRadius: '17px',
            padding: '2px 4px'
        }),
        multiValueLabel: (base: any) => ({
            ...base,
            fontWeight: '630',
        }),
        multiValueRemove: (base: any) => ({
            ...base,
            borderRadius: '17px',
        }),
        option: (base: any) => ({
            ...base,
            fontWeight: '530',
        }),
    };

    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-semibold">Name</label>
                        <Field type="text" id="name" name="name" className="form-control shadow-sm" placeholder="Enter Course Name" />
                        <ErrorMessage name="name" component="div" className="error" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="fullname" className="form-label fw-semibold">Full Name</label>
                        <Field type="text" id="fullname" name="fullname" className="form-control shadow-sm" placeholder="Enter Course Full Name" />
                        <ErrorMessage name="fullname" component="div" className="error" />
                    </div>
                </div>

                <div className="col">
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Course Type:</label>
                        <Field as="select" name="courseType" className="form-select">
                            <option value="" disabled hidden>---Select Course Type---</option>
                            <option value="FullTime">Full-Time</option>
                            <option value="PartTime">Part-Time</option>
                            <option value="E Learning">E Learning</option>
                        </Field>
                        <ErrorMessage name="courseType" component="div" className="error" />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Compulsory Subjects:</label>
                        <Select
                            isMulti
                            name="subjects.compulsory"
                            options={subjectOptions.map(opt => ({
                                ...opt,
                                isDisabled: values.subjects.optional.includes(opt.value),
                            }))}
                            value={compulsorySelected}
                            onChange={(selected) =>
                                setFieldValue("subjects.compulsory", selected.map((item) => item.value))
                            }
                            classNamePrefix="coreui"
                            styles={customStyles}
                            className="shadow-sm"
                        />
                        <ErrorMessage name="subjects.compulsory" component="div" className="error" />
                    </div>
                </div>

                <div className="col">
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Optional Subjects:</label>
                        <Select
                            isMulti
                            name="subjects.optional"
                            options={subjectOptions.map(opt => ({
                                ...opt,
                                isDisabled: values.subjects.compulsory.includes(opt.value),
                            }))}
                            value={optionalSelected}
                            onChange={(selected) =>
                                setFieldValue("subjects.optional", selected.map((item) => item.value))
                            }
                            classNamePrefix="coreui"
                            styles={customStyles}
                            className="shadow-sm"
                        />
                        <ErrorMessage name="subjects.optional" component="div" className="error" />
                    </div>
                </div>
            </div>
        </>
    );
}
