import React, { useEffect, useState } from "react";
import axios from "axios";

const SkillDataLoader = ({ onDataLoaded }) => {
  const [skills, setSkills] = useState([]);

  const apiClient = axios.create({
    withCredentials: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(
          "http://localhost:3000/api/v1/skills"
        );
        const updatedSkills = [
          response.data.backskills,
          response.data.frontskills,
          response.data.infraskills,
        ];
        setSkills(updatedSkills);
        onDataLoaded(updatedSkills);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchData();
  }, []);

  return null;
};

export default SkillDataLoader;
