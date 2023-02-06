import axios from "axios";
import { useEffect, useState } from "react";
import { AUTH_TOKEN, USERS_URL } from "../constants";

export const UsersClient = axios.create({
  baseURL: USERS_URL,
  headers: {
    Accept: "application/json",
    Authorization: AUTH_TOKEN,
  },
});

const useFetch = (link, body = {}, refetchDeps = []) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [headers, setHeaders] = useState(null);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const { data, headers } = await UsersClient.get(link, body);
        setApiData(data);
        setHeaders(headers);
        setIsLoading(false);
      } catch (error) {
        setApiError(error);
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [...refetchDeps]);

  return { isLoading, apiData, apiError, headers };
};

export default useFetch;
