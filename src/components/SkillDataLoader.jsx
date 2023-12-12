"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "./TokenContext";

const SkillDataLoader = ({ onDataLoaded }) => {
  const [skills, setSkills] = useState([]);
  const { token } = useToken();
  const { sessionId } = useToken();

  const apiClient = axios.create({
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      _session_id: `${sessionId}`,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(
          // "http://localhost:3000/api/v1/skills"
          "https://profileapp-api.onrender.com/api/v1/skills"
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
