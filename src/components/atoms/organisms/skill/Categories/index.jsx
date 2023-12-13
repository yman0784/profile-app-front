"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import SkillCard from "../SkillsCard";
import Link from "next/link";
import styles from "./index.module.css";
import { usePathname, useRouter } from "next/navigation";
import Modal from "@/components/atoms/layouts/Modal/Modal";

const Categories = () => {
  const [categoryNames, setCategoryNames] = useState([]);
  const [responseData, setResponseData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [fskills, setFskills] = useState([]);
  const [bskills, setBskills] = useState([]);
  const [iskills, setIskills] = useState([]);
  const [receivedCategoryId, setReceivedCategoryId] = useState([]);
  const [selectedSkills, setselectedSkills] = useState([]);

  const skills = [bskills, fskills, iskills];
  const router = useRouter();
  const pathname = usePathname();

  const apiClient = axios.create({
    withCredentials: true,
  });

  const getCategory = async () => {
    await apiClient
      // .get("http://localhost:3000/api/v1/skills")
      .get("https://profileapp-api.onrender.com/api/v1/skills")
      .then((response) => {
        setResponseData(response.data);
        setCategoryNames(response.data.category_names);
        setFskills(response.data.frontskills);
        setBskills(response.data.backskills);
        setIskills(response.data.infraskills);
        setReceivedCategoryId(response.data.category_id.id);
        const skills = [bskills, fskills, iskills];
        // console.log(response);

        const categoryIds = response.data.category_id.map(
          (category) => category.id
        );
        setReceivedCategoryId(categoryIds);
      })
      .catch((error) => {
        console.error("Error fetching :", error);
      });
  };

  const onClickAddSkill = (name) => {
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

    if (categoryId) {
      router.push(`/skills/add/${categoryId}?categoryName=${name}`);
    }
  };

  useEffect(() => {
    getCategory();
    // console.log(skills);
  }, []);

  return (
    <div>
      {pathname.includes("skill") && (
        <div className={styles.categoryContainer}>
          {categoryNames.map((name, index) => (
            <div
              key={name}
              style={{
                border: "1px solid #808080",
                margin: "20px",
                padding: "25px",
                borderRadius: "8px",
              }}
            >
              <div className={styles.categorybox}>
                <h2 className={styles.title}>{name}</h2>
                <button
                  onClick={() => {
                    onClickAddSkill(name);
                  }}
                  className={styles.button}
                >
                  スキルを追加する
                </button>
              </div>
              <SkillCard key={name} skills={skills[index]} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
