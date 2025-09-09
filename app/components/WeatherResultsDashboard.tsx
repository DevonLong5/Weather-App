"use client";

interface WeatherSearchResultsDashboardProps {
  userData: object;
}

export default function WeatherSearchResultsDashboard({
  userData,
}: WeatherSearchResultsDashboardProps) {
  // Prob need to move later
  console.log(userData);
  // TODO: Make dashboard
  return (
    <div>
      <div className="flex items-center justify-center rounded">
        <div className="bg-gradient-to-t from-sky-500 via-sky-700 to-sky-800 p-3 grid grid-cols-3 gap-1 items-center justify-items-evenly rounded-2xl shadow-2xl text-black w-95/100 m-3 ">
          <div className="col-span-3 justify-self-center">
            <h1 className="text-4xl text-white">Prescott</h1>
          </div>
          <div className="col-span-1 m-5 ">
            <img
              className="justify-self-start scale-175 "
              src="https://openweathermap.org/img/wn/11d@2x.png"
            />
          </div>
          <div className="justify-self-end col-span-2 ">
            <h3 className="text-8xl text-white">65°</h3>
          </div>
          <div className="col-span-3 justify-self-center ">
            <h1 className="text-xl text-white ">H:59° L:90°</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
