import { useState, useEffect } from "react";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.thecatapi.com/v1/",
  headers: { "x-api-key": process.env.REACT_APP_API_KEY },
});

export const useAxios = (config, skipDataFetching) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof skipDataFetching === "undefined" || !skipDataFetching) {
      setLoading(true);
      instance
        .request(config)
        .then((res) => setResponse(res.data))
        .catch((err) => setError("err"))
        .finally(() => setLoading(false));
    }
  }, [config, skipDataFetching]);

  return [response, error, loading];
};
