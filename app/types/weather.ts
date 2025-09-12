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
};

export interface WeatherIconsObject {
  [key: string]: {
    color: string;
    type: any;
  };
};
