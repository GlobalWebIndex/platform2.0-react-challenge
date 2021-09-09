import { useEffect, useState } from 'react';
import { Client } from '../../api';

type SearchResult<T> = [T | null, boolean, Error | null];

export const useFindItem = <T>(id: string, dataById: Record<string, T>, endpoint: string): SearchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (id in dataById) {
      setData(dataById[id]);
    } else {
      setLoading(true);

      Client.get<T>({ endpoint })
        .then((response) => {
          setLoading(false);
          setData(response.data);
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
        });
    }
  }, []);

  return [data, loading, error];
};
