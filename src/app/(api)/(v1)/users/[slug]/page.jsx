"use client";

import { useParams, usePathname, useSearchParams } from "next/navigation";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import NotFound from "../../../../not-found";
import HeaderSignedIn from "@/components/atoms/layouts/headers/HeaderSignedIn";
import styles from "./page.module.css";
import SkillDataLoader from "@/components/SkillDataLoader";
import SkillChart from "@/components/Chart/SkillChart";
import SkillChartCategory from "@/components/Chart/SkillChartCategory";
import SelectBox from "@/components/SelectBox";
import Toast from "@/components/atoms/Toast";
import Footer from "@/components/atoms/layouts/Footer/Footer";
import { useToken } from "@/components/TokenContext";

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
  const [showToast, setShowToast] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const searchParams = useSearchParams();
  const { token } = useToken();

  const handleSkillFromChild = (skills) => {
    setChartSkills(skills);
    console.log(skills);
  };

  useEffect(() => {
    setShowToast(true);
    setLoginMessage(searchParams.get("message"));
  }, [searchParams]);

  const ToEditSelfIntroduction = () => {
    if (!user) {
      console.error("User is null");
      return;
    }
    //   "selfIntroduction",
    //   user.self_introduction ? user.self_introduction : ""
    // );
    const selfIntroduction = user.self_introduction
      ? user.self_introduction
      : "";

    router.push(
      `/users/edit/${params.slug}?selfIntroduction=${selfIntroduction}`
    );
  };

  const handleSelectChange = (selectedValue) => {
    console.log("Selected value in parent component:", selectedValue);
    setSelectedValue(selectedValue);
  };

  const ToSkillIndex = () => {
    router.push("/skills/index");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const apiClient = axios.create({
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer Bearer ${token}`,
          },
        });
        const response = await apiClient.get(
          `http://localhost:3000/api/v1${pathname}`
          // `https://profileapp-api.onrender.com/api/v1${pathname}`
        );
        console.log(response);
        setUser(response.data.user);
        setLoading(false);
        setImageUrl(response.data.image);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
    console.log(nowMonth);
    console.log(lastMonth);
    console.log(twoMonthsAgo);
  }, [lastMonth, nowMonth, pathname, twoMonthsAgo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <NotFound />;
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <SkillDataLoader onDataLoaded={handleSkillFromChild} />
      <HeaderSignedIn user={user} />
      {/* {loginMessage === null ? (
        ""
      ) : (
        <Toast showToast={showToast} message={loginMessage} color={"#55c500"} />
      )} */}
      <div className={styles.userCard}>
        <div className={styles.userContainer}>
          {imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
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
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <SelectBox onSelectChange={handleSelectChange} />
              </div>
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
          <SkillChart
            skills={chartSkills}
            className={styles.chartBox}
            index={selectedValue}
            month={twoMonthsAgo}
            isLeft={true}
          />
        </div>
        <div style={{ width: "30%", height: "500px", display: "flex" }}>
          <SkillChart
            skills={chartSkills}
            className={styles.chartBox}
            index={selectedValue}
            month={lastMonth}
            isLeft={false}
          />
        </div>
        <div style={{ width: "30%", height: "500px", display: "flex" }}>
          <SkillChart
            skills={chartSkills}
            className={styles.chartBox}
            index={selectedValue}
            month={nowMonth}
            isLeft={false}
          />
        </div>
        {/* <div style={{ width: "30%", height: "500px", display: "flex" }}>
          <SkillChartCategory
            skills={chartSkills}
            className={styles.chartBox}
            index={selectedValue}
            month={nowMonth}
            isLeft={false}
          />
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default UserDetails;
