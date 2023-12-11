"use client";
import { createContext, useContext, useState } from "react";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState("");

  const setTokenValue = (newToken) => {
    setToken(newToken);
  };

  return (
    <TokenContext.Provider value={{ token, setTokenValue }}>
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
