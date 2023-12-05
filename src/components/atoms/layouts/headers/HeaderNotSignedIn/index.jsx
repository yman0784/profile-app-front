import React from "react";
import Link from "next/link";
import styles from "./index.module.css";

const HeaderNotSignedIn = () => {
  return (
    <header>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Link href="/" className={styles.a}>
            My Portfolio
            {/* <img src="logo.png" alt="Logo" /> */}
          </Link>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.buttonWrapper}>
            <Link href="/sign_in">
              <button className={styles.button}>ログイン</button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderNotSignedIn;
