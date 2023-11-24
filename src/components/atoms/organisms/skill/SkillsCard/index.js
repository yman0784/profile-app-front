"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "./index.module.css";

const SkillCard = ({ skills }) => {
  const [selectedLevel, setSelectedLevel] = useState("");
  const generateOptions = (skill) => {
    const options = [];
    for (let i = 0; i <= 100; i += 10) {
      if (i !== skill.level) {
        options.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }
    }
    return options;
  };

  const onClickSaveSkillLevel = async (skill) => {
    const apiClient = axios.create({
      withCredentials: true,
    });
    const levelToSave = selectedLevel === "" ? skills[0].level : selectedLevel;
    console.log("Selected Level:", levelToSave);
    const Params = {
      level: levelToSave,
      category_id: skill.category_id,
      id: skill.id,
    };

    try {
      const res = await apiClient.put(
        `http://localhost:3000/api/v1/skills/${Params.id}`,
        Params
      );
    } catch (error) {
      console.error("エラーレスポンス:", error.response);
    }
  };

  return (
    <>
      <div
        style={{ border: "1px solid black", margin: "5px", padding: "10px" }}
      >
        {skills.map((skill) => (
          // console.log(skill);
          <div key={skill.id} className={styles.skillbox}>
            <p>{skill.language}</p>
            <select
              style={{ width: "20%", border: "solid,1px" }}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value={skill.level}>{skill.level}</option>
              {generateOptions(skill)}
            </select>
            <button onClick={() => onClickSaveSkillLevel(skill)}>
              習得レベルを保存する
            </button>
            <button>スキルを削除する</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default SkillCard;
