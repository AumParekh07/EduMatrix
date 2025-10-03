import axios from 'axios';
import { GetToken } from '../helper/getAuth';

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3007/api/";
const axiosInstance = axios.create({
    baseURL: backendUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = GetToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
