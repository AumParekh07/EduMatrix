import { Link } from "react-router-dom"
import { ErrorMessage, Form, Formik } from "formik"
import { UniversityInitialValues, UniversitySchema } from "../../helper/FormikValidation";
import { CheckboxBtn, ErrorComponent, InputFiled1, LoadingComponent, Preferencefield, SubmitButton } from "../../components/helperComponents";
import { UniversityHandleSubmit } from "../../helper/SubmitHendle";
import axios from "axios";
import { useState, useEffect } from "react";
import { token } from "../../components/RoleBasedRoute";
import type { Stream } from "./listStream";
import type { Course } from "./listCourse";
import Select from "react-select";
import type { Option } from "./createCourse";
import { customStyles } from "../../components/courseFromFields";

export const CreateUniversity = () => {

    const [stream, setStream] = useState<Stream[]>([]);
    const [course, setCourse] = useState<Course[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const fetchStream = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:3000/api/v1/admin/get-streams", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setStream(res.data.data);
        } catch (err: any) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchCourse = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:3000/api/v1/admin/get-courses", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCourse(res.data.data);
        } catch (err: any) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchStream();
        fetchCourse();
    }, []);

    if (loading) return <LoadingComponent />;
    if (error) return <ErrorComponent error={error} />;
    const streamOptions: Option[] = stream.map((stm) => ({
        label: stm.name,
        value: stm._id,
    }));

    const courseOptions: Option[] = course.map((cou) => ({
        label: cou.name,
        value: cou._id,
    }));

    return (
        <div className="container-fluid pt-5 d-flex justify-content-center align-items-center ">
            <div className=" card shadow-lg p-4 w-100 rounded-4 " style={{ maxWidth: "750px" }} >

                <h2 className="text-center mb-4 fw-bold text-primary">Create University</h2>
                <Formik
                    initialValues={UniversityInitialValues}
                    validationSchema={UniversitySchema}
                    onSubmit={UniversityHandleSubmit}
                >
                    {({ values, setFieldValue }) => (
                        <Form id="UniversityForm">
                            <div className="row">
                                <div className="col">
                                    <InputFiled1 title="Name" type="text" id="name" placeholder="Enter University Name " />
                                    <InputFiled1 title="Address" type="text" id="address.address" placeholder="Enter address" />
                                    <InputFiled1 title="City" type="text" id="address.city" placeholder="Enter city" />
                                    <InputFiled1 title="State" type="text" id="address.state" placeholder="Enter state" />
                                    <InputFiled1 title="Country" type="text" id="address.country" placeholder="Enter country" />
                                    <InputFiled1 title="Pincode" type="number" id="address.pincode" placeholder="Enter pincode" />
                                </div>
                                <div className="col mt-3">
                                    <Preferencefield title="Need Job Placement" id1="jyes" id2="jno" labelHtmlFor="jobPlacement" />
                                    <Preferencefield title="Need Scholarship" id1="syes" id2="sno" labelHtmlFor="scholarship" />
                                    <Preferencefield title="Need Nearby University" id1="nyes" id2="nno" labelHtmlFor="nearbyUniversity" />
                                    <Preferencefield title="Need Transportation" id1="tyes" id2="tno" labelHtmlFor="transportation" />
                                    <Preferencefield title="Need Accommodation" id1="ayes" id2="ano" labelHtmlFor="accommodation" />

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Stream</label>

                                        <Select
                                            isMulti
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
                                        <label className="form-label fw-semibold">Course</label>
                                        <Select
                                            isMulti
                                            options={courseOptions}
                                            value={courseOptions.filter((opt) => values.course.includes(opt.value))}
                                            onChange={(selected) => {
                                                setFieldValue("course", selected.map((item: Option) => item.value));
                                            }}
                                            styles={customStyles}
                                            classNamePrefix="coreui"
                                            className="shadow-sm"
                                        />
                                        <ErrorMessage name="course" component="div" className="error" />
                                    </div>


                                </div>
                            </div>

                            <SubmitButton title="Create" />
                            {/* <button type='submit' className="btn btn-outline-primary fw-semibold shadow-sm" onSubmit={() => navigate('/admin/create-feeCapacity')}>
                            Create
                        </button> */}
                            <Link to="/admin/university" className="btn btn-outline-primary m-2 fw-semibold shadow-sm">View University</Link>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
};
