import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useWindowDimensions() {

  const hasWindow = typeof window !== 'undefined';

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
}

// I created a centralized function for requests call but the lines of code were larger in each controller so i haven't used it
export function makeRequest(method , url, data, params, headers, responseCallback, catchCallback) {
  axios({
    method: method,
    url: url,
    data: data,
    headers: headers,
    params: params,
  }).then((response) => {
    responseCallback(response);
  }).catch((error) => {
    catchCallback(error)
  })
}
