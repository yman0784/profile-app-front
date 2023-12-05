"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import HeaderSignedIn from "@/components/atoms/layouts/headers/HeaderSignedIn";
import Categories from "@/components/atoms/organisms/skill/CategoryCard";
import styles from "./index.module.css";

const SkillCard = ({ skills }) => {
  return (
    <>
      <div
        style={{ border: "1px solid black", margin: "5px", padding: "10px" }}
      >
        {skills.map((skill) => (
          <div key={skill.id} className={styles.skillbox}>
            <p>{skill.language}</p>
            <p>{skill.level}</p>
            <button>習得レベルを保存する</button>
            <button>スキルを削除する</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default SkillCard;
