import axios from 'axios';
import qs from 'qs';

axios.defaults.baseURL = process.env.REACT_APP_CAT_API_ENDPOINT;
axios.defaults.headers.common['x-api-key'] =
  process.env.REACT_APP_CAT_API_KEY || '';

function assertData() {
  return axios.create({
    timeout: 0,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  });
}

const Data = assertData();

Data.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { Data };
