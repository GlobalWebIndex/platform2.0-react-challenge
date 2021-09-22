import { useEffect, useCallback } from "react";
import { useAxios } from "../hooks/useAxios";
import { useStateAndLS } from "../hooks/useStateAndLS";

export const useFetchAndSave = (name, config) => {
  const [storedValues, setValues, clearValues] = useStateAndLS(name, []);
  const [response, error, loading, fetchValues] = useAxios();

  const fetch = useCallback(() => fetchValues(config), [config, fetchValues]);

  useEffect(() => {
    if (response) setValues(response);
  }, [response, setValues]);

  useEffect(() => {
    if (storedValues?.length === 0) fetch();
  }, [storedValues, fetch]);

  return [storedValues, error, loading, fetch, clearValues];
};
