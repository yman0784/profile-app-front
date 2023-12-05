"use client";
import React, { useState, useEffect } from "react";
import styles from "./index.module.css";

const Toast = ({ showToast, message, color }) => {
  const [visible, setVisible] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (showToast && !initialRender) {
      setVisible(true);

      const timeoutId = setTimeout(() => {
        setVisible(false);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }

    setInitialRender(false);
  }, [showToast, initialRender]);

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
      style={{ backgroundColor: `${color}` }}
    >
      {message}
    </div>
  );
};

export default Toast;
