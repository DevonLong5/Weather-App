"use client";
import React, { useState, useEffect, Suspense } from "react";
import type { WeatherData } from "./types/weather";
import { weatherIcons } from "./lib/constants";
import WeatherSearchResultsDashboard from "./components/WeatherResultsDashboard";
import StartupWeatherDashboard from "./components/StartupWeatherResultsDashboard";
import Loading from "./loading";

export default function Home() {
  const [requestedWeatherData, setRequestedWeatherData] =
    useState<WeatherData | null>(null);
  const [isRequestedDataCollected, setIsRequestedDataCollected] =
    useState<Boolean>(false);
  const [userLocationWeatherData, setUserLocationWeatherData] =
    useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuggestionLoading, setIsSuggestionLoading] =
    useState<boolean>(false);
  const [isCelciusChecked, setIsCelciusChecked] = useState<boolean>(false);
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
          });
      });
    }
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {!isRequestedDataCollected && userLocationWeatherData && !isLoading && (
        <StartupWeatherDashboard
          userLocationWeatherData={userLocationWeatherData}
          weatherIcons={weatherIcons}
          setIsSuggestionLoading={setIsSuggestionLoading}
          isSuggestionLoading={isSuggestionLoading}
          setRequestedWeatherData={setRequestedWeatherData}
          setIsRequestedDataCollected={setIsRequestedDataCollected}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          isCelciusChecked={isCelciusChecked}
          setIsCelciusChecked={setIsCelciusChecked}
        />
      )}

      {isRequestedDataCollected && requestedWeatherData && (
        <WeatherSearchResultsDashboard
          requestedWeatherData={requestedWeatherData}
          weatherIcons={weatherIcons}
          setIsSuggestionLoading={setIsSuggestionLoading}
          isSuggestionLoading={isSuggestionLoading}
          setRequestedWeatherData={setRequestedWeatherData}
          setIsRequestedDataCollected={setIsRequestedDataCollected}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          isCelciusChecked={isCelciusChecked}
          setIsCelciusChecked={setIsCelciusChecked}
        />
      )}
    </>
  );
}
