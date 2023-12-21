"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "./TokenContext";
import Cookies from "js-cookie";
import { AuthorizationForFetch } from "@/components/ServerAction";

const SkillDataLoader = ({ onDataLoaded }) => {
  const [skills, setSkills] = useState([]);
  const { token } = useToken();
  const { sessionId } = useToken();
  // const authorization = Cookies.get("authorization");

  // const apiClient = axios.create({
  //   withCredentials: true,
  //   secure: true,
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `${authorization}`,
  //   },
  // });

  useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const response = await apiClient.get(
    //         // "http://localhost:3000/api/v1/skills"
    //         "https://profileapp-api.onrender.com/api/v1/skills"
    //       );
    //       const updatedSkills = [
    //         response.data.backskills,
    //         response.data.frontskills,
    //         response.data.infraskills,
    //       ];
    //       setSkills(updatedSkills);
    //       onDataLoaded(updatedSkills);
    //     } catch (error) {
    //       console.error("Error fetching skills:", error);
    //     }
    //   };

    //   fetchData();
    // }, []);

    // return null;
    const fetchSkillsData = async (path) => {
      const fetchSkills = await AuthorizationForFetch(path);
      if (fetchSkills) {
        const updatedSkills = [
          fetchSkills.backskills,
          fetchSkills.frontskills,
          fetchSkills.infraskills,
        ];
        setSkills(updatedSkills);
        onDataLoaded(updatedSkills);
      } else {
        setSkills(null);
      }
    };
    const path = "/skills";
    fetchSkillsData(path);
  }, []);
};

export default SkillDataLoader;
