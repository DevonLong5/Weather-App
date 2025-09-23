import React from "react";
import type { WeatherData } from "@/app/types/weather";

export type WeatherSearchCardProps = {
  setRequestedWeatherData: (data: WeatherData) => void;
  setIsRequestedDataCollected: (data: boolean) => void;
  setIsLoading: (data: boolean) => void;
  isLoading: boolean;
  setSuggestionHasBeenClicked: (data: boolean) => void;
  setAIResponse: (data: string) => void;
};

export default function WeatherSearchCard({
  setRequestedWeatherData,
  setIsRequestedDataCollected,
  setIsLoading,
  isLoading,
  setSuggestionHasBeenClicked,
  setAIResponse,
}: WeatherSearchCardProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuggestionHasBeenClicked(false);
    setAIResponse("");
    setIsLoading(true);
    console.log(isLoading);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = formData.get("data");
    fetch(`/api/weather/?data=${data}`)
      .then((response) => response.json())
      .then((data) => {
        setRequestedWeatherData(data);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
        setIsRequestedDataCollected(true);
      });
  };
  return (
    <div className="flex items-center justify-center fade-in mb-2">
      <form
        onSubmit={handleSubmit}
        className="flex items-center rounded-2xl w-85 p-2 bg-white shadow-xl "
      >
        <input
          type="text"
          name="data"
          placeholder="Search your city or zipcode"
          className="text-black text-lg focus:outline-none flex-1 "
        ></input>
        <button type="submit">
          <img src="/images/search.svg" alt="search" className="w-6 h-6 " />
        </button>
      </form>
    </div>
  );
}
