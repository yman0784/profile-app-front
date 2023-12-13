"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "./index.module.css";
import { useRouter } from "next/navigation";
import Modal from "@/components/atoms/layouts/Modal/Modal";

const SkillCard = ({ skills }) => {
  const [selectedLevel, setSelectedLevel] = useState("");
  const [deletedSkills, setDeletedSkills] = useState([]);
  const [show, setShow] = useState(false);
  const [changedLevelSkill, setChangedLevelSkill] = useState(``);
  const router = useRouter();
  const query = router.query;

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
        // `http://localhost:3000/api/v1/skills/${Params.id}`,
        `https://profileapp-api.onrender.com/api/v1//skills/${Params.id}`,
        Params
      );
      setShow(true);
      router.refresh();
      console.log(res);
      setChangedLevelSkill(`${res.data.language}の習得レベルを保存しました!`);
    } catch (error) {
      console.error("エラーレスポンス:", error.response);
    }
    // console.log(skill.id);
  };
  const onClickSkillDelete = async (skill) => {
    const apiClient = axios.create({
      withCredentials: true,
    });
    const Params = {
      id: skill.id,
    };
    try {
      const res = await apiClient.delete(
        // `http://localhost:3000/api/v1/skills/${Params.id}`,
        `https://profileapp-api.onrender.com/api/v1/skills/${Params.id}`,
        Params
      );
      setDeletedSkills((prevDeletedSkills) => [...prevDeletedSkills, skill.id]);
      setShow(true);
      setChangedLevelSkill(`${res.data.language}の項目を削除しました!`);
    } catch (error) {
      console.error("エラーレスポンス:", error.response);
    }
    // console.log(skill.id);
  };

  return (
    <>
      <Modal
        show={show}
        setShow={setShow}
        firstLine={changedLevelSkill}
        // secondLine={secondLine}
      />

      <div
        style={{
          borderRadius: "5px",
          border: "1px solid #ccc",
          boxShadow: "0 4px 3px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div
          style={{
            height: "5vh",
            display: "flex",
            alignItems: "flex-start",
            borderBottom: "1px solid #ccc",
            alignItems: "center",
            padding: "0 3vw 0",
          }}
        >
          <div style={{ width: "10%" }}>習得スキル</div>
          <div style={{ marginLeft: "10%", width: "20%" }}>習得レベル</div>
        </div>
        <div style={{ overflow: "auto", maxHeight: "20vh" }}>
          {skills.map(
            (skill) =>
              !deletedSkills.includes(skill.id) && (
                <div
                  key={skill.id}
                  className={styles.skillbox}
                  style={{
                    height: "5vh",
                    borderBottom: "1px solid #ccc",
                    display: "flex",
                    alignItems: "center",
                    padding: "3vh 3vw ",
                  }}
                >
                  <p style={{ width: "10%" }}>{skill.language}</p>
                  <select
                    style={{
                      width: "20%",
                      border: "1px solid #c4c4c4",
                      borderRadius: "5px",
                      color: "#757575",
                      padding: "0.8vh 0",
                    }}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                  >
                    <option value={skill.level}>{skill.level}</option>
                    {generateOptions(skill)}
                  </select>
                  <button
                    onClick={() => onClickSaveSkillLevel(skill)}
                    style={{
                      marginLeft: "10%",
                      color: "#1b5678",
                      backgroundColor: "#fff",
                      borderRadius: "5px",
                      outline: "none",
                      border: "1px solid #1b5678",
                      width: "18%",
                      padding: "0.5vh 0",
                    }}
                  >
                    習得レベルを保存する
                  </button>
                  <button
                    onClick={() => onClickSkillDelete(skill)}
                    style={{
                      backgroundColor: "#ee6969",
                      color: "#fff",
                      borderRadius: "5px",
                      outline: "none",
                      border: "1px solid #ee6969",
                      width: "18%",
                      padding: "0.5vh 0",
                    }}
                  >
                    スキルを削除する
                  </button>
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default SkillCard;
