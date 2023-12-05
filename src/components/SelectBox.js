import React, { useState } from "react";

const SelectBox = ({ onSelectChange }) => {
  const [selectedOption, setSelectedOption] = useState(0);

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setSelectedOption(value);
    onSelectChange(value); // 親コンポーネントに選択された値を渡す
  };

  return (
    <>
      <select id="selectBox" value={selectedOption} onChange={handleChange}>
        <option value={0}>バックエンド</option>
        <option value={1}>フロントエンド</option>
        <option value={2}>インフラ</option>
      </select>
    </>
  );
};

export default SelectBox;
