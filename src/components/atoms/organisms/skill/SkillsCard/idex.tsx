import React, { useEffect } from "react";

const SkillCard = ({ skills }) => {
  return (
    <div style={{ border: "1px solid black", margin: "5px", padding: "10px" }}>
      {skills.map((skill) => (
        <div key={skill.id}>
          <p>{skill.language}</p>
          <p>{skill.level}</p>
          <button>習得レベルを保存する</button>
          <button>スキルを削除する</button>
        </div>
      ))}
    </div>
  );
};

export default SkillCard;
