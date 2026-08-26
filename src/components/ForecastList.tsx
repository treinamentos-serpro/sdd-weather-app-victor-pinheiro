import type { ForecastDay, Unit } from '../types/weather';
import ForecastCard from './ForecastCard';

interface ForecastListProps {
  forecast: ForecastDay[];
  unit: Unit;
}

export default function ForecastList({ forecast, unit }: ForecastListProps) {
  return (
    <section aria-label="Previsao de 5 dias">
      <h2 className="mb-4 text-xl font-bold">Previsao para 5 dias</h2>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {forecast.map((day) => (
          <ForecastCard key={day.date} day={day} unit={unit} />
        ))}
      </ul>
    </section>
  );
}
