import axios from "axios";
import React, { useEffect, useState } from "react";
import SkillCard from "../SkillsCard";
import Link from "next/link";
import styles from "./index.module.css";

const Categories = () => {
  const [categoryNames, setCategoryNames] = useState([]);
  const [fskills, setFskills] = useState([]);
  const [bskills, setBskills] = useState([]);
  const [iskills, setIskills] = useState([]);
  const skills = [fskills, bskills, iskills];

  const apiClient = axios.create({
    withCredentials: true,
  });

  const getCategory = async () => {
    await apiClient
      .get("http://localhost:3000/api/v1/skills")
      .then((response) => {
        setCategoryNames(response.data.category_names);
        setFskills(response.data.frontskills);
        setBskills(response.data.backskills);
        setIskills(response.data.infraskills);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  };

  const onClickAddSkill = async () => {
    console.log("clickAdd");
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div>
      {categoryNames.map((name, index) => (
        <div
          key={name}
          style={{
            border: "1px solid black",
            margin: "20px",
            padding: "10px",
          }}
        >
          <div className={styles.categorybox}>
            <p>{name}</p>
            <Link href="http://localhost:8000/skills/add">
              <button onClick={onClickAddSkill}>スキルを追加する</button>
            </Link>
          </div>
          <SkillCard key={name} skills={skills[index]} />
        </div>
      ))}
    </div>
  );
};

export default Categories;
