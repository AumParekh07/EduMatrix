import { ErrorMessage } from "formik";
import Select, { components } from "react-select";
import { ErrorComponent, InputFiled1, LoadingComponent, Preferencefield } from "../helperComponents";
import { customStyles } from "./courseFormFields";
import { useState, useEffect } from "react";
import type { Course } from "../../pages/Admin/listCourse";
import type { Stream } from "../../pages/Admin/listStream";
import type { Option } from "./courseFormFields";
import { apiCall } from "../../api/apiCaller";
import type { CourseDetail, UniversityI } from "../../helper/FormikValidation";

type Props = {
    values: any;
    setFieldValue: (field: string, value: any) => void;

    courseEnrollCounts?: { courseId: string; enrollCount: number }[];
};


const UniversityFormFields = ({ values, setFieldValue, courseEnrollCounts }: Props) => {

    const [stream, setStream] = useState<Stream[]>([]);
    const [course, setCourse] = useState<Course[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const fetchStream = async () => {
        setLoading(true);
        try {
            const res = await apiCall({
                method: "get",
                url: "/admin/get-streams"
            })
            setStream(res.data);
        } catch (err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCourse = async () => {
        setLoading(true);
        try {
            const res = await apiCall({
                method: 'get',
                url: "/admin/get-courses"
            })
            setCourse(res.data);
        } catch (err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchStream();
        fetchCourse();
    }, []);


    const streamOptions: Option[] = stream.map((stm) => ({
        label: stm.name,
        value: stm._id,
    }));

    // const courseOptions: Option[] = course.map((cou) => ({
    //     label: cou.name,
    //     value: cou._id,
    // }));

    // const courseOptions: Option[] = course.map(course => ({
    //     value: course._id,
    //     label: course.name,
    //     isFixed: courseEnrollCounts.some(c => c.courseId === course._id && c.enrollCount > 0),
    // }));
    const courseOptions: Option[] = course.map(course => ({
        value: course._id,
        label: course.name,
        isFixed: courseEnrollCounts?.some(c => c.courseId === course._id && c.enrollCount > 0),
    }));

    const handleCourseChange = (
        selected: Option[],
        values: UniversityI,
        setFieldValue: (field: string, value: any) => void,
        courseOptions: Option[]
    ) => {
        // All current options
        const currentSelectedOptions = courseOptions.filter(opt => values.course.includes(opt.value));

        // Get full selected options including fixed ones
        const fixedSelected = currentSelectedOptions.filter(opt => opt.isFixed);
        const newSelected = [...fixedSelected, ...selected.filter(opt => !opt.isFixed)];

        const newCourseIds = newSelected.map(item => item.value);
        setFieldValue("course", newCourseIds);

        const updatedCourseDetails = newCourseIds.map((id) => {
            const existing = values.courseDetails.find((cDetail) => cDetail.courseId === id);
            return existing || { courseId: id, fee: "", capacity: "" };
        });

        setFieldValue("courseDetails", updatedCourseDetails);
    };

    const MultiValueRemove = (props: any) => {
        if (props.data.isFixed) return null;
        return <components.MultiValueRemove {...props} />;
    };
    if (loading) return <LoadingComponent h={false} />;
    if (error) return <ErrorComponent error={error} hw={false} />;

    return (
        <div className="row">
            <div className="col-sm">
                <InputFiled1 title="Name" type="text" id="name" placeholder="Enter University Name " />
                <InputFiled1 title="Address" type="text" id="address.address" placeholder="Enter address" />
                <InputFiled1 title="City" type="text" id="address.city" placeholder="Enter city" />
                <InputFiled1 title="State" type="text" id="address.state" placeholder="Enter state" />
                <InputFiled1 title="Country" type="text" id="address.country" placeholder="Enter country" />
                <InputFiled1 title="Pincode" type="number" id="address.pincode" placeholder="Enter pincode" />
            </div>

            <div className="col-sm">
                <Preferencefield title="Job Placement Available" id1="jyes" id2="jno" labelHtmlFor="jobPlacement" />
                <Preferencefield title="Scholarship Available" id1="syes" id2="sno" labelHtmlFor="scholarship" />
                <Preferencefield title="Nearby University Available" id1="nyes" id2="nno" labelHtmlFor="nearbyUniversity" />
                <Preferencefield title="Transportation Available" id1="tyes" id2="tno" labelHtmlFor="transportation" />
                <Preferencefield title="Accommodation Available" id1="ayes" id2="ano" labelHtmlFor="accommodation" />

                <div className="mb-3">
                    <p className="form-label fw-semibold">Stream</p>
                    <Select
                        id="stream"
                        isMulti
                        placeholder="Select Stream"
                        name="stream"
                        options={streamOptions}
                        value={streamOptions.filter((opt) => values.stream.includes(opt.value))}
                        onChange={(selected) => {
                            setFieldValue("stream", selected.map((item: Option) => item.value));
                        }}
                        styles={customStyles}
                        classNamePrefix="coreui"
                        className="shadow-sm"
                    />
                    <ErrorMessage name="stream" component="div" className="error" />
                </div>

                <div className="mb-3">
                    <div> <p className="form-label fw-semibold">Course</p></div>
                    {/* <Select
                        isMulti
                        name="course"
                        placeholder="Select Course"
                        options={courseOptions}
                        value={courseOptions.filter((opt) => values.course.includes(opt.value))}
                        // onChange={(selected) => {
                        //     setFieldValue("course", selected.map((item: Option) => item.value));
                        // }}
                        // isOptionDisabled={(option) => {
                        //     const enrollData = values.courseEnrollCounts.find((c: { courseId: string; }) => c.courseId === option.value);
                        //     return enrollData?.enrollCount > 0; // or use >= capacity
                        // }}
                        onChange={(selected) => {
                            const selectedCourses = selected.map((item: Option) => item.value);
                            setFieldValue("course", selectedCourses);

                            const updatedCourseDetails = selectedCourses.map((id) => {
                                const existing = values.courseDetails.find((cDetail: CourseDetail) => cDetail.courseId === id);
                                return existing || { courseId: id, fee: "", capacity: "" };
                            });

                            setFieldValue("courseDetails", updatedCourseDetails);
                        }}

                        styles={customStyles}
                        classNamePrefix="coreui"
                        className="shadow-sm"
                    /> */}
                    <Select
                        isMulti
                        name="course"
                        options={courseOptions}
                        placeholder="Select Course"
                        value={courseOptions.filter(opt => values.course.includes(opt.value))}
                        onChange={(selected) =>
                            handleCourseChange(selected as Option[], values, setFieldValue, courseOptions)
                        }
                        styles={customStyles}
                        classNamePrefix="coreui"
                        className="shadow-sm"
                        components={{ MultiValueRemove }}
                    />

                    <ErrorMessage name="course" component="div" className="error" />
                </div>
                {values.course.length > 0 && (
                    <div className="mb-3">
                        <p className="form-label fw-semibold">Course Details</p>
                        <table className="table table-bordered">
                            <thead className="table-light">
                                <tr>
                                    <td className="fw-medium">Course</td>
                                    <td className="fw-medium">Fee</td>
                                    <td className="fw-medium">Capacity</td>
                                </tr>
                            </thead>
                            <tbody>
                                {values.courseDetails.map((detail: CourseDetail, idx: number) => {
                                    const courseName = courseOptions.find(c => c.value === detail.courseId)?.label || "Unknown";
                                    return (
                                        <tr key={detail.courseId}>
                                            <td>{courseName}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    min="3000"
                                                    className="form-control"
                                                    name={`courseDetails.${idx}.fee`}
                                                    value={detail.fee}
                                                    onChange={(e) => setFieldValue(`courseDetails.${idx}.fee`, e.target.value)}
                                                />
                                                <ErrorMessage name={`courseDetails.${idx}.fee`} component="div" className="error" />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    min="10"
                                                    className="form-control"
                                                    name={`courseDetails.${idx}.capacity`}
                                                    value={detail.capacity}
                                                    onChange={(e) => setFieldValue(`courseDetails.${idx}.capacity`, e.target.value)}
                                                />
                                                <ErrorMessage name={`courseDetails.${idx}.capacity`} component="div" className="error" />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                    </div>
                )}
            </div>
        </div>
    )
}

export default UniversityFormFields;
