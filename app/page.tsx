"use client";
import React, { useState } from "react";
import WeatherSearchCard from "./components/WeatherSearchCard";
import WeatherSearchResultsDashboard from "./components/WeatherResultsDashboard";

export default function Home() {
  const [userData, setUserData] = useState<object>({});
  return (
    <>
      <div className="flex items-center justify-center h-screen  bg-gradient-to-t from-indigo-700 via-indigo-300 to-indigo-700">
        <WeatherSearchCard setUserData={setUserData} />
      </div>
      <div>
        <WeatherSearchResultsDashboard userData={userData} />
      </div>
    </>
  );
}
