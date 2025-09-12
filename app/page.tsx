"use client";
import React, { useState } from "react";
import type { WeatherData } from "./types/weather";
import { weatherIcons } from "./lib/constants";
import WeatherSearchResultsDashboard from "./components/WeatherResultsDashboard";
import StartupWeatherDashboard from "./components/StartupWeatherResultsDashboard";

export default function Home() {
  const [requestedWeatherData, setRequestedWeatherData] =
    useState<WeatherData | null>(null);
  const [isRequestedDataCollected, setIsRequestedDataCollected] =
    useState<Boolean>(false);
  const [userLocationWeatherData, setUserLocationWeatherData] =
    useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);

  if (!isRequestedDataCollected && !loading) {
    return (
      <>
        <div>
          <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-t from-sky-500 via-sky-700 to-sky-800 ">
            <div className="flex flex-col items-center justify-center rounded">
              {loading ? (
                <>
                  <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-t from-sky-500 via-sky-700 to-sky-800">
                    <img
                      src="/images/loading.svg"
                      alt="search"
                      className="w-40 "
                    />
                  </div>
                </>
              ) : (
                <StartupWeatherDashboard
                  setUserLocationWeatherData={setUserLocationWeatherData}
                  userLocationWeatherData={userLocationWeatherData}
                  weatherIcons={weatherIcons}
                  setRequestedWeatherData={setRequestedWeatherData}
                  setIsRequestedDataCollected={setIsRequestedDataCollected}
                  setLoading={setLoading}
                />
              )}
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
              <WeatherSearchResultsDashboard
                requestedWeatherData={requestedWeatherData}
                weatherIcons={weatherIcons}
                setRequestedWeatherData={setRequestedWeatherData}
                setIsRequestedDataCollected={setIsRequestedDataCollected}
                userLocationWeatherData={userLocationWeatherData}
                setLoading={setLoading}
              />
            </div>
          </div>
        </div>
      </>
    );
  } else if (loading) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-t from-sky-500 via-sky-700 to-sky-800">
          <img src="/images/loading.svg" alt="search" className="w-40 " />
        </div>
      </>
    );
  }
}
