import { useEffect, useState } from "react";

export const useFetch = (url: string) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(url);
      const { posts } = await res.json();
      setData([...data, ...posts]);
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, loading };
};
