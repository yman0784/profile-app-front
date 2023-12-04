import React, { useState, useEffect } from "react";
import styles from "./index.module.css";

const Toast = ({ showToast, message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (showToast) {
      setVisible(true);

      const timeoutId = setTimeout(() => {
        setVisible(false);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [showToast]);

  const handleClick = () => {
    setVisible(false);
  };

  useEffect(() => {
    const handleGlobalClick = () => {
      setVisible(false);
    };

    if (visible) {
      window.addEventListener("click", handleGlobalClick);

      return () => {
        window.removeEventListener("click", handleGlobalClick);
      };
    }
  }, [visible]);

  return (
    <div
      className={`${styles.toast} ${visible ? styles.show : ""}`}
      onClick={handleClick}
    >
      {message}
    </div>
  );
};

export default Toast;
