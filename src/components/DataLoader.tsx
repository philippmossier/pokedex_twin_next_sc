import React, { useState, useEffect, ReactNode, SetStateAction } from 'react';
import { ErrorIndicator } from './ErrorIndicator';
import { LoadingIndicator } from './LoadingIndicator';

type Props<T> = {
  fetchData: () => Promise<T>;
  dependency: unknown[];
  children: (data: T) => ReactNode;
};

const DataLoader = <T extends SetStateAction<unknown>>({ fetchData, dependency, children }: Props<T>) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null as unknown);
  const [error, setError] = useState(null as null | Error);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await fetchData();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, dependency);

  if (error) return <ErrorIndicator error={error} />;
  if (!error && loading) return <LoadingIndicator />;
  if (!error && !loading && data !== null) return <>{children(data as T)}</>;
  return null;
};

export default DataLoader;
