import { errorToast } from "./helperToast"

export function GetToken() {
    try {
        const token = localStorage.getItem("token")
        return token
    } catch (error: any) {
        errorToast(error);
        throw new Error(error);

    }

}

export function GetRole() {
    try {
        const role = localStorage.getItem("role")
        return role
    }
    catch (error: any) {
        errorToast(error);
        throw new Error(error);
    }
}