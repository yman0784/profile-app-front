"use client";

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
  return (
    <div>
      <HeaderSignedIn />
      <h2>にスキルを追加</h2>
      <input onChange={onchangeLanguage}></input>
      <br></br>
      <input onChange={onchangeLevel}></input>
      <br></br>
      <button onClick={onClickAddSkill}>追加する</button>
    </div>
  );
};

export default Skills;
