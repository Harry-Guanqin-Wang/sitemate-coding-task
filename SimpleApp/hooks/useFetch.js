import { useState, useEffect } from "react";

const useFetch = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!apiFunc) return;

      setLoading(true);
      try {
        const result = await apiFunc();
        setData(result);
        setError(null);
      } catch (error) {
        setError(error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiFunc]);

  return { data, loading, error };
};

export default useFetch;
