"use client";
import React, { useState, useEffect, Suspense } from "react";
import type { WeatherData } from "./types/weather";
import WeatherSearchResultsDashboard from "./components/WeatherResultsDashboard";
import Loading from "./loading";
import { weatherIcons } from "./lib/constants";

export default function Home() {
  const [requestedWeatherData, setRequestedWeatherData] =
    useState<WeatherData | null>(null);
  const [isRequestedDataCollected, setIsRequestedDataCollected] =
    useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSuggestionLoading, setIsSuggestionLoading] =
    useState<boolean>(false);
  const [isCelciusChecked, setIsCelciusChecked] = useState<boolean>(false);
  useEffect(() => {
    if (requestedWeatherData === null) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        await fetch(`/api/weather/?lon=${lon}&lat=${lat}`)
          .then((response) => response.json())
          .then((data) => setRequestedWeatherData(data))
          .catch((error) => console.log(error))
          .finally(() => {
            setIsLoading(false);
            setIsRequestedDataCollected(true);
          });
      });
    }
  }, []);

  return (
    <div>
      {isLoading && <Loading />}

      {isRequestedDataCollected && requestedWeatherData && !isLoading && (
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
    </div>
  );
}
