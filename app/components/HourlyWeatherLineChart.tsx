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
import { convertUnitToC } from "../lib/convertUnit";

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
  isCelciusChecked: boolean;
}

export default function HourlyWeatherLineChart({
  userLocationWeatherData,
  isCelciusChecked,
}: LineChartProps) {
  if (userLocationWeatherData) {
    const data = {
      labels: userLocationWeatherData.hourlyTemp.timeChartXAxis.map(
        (element) => element
      ),
      datasets: [
        {
          borderColor: "white",
          data: isCelciusChecked
            ? userLocationWeatherData.hourlyTemp.tempChartYAxis.map((element) =>
                convertUnitToC(element)
              )
            : userLocationWeatherData.hourlyTemp.tempChartYAxis.map((element) =>
                Math.round(element)
              ),
          borderWidth: 1,
          fill: true,
          tension: 0.6,
          pointRadius: 0.5,
          backgroundColor: (context: any) => {
            const bgColor = ["rgba(255, 0, 0, .4", "rgba(0, 0, 255, .4)"];
            if (!context.chart.chartArea) {
              return;
            }
            const {
              ctx,
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
      maintainAspectRatio: false,
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
          gridLines: {
            display: false,
          },
          ticks: {
            color: "white",
            maxTicksLimit: 12,
            font: {
              size: 12,
            },
          },
        },
        y: {
          border: { display: false },
          grid: {
            display: false,
          },
          gridLines: {
            display: false,
          },
          ticks: {
            color: "white",
            autoSkip: true,
            maxTicksLimit: 10,
            font: {
              size: 12,
            },
          },
        },
      },
    };
    return (
      <>
        <div className="w-[100%] h-60 sm:h-100">
          <Line data={data} options={options} />
        </div>
      </>
    );
  }
}
