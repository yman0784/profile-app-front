"use client";

import { redirect, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useLayoutEffect } from "react";

const Auth = ({ children }) => {
  const router = useRouter();
  const signedIn = Cookies.get("_access_token");

  useLayoutEffect(() => {
    if (signedIn === undefined) {
      // console.log(Cookies.get("access_token"));
      router.replace("/sign_in");
    }
  });

  return children;
};

export default Auth;
