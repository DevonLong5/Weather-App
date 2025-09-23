"use client";
import React, { useState, useEffect, Suspense } from "react";
import type { WeatherData } from "./types/weather";
import { weatherIcons } from "./lib/constants";
import WeatherSearchResultsDashboard from "./components/WeatherResultsDashboard";
import StartupWeatherDashboard from "./components/StartupWeatherResultsDashboard";
import Loading from "./loading";
import WeatherSearchCard from "./components/WeatherSearchCard";

export default function Home() {
  const [requestedWeatherData, setRequestedWeatherData] =
    useState<WeatherData | null>(null);
  const [isRequestedDataCollected, setIsRequestedDataCollected] =
    useState<Boolean>(false);
  const [userLocationWeatherData, setUserLocationWeatherData] =
    useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    if (userLocationWeatherData === null) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        await fetch(`/api/weather/startup/?lon=${lon}&lat=${lat}`)
          .then((response) => response.json())
          .then((data) => setUserLocationWeatherData(data))
          .catch((error) => console.log(error))
          .finally(() => {
            setIsLoading(false);
            console.log("done");
          });
      });
    }
  }, []);

  return (
    <>
      <div className="h-screen bg-gradient-to-br from-blue-500 to-indigo-700">
        <div className="p-2">
          <WeatherSearchCard
            setRequestedWeatherData={setRequestedWeatherData}
            setIsRequestedDataCollected={setIsRequestedDataCollected}
            userLocationWeatherData={userLocationWeatherData}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </div>

        {isLoading && <Loading />}

        {!isRequestedDataCollected && userLocationWeatherData && !isLoading && (
          <StartupWeatherDashboard
            setUserLocationWeatherData={setUserLocationWeatherData}
            userLocationWeatherData={userLocationWeatherData}
            weatherIcons={weatherIcons}
            setRequestedWeatherData={setRequestedWeatherData}
            setIsRequestedDataCollected={setIsRequestedDataCollected}
          />
        )}

        {isRequestedDataCollected && requestedWeatherData && (
          <WeatherSearchResultsDashboard
            requestedWeatherData={requestedWeatherData}
            weatherIcons={weatherIcons}
            setRequestedWeatherData={setRequestedWeatherData}
            setIsRequestedDataCollected={setIsRequestedDataCollected}
            userLocationWeatherData={userLocationWeatherData}
          />
        )}
      </div>
    </>
  );
}
