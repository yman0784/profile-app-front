"use client";
import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [sessionId, setSessionId] = useState("");

  const setTokenValue = (newToken) => {
    setToken(newToken);
  };
  const setSessionIdvalue = (newSessionID) => {
    setSessionId(newSessionID);
  };

  return (
    <TokenContext.Provider
      value={{ token, setTokenValue, sessionId, setSessionIdvalue }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};
