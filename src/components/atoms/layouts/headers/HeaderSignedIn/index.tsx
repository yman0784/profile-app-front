import React from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";
import { Router } from "next/router";

const HeaderSignedIn = () => {
  const handleLogoutResponse = (res) => {
    Cookies.remove("_access_token");
    Cookies.remove("_client");
    Cookies.remove("_uid");

    console.log("logout response: ", res);
  };

  const onClickLogout = async () => {
    console.log("logOutボタン");
    try {
      const res = await axios.delete(
        "http://localhost:3000/api/v1/auth/sign_out",
        {
          withCredentials: true,
        }
      );
      handleLogoutResponse(res);
      Router.push("http://localhost:8000/api/v1/auth/sign_in");
    } catch (error) {
      console.error("エラーレスポンス:", error.response);
    }
  };

  return (
    <header>
      <div className="logo">
        <Link href="/">
          link
          {/* <img src="logo.png" alt="Logo" /> */}
        </Link>
      </div>
      <div className="login-button">
        <button onClick={onClickLogout}>Logout</button>
      </div>
    </header>
  );
};

export default HeaderSignedIn;
