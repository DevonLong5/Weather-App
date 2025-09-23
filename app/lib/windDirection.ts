import { WeatherData } from "../types/weather";

export function windDirection(weatherData: WeatherData) {
  if (
    weatherData.wind.deg >= 310 ||
    weatherData.wind.deg <= 50
  ) {
    return "North";
  } else if (
    weatherData.wind.deg >= 51 &&
    weatherData.wind.deg <= 130
  ) {
    return "East";
  } else if (
    weatherData.wind.deg >= 131 &&
    weatherData.wind.deg <= 220
  ) {
    return "South";
  } else {
    return "West";
  }
}
