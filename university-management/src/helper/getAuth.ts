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

export const isTokenExpired = (): boolean => {
    try {
        const token = GetToken() || "";
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);

        return payload.exp < currentTime;
    } catch (e) {
        return true; // consider invalid token as expired
    }
};