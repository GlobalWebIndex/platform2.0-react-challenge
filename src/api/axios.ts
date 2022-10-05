import axios, { AxiosRequestConfig } from 'axios';

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_API_KEY ? process.env.REACT_APP_API_KEY : '',
    },
});

axiosInstance.interceptors.request.use(
    (request: AxiosRequestConfig) => {
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 404) {
        }
        return Promise.reject(error);
    }
);
