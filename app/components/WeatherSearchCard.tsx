"use client";
import axios from "axios";
import React, { useState } from "react";

export default function WeatherSearchCard() {
  const [userData, setUserData] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = formData.get("data");
    if (typeof data === "string") {
      setUserData(data);
    } else {
      setUserData("");
    }

    console.log(userData);
    // Prob need to move later
    try {
      const weatherData = await axios.get(`/api/weather/?data=${userData}`);
      if (typeof data === "string") {
        return weatherData.data;
      }
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-neutral-100 w-90 p-2 max-w-lg rounded shadow-md">
      <form
        onSubmit={handleSubmit}
        className="flex items-center border-2 border-gray-300 rounded w-80 p-2 bg-white "
      >
        <input
          type="text"
          name="data"
          placeholder="City, ZipCode or State"
          className="text-black text-lg focus:outline-none flex-1 bg-transparent "
        ></input>
        <button type="submit" className="ml-2 ">
          <img src="/images/search.svg" alt="search" className="w-6 h-6 " />
        </button>
      </form>
    </div>
  );
}
