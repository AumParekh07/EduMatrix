import { InputField } from "../helperComponents";

export default function SubjectFormFields() {
    return (
        <>
            <InputField title="Name" type="text" id="name" placeholder="Enter Subject Name " />
            <InputField title="FullName" type="text" id="fullname" placeholder="Enter Subject Fullname" />
        </>
    )
}