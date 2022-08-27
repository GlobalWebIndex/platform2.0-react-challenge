import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY ? process.env.API_KEY : '',
    },
});

//TODO: interceptors?
