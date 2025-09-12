export type WeatherData = {
  name: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
  };
  weather: {
    icon: string;
    description: string;
  };
  wind: {
    speed: number;
    gust: number;
    deg: number;
  }
};

export interface WeatherIconsObject {
  [key: string]: {
    color: string;
    type: any;
  };
};
