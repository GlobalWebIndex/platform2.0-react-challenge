import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function useData<T>(
  callback: () => Promise<T>,
  handleError?: () => void
) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const payload = await callback.call(null);

        setData(payload);
      } catch (error) {
        handleError?.();
      }
    }

    if (data === null) fetchData();
    // eslint-disable-next-line
  }, []);

  // Need this specific code structure
  // to achieve the desired typing
  if (data === null) {
    return [false, null] as const;
  }

  return [true, data] as const;
}

export function usePageTitle() {
  const location = useLocation();
  const title = location.pathname.substring(1);
  const defaultTitle = 'My Cat App';

  return title === '' || title.includes('images') ? defaultTitle : title;
}
