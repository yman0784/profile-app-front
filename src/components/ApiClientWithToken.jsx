import axios from "axios";
import GetTokenFromCookie from "./GetTokenFromCookie"

const ApiClientWithToken = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${GetTokenFromCookie()}`,
  },
});
