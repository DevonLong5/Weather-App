import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import type { WeatherData } from "@/.next/types/weather";

export async function GET(req: NextRequest) {
  const apiKey = process.env.API_KEY;
  const data: string | null = req.nextUrl.searchParams.get("data");
  let longitude: number | undefined;
  let latitude: number | undefined;
  let WeatherData: WeatherData = {
    name: "string",
    main: {
      temp: 0,
      temp_min: 0,
      temp_max: 0,
      feels_like: 0,
    },
    weather: {
      icon: "string",
      description: "string",
    },
  };

  if (!data) {
    return NextResponse.json(
      { error: "Missing location data" },
      { status: 400 }
    );
  }

  //   Check if data is zip code or not
  //   Request long and lat from openweatherapi
  if (typeof data === "string" && !isNaN(parseInt(data))) {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/zip?zip=${data}&appid=${apiKey}`
      );
      latitude = response.data.lat;
      longitude = response.data.lon;
    } catch (err) {
      if (err) {
        console.log(err);
        return NextResponse.json(
          { error: "Zip code not found" },
          { status: 500 }
        );
      }
    }
  } else {
    //   If not zip try city
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${data}&limit=${1}&appid=${apiKey}`
      );
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
    } catch (err) {
      if (err) {
        console.log(err);
        return NextResponse.json({ error: "City not found" }, { status: 500 });
      }
    }
  }

  //   Convert long and lat from location data to weather data using openweatherapi, kinda redundant but whatever
  try {
    const dailyWeather = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&units=imperial&cnt=1&appid=${apiKey}`
    );
    WeatherData.name = dailyWeather.data.city.name;
    WeatherData.main.temp_max = dailyWeather.data.list[0].temp.max;
    WeatherData.main.temp_min = dailyWeather.data.list[0].temp.min;
  } catch (err) {
    if (err) {
      console.log(err);
      return NextResponse.json(
        { error: "Location not found" },
        { status: 500 }
      );
    }
  }
    try {
    const weather = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`
    );
    WeatherData.main.temp = weather.data.main.temp;
    WeatherData.main.feels_like = weather.data.main.feels_like;
    WeatherData.weather.icon = weather.data.weather[0].icon;
    WeatherData.weather.description = weather.data.weather[0].description;
    return NextResponse.json(WeatherData);
  } catch (err) {
    if (err) {
      console.log(err);
      return NextResponse.json(
        { error: "Location not found" },
        { status: 500 }
      );
    }
  }
}
