import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useLayoutEffect } from "react";

const Auth = ({ children }) => {
  const router = useRouter();
  const signedIn = Cookies.get("_access_token");

  useLayoutEffect(() => {
    console.log(Cookies.get("_accsess_token"));
    if (signedIn === undefined) {
      console.log(Cookies.get("access_token"));
      router.replace("http://localhost:8000/sign_in");
    }
  }, []);

  return children;
};

export default Auth;
