import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js/auto";
import { Line } from "react-chartjs-2";
import type { WeatherData } from "../types/weather";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

interface LineChartProps {
  userLocationWeatherData: WeatherData | null;
}

export default function HourlyWeatherLineChart({
  userLocationWeatherData,
}: LineChartProps) {
  if (userLocationWeatherData) {
    const data = {
      labels: userLocationWeatherData.timeChartXAxis.map((element) => element),
      datasets: [
        {
          borderColor: "white",
          data: userLocationWeatherData.tempChartYAxis.map(
            (element) => element
          ),
          borderWidth: 1,
          fill: true,
          backgroundColor: (context: any) => {
            const bgColor = ["rgba(255, 0, 0, .4", "rgba(0, 0, 255, .4)"];
            if (!context.chart.chartArea) {
              return;
            }
            const {
              ctx,
              data,
              chartArea: { top, bottom },
            } = context.chart;
            const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
            gradientBg.addColorStop(0, bgColor[0]);
            gradientBg.addColorStop(1, bgColor[1]);
            return gradientBg;
          },
        },
      ],
    };
    const options = {
      responsive: true,
      plugins: {
        title: {
          display: false,
        },
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          border: { display: false },
          grid: {
            display: false,
          },
          ticks: {
            color: "white",
          },
        },
        y: {
          border: { display: false },
          grid: {
            display: false,
          },
          ticks: {
            color: "white",
          },
        },
      },
    };
    return (
      <>
        <Line data={data} options={options} />
      </>
    );
  }
}
