import axios from "axios";
import { BASE_URL } from "../constants/api";

const instance = axios.create({
  baseURL: BASE_URL,
});

export default instance;
