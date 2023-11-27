"use client";

import HeaderSignedIn from "@/components/atoms/layouts/headers/HeaderSignedIn";
import AddImage from "@/components/atoms/AddImage";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { usePathname } from "next/navigation";

const Edit = ({ user }) => {
  const [userId, setuserId] = useState("");
  const pathname = usePathname();
  const params = useParams();

  const [savedSelfIntroduction, setSavedSelfIntroduction] = useState(
    localStorage.getItem("selfIntroduction")
      ? localStorage.getItem("selfIntroduction")
      : ""
  );
  const [inputselfIntroduction, setInputselfIntroduction] = useState(
    savedSelfIntroduction
  );
  // );
  const onChangeSelfIntroduce = (event) =>
    setInputselfIntroduction(event.target.value);
  const router = useRouter();

  // useEffect(() => {
  //   const storesavedSelfIntroduction = localStorage.getItem("selfIntroduction");
  //   setSavedSelfIntroduction(storesavedSelfIntroduction || "");
  // }, []);

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
      setuserId(id);
      router.push(`http://localhost:8000/users/${id}`);
      console.log(user);
      console.log(params);
      console.log(params.slug);
    } catch (error) {
      console.error("エラーレスポンス:", error.response);
    }
  };

  return (
    <>
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
        <br></br>
        <br></br>
        <label className={styles.label}>アバター画像</label>
        <div className={styles.imageButtonWrapper}>
          <AddImage userId={params.slug} />
        </div>
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
    </>
  );
};

export default Edit;
