"use client";

interface WeatherSearchResultsDashboardProps {
  userData: object;
}

export default function WeatherSearchResultsDashboard({ userData }: WeatherSearchResultsDashboardProps) {
  // Prob need to move later
  if(userData) {
    console.log(userData);
  }
// TODO: Make dashboard
  return (<></>);
}
