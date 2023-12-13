"use client";

import Auth from "@/components/Auth";
import Modal from "@/components/atoms/layouts/Modal/Modal";
import HeaderSignedIn from "@/components/atoms/layouts/headers/HeaderSignedIn";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import styles from "./page.module.css";
import { useForm } from "react-hook-form";
import Footer from "../../../../../../components/atoms/layouts/Footer/Footer";

const Skills = (props) => {
  const [inputLanguage, setInputLanguage] = useState("");
  const [inputLevel, setInputLevel] = useState("");
  const [show, setShow] = useState(false);
  const [languageError, setLanguageError] = useState("");

  const router = useRouter();
  const { params } = props;
  const { slug } = params;
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onchangeLanguage = (event) => {
    setInputLanguage(event.target.value);
  };
  const onchangeLevel = (event) => {
    setInputLevel(event.target.value);
  };

  const generateOptions = (skill) => {
    const options = [];
    for (let i = 0; i <= 100; i += 10) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  const onClickAddSkill = async () => {
    const apiClient = axios.create({
      withCredentials: true,
    });

    const Params = {
      category_id: slug,
      language: inputLanguage,
      level: inputLevel,
    };

    try {
      const res = await apiClient.post(
        // "http://localhost:3000/api/v1/skills",
        "https://profileapp-api.onrender.com/api/v1/skills",
        Params
      );
      if (res.status === 201) {
        router.push(
          `/skills/index?showModal=true&1st=${searchParams.get(
            "categoryName"
          )}&2nd=に${inputLanguage}を&3rd=習得レベル${inputLevel}で追加しました!`,
          undefined,
          {
            shallow: true,
          }
        );
      }
      setInputLanguage("");
      setInputLevel("");
    } catch (error) {
      console.error("エラーレスポンス:", error.response);
      const languageError = error.response.data.language;
      console.log(error.response.data.language);
      setLanguageError(languageError);
    }
  };

  const renderSkillForm = (skill) => {
    // ここで必要な条件を追加してください
    // 例: ユーザーが特定の条件を満たしている場合にフォームを表示する
    return (
      <>
        <div className={styles.skillEditContainer}>
          <h2 className={styles.title}>{`${searchParams.get(
            "categoryName"
          )}にスキルを追加`}</h2>
          <label className={styles.label}>
            習得スキル名
            <input
              onChange={onchangeLanguage}
              className={styles.skillEditBox}
            ></input>
            {errors.data && (
              <span className={styles.form_error}>
                {errors.data.language[0]}
              </span>
            )}
            <br></br>
            習得レベル
            <div className={styles.skillEditBoxWrapper}>
              <select className={styles.skillEditBox} onChange={onchangeLevel}>
                {generateOptions(skill)}
              </select>
            </div>
            0~100の間で選択してください
            <br></br>
          </label>
          <br></br>
          <br></br>
          <button className={styles.button} onClick={onClickAddSkill}>
            追加する
          </button>
        </div>
      </>
    );
  };

  return (
    <Auth>
      <div>
        <HeaderSignedIn />
        {renderSkillForm()}
        <Footer />
      </div>
    </Auth>
  );
};

export default Skills;
