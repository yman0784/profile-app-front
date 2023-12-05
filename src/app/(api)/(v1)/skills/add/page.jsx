"use client";

import Auth from "@/components/Auth";
import HeaderSignedIn from "@/components/atoms/layouts/headers/HeaderSignedIn";
import axios from "axios";
import React, { useState } from "react";

const Skills = () => {
  const [inputLanguage, setInputLanguage] = useState("");
  const [inputLevel, setInputLevel] = useState("");

  const onchangeLanguage = (event) => {
    setInputLanguage(event.target.value);
  };
  const onchangeLevel = (event) => {
    setInputLevel(event.target.value);
  };

  const onClickAddSkill = async () => {
    console.log("clickaddskill");
    const apiClient = axios.create({
      withCredentials: true,
    });

    const Params = {
      // category_id: ,
      language: inputLanguage,
      level: inputLevel,
    };

    try {
      const res = await apiClient.post(
        "http://localhost:3000/api/v1/skills",
        Params
      );
      if (res.status === 200) {
      }
      setInputLanguage("");
      setInputLevel("");
    } catch (error) {
      console.error("エラーレスポンス:", error.response);
    }
  };

  const renderSkillForm = () => {
    // ここで必要な条件を追加してください
    // 例: ユーザーが特定の条件を満たしている場合にフォームを表示する
    return (
      <>
        <h2>にスキルを追加</h2>
        <input onChange={onchangeLanguage}></input>
        <br></br>
        <input onChange={onchangeLevel}></input>
        <br></br>
        <button onClick={onClickAddSkill}>追加する</button>
      </>
    );
  };

  return (
    <Auth>
      <div>
        <HeaderSignedIn />
        {renderSkillForm()}
      </div>
    </Auth>
  );
};

export default Skills;
