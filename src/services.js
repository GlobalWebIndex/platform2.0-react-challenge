import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.thecatapi.com/v1/",
  headers: { "x-api-key": process.env.REACT_APP_API_KEY },
});

const get = (url, params, ...rest) => {
  const config = { params, ...rest };
  return instance.get(url, config);
};

export const getImages = async (params, ...rest) => {
  const respose = await get("/images/search", params, ...rest);
  return respose;
};
