"use client";

import React, { useState } from "react";
import axios from "axios";

const Skills = () => {
  const [fskills, setFrontskills] = useState([]);
  const [bskills, setBackskills] = useState([]);
  const [iskills, setInfraskills] = useState([]);

  const apiClient = axios.create({
    withCredentials: true,
  });

  const getSkills = () => {
    apiClient
      .get("http://localhost:3000/api/v1/skills")
      .then((response) => {
        console.log(response);
        setFrontskills(response.data.frontskills);
        setBackskills(response.data.backskills);
        setInfraskills(response.data.infraskills);
        // console.log(currentUser);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  };

  return (
    <>
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
      </ul>
    </>
  );
};

export default Skills;
