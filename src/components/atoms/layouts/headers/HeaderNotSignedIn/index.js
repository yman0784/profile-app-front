import React from "react";
import Link from "next/link";
import styles from "./index.module.css";

const HeaderNotSignedIn = () => {
  return (
    <header>
      <div className={styles.gamingbackgroundcolor}>
        <div className={styles.logo}>
          <Link href="/" className={styles.a}>
            My Portfolio
            {/* <img src="logo.png" alt="Logo" /> */}
          </Link>
        </div>
        <div className="login-button">
          <Link href="/sign_in">
            <button>ログイン</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderNotSignedIn;
