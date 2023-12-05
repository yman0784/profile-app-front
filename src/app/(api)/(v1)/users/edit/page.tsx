"use client";

import HeaderSignedIn from "@/components/atoms/layouts/headers/HeaderSignedIn";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";

const Edit = () => {
  const [savedSelfIntroduction, setSavedSelfIntroduction] = useState(
    localStorage.getItem("selfIntroduction")
  );
  const [inputselfIntroduction, setInputselfIntroduction] = useState(
    savedSelfIntroduction
  );
  const onChangeSelfIntroduce = (event) =>
    setInputselfIntroduction(event.target.value);
  const router = useRouter();

  useEffect(() => {
    const storesavedSelfIntroduction = localStorage.getItem("selfIntroduction");
    setSavedSelfIntroduction(storesavedSelfIntroduction || "");
  }, []);

  const onClickAddSelfIntroduction = async () => {
    const apiClient = axios.create({
      withCredentials: true,
    });
    try {
      const res = await apiClient.put("http://localhost:3000/api/v1/auth", {
        self_introduction: inputselfIntroduction,
      });
      console.log(res);
      console.log(res.data);
      console.log(res.data.data);
      const id = res.data.data.id;
      router.push(`http://localhost:8000/users/${id}`);
    } catch (error) {
      console.error("エラーレスポンス:", error.response);
    }
  };

  return (
    <div>
      <HeaderSignedIn />
      <div className={styles.editContainer}>
        <h2 className={styles.title}>自己紹介を編集する</h2>
        <label className={styles.label}>
          自己紹介文
          <textarea
            className={styles.editBox}
            onChange={onChangeSelfIntroduce}
            defaultValue={savedSelfIntroduction}
            rows={5}
            cols={55}
          />
          200文字以上、800文字未満で入力してください
        </label>
        <br></br>
        <div className={styles.buttonWrapper}>
          <button
            className={styles.button}
            onClick={onClickAddSelfIntroduction}
          >
            自己紹介を確定する
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
