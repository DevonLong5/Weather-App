"use client";
import React from "react";
import axios from "axios";
import type { WeatherData } from "@/.next/types/weather";

type WeatherSearchCardProps = {
  setRequestedWeatherData: (data: WeatherData) => void;
  setIsRequestedDataCollected: (data: boolean) => void;
  userLocationWeatherData: WeatherData | null;
};

export default function WeatherSearchCard({
  setRequestedWeatherData,
  setIsRequestedDataCollected,
  userLocationWeatherData,
}: WeatherSearchCardProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsRequestedDataCollected(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = formData.get("data");
    try {
      const weatherData = await axios.get(`/api/weather/?data=${data}`);
      setRequestedWeatherData(weatherData.data);
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }
  };

  if (userLocationWeatherData !== null) {
    return (
      <div className="flex items-center justify-center bg-gradient-to-t from-sky-500 via-sky-700 to-sky-800 w-90 py-2 max-w-lg rounded-2xl shadow-md fade-in ">
        <form
          onSubmit={handleSubmit}
          className="flex items-center border-gray-300 rounded-2xl w-80 p-2 bg-white "
        >
          <input
            type="text"
            name="data"
            placeholder="City or Zipcode"
            className="text-black text-lg focus:outline-none flex-1 bg-transparent "
          ></input>
          <button type="submit">
            <img src="/images/search.svg" alt="search" className="w-6 h-6 " />
          </button>
        </form>
      </div>
    );
  }
}
