import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const client = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export async function GET(req: NextRequest) {
  let currentTemp: number | null | string =
    req.nextUrl.searchParams.get("temp");
  let weatherDescription: string | null =
    req.nextUrl.searchParams.get("description");
  let city: string | null = req.nextUrl.searchParams.get("city");
  let feelsLikeTemp: string | null = req.nextUrl.searchParams.get("feelstemp");
  let aroundTime: string | null = req.nextUrl.searchParams.get("time");
  const response = await client.responses.create({
    model: "gpt-5-nano-2025-08-07",
    instructions:
      "Recommend clothing for the current weather. Do not ask the user questions. Write under 100 words. Include the city, temperature, and description. Format in short lines (max 25 words).",
    input: `The current temperature is ${currentTemp} farenheit in ${city} and the weather description is ${weatherDescription} and it feels like ${feelsLikeTemp} farenheit and its around ${aroundTime}`,
  });
  return NextResponse.json(response.output_text);
}
