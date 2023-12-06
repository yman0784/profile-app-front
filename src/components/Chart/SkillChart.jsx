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

const SkillChart = ({ skills, index, month, isLeft }) => {
  const getEnglishMonth = (month) => {
    switch (month) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        return ""; // Handle invalid month numbers
    }
  };

  const renderChart = () => {
    const languageData = skills.map((skillSet) =>
      skillSet.map((skill) => {
        if (!skill.language) {
          console.error("Language is undefined for skill:", skill);
        }
        return [skill.language, skill.created_at.substr(5, 2)];
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

    const skillAndLevel = [languageData, levelData];

    if (!skillAndLevel[0][index] || !skillAndLevel[1][index]) {
      console.error("Language or level data is undefined for index:", index);
      return null;
    }

    const labels = [];
    const datasets = [];

    skillAndLevel[0][index].forEach((language, i) => {
      const languageCreatedAt = language[1];
      const onlyLanguage = language[0];
      const dataValue = skillAndLevel[1][index][i];

      // languageCreatedAt が month より低い場合はスキップ
      if (parseInt(languageCreatedAt) > month) {
        return;
      }

      labels.push(onlyLanguage);

      datasets.push({
        label: onlyLanguage,
        data: [dataValue],
        backgroundColor: getBackgroundColor(i),
        borderColor: getBackgroundColor(i),
        borderWidth: 1,
      });
    });

    console.log("Labels:", labels);
    console.log("Datasets:", datasets);
    console.log("skills", skills);

    const data = {
      labels: labels,
      datasets: datasets,
      borderWidth: 5,
    };

    console.log("Final Data:", data);

    const options = {
      layout: {
        padding: {
          top: -10, // 凡例の高さに合わせて調整
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: "category",
          labels: [""],
          barPercentage: 0.3, // バーの幅の割合を狭く設定
          categoryPercentage: 0.5, // カテゴリーの間隔の割合を狭く設定
        },
        y: {
          display: true, // y軸の値を表示または非表示にする
          grid: {
            display: true, // グリッド線を表示
          },
          ticks: {
            display: true, // y軸の数値を非表示にする
            color: isLeft ? "rgba(0, 0, 0, 1)" : "rgba(255, 255, 255, 0)",
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: getEnglishMonth(month), // x軸のタイトル
          position: "bottom", // タイトルの位置を下に設定
        },
        // titleSpacing: "1",
        titleMarginBottom: 3,
      },
      legend: {
        display: false, // 凡例を非表示にする
      },
      tooltips: {
        enabled: false, // ツールチップを非表示にする
      },
      // barThickness: 80,
      // maxBarThickness: 80, // バーの最大幅を指定 (任意)
      // categorySpacing: 500,
    };

    return (
      <Bar
        options={options}
        data={data}
        style={{
          width: "100%",
          height: "100%",
          marginRight: "-20px",
          padding: "-10px",
        }}
      />
    );
  };

  const getBackgroundColor = (index) => {
    const colors = [
      "rgba(254, 178, 194)",
      "rgba(254, 207, 164)",
      "rgba(254, 229, 175)",
      // "rgba(75, 192, 192, 0.8)",
      // "rgba(255, 99, 132, 0.8)",
      // "rgba(255, 205, 86, 0.8)",
      // "rgba(54, 162, 235, 0.8)",
      // "rgba(153, 102, 255, 0.8)",
    ];

    return colors[index % colors.length];
  };

  return <div style={{ width: "100%", height: "100%" }}>{renderChart()}</div>;
};

export default SkillChart;
