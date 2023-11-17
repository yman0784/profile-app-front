"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";

const Login = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const onChangeEmail = (event) => setInputEmail(event.target.value);
  const onChangePassword = (event) => setInputPassword(event.target.value);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLoginResponse = (res) => {
    console.log("login response: ", res);
    Cookies.set("access_token", res.headers["access-token"]);
    Cookies.set("client", res.headers["client"]);
    Cookies.set("uid", res.headers["uid"]);
    const currentUser = res.data.data;
    setCurrentUser(currentUser);
    // // Cookiesオブジェクトを使ってクッキーから値を取得
    // const accessToken = Cookies.get("access_token");
    // const client = Cookies.get("client");
    // const uid = Cookies.get("uid");

    // // 取得した値をコンソールに出力
    // console.log("Access Token:", accessToken);
    // console.log("Client:", client);
    // console.log("UID:", uid);
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
      {currentUser && (
        <div>
          <h2>ユーザー情報</h2>
          <p>メールアドレス: {currentUser.email}</p>
          {/* 他のユーザー情報も表示できます */}
        </div>
      )}
    </div>
  );
};

export default Login;
