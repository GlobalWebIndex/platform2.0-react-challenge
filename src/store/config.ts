
import Axios from "axios";

const apiKey = process.env.REACT_APP_X_API_KEY;

const apiBase = Axios.create({
  baseURL: "https://api.thecatapi.com",
  headers: { "x-api-key": apiKey  },
  responseType: "json",
  timeout: 4000,

});

export default apiBase;