import { formatHumidity, formatPrecipitation, formatWindSpeed } from '../lib/format';
import { formatTemperature } from '../lib/temperature';
import { getWeatherIcon, getWeatherLabel } from '../lib/weatherCodes';
import type { City, CurrentWeather as CurrentWeatherType, Unit } from '../types/weather';

interface CurrentWeatherProps {
  city: City;
  current: CurrentWeatherType;
  unit: Unit;
}

export default function CurrentWeather({ city, current, unit }: CurrentWeatherProps) {
  const location = city.state ? `${city.state} - ${city.country}` : city.country;

  return (
    <section
      aria-label="Clima atual"
      className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-glass backdrop-blur-md md:p-8"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-2xl font-bold md:text-3xl">{city.name}</h2>
          <p className="text-white/85">{location}</p>

          <div className="mt-6 flex items-center gap-4">
            <span aria-hidden="true" className="text-5xl md:text-6xl">
              {getWeatherIcon(current.weatherCode)}
            </span>
            <p className="text-6xl font-light leading-none md:text-7xl">
              {formatTemperature(current.temperature, unit)}
            </p>
          </div>

          <p className="mt-2 text-white/80">{getWeatherLabel(current.weatherCode)}</p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Metric icon="💧" label="Umidade" value={formatHumidity(current.humidity)} />
          <Metric icon="💨" label="Vento" value={formatWindSpeed(current.windSpeed)} />
          <Metric
            icon="🌧️"
            label="Precipitacao"
            value={formatPrecipitation(current.precipitation)}
          />
          <Metric icon="📊" label="Pressao" value={`${Math.round(current.pressure)} hPa`} />
        </div>
      </div>
    </section>
  );
}

interface MetricProps {
  icon: string;
  label: string;
  value: string;
}

function Metric({ icon, label, value }: MetricProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-night-800/60 px-4 py-3">
      <p className="text-xs text-white/80">{label}</p>
      <p className="mt-1 text-sm font-semibold">
        <span aria-hidden="true" className="mr-1">
          {icon}
        </span>
        {value}
      </p>
    </div>
  );
}
