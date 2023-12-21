"use client";

import React, { use, useEffect, useState } from "react";
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
import { useToken } from "./TokenContext";
import Cookies from "js-cookie";
import { fetchUser } from "./ServerAction";

const UserEdit = (user) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const { token } = useToken();
  const authorization = Cookies.get("authorization");

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
  const [ueserIntroduction, setUserIntroduction] = useState(
    savedSelfIntroduction
  );

  // useEffect(() => {
  //   console.log(token);
  //   const fetchUserIntroductionData = async () => {
  //     try {
  //       const apiClient = axios.create({
  //         withCredentials: true,
  //         headers: {
  //           Authorization: `${authorization}`,
  //         },
  //       });
  //       const response = await apiClient.get(
  //         // `http://localhost:3000/api/v1/users/${params.slug}`
  //         `https://profileapp-api.onrender.com/api/v1/users/${params.slug}`
  //       );
  //       console.log("response:", response);
  //       setUserIntroduction(response.data.user.self_introduction);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };
  //   fetchUserIntroductionData();
  //   console.log(`${params}`);
  //   console.log(params);
  //   console.log(params.slug);
  //   console.log(`pathname:${pathname}`);
  //   console.log(user);
  // }, []);

  // const [inputselfIntroduction, setInputselfIntroduction] = useState(
  //   savedSelfIntroduction
  // );

  useEffect(() => {
    const fetchData = async (params) => {
      try {
        const fetchUserSelfIntroduction = await fetchUser(params);
        // console.log(fetchUserSelfIntroduction);
        // console.log(fetchUserSelfIntroduction.user.self_introduction);
        const selfIntroduciton =
          fetchUserSelfIntroduction.user.self_introduction;
        setUserIntroduction(selfIntroduciton);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData(params);
  }, []);

  const onSubmit = async (data) => {
    const apiClient = axios.create({
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${authorization}`,
      },
    });
    try {
      // console.log(inputselfIntroduction);
      // const res = await apiClient.put("http://localhost:3000/api/v1/auth", {
      const res = await apiClient.put(
        "https://profileapp-api.onrender.com/api/v1/auth",
        {
          registration: { self_introduction: data.introduction },
          // self_introduction: data.introduction,
        }
      );

      // console.log(res);
      // console.log(res.data);
      // console.log(res.data.data);
      const id = res.data.data.id;
      router.push(`/users/${id}`);
      // console.log(user);
      // console.log(params);
      // console.log(params.slug);
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
                defaultValue={savedSelfIntroduction || ueserIntroduction}
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
