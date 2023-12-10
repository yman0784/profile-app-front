"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import HeaderSignedIn from "@/components/atoms/layouts/headers/HeaderSignedIn";
import HeaderNotSignedIn from "@/components/atoms/layouts/headers/HeaderNotSignedIn";
import Toast from "@/components/atoms/Toast/index";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { useForm } from "react-hook-form";
import Footer from "@/components/atoms/layouts/Footer/Footer";

const Login = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const searchParams = useSearchParams();
  const [logoutMessage, setLogoutMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    setShowToast(true);
    setLogoutMessage(searchParams.get("message"));
  }, [searchParams]);

  const handleLoginResponse = (res) => {
    console.log("login response: ", res);
    console.log("login response: ", res.headers);
    Cookies.set("access_token", res.headers["access-token"]);
    Cookies.set("client", res.headers["client"]);
    Cookies.set("uid", res.headers["uid"]);
  };

  const onSubmit = async (data) => {
    const apiClient = axios.create({
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const Params = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await apiClient.post(
        // "http://localhost:3000/api/v1/auth/sign_in",
        "https://profileapp-api.onrender.com/api/v1/auth/sign_in",
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
        router.push(`/users/${id}?message=ログインしました`);
        handleLoginResponse(res);
      }
      setInputEmail("");
      setInputPassword("");
    } catch (error) {
      // setLoginError(error.response.data);
      setLoginError(
        "ログインに失敗しました。メールアドレスかパスワードが間違っています。"
      );
      setShowToast(true);
      console.error("エラーレスポンス:", error.response);
      console.log(loginError);
      return loginError;
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <HeaderNotSignedIn />
      {logoutMessage === null ? (
        ""
      ) : (
        <Toast
          showToast={showToast}
          message={logoutMessage}
          color={"#c53030"}
        />
      )}
      <div className={styles.signInContainer}>
        <h2 className={styles.title}>ログイン</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.label}>
            メールアドレス
            <input
              // placeholder="メールアドレス"
              type="email"
              id="email"
              name="email"
              // value={inputEmail}
              // onChange={onChangeEmail}
              className={styles.signInBox}
              {...register("email", {
                required: {
                  value: true,
                  message: "メールアドレスを入力してください。",
                },
                pattern: {
                  value: /^[a-z0-9.]+@[a-z]+\.[a-z]+$/,
                  message: "メールアドレスの形式で入力してください。",
                },
              })}
            ></input>
            {errors.email && (
              <span className={styles.form_error}>{errors.email.message}</span>
            )}
            <br></br>
            <br></br>
            パスワード
            <input
              // placeholder="パスワード"
              type="password"
              id="password"
              name="password"
              // value={inputPassword}
              // onChange={onChangePassword}
              className={styles.signInBox}
              {...register("password", {
                required: {
                  value: true,
                  message: "パスワードを入力してください。",
                },
                minLength: {
                  value: 8,
                  message: "パスワードは8文字以上です。",
                },
              })}
            ></input>
            {errors.password && (
              <span className={styles.form_error}>
                {errors.password.message}
              </span>
            )}
            <br></br>
            <br></br>
          </label>
          <div className={styles.buttonWrapper}>
            <button className={styles.button} onSubmit={onSubmit}>
              ログインする
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
