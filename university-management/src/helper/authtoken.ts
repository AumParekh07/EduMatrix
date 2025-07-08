import { errorToast } from "./helperToast"

function GetToken() {
    try {
        const token = localStorage.getItem("token")
        return token
    } catch (error: any) {
        errorToast(error);
        throw new Error(error);

    }

}
export default GetToken