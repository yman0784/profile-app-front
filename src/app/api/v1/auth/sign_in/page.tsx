"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import HeaderSignedIn from "@/components/atoms/layouts/headers/HeaderSignedIn";
import HeaderNotSignedIn from "@/components/atoms/layouts/headers/HeaderNotSignedIn";

const Login = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const onChangeEmail = (event) => setInputEmail(event.target.value);
  const onChangePassword = (event) => setInputPassword(event.target.value);

  const handleLoginResponse = (res) => {
    Cookies.set("_access_token", res.headers["access-token"]);
    Cookies.set("_client", res.headers["client"]);
    Cookies.set("_uid", res.headers["uid"]);
    console.log("login response: ", res);
  };

  const onClickLogin = async () => {
    const apiClient = axios.create({
      withCredentials: true,
    });

    const Params = {
      email: inputEmail,
      password: inputPassword,
    };

    try {
      const res = await apiClient.post(
        "http://localhost:3000/api/v1/auth/sign_in",
        Params
      );
      if (res.status === 200) {
        handleLoginResponse(res);
      }
      setInputEmail("");
      setInputPassword("");
    } catch (error) {
      console.error("エラーレスポンス:", error.response);
    }
  };

  return (
    <>
      <HeaderSignedIn />
      <HeaderNotSignedIn />
      <div className="input-area">
        <input
          placeholder="メールアドレス"
          type="email"
          id="email"
          name="email"
          value={inputEmail}
          onChange={onChangeEmail}
        ></input>
        <input
          placeholder="パスワード"
          type="password"
          id="password"
          name="password"
          value={inputPassword}
          onChange={onChangePassword}
        ></input>

        <button onClick={onClickLogin}>ログイン</button>
      </div>
    </>
  );
};

export default Login;
