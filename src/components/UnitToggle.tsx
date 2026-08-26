import type { KeyboardEvent } from 'react';
import type { Unit } from '../types/weather';

interface UnitToggleProps {
  unit: Unit;
  onChange: (next: Unit) => void;
}

export default function UnitToggle({ unit, onChange }: UnitToggleProps) {
  function handleKeyboard(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      onChange('celsius');
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      onChange('fahrenheit');
    }
  }

  return (
    <div
      role="group"
      aria-label="Alternar unidade de temperatura"
      onKeyDown={handleKeyboard}
      className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1 backdrop-blur-md"
    >
      <button
        type="button"
        aria-label="Alternar para Celsius"
        aria-pressed={unit === 'celsius'}
        onClick={() => onChange('celsius')}
        className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 ${
          unit === 'celsius' ? 'bg-accent-500 text-white' : 'text-white/80 hover:bg-white/10'
        }`}
      >
        °C
      </button>
      <button
        type="button"
        aria-label="Alternar para Fahrenheit"
        aria-pressed={unit === 'fahrenheit'}
        onClick={() => onChange('fahrenheit')}
        className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 ${
          unit === 'fahrenheit' ? 'bg-accent-500 text-white' : 'text-white/80 hover:bg-white/10'
        }`}
      >
        °F
      </button>
    </div>
  );
}
