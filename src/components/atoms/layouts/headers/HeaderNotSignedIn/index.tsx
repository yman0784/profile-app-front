import React from "react";
import Link from "next/link";

const HeaderNotSignedIn = () => {
  return (
    <header>
      <div className="logo">
        <Link href="/">
          link
          {/* <img src="logo.png" alt="Logo" /> */}
        </Link>
      </div>
      <div className="login-button">
        <Link href="/api/v1/auth/sign_in">
          <button>Login</button>
        </Link>
      </div>
    </header>
  );
};

export default HeaderNotSignedIn;
