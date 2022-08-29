import axios, { AxiosRequestConfig } from 'axios';

export const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY ? process.env.API_KEY : '',
    },
});

// axiosInstance.interceptors.request.use(
//     (request: AxiosRequestConfig) => {
//         request.headers.common['Accept'] = `application/json`;
//         console.log('request sent');
//         // must return request
//         return request;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// axiosInstance.interceptors.response.use(
//     (response) => {
//         console.log('got response');
//         return response;
//     },
//     (error) => {
//         console.log(error.response);
//         if (error.response.status === 404) {
//             // do something
//             console.log('NOT FOUND');
//         }
//         return Promise.reject(error);
//     }
// );
