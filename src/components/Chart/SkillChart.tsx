import React, { useEffect, useLayoutEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SkillChart = ({ skills }) => {
  const renderChart = () => {
    const languageData = skills.map((skillSet) =>
      skillSet.map((skill) => {
        if (!skill.language) {
          console.error("Language is undefined for skill:", skill);
        }
        return skill.language;
      })
    );
    const levelData = skills.map((levelSet) =>
      levelSet.map((skill) => {
        if (isNaN(skill.level)) {
          console.error("Level is not a number for skill:", skill);
          return 0;
        }
        return skill.level;
      })
    );

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
        title: {
          display: true,
          text: "Chart.js Bar Chart",
        },
      },
    };

    const data = {
      labels: languageData,
      datasets: [
        {
          label: "Skill Level",
          data: levelData,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };

    return <Bar options={options} data={data} />;
  };

  return <>{renderChart()}</>;
};
export default SkillChart;
