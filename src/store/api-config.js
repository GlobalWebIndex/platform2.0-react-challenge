import axios from "axios";

/**
 * Pass the necessary value that is going to be used
 * by ALL CALLS IN THE PROJECT
 */
const mainApiURL = process.env.REACT_APP_API_ENDPOINT;

/**
 * if you want to override then do
 * e.g fetchData("/api/home", {method: 'post'})
 */
export const fetchData = async (endPoint = "", config) => {
  return axios({
    url: `${mainApiURL}${endPoint}`,
    method: "get",
    responseType: "json",
    ...config,
  });
};

/* If needed un-comment but read axios docs
axios.interceptors.response.use(response => {});
*/
