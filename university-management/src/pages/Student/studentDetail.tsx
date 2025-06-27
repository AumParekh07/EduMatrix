import { ErrorMessage, Field, Form, Formik } from "formik";

import { InputFiled1, Preferencefield, SubmitButton } from "../../components/helperComponents";
import { StdDetailInitialValues, StdSchema } from "../../helper/FormikValidation";
import { StdHandleSubmit } from "../../helper/SubmitHendle";



export function StdDetail() {

    return (
        <div className=" container  p-4 pb-0  d-flex justify-content-center align-items-center" >
            <div className=" card shadow-lg p-4 pb-1 w-100 " style={{ maxWidth: "850px", }} >
                <h2 className="text-center card-header mb-4 fw-bold text-primary" >Student Details</h2>
                <Formik
                    initialValues={StdDetailInitialValues}
                    validationSchema={StdSchema}
                    onSubmit={StdHandleSubmit}
                >
                    <Form id="stdDetailForm">
                        <div className="row">
                            <div className="col-md-6">

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">  Gender:</label><br />
                                    <div className="form-check form-check-inline">
                                        <Field type="radio" name="gender" value="Male" className="form-check-input" id="male" />
                                        <label htmlFor="male" className="form-check-label">Male</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <Field type="radio" name="gender" value="Female" className="form-check-input" id="female" />
                                        <label htmlFor="female" className="form-check-label">Female</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <Field type="radio" name="gender" value="Others" className="form-check-input" id="others" />
                                        <label htmlFor="others" className="form-check-label">Others</label>
                                    </div>
                                    <ErrorMessage name="gender" component="div" className="error" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">  Birth Date:</label>
                                    <Field type="date" name="birthDate" className="form-control" max="2005-12-31" />
                                    <ErrorMessage name="birthDate" component="div" className="error" />
                                </div>


                                <InputFiled1 title="Address" type="text" id="address.address" placeholder="Enter address" />
                                <InputFiled1 title="City" type="text" id="address.city" placeholder="Enter city" />
                                <InputFiled1 title="State" type="text" id="address.state" placeholder="Enter state" />
                                <InputFiled1 title="Country" type="text" id="address.country" placeholder="Enter country" />
                                <InputFiled1 title="Pincode" type="number" id="address.pincode" placeholder="Enter pincode" />
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Stream:</label>
                                    <Field as="select" name="stream" className="form-select">
                                        <option value="" disabled hidden>---Select Your Stream---</option>
                                        <option value="681d97af40bddaf9a63d9336">Science</option>
                                        <option value="681d97f940bddaf9a63d9338">Commerce</option>
                                        <option value="681d980140bddaf9a63d933a">Arts</option>
                                    </Field>
                                    <ErrorMessage name="stream" component="div" className="error" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">  Course Type:</label>
                                    <Field as="select" name="preference.courseType" className="form-select">
                                        <option value="" disabled hidden>---Select Course Type---</option>
                                        <option value="FullTime">FullTime</option>
                                        <option value="PartTime">PartTime</option>
                                        <option value="ELearning">E Learning</option>
                                    </Field>
                                    <ErrorMessage name="preference.courseType" component="div" className="error" />
                                </div>
                                <InputFiled1 title="Profession" type="text" id="preference.profession" placeholder="Enter Profession" />

                                <Preferencefield title="Need Job Placement" id1="jyes" id2="jno" labelHtmlFor="preference.jobPlacement" />
                                <Preferencefield title="Need Scholarship" id1="syes" id2="sno" labelHtmlFor="preference.scholarship" />
                                <Preferencefield title="Need Nearby University" id1="nyes" id2="nno" labelHtmlFor="preference.nearbyUniversity" />
                                <Preferencefield title="Need Transportation" id1="tyes" id2="tno" labelHtmlFor="preference.transportation" />
                                <Preferencefield title="Need Accommodation" id1="ayes" id2="ano" labelHtmlFor="preference.accommodation" />



                                <div className="mb-3">
                                    <label className="form-label fw-semibold">  Your Fee Range:</label>
                                    <div className="row g-2">
                                        <div className="col">
                                            <Field type="number" name="preference.minFee" className="form-control shadow-sm" placeholder="Minimum Fee" min="3000" />
                                            <ErrorMessage name="preference.minFee" component="div" className="error" />
                                        </div>
                                        <div className="col">
                                            <Field type="number" name="preference.maxFee" className="form-control shadow-sm" placeholder="Maximum Fee" />
                                            <ErrorMessage name="preference.maxFee" component="div" className="error" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <SubmitButton title="Update" />

                    </Form>
                </Formik>

            </div>
        </div>
    )
}