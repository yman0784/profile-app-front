"use client";

import { redirect, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useLayoutEffect } from "react";

const Auth = ({ children }) => {
  const router = useRouter();
  const signedInId = Cookies.get("num");

  useLayoutEffect(() => {
    if (signedInId === undefined) {
      // console.log(Cookies.get("access_token"));
      router.replace("/sign_in");
    }
  });

  return children;
};

export default Auth;
