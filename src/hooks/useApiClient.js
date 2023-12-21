"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useApiClient = () => {
  const [apiClient, setApiClient] = useState(null);
  const authorization = Cookies.get("authorization");

  useEffect(() => {
    console.log(authorization);
    const client = axios.create({
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${authorization}`,
      },
    });

    setApiClient(client);
  }, [authorization]);
  console.log(authorization);
  console.log(apiClient);

  return apiClient;
};

export default useApiClient;
