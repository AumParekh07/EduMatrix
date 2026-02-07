import axiosInstance from './axiosInstance';

interface ApiCallOptions {
    method: 'get' | 'post' | 'put' | 'delete';
    url: string;
    data?: any;
    params?: any;
    headers?: any;
}

export const apiCall = async ({ method, url, data, params, headers }: ApiCallOptions) => {
    try {
        const response = await axiosInstance({
            method,
            url,
            data,
            params,
            headers,
        });
        return response?.data;

    } catch (error: any) {
        console.error(error);
        throw error.response?.data?.message || error?.message || 'Something went wrong';
    }
};