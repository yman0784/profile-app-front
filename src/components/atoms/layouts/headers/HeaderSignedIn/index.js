"use client";

import React from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import styles from "./index.module.css";

const HeaderSignedIn = () => {
  const id = Cookies.get("num");
  const handleLogoutResponse = (res) => {
    Cookies.remove("_access_token");
    Cookies.remove("_client");
    Cookies.remove("_uid");
    Cookies.remove("token");
    Cookies.remove("num");

    console.log("logout response: ", res);
  };
  const router = useRouter();

  const onClickLogout = async () => {
    console.log("logOutボタン");
    try {
      const res = await axios.delete(
        // "http://localhost:3000/api/v1/auth/sign_out",
        `https://profileapp-api.onrender.com/api/v1/auth/sign_out`,
        {
          withCredentials: true,
        }
      );
      handleLogoutResponse(res);
    } catch (error) {
      console.error("エラーレスポンス:", error.response);
    }
    await router.push("/sign_in?message=ログアウトしました");
  };

  return (
    <header>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Link href="/" className={styles.a}>
            My Portfolio
          </Link>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.headerLink}>
            <Link href={`/users/${id}`} className={styles.a}>
              ユーザー詳細
            </Link>
          </div>
          <div className={styles.headerLink}>
            <Link href={`/users/edit/${id}`} className={styles.a}>
              ユーザー編集
            </Link>
          </div>
          <div className={styles.buttonWrapper}>
            <button className={styles.button} onClick={onClickLogout}>
              ログアウト
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSignedIn;
