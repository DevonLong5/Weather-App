"use client";
import type { WeatherData, WeatherIconsObject } from "@/.next/types/weather";
import Skycons from "react-skycons";

interface WeatherSearchResultsDashboardProps {
  requestedWeatherData: WeatherData | null;
  weatherIcons: WeatherIconsObject;
}

export default function WeatherSearchResultsDashboard({
  requestedWeatherData,
  weatherIcons,
}: WeatherSearchResultsDashboardProps) {
  if (requestedWeatherData !== null) {
    console.log(requestedWeatherData.weather.description);
    return (
      <div>
        <div className="bg-gradient-to-t from-sky-500 via-sky-700 to-sky-800 p-3 grid grid-cols-3 gap-1 items-center justify-items-evenly rounded-2xl shadow-2xl text-black w-95/100 m-3 fade-in ">
          <div className="col-span-3 justify-self-center">
            <h1 className="text-4xl text-white">{requestedWeatherData.name}</h1>
          </div>
          <div className="col-span-3 justify-self-center ">
            <h1 className="text-xl text-white ">
              {requestedWeatherData.weather.description}
            </h1>
          </div>
          <div className="col-span-1 m-5 ">
            {/* TODO: Change icon based on weather type */}
            <Skycons
              color={weatherIcons[requestedWeatherData.weather.icon].color}
              type={weatherIcons[requestedWeatherData.weather.icon].type}
              animate={true}
              size={100}
              resizeClear={true}
            />
          </div>
          <div className="justify-self-end col-span-2 ">
            <h3 className="text-8xl text-white">
              {Math.round(requestedWeatherData.main.temp)}°
            </h3>
          </div>
          <div className="col-span-3 justify-self-center ">
            <h1 className="text-xl text-white ">
              H:{Math.round(requestedWeatherData.main.temp_max)}° L:
              {Math.round(requestedWeatherData.main.temp_min)}°
            </h1>
          </div>
        </div>
      </div>
    );
  }
}
