import Cookies from "js-cookie";

export const GetTokenFromCookie = (res) => {
  return Cookies.get(res.headers["token"]);
};
