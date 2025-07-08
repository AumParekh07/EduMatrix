import { InputFiled1 } from "../helperComponents";

export default function SubjectFormFields() {
    return (
        <>
            <InputFiled1 title="Name" type="text" id="name" placeholder="Enter Subject Name " />
            <InputFiled1 title="FullName" type="text" id="fullname" placeholder="Enter Subject Fullname" />
        </>
    )
}