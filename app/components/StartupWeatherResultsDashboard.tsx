import type { WeatherData } from "../types/weather";
import type { WeatherIconsObject } from "../types/weather";
import Skycons from "react-skycons";
import { capitalize } from "../lib/capitalize";
import HourlyWeatherLineChart from "./HourlyWeatherLineChart";
import { useState } from "react";
import WeatherSearchCard, { WeatherSearchCardProps } from "./WeatherSearchCard";
import { convertUnitToC } from "../lib/convertUnit";

interface StartupWeatherDashboardProps {
  userLocationWeatherData: WeatherData | null;
  weatherIcons: WeatherIconsObject;
  setIsSuggestionLoading: (data: boolean) => void;
  isSuggestionLoading: boolean;
  setRequestedWeatherData: (data: WeatherData) => void;
  setIsRequestedDataCollected: (data: boolean) => void;
  setIsLoading: (data: boolean) => void;
  isLoading: boolean;
  isCelciusChecked: boolean;
  setIsCelciusChecked: (data: boolean) => void;
}

export default function StartupWeatherDashboard({
  userLocationWeatherData,
  weatherIcons,
  isSuggestionLoading,
  setIsSuggestionLoading,
  setIsLoading,
  isLoading,
  setRequestedWeatherData,
  setIsRequestedDataCollected,
  isCelciusChecked,
  setIsCelciusChecked,
}: StartupWeatherDashboardProps) {
  const [AIResponse, setAIResponse] = useState<string>("");
  const [suggestionHasBeenClicked, setSuggestionHasBeenClicked] =
    useState<boolean>(false);

  const handleCelciusCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    -setIsCelciusChecked(event.target.checked);
  };
  if (userLocationWeatherData) {
    const getSuggestion = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setIsSuggestionLoading(true);
      setSuggestionHasBeenClicked(true);
      fetch(
        `/api/weather/suggestion/?city=${userLocationWeatherData.name}&temp=${userLocationWeatherData.main.current_temp}&description=${userLocationWeatherData.weather.description}&feelstemp=${userLocationWeatherData.main.feelsLike}&time=${userLocationWeatherData.hourlyTemp.timeChartXAxis[0]}`
      )
        .then((response) => response.json())
        .then((data) => {
          setAIResponse(data);
          console.log(data);
        })
        .catch((error) => console.log(error))
        .finally(() => setIsSuggestionLoading(false));
    };
    if (userLocationWeatherData !== null) {
      return (
        <div
          className={`min-h-dvh min-w-dvw p-2 text-white ${
            userLocationWeatherData.main.current_temp > 90
              ? "bg-gradient-to-br from-amber-700 to-rose-900"
              : "bg-gradient-to-br from-blue-500 to-indigo-700"
          }`}
        >
          <div className="p-2 bg-white/0">
            <WeatherSearchCard
              setRequestedWeatherData={setRequestedWeatherData}
              setIsRequestedDataCollected={setIsRequestedDataCollected}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              setSuggestionHasBeenClicked={setSuggestionHasBeenClicked}
              setAIResponse={setAIResponse}
            />
          </div>
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="rounded-2xl bg-white/15 p-6 shadow-lg backdrop-blur-md">
              <div className="flex items-center justify-between gap-6">
                <div className="text-3xl font-bold items-center ">
                  {userLocationWeatherData.name}
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    checked={isCelciusChecked}
                    onChange={handleCelciusCheckbox}
                  />
                  <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                  <span className="ms-1 text-lg font-medium text-white dark:text-white">
                    &deg;C
                  </span>
                </label>
              </div>
              <div className="flex gap-1">
                <span>
                  <p>
                    {capitalize(userLocationWeatherData.weather.description)}
                  </p>
                </span>
                <div className="mx-1">
                  <Skycons
                    color={
                      weatherIcons[userLocationWeatherData.weather.icon].color
                    }
                    type={
                      weatherIcons[userLocationWeatherData.weather.icon].type
                    }
                    animate={true}
                    size={20}
                    resizeClear={true}
                  />
                </div>
              </div>
              <div className="mt-2 flex gap-6">
                <span className="text-6xl font-bold">
                  {isCelciusChecked
                    ? convertUnitToC(userLocationWeatherData.main.current_temp)
                    : Math.round(userLocationWeatherData.main.current_temp)}
                  &deg;
                </span>
                <div>
                  <p>
                    Humidity:{" "}
                    {Math.round(userLocationWeatherData.main.humidityPercent)}%
                  </p>
                  <p>
                    Precipitation:{" "}
                    {Math.round(
                      userLocationWeatherData.main.percipitationPercent
                    )}
                    %
                  </p>
                </div>
              </div>
              <div className="mx-auto mt-4 max-w-4xl ">
                <div
                  className={`rounded-2xl ${
                    userLocationWeatherData.main.current_temp > 90
                      ? "bg-gradient-to-br from-amber-700 to-rose-900"
                      : "bg-gradient-to-br from-blue-500 to-indigo-700"
                  } p-6 shadow-xl text-white`}
                >
                  <HourlyWeatherLineChart
                    userLocationWeatherData={userLocationWeatherData}
                    isCelciusChecked={isCelciusChecked}
                  />
                </div>
              </div>
              {suggestionHasBeenClicked ? (
                <div className="max-w-md mx-auto p-4 text-center ">
                  <p className="break-words text-white text-sm md:text-base">
                    {AIResponse}
                  </p>
                </div>
              ) : null}
              {!suggestionHasBeenClicked && (
                <div className="flex justify-center pt-5 ">
                  <button
                    className={`rounded-lg px-4 py-3 font-bold text-white ${
                      userLocationWeatherData.main.current_temp > 90
                        ? "bg-red-700 hover:bg-red-900"
                        : "bg-indigo-700 hover:bg-indigo-800"
                    }`}
                    onClick={getSuggestion}
                  >
                    Want ideas on what to wear?
                  </button>
                </div>
              )}{" "}
              {isSuggestionLoading && (
                <div className="flex justify-center pt-5 ">
                  <img
                    src="/images/loading.svg"
                    alt="search"
                    className="w-10 "
                  />
                </div>
              )}
            </div>
            <div className="mx-auto mt-4 max-w-4xl space-y-6">
              <div className="rounded-2xl bg-white/15 p-6 shadow-lg backdrop-blur-md">
                <div className="grid grid-cols-3 gap-4 md:grid-cols-7 place-items-center">
                  {userLocationWeatherData.sevenDayForcast.main.map((day) => (
                    <div
                      className="rounded-xl bg-white/20 p-4 shadow backdrop-blur-md hover:bg-white/30 max-w-[108px]"
                      key={day.day}
                    >
                      <p className="text-center font-semibold">{day.day}</p>
                      <div className="item-center m-1 p-1">
                        {
                          <Skycons
                            className=" "
                            color={weatherIcons[day.icon].color}
                            type={weatherIcons[day.icon].type}
                            animate={true}
                            size={60}
                            resizeClear={true}
                          />
                        }
                      </div>
                      <div className="text-center m-1 p-1">
                        <p className="my-2 inline px-1">
                          {isCelciusChecked
                            ? convertUnitToC(day.tempMax)
                            : day.tempMax}
                          &deg;
                        </p>
                        <p className=" my-2 inline px-1 text-white/40 ">
                          {isCelciusChecked
                            ? convertUnitToC(day.tempMin)
                            : day.tempMin}
                          &deg;
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
