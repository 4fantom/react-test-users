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

const useFetch = (link, body = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const { data } = await UsersClient.get(link, body);
        setApiData(data);
        setIsLoading(false);
      } catch (error) {
        setApiError(error);
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  return { isLoading, apiData, apiError };
};

export default useFetch;
