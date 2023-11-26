"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import SkillCard from "../SkillsCard";
import Link from "next/link";
import styles from "./index.module.css";
import { useRouter } from "next/navigation";

const Categories = () => {
  const [categoryNames, setCategoryNames] = useState([]);
  const [responseData, setResponseData] = useState({});

  // const getCategorySkills = (name) => {
  //   switch (name) {
  //     case "フロントエンド":
  //       return fskills;
  //     case "バックエンド":
  //       return bskills;
  //     case "インフラ":
  //       return iskills;
  //     default:
  //       return [];
  //   }
  // };

  const [fskills, setFskills] = useState([]);
  const [bskills, setBskills] = useState([]);
  const [iskills, setIskills] = useState([]);
  const [receivedCategoryId, setReceivedCategoryId] = useState([]);
  const [selectedSkills, setselectedSkills] = useState([]);
  // const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const skills = [fskills, bskills, iskills];
  const router = useRouter();

  const apiClient = axios.create({
    withCredentials: true,
  });

  const getCategory = async () => {
    await apiClient
      .get("http://localhost:3000/api/v1/skills")
      .then((response) => {
        setResponseData(response.data);
        setCategoryNames(response.data.category_names);
        setFskills(response.data.frontskills);
        setBskills(response.data.backskills);
        setIskills(response.data.infraskills);
        setReceivedCategoryId(response.data.category_id.id);

        const categoryIds = response.data.category_id.map(
          (category) => category.id
        );
        setReceivedCategoryId(categoryIds);

        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  };

  const onClickAddSkill = (name) => {
    console.log(name);
    const categoryId = (() => {
      switch (name) {
        case "フロントエンド":
          return receivedCategoryId[0];
        case "バックエンド":
          return receivedCategoryId[1];
        case "インフラ":
          return receivedCategoryId[2];
        default:
          return [];
      }
    })();

    // setselectedSkills(getCategorySkills(name));

    // const categoryId = getCategorySkills(name)[0]?.category_id;
    // setSelectedCategoryId(categoryId);
    // console.log(skills);

    if (categoryId) {
      router.push(`/skills/add/${categoryId}`);
    }
  };

  useEffect(() => {
    getCategory();
    console.log("selectedSkills changed:", selectedSkills);
    // console.log(selectedCategoryId);
    console.log(receivedCategoryId);
  }, []);

  return (
    <div>
      <h2>categoryテーブル一覧</h2>
      {selectedSkills.map((a, index) => (
        <div key={index}>
          <p>{a[index]}</p>
          <p>{index}</p>
        </div>
      ))}

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
            {/* <Link href={"http://localhost:8000/skills/add"}> */}
            <button
              onClick={() => {
                onClickAddSkill(name);
              }}
            >
              スキルを追加する
            </button>
            {/* </Link> */}
          </div>
          <SkillCard key={name} skills={skills[index]} />
        </div>
      ))}
    </div>
  );
};

export default Categories;
