"use client";
import React from "react";
import axios from "axios";

type WeatherSearchCardProps = {
  setUserData: (data: object) => void;
}

export default function WeatherSearchCard({ setUserData }: WeatherSearchCardProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = formData.get("data");
    try {
      const weatherData = await axios.get(`/api/weather/?data=${data}`);
      setUserData(weatherData.data);
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-neutral-100 w-90 p-2 max-w-lg rounded shadow-md fade-in ">
      <form
        onSubmit={handleSubmit}
        className="flex items-center border-2 border-gray-300 rounded w-80 p-2 bg-white "
      >
        <input
          type="text"
          name="data"
          placeholder="City or Zipcode"
          className="text-black text-lg focus:outline-none flex-1 bg-transparent "
        ></input>
        <button type="submit" className="ml-2 ">
          <img src="/images/search.svg" alt="search" className="w-6 h-6 " />
        </button>
      </form>
    </div>
  );
}
