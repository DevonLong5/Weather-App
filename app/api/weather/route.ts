import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { ApiError } from "next/dist/server/api-utils";

export async function GET(req: NextRequest) {
  const apiKey = process.env.API_KEY;
  var data: string | null | number = req.nextUrl.searchParams.get("data");
  var longitude;
  var latitude;
  //   Request long and lat from openweatherapi
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${data}&limit=${1}&appid=${apiKey}`
    );
    latitude = response.data[0].lat;
    longitude = response.data[0].lon;
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
  //   Convert long and lat from location data to weather data, kinda redundant but whatever
    try {
    const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`);
    return NextResponse.json(weather.data);
  } catch (err) {
    if (err) {
        console.log(err);
    }
  }
}
