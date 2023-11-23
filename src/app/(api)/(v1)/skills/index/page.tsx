"use client";

import React, { useEffect, useState } from "react";
import HeaderSignedIn from "@/components/atoms/layouts/headers/HeaderSignedIn";
import Categories from "@/components/atoms/organisms/skill/Categories";
import Auth from "@/components/Auth";

const Skills = () => {
  const [categoryId, setCategoryId] = useState("");
  const handleValueChange = (newValue) => {
    setCategoryId(newValue);
  };
  const renderSkillIndexForm = () => {
    return (
      <>
        <HeaderSignedIn />
        <h2>categoryテーブル一覧</h2>
        <Categories handleValueChange={handleValueChange} />
      </>
    );
  };

  return (
    <>
      <Auth>{renderSkillIndexForm()}</Auth>
    </>
  );
};
export default Skills;
