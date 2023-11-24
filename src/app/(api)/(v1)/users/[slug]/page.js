"use client";

import { usePathname } from "next/navigation";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import NotFound from "../../../../not-found";
import HeaderSignedIn from "@/components/atoms/layouts/headers/HeaderSignedIn";
import styles from "./page.module.css";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();

  const ToEditSelfIntroduction = () => {
    localStorage.setItem("selfIntroduction", user.self_introduction);
    router.push("http://localhost:8000/users/edit");
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
      <HeaderSignedIn />
      <div className={styles.userCard}>
        <div className={styles.userContainer}>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="User Image"
              style={{
                borderRadius: "50%",
                width: "30vw",
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
    </div>
  );
};

export default UserDetails;
