import { formatDate, formatDayName, formatWindSpeed } from '../lib/format';
import { formatTemperature } from '../lib/temperature';
import { getWeatherIcon, getWeatherLabel } from '../lib/weatherCodes';
import type { ForecastDay, Unit } from '../types/weather';

interface ForecastCardProps {
  day: ForecastDay;
}

export default function ForecastCard({ day, unit }: ForecastCardProps & { unit: Unit }) {
  return (
    <li className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-md">
      <p className="font-semibold capitalize">{formatDayName(day.date)}</p>
      <p className="text-xs text-white/60">{formatDate(day.date)}</p>

      <span aria-hidden="true" className="mt-2 block text-3xl">
        {getWeatherIcon(day.weatherCode)}
      </span>
      <p className="mt-2 text-sm text-white/80">{getWeatherLabel(day.weatherCode)}</p>

      <p className="mt-3 text-sm">
        <span className="font-semibold">{formatTemperature(day.tempMax, unit)}</span>
        <span className="mx-1 text-white/70">/</span>
        <span className="text-white/85">{formatTemperature(day.tempMin, unit)}</span>
      </p>

      <p className="mt-2 text-xs text-accent-300">💧 {day.precipitationProb}%</p>
      <p className="text-xs text-white/80">💨 {formatWindSpeed(day.windSpeed)}</p>
    </li>
  );
}
