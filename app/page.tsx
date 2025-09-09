"use client";
import React, { useState } from "react";
import WeatherSearchCard from "./components/WeatherSearchCard";
import WeatherSearchResultsDashboard from "./components/WeatherResultsDashboard";

export default function Home() {
  const [userData, setUserData] = useState<object>({});
  const [isDataCollected, setIsDataCollected] = useState<Boolean>(false);
  if (!isDataCollected) {
    return (
      <>
        <div>
          <div className="flex items-center justify-center h-screen bg-gradient-to-t from-sky-500 via-sky-700 to-sky-800 ">
            <WeatherSearchCard
              setUserData={setUserData}
              setIsDataCollected={setIsDataCollected}
            />
          </div>
        </div>
      </>
    );
  } else if (isDataCollected) {
    return (
      <>
        <div>
          <div className="flex items-center justify-center h-screen bg-gradient-to-t from-sky-500 via-sky-700 to-sky-800">
            <WeatherSearchResultsDashboard userData={userData} />
          </div>
        </div>
      </>
    );
  }
}
