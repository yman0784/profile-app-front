"use client";

import React, { useState } from "react";
import AddImage from "./atoms/AddImage";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useForm } from "react-hook-form";
import styles from "./UserEdit.module.css";
import axios from "axios";

const UserEdit = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    criteriaMode: "all",
  });

  const savedSelfIntroduction = searchParams.get("selfIntroduction")
    ? searchParams.get("selfIntroduction")
    : "";

  const [inputselfIntroduction, setInputselfIntroduction] = useState(
    savedSelfIntroduction
  );

  const onSubmit = async (data) => {
    const apiClient = axios.create({
      withCredentials: true,
    });
    try {
      console.log(inputselfIntroduction);
      const res = await apiClient.put("http://localhost:3000/api/v1/auth", {
        self_introduction: data.introduction,
      });
      console.log(res);
      console.log(res.data);
      console.log(res.data.data);
      const id = res.data.data.id;
      router.push(`http://localhost:8000/users/${id}`);
      console.log(user);
      console.log(params);
      console.log(params.slug);
    } catch (error) {
      console.error("エラーレスポンス:", error.response);
    }
  };

  return (
    <div>
      <div className={styles.editContainer}>
        <h2 className={styles.title}>自己紹介を編集する</h2>
        <div>
          <form>
            <label className={styles.label}>
              自己紹介文
              <textarea
                type="text"
                id="introduction"
                name="introduction"
                className={styles.editBox}
                defaultValue={savedSelfIntroduction}
                rows={5}
                cols={60}
                {...register("introduction", {
                  required: {
                    value: true,
                    message: "自己紹介文を入力してください。",
                  },
                  minLength: {
                    value: 200,
                    message: "自己紹介文は200文字以上で入力してください。。",
                  },
                  maxLength: {
                    value: 799,
                    message: "自己紹介文は800文字未満で入力してください。",
                  },
                })}
              />
              200文字以上、800文字未満で入力してください
            </label>
            {errors.introduction && (
              <span className={styles.form_error}>
                {errors.introduction.message}
              </span>
            )}
            <br></br>
            <br></br>
            <br></br>
          </form>
          <label className={styles.label}>アバター画像</label>
          <div className={styles.imageButtonWrapper}>
            <AddImage userId={params.slug} />
          </div>
        </div>
        <br></br>
        <div className={styles.buttonWrapper}>
          <button className={styles.button} onClick={handleSubmit(onSubmit)}>
            自己紹介を確定する
          </button>
        </div>
      </div>
      ;
    </div>
  );
};

export default UserEdit;
