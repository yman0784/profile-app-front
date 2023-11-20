import axios from "axios";
import React, { useEffect, useState } from "react";
import SkillCard from "../SkillsCard/idex";

const Categories = () => {
  const [categoryNames, setCategoryNames] = useState([]);
  const [fskills, setFrontskills] = useState([]);
  const [bskills, setBackskills] = useState([]);
  const [iskills, setInfraskills] = useState([]);
  const skills = [fskills, bskills, iskills];

  const apiClient = axios.create({
    withCredentials: true,
  });

  const getCategoryNames = () => {
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
  useEffect(() => {
    getCategoryNames();
  }, []);

  return (
    <div>
      {categoryNames.map((name, index) => (
        <SkillCard key={name} name={name} skills={skills[index]} />
      ))}
    </div>
  );
};

export default Categories;
