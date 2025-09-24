export interface WeatherData {
  name: string;
  main: {
    current_temp: number;
    tempMin: number;
    tempMax: number;
    feelsLike: number;
    percipitationPercent: number;
    humidityPercent: number;
  };
  hourlyTemp: {
    tempChartYAxis: Array<number>;
    timeChartXAxis: Array<string>;
    timeZoneShift: number;
  };
  sevenDayForcast: sevenDayForcast;
  weather: {
    icon: string;
    description: string;
  };
  wind: {
    speed: number;
    gust: number;
    deg: number;
  };
}

export interface WeatherDataAPIRequest {
  dt: number;
  temp: { max: number; min: number };
  main: {
    dt: number;
    temp: number;
    timezone: number;
  };
  weather: Array<{ icon: string }>;
}
interface sevenDayForcast {
  main: [
    {
      id: number;
      day: string;
      icon: string;
      tempMax: number;
      tempMin: number;
    }
  ];
}

export interface WeatherIconsObject {
  [key: string]: {
    color: string;
    type: any;
  };
}
