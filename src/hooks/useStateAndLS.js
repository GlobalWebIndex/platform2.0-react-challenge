import { useState, useEffect } from "react";

function getStorageValue(key, defaultValue) {
  const value = localStorage.getItem(key);
  const parsedValue = JSON.parse(value);
  return parsedValue || defaultValue;
}

export function useStateAndLS(key, defaultValue) {
  const [value, setValue] = useState(() => getStorageValue(key, defaultValue));

  const clearValue = () => {
    setValue(defaultValue);
    localStorage.removeItem(key);
  };

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue, clearValue];
}
