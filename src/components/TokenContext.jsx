// TokenContext.js
import { createContext, useContext, useState } from "react";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState("");

  return (
    <TokenContext.Provider value={{ authTokens, setAuthTokens }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useAuthTokens = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useAuthTokens must be used within a TokenProvider");
  }
  return context;
};
