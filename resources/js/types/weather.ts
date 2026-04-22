export type WeatherResult = {
  location: {
    name: string | null;
    country: string | null;
    latitude: number | null;
    longitude: number | null;
  };
  weather: {
    time: string | null;
    temperature_2m: number | null;
    weather_code: number | null;
    wind_speed_10m: number | null;
    visibility: number | null;
    uv_index: number | null;
  };
  air_quality: {
    us_aqi: number | null;
    pm2_5: number | null;
    pm10: number | null;
  };
};

export type SearchHistoryItem = {
  id: number;
  city: string;
  locationLabel: string;
  temperatureC: number | null;
  viewedAt: string | null;
};
