import { useState, useCallback } from "react";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.thecatapi.com/v1/",
  headers: { "x-api-key": process.env.REACT_APP_API_KEY },
});

export const useAxios = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback((config) => {
    setLoading(true);
    instance
      .request(config)
      .then((res) => {
        console.log(res.config.url, res.status);
        setResponse(res.data);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return [response, error, loading, fetchData];
};
