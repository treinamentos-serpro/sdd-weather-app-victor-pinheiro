import type { City, FiveDayForecast, WeatherData } from '../types/weather';

export const MOCK_CITY: City = {
  id: 3448439,
  name: 'Sao Paulo',
  country: 'Brasil',
  state: 'SP',
  latitude: -23.55,
  longitude: -46.63,
};

export const MOCK_CITIES: City[] = [
  MOCK_CITY,
  {
    id: 2267057,
    name: 'Lisboa',
    country: 'Portugal',
    latitude: 38.72,
    longitude: -9.13,
  },
  {
    id: 5809844,
    name: 'Seattle',
    country: 'Estados Unidos',
    state: 'Washington',
    latitude: 47.61,
    longitude: -122.33,
  },
];

export const MOCK_FORECAST: FiveDayForecast = [
  {
    date: '2026-08-26',
    tempMin: 15,
    tempMax: 24,
    weatherCode: 2,
    windSpeed: 14,
    precipitationProb: 15,
  },
  {
    date: '2026-08-27',
    tempMin: 16,
    tempMax: 25,
    weatherCode: 3,
    windSpeed: 18,
    precipitationProb: 35,
  },
  {
    date: '2026-08-28',
    tempMin: 14,
    tempMax: 22,
    weatherCode: 61,
    windSpeed: 20,
    precipitationProb: 75,
  },
  {
    date: '2026-08-29',
    tempMin: 13,
    tempMax: 21,
    weatherCode: 80,
    windSpeed: 17,
    precipitationProb: 65,
  },
  {
    date: '2026-08-30',
    tempMin: 15,
    tempMax: 23,
    weatherCode: 1,
    windSpeed: 12,
    precipitationProb: 20,
  },
];

export const WEATHER_MOCK: WeatherData = {
  city: MOCK_CITY,
  current: {
    temperature: 22,
    weatherCode: 2,
    humidity: 67,
    windSpeed: 14,
    pressure: 1014,
    precipitation: 0.4,
  },
  forecast: MOCK_FORECAST,
};

export function createWeatherMockForCity(city: City): WeatherData {
  return {
    ...WEATHER_MOCK,
    city,
  };
}
