import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import type { WeatherData, WeatherDataAPIRequest } from "@/app/types/weather";
import { convertUnix, convertUnixToDayOfWeek } from "@/app/lib/convertUnix";
import { weatherIcons } from "@/app/lib/constants";

export async function GET(req: NextRequest) {
  const apiKey = process.env.API_KEY;
  const timeZoneApiKey = process.env.TIMEZONE_API_KEY;
  const data: string | null = req.nextUrl.searchParams.get("data");
  let longitude: number | string | null;
  let latitude: number | string | null;
  let WeatherData: WeatherData = {
    city: "",
    main: {
      current_temp: 0,
      tempMin: 0,
      tempMax: 0,
      feelsLike: 0,
      percipitationPercent: 0,
      humidityPercent: 0,
    },
    hourlyTemp: {
      tempChartYAxis: [],
      timeChartXAxis: [],
      timeZoneShift: 0,
    },
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
      icon: "",
      description: "",
    },
    wind: {
      deg: 0,
      gust: 0,
      speed: 0,
    },
  };

  if (!data) {
    try {
      longitude = req.nextUrl.searchParams.get("lon");
      latitude = req.nextUrl.searchParams.get("lat");
      await getWeatherData(longitude, latitude);
      return NextResponse.json(WeatherData);
    } catch (err) {
      return NextResponse.json(
        { error: "Can't find location" },
        { status: 500 }
      );
    }
  } else {
    await getRequestedWeather(data);
    return NextResponse.json(WeatherData);
  }

  //   Check if data is zip code or not
  //   Request long and lat from openweatherapi
  async function getRequestedWeather(data: string) {
    if (typeof data === "string" && !isNaN(parseInt(data))) {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/geo/1.0/zip?zip=${data}&appid=${apiKey}`
        );
        latitude = response.data.lat;
        longitude = response.data.lon;
        await getWeatherData(longitude, latitude);
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
        WeatherData.city = response.data.name;
        await getWeatherData(longitude, latitude);
      } catch (err) {
        if (err) {
          console.log(err);
          return NextResponse.json(
            { error: "City not found" },
            { status: 500 }
          );
        }
      }
    }
  }

  //Main weather function
  async function getWeatherData(
    longitude: number | string | null,
    latitude: number | string | null
  ) {
    await getLocalTimezone(longitude, latitude);
    await getCurrentWeather(longitude, latitude);
    await getHourlyWeather(longitude, latitude);
    await getDailyForcast(longitude, latitude);
  }

  // Find Timezone
  async function getLocalTimezone(
    longitude: number | string | null,
    latitude: number | string | null
  ) {
    try {
      const response = await axios.get(
        `http://api.timezonedb.com/v2.1/get-time-zone?key=${timeZoneApiKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`
      );
      WeatherData.hourlyTemp.timeZoneShift = response.data.gmtOffset;
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { error: "Please limit requests to 1 per second" },
        { status: 429 }
      );
    }
  }

  //Current weather data
  async function getCurrentWeather(
    longitude: number | string | null,
    latitude: number | string | null
  ) {
    try {
      const weather = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`
      );
      WeatherData.city = weather.data.name;
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
  }

  //Hourly and current precip and humidity
  async function getHourlyWeather(
    longitude: number | string | null,
    latitude: number | string | null
  ) {
    try {
      const weather = await axios.get(
        `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial&cnt=24`
      );
      weather.data.list.map((element: WeatherDataAPIRequest) => {
        WeatherData.hourlyTemp.tempChartYAxis.push(element.main.temp),
          WeatherData.hourlyTemp.timeChartXAxis.push(
            convertUnix(element.dt, WeatherData.hourlyTemp.timeZoneShift)
          );
      });
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
  }

  //Daily
  async function getDailyForcast(
    longitude: number | string | null,
    latitude: number | string | null
  ) {
    try {
      const dailyWeather = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial&cnt=7`
      );
      dailyWeather.data.list.map((element: WeatherDataAPIRequest) =>
        WeatherData.sevenDayForcast.main.push({
          id: element.dt,
          icon: element.weather[0].icon,
          day: convertUnixToDayOfWeek(element.dt),
          tempMax: Math.round(element.temp.max),
          tempMin: Math.round(element.temp.min),
        })
      );
      WeatherData.main.tempMax = dailyWeather.data.list[0].temp.max;
      WeatherData.main.tempMin = dailyWeather.data.list[0].temp.min;
      WeatherData.sevenDayForcast.main.shift();
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
}
