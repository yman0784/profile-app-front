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

const SkillChartCategory = ({ skills, index, month, isLeft }) => {
  const calculateDataSum = (skill) => {
    // skill.data が配列であることを確認し、合計を計算
    if (Array.isArray(skill.data)) {
      return skill.data.reduce((sum, value) => sum + value, 0);
    }
    // data プロパティが配列でない場合、エラーまたはデフォルト値を返す
    // console.error("Invalid data format for skill:", skill);
    return 0;
  };

  // 各要素の data の合計を計算
  // console.log("skills[index]:", skills[index]);
  const levels = [];
  skills[index].forEach((skill) => {
    levels.push(skill.level);
  });
  // console.log(levels);
  // const dataSums = skills[index].map((skill) => calculateDataSum(skill));

  // dataSums をコンソールに表示
  // console.log("Data Sums:", dataSums);

  //   const options = {
  //     layout: {
  //       padding: {
  //         top: -10, // 凡例の高さに合わせて調整
  //       },
  //     },
  //     responsive: true,
  //     maintainAspectRatio: false,
  //     scales: {
  //       x: {
  //         type: "category",
  //         labels: [""],
  //         barPercentage: 0.6, // バーの幅の割合（0.5はバーの幅がデフォルトの50%になる）
  //         categoryPercentage: 0.8, // カテゴリーの間隔の割合（0.5はカテゴリーの間隔がデフォルトの50%になる）
  //       },
  //       y: {
  //         display: true, // y軸の値を表示または非表示にする
  //         grid: {
  //           display: true, // グリッド線を表示
  //         },
  //         ticks: {
  //           display: true, // y軸の数値を非表示にする
  //           color: isLeft ? "rgba(0, 0, 0, 1)" : "rgba(255, 255, 255, 0)",
  //         },
  //       },
  //     },
  //     plugins: {
  //       title: {
  //         display: true,
  //         text: `${month}月`, // x軸のタイトル
  //         position: "bottom", // タイトルの位置を下に設定
  //       },
  //     },
  //     legend: {
  //       display: false, // 凡例を非表示にする
  //     },
  //     tooltips: {
  //       enabled: false, // ツールチップを非表示にする
  //     },
  //   };

  //   return (
  //     <Bar
  //       options={options}
  //       // data={data}
  //       style={{
  //         width: "100%",
  //         height: "100%",
  //         marginRight: "-20px",
  //         padding: "-20px",
  //       }}
  //     />
  //   );
  // };

  // const getBackgroundColor = (index) => {
  //   const colors = [
  //     "rgba(254, 178, 194)",
  //     "rgba(254, 207, 164)",
  //     "rgba(254, 229, 175)",
  //   ];

  //   return colors[index % colors.length];
  // };

  // return <div style={{ width: "100%", height: "100%" }}>{renderChart()}</div>;
};

export default SkillChartCategory;
