import axios from "axios"
import { API_PATH, API_KEY } from "./constants"

export const fetchData = async (endpoint:string, config:object) => {
    return axios({
        url: `${API_PATH}${endpoint}`,
        headers: {'x-api-key': API_KEY},
        method: "get",
        responseType: "json",
        ...config
    });
};