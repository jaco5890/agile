import { useState, useEffect } from 'react';

const useFetch = ( method: () => Promise<any>) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        if (method) {
          const response = await method();
          setData(response);
          setError(response.error || null);
        } 
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [method]);
  
  return { data, isLoading, error };
};

export default useFetch;
