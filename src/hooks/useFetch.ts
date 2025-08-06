import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

const useFetch = <T>(method: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadData = async () => {
        setIsLoading(true);
        try {
          const response = await method();
          if (isActive) {
            setData(response);
            setError(null);
          }
        } catch (error: any) {
          if (isActive) {
            setError(error.message || "Something went wrong");
          }
        } finally {
          if (isActive) {
            setIsLoading(false);
          }
        }
      };

      loadData();

      return () => {
        isActive = false;
      };
    }, [method])
  );

  return { data, isLoading, error };
};

export default useFetch;
