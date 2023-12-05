"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import HeaderSignedIn from "@/components/atoms/layouts/headers/HeaderSignedIn";
import Categories from "@/components/atoms/organisms/skill/CategoryCard";

const Skills = () => {
  const [fskills, setFrontskills] = useState([]);
  const [bskills, setBackskills] = useState([]);
  const [iskills, setInfraskills] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);

  const apiClient = axios.create({
    withCredentials: true,
  });

  const getSkills = () => {
    apiClient
      .get("http://localhost:3000/api/v1/skills")
      .then((response) => {
        setFrontskills(response.data.frontskills);
        setBackskills(response.data.backskills);
        setInfraskills(response.data.infraskills);
        setCategoryNames(response.data.category_names);
        console.log(response.data);
        console.log(response.data.category_names);
        console.log(bskills);
        console.log(categoryNames);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  };

  // const categoriesName = () => {
  //   apiClient
  //     .get("http://localhost:3000/api/v1/skills")
  //     .then((response) => {
  //       setCategoryNames({
  //         front: response.data.frontskillsname,
  //         back: response.data.backskillsname,
  //         infra: response.data.infraskillsname,
  //       });
  //       console.log(categoryNames);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching todos:", error);
  //     });
  // };

  // useEffect(() => {
  //   getSkills();
  // }, []);

  return (
    <>
      <HeaderSignedIn />
      <Categories categoryNames={categoryNames} />
      <h1>Test</h1>
      <button onClick={getSkills}>skill一覧</button>
      <ul>
        <h3>フロントスキル一覧</h3>
        {fskills.map((skill, index) => (
          <li key={skill.id}>
            title:{skill.language}
            <br />
            level:{skill.level}
            <br />
          </li>
        ))}
        <h3>バックスキル一覧</h3>
        {bskills.map((skill, index) => (
          <li key={skill.id}>
            title:{skill.language}
            <br />
            level:{skill.level}
            <br />
          </li>
        ))}
        <h3>インフラスキル一覧</h3>
        {iskills.map((skill, index) => (
          <li key={skill.id}>
            title:{skill.language}
            <br />
            level:{skill.level}
            <br />
          </li>
        ))}
        {categoryNames.map((name, index) => (
          <li key={name}>
            title:{name}
            <br />
            level:{name}
            <br />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Skills;
