// hooks/useFetchList.js
import { useEffect, useState } from "react";
import API from "../../api/api";

export function useFetchList(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    API.get(endpoint)
      .then((res) => setData(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [endpoint]);

  return { data, loading, error };
}
