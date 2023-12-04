"use client";

import { useParams, usePathname } from "next/navigation";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import NotFound from "../../../../not-found";
import HeaderSignedIn from "@/components/atoms/layouts/headers/HeaderSignedIn";
import styles from "./page.module.css";
import SkillDataLoader from "@/components/SkillDataLoader";
import DemoChart from "@/components/Chart/DemoChart";
import SkillChartCategory from "@/components/Chart/SkillChartCategory";
import SelectBox from "@/components/SelectBox";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState(0);
  const pathname = usePathname();
  const params = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const [chartSkills, setChartSkills] = useState([]);
  const nowDate = new Date();
  const nowMonth = nowDate.getMonth() + 1;
  const lastMonth = ((nowDate.getMonth() + 11) % 12) + 1;
  const twoMonthsAgo = ((nowDate.getMonth() + 10) % 12) + 1;
  // const handleSkillFromChild = (skills) => {
  //   setChartSkills(skills);
  //   console.log(skills);
  // };

  // const ToEditSelfIntroduction = () => {
  //   if (!user) {
  //     console.error("User is null");
  //     return;
  //   }
  //   localStorage.setItem("selfIntroduction", user.self_introduction);
  //   router.push(`http://localhost:8000/users/edit/${params.slug}`);
  // };

  // const handleSelectChange = (selectedValue) => {
  //   console.log("Selected value in parent component:", selectedValue);
  //   setSelectedValue(selectedValue);
  // };

  // const ToSkillIndex = () => {
  //   router.push("http://localhost:8000/skills/index");
  // };

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const apiClient = axios.create({
  //         withCredentials: true,
  //       });
  //       const response = await apiClient.get(
  //         `http://localhost:3000/api/v1${pathname}`
  //       );
  //       setUser(response.data.user);
  //       setLoading(false);
  //       setImageUrl(response.data.image);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };
  //   fetchUserData();
  //   console.log(nowMonth);
  //   console.log(lastMonth);
  //   console.log(twoMonthsAgo);
  // }, [pathname]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!user) {
  //   return <NotFound />;
  // }
  return (
    <div>
      <HeaderSignedIn />
      <div className={styles.userCard}>
        <div className={styles.userContainer}>
          <img
            src={imageUrl}
            // alt="User Image"
            style={{
              borderRadius: "50%",
              width: "20vw",
              height: "20vw",
              margin: "auto 0",
              backgroundColor: "#c4c4c4",
            }}
          />

          <div className={styles.userSentence}>
            <div>
              <h2 className={styles.title}>自己紹介</h2>
            </div>
            <p className={styles.userIntroduction}>
              ログインして、自己紹介文と画像を登録しましょう！
            </p>
            {/* <div>
              <button className={styles.button} user={user}>
                自己紹介を編集する
              </button>
            </div> */}
          </div>
        </div>
        <div></div>
        <div className={styles.skillsContainer}>
          <div>
            <h2 className={styles.skillTitle}>スキルチャート</h2>
            {/* <div className={styles.skillButtonwrapper}>
              <button className={styles.button}>スキルを編集する</button>
            </div> */}
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}></div>
              <br />
            </div>
          </div>
        </div>
      </div>
      <div
        className="chartWrapper"
        style={{
          // width: "60%",
          height: "50%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "30%", height: "500px" }}>
          <DemoChart
            className={styles.chartBox}
            month={twoMonthsAgo}
            index={selectedValue}
            isLeft={true}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
