import axios from "axios";
import { useEffect, useState } from "react";

const AUTH_TOKEN =
  "Bearer 907ab48240dc59db6ca0cb99783470eb5ddd6e77823b0727c798969003e6900c";

export const UsersClient = axios.create({
  baseURL: "https://gorest.co.in/public/v2/users",
  headers: {
    Accept: "application/json",
    Authorization: AUTH_TOKEN,
  },
});

const useFetch = (method, link, body = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        if (method === "GET") {
          const { data } = await UsersClient.get(`/`);
          setApiData(data);
        } else if (method === "PUT") {
          const { data } = await UsersClient.put(link, {
            ...body,
          });
          setApiData(data);
        }
        setIsLoading(false);
      } catch (error) {
        setApiError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { isLoading, apiData, apiError };
};

export default useFetch;
