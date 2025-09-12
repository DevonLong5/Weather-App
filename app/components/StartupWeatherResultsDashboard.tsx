"use client";
import type { WeatherData } from "@/.next/types/weather";
import axios from "axios";
import { useEffect } from "react";
import type { WeatherIconsObject } from "@/.next/types/weather";
import Skycons from "react-skycons";

interface StartupWeatherDashboardProps {
  userLocationWeatherData: WeatherData | null;
  setUserLocationWeatherData: (data: WeatherData) => void;
  weatherIcons: WeatherIconsObject;
}

export default function StartupWeatherDashboard({
  userLocationWeatherData,
  setUserLocationWeatherData,
  weatherIcons,
}: StartupWeatherDashboardProps) {
  useEffect(() => {
    if (userLocationWeatherData === null) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        try {
          const weatherData = await axios.get<WeatherData>(
            `/api/weather/startup/?lat=${lat}&lon=${lon}`
          );
          setUserLocationWeatherData(weatherData.data);
          return;
        } catch (err) {
          if (err) {
            return err;
          }
        }
      });
    }
  }, []);

  if (userLocationWeatherData) {
    return (
      <div className="bg-gradient-to-t from-sky-500 via-sky-700 to-sky-800 p-3 grid grid-cols-3 gap-1 items-center justify-items-evenly rounded-2xl shadow-2xl text-black w-95/100 m-3 fade-in ">
        <div className="col-span-3 justify-self-center">
          <h1 className="text-4xl text-white">
            {userLocationWeatherData.name}
          </h1>
        </div>
        <div className="col-span-3 justify-self-center ">
          <h1 className="text-xl text-white ">
            {userLocationWeatherData.weather.description}
          </h1>
        </div>
        <div className="col-span-1 m-5 ">
          {/* TODO: Change icon based on weather type */}
          <Skycons
            color={weatherIcons[userLocationWeatherData.weather.icon].color}
            type={weatherIcons[userLocationWeatherData.weather.icon].type}
            animate={true}
            size={100}
            resizeClear={true}
          />
        </div>
        <div className="justify-self-end col-span-2 ">
          <h3 className="text-8xl text-white">
            {Math.round(userLocationWeatherData.main.temp)}°
          </h3>
        </div>
        <div className="col-span-3 justify-self-center ">
          <h1 className="text-xl text-white ">
            H:{Math.round(userLocationWeatherData.main.temp_max)}° L:
            {Math.round(userLocationWeatherData.main.temp_min)}°
          </h1>
        </div>
      </div>
    );
  }
}
