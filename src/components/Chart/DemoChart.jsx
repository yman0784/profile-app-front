import React from "react";
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

function DemoChart({ month, isLeft }) {
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
  const labels = [getEnglishMonth(month)];
  const graphData = {
    labels: labels,
    datasets: [
      {
        label: "フロントエンド",
        data: [65, 59, 60, 81, 56, 55],
        backgroundColor: "rgba(254, 178, 194)",
        borderColor: "rgba(254, 178, 194)",
      },
      {
        label: "バックエンド",
        data: [60, 55, 57, 61, 75, 50],
        backgroundColor: "rgba(254, 207, 164)",

        borderColor: "rgba(254, 207, 164)",
      },
      {
        label: "インフラ",
        data: [60, 55, 57, 61, 75, 50],
        backgroundColor: "rgba(254, 229, 175)",

        borderColor: "rgba(254, 229, 175)",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        display: true,
        ticks: {
          color: isLeft ? "rgba(0, 0, 0, 1)" : "rgba(255, 255, 255, 0)",
        },
      },
    },
  };

  return (
    <div className="DemoChart">
      <Bar
        height={300}
        width={550}
        data={graphData}
        options={options}
        id="chart-key"
      />
    </div>
  );
}

export default DemoChart;
