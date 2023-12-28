"use client";

import { useEffect } from "react";
import styles from "./Modal.module.css";
import { useRouter, useSearchParams } from "next/navigation";

const Modal = ({ show, setShow, firstLine, secondLine }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClickBackToSkillIndex = () => {
    router.push("/skills/all");
    setShow(false);
  };

  useEffect(() => {
    setShow(searchParams.get("showModal"));
  }, [searchParams.get("showModal")]);

  return (
    <>
      {show && (
        <div className={styles.overlay}>
          <div className={styles.content}>
            <p>
              {firstLine ||
                `${searchParams.get("1st")}${searchParams.get("2nd")}`}
            </p>
            <p>{secondLine || searchParams.get("3rd")}</p>
            <button className={styles.button} onClick={onClickBackToSkillIndex}>
              スキル編集ページに戻る
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
