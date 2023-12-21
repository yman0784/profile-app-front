"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderNotSignedIn from "@/components/atoms/layouts/headers/HeaderNotSignedIn";
import Toast from "@/components/atoms/Toast/index";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { useForm } from "react-hook-form";
import Footer from "@/components/atoms/layouts/Footer/Footer";
import { SaveCookiesSignIn } from "@/components/ServerAction";

const Login = () => {
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
    console.log("Headers:", res.headers);

    const authorization = res.headers.get("Authorization");
    console.log("login response: ", res);
    console.log("login response: ", res.headers);
  };

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    SaveCookiesSignIn(email, password);
    if (SaveCookiesSignIn) {
      router.push(`/users?message=ログインしました`);
      debugger;
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
