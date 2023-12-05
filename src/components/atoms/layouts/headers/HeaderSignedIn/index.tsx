import React from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./index.module.css";

const HeaderSignedIn = () => {
  const handleLogoutResponse = (res) => {
    Cookies.remove("_access_token");
    Cookies.remove("_client");
    Cookies.remove("_uid");
    Cookies.remove("token");

    console.log("logout response: ", res);
  };
  const router = useRouter();

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
    } catch (error) {
      console.error("エラーレスポンス:", error.response);
    }
    router.push("http://localhost:8000/sign_in");
  };

  return (
    <header>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Link href="/" className={styles.a}>
            My Portfolio
            {/* <img src="logo.png" alt="Logo" /> */}
          </Link>
        </div>
        <div className="login-button">
          <button onClick={onClickLogout}>ログアウト</button>
        </div>
      </div>
    </header>
  );
};

export default HeaderSignedIn;
