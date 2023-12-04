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

const DemoChart = (isLeft, month) => {
  const renderChart = () => {
    const data = {
      labels: ["Dataset1", "Dataset3", "Dataset4"],
      datasets: [
        {
          data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
          backgroundColor: [
            "rgba(254, 178, 194)",
            "rgba(254, 207, 164)",
            "rgba(254, 229, 175)",
          ],
          borderColor: [
            "rgba(254, 178, 194)",
            "rgba(254, 207, 164)",
            "rgba(254, 229, 175)",
          ],
          borderWidth: 5,
        },
      ],
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
          barPercentage: 0.6, // バーの幅の割合（0.5はバーの幅がデフォルトの50%になる）
          categoryPercentage: 0.8, // カテゴリーの間隔の割合（0.5はカテゴリーの間隔がデフォルトの50%になる）
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
          text: `${month}月`, // x軸のタイトル
          position: "bottom", // タイトルの位置を下に設定
        },
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
          padding: "-20px",
        }}
      />
    );
  };

  const getBackgroundColor = (index) => {
    const colors = [
      "rgba(254, 178, 194)",
      "rgba(254, 207, 164)",
      "rgba(254, 229, 175)",
    ];

    return colors[index % colors.length];
  };

  return <div style={{ width: "100%", height: "100%" }}>{renderChart()}</div>;
};

export default DemoChart;
