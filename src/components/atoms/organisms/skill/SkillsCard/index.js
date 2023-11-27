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
        `http://localhost:3000/api/v1/skills/${Params.id}`,
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
        `http://localhost:3000/api/v1/skills/${Params.id}`,
        Params
      );
      setDeletedSkills((prevDeletedSkills) => [...prevDeletedSkills, skill.id]);
      setShow(true);
      setChangedLevelSkill(`${res.data.language}の項目を削除しました!`);
    } catch (error) {
      console.error("エラーレスポンス:", error.response);
    }
    console.log(skill.id);
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
        style={{ border: "1px solid black", margin: "5px", padding: "10px" }}
      >
        {skills.map(
          (skill) =>
            !deletedSkills.includes(skill.id) && (
              <div key={skill.id} className={styles.skillbox}>
                <p>{skill.language}</p>
                <select
                  style={{ width: "20%", border: "1px solid" }}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                >
                  <option value={skill.level}>{skill.level}</option>
                  {generateOptions(skill)}
                </select>
                <button onClick={() => onClickSaveSkillLevel(skill)}>
                  習得レベルを保存する
                </button>
                <button onClick={() => onClickSkillDelete(skill)}>
                  スキルを削除する
                </button>
              </div>
            )
        )}
      </div>
    </>
  );
};

export default SkillCard;
