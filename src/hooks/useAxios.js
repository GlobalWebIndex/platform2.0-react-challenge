import { useReducer, useCallback } from "react";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.thecatapi.com/v1/",
  headers: { "x-api-key": process.env.REACT_APP_API_KEY },
});

export const useAxios = (config, defaultValue) => {
  const initialValues = {
    response: null,
    error: null,
    loading: false,
  };

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "LOADING":
        return { ...state, loading: true };
      case "SET_DATA":
        let data = action.payload.response;
        if (Array.isArray(action.payload.response)) {
          if (state.response) {
            data = [...state?.response, ...action.payload.response];
          } else {
            data = [...action.payload.response];
          }
        }
        return {
          ...state,
          response: data,
        };
      case "ERROR":
        return { ...state, error: action.payload.error };
      case "COMPLETE":
        return { ...state, loading: false };
      case "RESET":
        return initialValues;
      default:
        return state;
    }
  }, initialValues);

  const fetchData = useCallback((config) => {
    dispatch({ type: "LOADING" });
    instance
      .request(config)
      .then((res) => {
        console.log(res.config.url, res.status, res.data);
        dispatch({ type: "SET_DATA", payload: { response: res.data } });
      })
      .catch((err) => dispatch({ type: "ERROR", payload: { error: err } }))
      .finally(() => dispatch({ type: "COMPLETE" }));
  }, []);

  const reset = () => dispatch({ type: "RESET" });

  return [state.response, state.error, state.loading, fetchData, reset];
};
