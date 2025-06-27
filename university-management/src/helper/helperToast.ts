import { Slide, toast } from "react-toastify";

export const successToast = (message: string) => {
    toast.success(message || "Successful!", {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        progress: undefined,
        theme: 'colored',
        transition: Slide,
    });
}
export const errorToast = (message: string, toastId?: string) => {
    toast.error(message || "Error Occurred.Please Try Again Later!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
        toastId: toastId,
    });
}

