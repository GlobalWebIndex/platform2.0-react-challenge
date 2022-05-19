import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

const client = axios.create({
  baseURL: 'https://api.thecatapi.com/v1/',
  headers: {
    'x-api-key': process.env.X_API_KEY as string,
  },
});

const onSuccess = (response: AxiosResponse) => response.data;

const onError = (error: AxiosError) => {
  toast.error(`${error.message}. Please try again.`);

  return Promise.reject(error.response || error.message);
};

const requestWithErrorHandling = (options: AxiosRequestConfig<any>) =>
  client(options).then(onSuccess).catch(onError);

export default requestWithErrorHandling;
