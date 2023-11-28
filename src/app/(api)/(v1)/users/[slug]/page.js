"use client";

import { useParams, usePathname } from "next/navigation";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import NotFound from "../../../../not-found";
import HeaderSignedIn from "@/components/atoms/layouts/headers/HeaderSignedIn";
import styles from "./page.module.css";
import SkillDataLoader from "@/components/SkillDataLoader";
import SkillChart from "@/components/Chart/SkillChart";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const params = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const [chartSkills, setChartSkills] = useState([]);
  const handleSkillFromChild = (skills) => {
    setChartSkills(skills);
    console.log(skills);
  };

  const ToEditSelfIntroduction = () => {
    if (!user) {
      console.error("User is null");
      return;
    }
    localStorage.setItem("selfIntroduction", user.self_introduction);
    router.push(`http://localhost:8000/users/edit/${params.slug}`);
  };

  const ToSkillIndex = () => {
    router.push("http://localhost:8000/skills/index");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const apiClient = axios.create({
          withCredentials: true,
        });
        const response = await apiClient.get(
          `http://localhost:3000/api/v1${pathname}`
        );
        setUser(response.data.user);
        setLoading(false);
        setImageUrl(response.data.image);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [pathname]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <NotFound />;
  }
  return (
    <div>
      <SkillDataLoader onDataLoaded={handleSkillFromChild} />
      <HeaderSignedIn />
      <div className={styles.userCard}>
        <div className={styles.userContainer}>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="User Image"
              style={{
                borderRadius: "50%",
                width: "20vw",
                height: "20vw",
                margin: "auto 0",
              }}
            />
          )}
          <div className={styles.userSentence}>
            <div>
              <h2 className={styles.title}>自己紹介</h2>
            </div>
            <p className={styles.userIntroduction}>{user.self_introduction}</p>
            <div>
              <button
                className={styles.button}
                onClick={ToEditSelfIntroduction}
                user={user}
              >
                自己紹介を編集する
              </button>
            </div>
          </div>
        </div>
        <div></div>
        <div className={styles.skillsContainer}>
          <div>
            <h2 className={styles.skillTitle}>スキルチャート</h2>
            <div className={styles.skillButtonwrapper}>
              <button className={styles.button} onClick={ToSkillIndex}>
                スキルを編集する
              </button>
            </div>
          </div>
        </div>
      </div>
      <SkillChart skills={chartSkills} />
      {/* <SkillChart></SkillChart> */}
    </div>
  );
};

export default UserDetails;
