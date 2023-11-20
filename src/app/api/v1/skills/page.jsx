"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import HeaderSignedIn from "@/components/atoms/layouts/headers/HeaderSignedIn";
import Categories from "@/components/atoms/organisms/skill/CategoryCard";

const Skills = () => {
  return (
    <>
      <HeaderSignedIn />
      <h2>categoryテーブル一覧</h2>
      <Categories />
    </>
  );
};

export default Skills;
