import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { ApiError } from "next/dist/server/api-utils";

export async function GET(req: NextRequest) {
  const apiKey = process.env.API_KEY;
  var data: string | Number | null = req.nextUrl.searchParams.get("data");
  var longitude;
  var latitude;

  //   Check if data is zip code or not
  //   Request long and lat from openweatherapi
  if (typeof data === "string" && !isNaN(parseInt(data))) {
    data = parseInt(data);
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
          { error: "Internal Server Error" },
          { status: 500 }
        );
      }
    }
  } else {
    //   If not zip try city
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
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 }
        );
      }
    }
  }
  //   Convert long and lat from location data to weather data using openweatherapi, kinda redundant but whatever
  try {
    const weather = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`
    );
    console.log(weather.data);
    return NextResponse.json(weather.data);
  } catch (err) {
    if (err) {
      console.log(err);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
