import axios from 'axios';
import { API_KEY, BASE_URL } from '../constants/app';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-api-key': API_KEY,
  },
});

export default instance;
