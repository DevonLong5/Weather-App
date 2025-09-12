"use client";
import type { WeatherData } from "../types/weather";
import axios from "axios";
import { useEffect } from "react";
import WeatherSearchCard from "./WeatherSearchCard";
import type { WeatherIconsObject } from "../types/weather";
import Skycons from "react-skycons";

interface StartupWeatherDashboardProps {
  userLocationWeatherData: WeatherData | null;
  setUserLocationWeatherData: (data: WeatherData) => void;
  weatherIcons: WeatherIconsObject;
  setRequestedWeatherData: (data: WeatherData) => void;
  setIsRequestedDataCollected: (data: boolean) => void;
  setLoading: (data: boolean) => void;
}

export default function StartupWeatherDashboard({
  userLocationWeatherData,
  setUserLocationWeatherData,
  weatherIcons,
  setRequestedWeatherData,
  setIsRequestedDataCollected,
  setLoading,
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
        <div className="col-span-3 justify-self-center p-2 ">
          <WeatherSearchCard
            setRequestedWeatherData={setRequestedWeatherData}
            setIsRequestedDataCollected={setIsRequestedDataCollected}
            userLocationWeatherData={userLocationWeatherData}
            setLoading={setLoading}
          />
        </div>
        <div className="col-span-3 justify-self-center">
          <h1 className="text-4xl text-white ">
            {userLocationWeatherData.name}
          </h1>
        </div>
        <div className="col-span-3 justify-self-center pl-[25px] my-2">
          <h3 className="text-8xl text-white ">
            {Math.round(userLocationWeatherData.main.temp)}°
          </h3>
        </div>
        <div className="col-span-3 justify-self-center m-2 ">
          <div className="scale-150">
            <Skycons
              color={weatherIcons[userLocationWeatherData.weather.icon].color}
              type={weatherIcons[userLocationWeatherData.weather.icon].type}
              animate={true}
              size={80}
              resizeClear={true}
            />
          </div>
        </div>
        <div className="col-span-3 justify-self-center py-1">
          <h1 className="text-2xl text-white ">
            {userLocationWeatherData.weather.description}
          </h1>
        </div>
        <div className="col-span-3 justify-self-center ">
          <h1 className="text-xl text-white ">
            H:{Math.round(userLocationWeatherData.main.temp_max)}° L:
            {Math.round(userLocationWeatherData.main.temp_min)}°
          </h1>
        </div>
        <div className="col-span-3">
          <div className="p-3 grid grid-cols-2 gap-3 items-center justify-items-evenly w-95/100 ">
            <div className="bg-gradient-to-t from-sky-400 via-sky-500 to-sky-600 m-3 text-3xl p-3 rounded-2xl text-white shadow-2xl w-95/100 h-95/100 ">
              <h1 className="p-2">Feels like: </h1>
              <h1 className="p-2">
                {Math.round(userLocationWeatherData.main.feels_like)}°
              </h1>
            </div>
            <div className="bg-gradient-to-t from-sky-400 via-sky-500 to-sky-600 m-3 text-1xl p-3 rounded-2xl text-white shadow-2xl w-95/100 h-95/100 ">
              <div className="grid grid-rows-4 grid-cols-2 gap-2 ">
                <div className="col-span-1">
                  <h1 className="p-1">Wind</h1>
                </div>
                <div className="col-span-1 justify-self-end ">
                  <h1 className="p-1">MPH</h1>
                </div>
                <div className="col-span-1">
                  <h1 className="p-1 ">Speed </h1>
                </div>
                <div className="col-span-1 justify-self-end ">
                  <h1 className="p-1">
                    {Math.round(userLocationWeatherData.wind.speed)}
                  </h1>
                </div>
                <div className="col-span-1">
                  <h1 className="p-1">Gust</h1>
                </div>
                <div className="col-span-1 justify-self-end ">
                  <h1 className="p-1">
                    {Math.round(userLocationWeatherData.wind.gust)}
                  </h1>
                </div>
                <div className="col-span-1">
                  <h1 className="p-1">Direction</h1>
                </div>
                <div className="col-span-1 justify-self-end">
                  <h1 className="p-1">
                    East
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
