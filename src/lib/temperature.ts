import type { Unit } from '../types/weather';

export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

export function fahrenheitToCelsius(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9;
}

export function convertTemperature(celsius: number, unit: Unit): number {
  return unit === 'fahrenheit' ? celsiusToFahrenheit(celsius) : celsius;
}

export function formatTemperature(celsius: number, unit: Unit): string {
  return `${Math.round(convertTemperature(celsius, unit))}°`;
}
