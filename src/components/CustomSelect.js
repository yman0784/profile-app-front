"use client"

import React from "react";

const CustomSelect = (skill) => {
  const generateOptions = (skill) => {
    const options = [];
    for (let i = 0; i <= 100; i += 10) {
      if (i !== skill.level) {
        options.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }
    }
    return options;
  };
  return (
    <div>
      <select style={{ width: "20%", border: "solid,1px" }}>
        <option value={skill.level}>{skill.level}</option>
        {generateOptions(skill)}
      </select>
    </div>
  );
};

export default CustomSelect;
