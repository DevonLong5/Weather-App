import WeatherSearchCard from "./components/WeatherSearchCard";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center h-screen  bg-gradient-to-t from-indigo-700 via-indigo-300 to-indigo-700">
        <WeatherSearchCard />
      </div>
    </>
  );
}
