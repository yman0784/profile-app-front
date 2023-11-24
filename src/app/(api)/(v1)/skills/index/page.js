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
      <Auth>
        <HeaderSignedIn />
        <Categories handleValueChange={handleValueChange} />
      </Auth>
    );
  };

  return <>{renderSkillIndexForm()}</>;
};
export default Skills;
