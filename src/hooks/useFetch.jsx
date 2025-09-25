import { useState, useEffect } from "react";

export const useFetch = (url, method, objeto) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(objeto);
    const controller = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          url,
          {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objeto),
          },
          controller
        );
        if (!response.ok) {
          throw new Error("Error al obtener datos");
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    return () => controller.abort;
  }, []);
  return { data, loading, error };
};
