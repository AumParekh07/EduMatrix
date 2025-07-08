import { InputFiled1 } from "../helperComponents";

export default function FeeCapacityFields() {
    return (
        <>
            <InputFiled1 title="Fee" type="number" min="3000" id="fee" placeholder="Enter Course Fee" />
            <InputFiled1 title="Student Capacity" type="number" min="10" id="capacity" placeholder="Enter Student Capacity" />
        </>
    )
}