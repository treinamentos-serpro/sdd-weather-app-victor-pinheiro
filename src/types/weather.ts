export type Unit = 'celsius' | 'fahrenheit';

export type WeatherStatus = 'idle' | 'loading' | 'empty' | 'error' | 'success';

export interface City {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  state?: string;
}

export interface CurrentWeather {
  temperature: number;
  weatherCode: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  precipitation: number;
}

export interface ForecastDay {
  date: string;
  tempMin: number;
  tempMax: number;
  weatherCode: number;
  windSpeed: number;
  precipitationProb: number;
}

export type FiveDayForecast = [ForecastDay, ForecastDay, ForecastDay, ForecastDay, ForecastDay];

export interface WeatherData {
  city: City;
  current: CurrentWeather;
  forecast: FiveDayForecast;
}
