import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import type { WeatherData, WeatherDataAPIRequest } from "@/app/types/weather";
import { convertUnix, convertUnixToDayOfWeek } from "@/app/lib/convertUnix";

export async function GET(req: NextRequest) {
  const apiKey = process.env.API_KEY;
  const data: string | null = req.nextUrl.searchParams.get("data");
  let longitude: number | undefined;
  let latitude: number | undefined;
  let WeatherData: WeatherData = {
    name: "string",
    main: {
      current_temp: 0,
      tempMin: 0,
      tempMax: 0,
      feelsLike: 0,
      percipitationPercent: 0,
      humidityPercent: 0,
    },
    tempChartYAxis: [],
    timeChartXAxis: [],
    sevenDayForcast: {
      main: [
        {
          id: 0,
          tempMax: 0,
          tempMin: 0,
          icon: "string",
          day: "string",
        },
      ],
    },
    weather: {
      icon: "string",
      description: "string",
    },
    wind: {
      deg: 0,
      gust: 0,
      speed: 0,
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
    WeatherData.main.tempMax = dailyWeather.data.list[0].temp.max;
    WeatherData.main.tempMin = dailyWeather.data.list[0].temp.min;
  } catch (err) {
    if (err) {
      console.log(err);
      return NextResponse.json(
        { error: "Location not found" },
        { status: 500 }
      );
    }
  }

  //Current weather data
  try {
    const weather = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`
    );
    WeatherData.main.current_temp = weather.data.main.temp;
    WeatherData.main.feelsLike = weather.data.main.feels_like;
    WeatherData.weather.icon = weather.data.weather[0].icon;
    WeatherData.weather.description = weather.data.weather[0].description;
    WeatherData.wind.deg = weather.data.wind.deg;
    WeatherData.wind.speed = weather.data.wind.speed;
    WeatherData.wind.gust = weather.data.wind.gust;
  } catch (err) {
    if (err) {
      console.log(err);
      return NextResponse.json(
        { error: "Location not found" },
        { status: 500 }
      );
    }
  }

  //Hourly and current precip and humidity
  try {
    const weather = await axios.get(
      `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial&cnt=24`
    );
    weather.data.list.map((element: WeatherDataAPIRequest) =>
      WeatherData.timeChartXAxis.push(convertUnix(element.dt))
    );
    weather.data.list.map((element: WeatherDataAPIRequest) =>
      WeatherData.tempChartYAxis.push(Math.round(element.main.temp))
    );
    WeatherData.main.humidityPercent = weather.data.list[0].main.humidity;
    WeatherData.main.percipitationPercent = weather.data.list[0].pop * 100;
  } catch (err) {
    if (err) {
      console.log(err);
      return NextResponse.json(
        { error: "Location not found" },
        { status: 500 }
      );
    }
  }

  //Daily
  try {
    const weather = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial&cnt=7`
    );
    weather.data.list.map((element: WeatherDataAPIRequest) =>
      WeatherData.sevenDayForcast.main.push({
        id: element.dt,
        icon: element.weather[0].icon,
        day: convertUnixToDayOfWeek(element.dt),
        tempMax: Math.round(element.temp.max),
        tempMin: Math.round(element.temp.min),
      })
    );
    WeatherData.sevenDayForcast.main.shift();
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
