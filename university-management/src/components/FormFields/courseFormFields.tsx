import { ErrorMessage } from "formik";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import { ErrorComponent, InputField, LoadingComponent } from "../helperComponents";
import { useEffect, useState } from "react";
import type { Subject } from "../../pages/Admin/listSubject";
import { apiCall } from "../../api/apiCaller";
import { errorToast } from "../../helper/helperToast";

export type Option = {
    value: string;
    label: string;
    isFixed?: boolean
};

type Props = {
    values: {
        courseType: string;
        subjects: {
            compulsory: string[];
            optional: string[];
        };
    };
    setFieldValue: (field: string, value: any) => void;
};
export const customStyles = {
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
export const courseTypeOptions = [
    { value: "FullTime", label: "Full-Time" },
    { value: "PartTime", label: "Part-Time" },
    { value: "E Learning", label: "E Learning" },
];
const animatedComponents = makeAnimated();
export default function CourseFormFields({ values, setFieldValue }: Props) {


    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function fetchSubjects() {
        setLoading(true);
        try {
            const res = await apiCall({
                method: "get",
                url: "v1/admin/get-subjects"
            })
            setSubjects(res.data);
        } catch (err: any) {
            setError(err || err.message);
            errorToast(err || err.message)
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchSubjects();
    }, []);


    const subjectOptions: Option[] = subjects.map((sub) => ({
        label: `${sub.fullName} (${sub.name})`,
        value: sub._id,
    }));

    const compulsorySelected = subjectOptions.filter(opt =>
        values.subjects.compulsory.includes(opt.value)
    );
    const optionalSelected = subjectOptions.filter(opt =>
        values.subjects.optional.includes(opt.value)
    );

    if (loading) return <LoadingComponent h={false} />;
    if (error) return <ErrorComponent error={error} hw={false} />;
    return (
        <>
            <div className="row">
                <div className="col-sm">
                    <InputField title="Name" type="text" id="name" placeholder="Enter Course Name" />
                    <InputField title="Full Name" type="text" id="fullname" placeholder="Enter Course Full Name" />
                </div>

                <div className="col-sm">
                    <div className="mb-3">
                        <p className="form-label fw-semibold">Course Type:</p>
                        <Select
                            name="courseType"
                            placeholder='Select Course Type'
                            options={courseTypeOptions}
                            value={courseTypeOptions.find(option => option.value === values.courseType)}
                            // onChange={(selected) => setFieldValue("courseType", selected?.value)}
                            onChange={(selected) =>
                                setFieldValue("courseType", (selected as Option)?.value)
                            }
                            classNamePrefix="coreui"
                            styles={customStyles}
                            className="shadow-sm"
                        />

                        {/* <Field as="select" name="courseType" className="form-select">
                            <option value="" disabled hidden>---Select Course Type---</option>
                            <option value="FullTime">Full-Time</option>
                            <option value="PartTime">Part-Time</option>
                            <option value="E Learning">E Learning</option>
                        </Field> */}
                        <ErrorMessage name="courseType" component="div" className="error" />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md">
                    <div className="mb-3">
                        <p className="form-label fw-semibold">Compulsory Subjects:</p>
                        <Select
                            isMulti
                            name="subjects.compulsory"
                            components={animatedComponents}
                            placeholder="Select Compulsory Subjects"
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
                        <p className="form-label fw-semibold">Optional Subjects:</p>
                        <Select
                            isMulti
                            name="subjects.optional"
                            components={animatedComponents}
                            placeholder="Select Optional Subjects"
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
