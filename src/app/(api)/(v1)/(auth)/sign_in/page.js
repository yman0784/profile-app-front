"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import HeaderSignedIn from "@/components/atoms/layouts/headers/HeaderSignedIn";
import HeaderNotSignedIn from "@/components/atoms/layouts/headers/HeaderNotSignedIn";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const Login = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const onChangeEmail = (event) => setInputEmail(event.target.value);
  const onChangePassword = (event) => setInputPassword(event.target.value);
  const router = useRouter();
  const [loginError, setLoginError] = useState();

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
      const loginMessage = res.data.message;
      if (res.status === 200) {
        console.log(res);
        console.log(res.data);
        console.log(res.data.data);
        console.log(res.data.data.id);
        const id = res.data.data.id;
        Cookies.set("num", id);
        console.log(loginMessage);
        router.push(`http://localhost:8000/users/${id}`);
        handleLoginResponse(res);
      }
      setInputEmail("");
      setInputPassword("");
    } catch (error) {
      // setLoginError(error.response.data);
      console.error("エラーレスポンス:", error.response);
      // console.log(loginError);
    }
  };

  return (
    <>
      <HeaderSignedIn />
      <div className={styles.signInContainer}>
        <h2 className={styles.title}>ログイン</h2>
        <label className={styles.label}>
          メールアドレス
          <input
            // placeholder="メールアドレス"
            type="email"
            id="email"
            name="email"
            value={inputEmail}
            onChange={onChangeEmail}
            className={styles.signInBox}
          ></input>
          <br></br>
          <br></br>
          パスワード
          <input
            // placeholder="パスワード"
            type="password"
            id="password"
            name="password"
            value={inputPassword}
            onChange={onChangePassword}
            className={styles.signInBox}
          ></input>
          <br></br>
          <br></br>
        </label>
        <div className={styles.buttonWrapper}>
          <button className={styles.button} onClick={onClickLogin}>
            ログインする
          </button>
        </div>
        <p>{loginError ? loginError : ""}</p>
      </div>
    </>
  );
};

export default Login;
