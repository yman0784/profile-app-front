import axios from "axios";
import React, { useEffect, useState } from "react";
import SkillCard from "../SkillsCard/idex";
import Link from "next/link";

const Categories = () => {
  const [categoryNames, setCategoryNames] = useState([]);
  const [fskills, setFrontskills] = useState([]);
  const [bskills, setBackskills] = useState([]);
  const [iskills, setInfraskills] = useState([]);
  const skills = [fskills, bskills, iskills];

  const apiClient = axios.create({
    withCredentials: true,
  });

  const getCategory = () => {
    apiClient
      .get("http://localhost:3000/api/v1/skills")
      .then((response) => {
        setCategoryNames(response.data.category_names);
        setFrontskills(response.data.frontskills);
        setBackskills(response.data.backskills);
        setInfraskills(response.data.infraskills);
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
        <div key={name}>
          <p>{name}</p>
          <Link href="http://localhost:8000/api/v1/skills">
            <button onClick={onClickAddSkill}>スキルを追加する</button>
          </Link>
          <SkillCard key={name} skills={skills[index]} />
        </div>
      ))}
    </div>
  );
};

export default Categories;
