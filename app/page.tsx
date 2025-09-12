"use client";
import React, { useState } from "react";
import type { WeatherData } from "@/.next/types/weather";
import { weatherIcons } from "./api/lib/constants";
import WeatherSearchCard from "./components/WeatherSearchCard";
import WeatherSearchResultsDashboard from "./components/WeatherResultsDashboard";
import StartupWeatherDashboard from "./components/StartupWeatherResultsDashboard";

export default function Home() {
  const [requestedWeatherData, setRequestedWeatherData] =
    useState<WeatherData | null>(null);
  const [isRequestedDataCollected, setIsRequestedDataCollected] =
    useState<Boolean>(false);
  const [userLocationWeatherData, setUserLocationWeatherData] =
    useState<WeatherData | null>(null);

  if (!isRequestedDataCollected) {
    return (
      <>
        <div>
          <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-t from-sky-500 via-sky-700 to-sky-800 ">
            <div className="flex flex-col items-center justify-center rounded">
              <WeatherSearchCard
                setRequestedWeatherData={setRequestedWeatherData}
                setIsRequestedDataCollected={setIsRequestedDataCollected}
                userLocationWeatherData={userLocationWeatherData}
              />
              <StartupWeatherDashboard
                setUserLocationWeatherData={setUserLocationWeatherData}
                userLocationWeatherData={userLocationWeatherData}
                weatherIcons={weatherIcons}
              />
            </div>
          </div>
        </div>
      </>
    );
  } else if (isRequestedDataCollected && requestedWeatherData) {
    return (
      <>
        <div>
          <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-t from-sky-500 via-sky-700 to-sky-800">
            <div>
              <WeatherSearchCard
                setRequestedWeatherData={setRequestedWeatherData}
                setIsRequestedDataCollected={setIsRequestedDataCollected}
                userLocationWeatherData={userLocationWeatherData}
              />
            </div>
            <div>
              <WeatherSearchResultsDashboard
                requestedWeatherData={requestedWeatherData}
                weatherIcons={weatherIcons}
              />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-t from-sky-500 via-sky-700 to-sky-800">
          <img src="/images/loading.svg" alt="search" className="w-40 " />
        </div>
      </>
    );
  }
}
