"use client";

import React, { useEffect, useState } from "react";
import HeaderSignedIn from "@/components/atoms/layouts/headers/HeaderSignedIn";
import Auth from "@/components/Auth";
import Footer from "@/components/atoms/layouts/Footer/Footer";
import Categories from "@/components/atoms/organisms/skill/Categories/index";

const All = () => {
  const [categoryId, setCategoryId] = useState("");
  const handleValueChange = (newValue) => {
    setCategoryId(newValue);
  };
  // const renderSkillIndexForm = () => {
  return (
    // <Auth>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <HeaderSignedIn />
      <Categories />
      <Footer />
    </div>
    // </Auth>
  );
  // };

  // return <>{renderSkillIndexForm()}</>;
};
export default All;
