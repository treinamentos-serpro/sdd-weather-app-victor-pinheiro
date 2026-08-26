import { useCallback, useEffect, useRef, useState } from 'react';
import CurrentWeather from './components/CurrentWeather';
import ForecastList from './components/ForecastList';
import SearchBar from './components/SearchBar';
import EmptyState from './components/states/EmptyState';
import ErrorState from './components/states/ErrorState';
import LoadingState from './components/states/LoadingState';
import UnitToggle from './components/UnitToggle';
import { createWeatherMockForCity, MOCK_CITIES, WEATHER_MOCK } from './mocks/weatherMock';
import type { Unit, WeatherData, WeatherStatus } from './types/weather';

export default function App() {
  const [unit, setUnit] = useState<Unit>('celsius');
  const [status, setStatus] = useState<WeatherStatus>('idle');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [lastQuery, setLastQuery] = useState('');
  const pendingSearchRef = useRef<number | null>(null);
  const stateFocusRef = useRef<HTMLElement | null>(null);
  const previousStatusRef = useRef<WeatherStatus>('idle');

  const clearPendingSearch = useCallback(() => {
    if (pendingSearchRef.current !== null) {
      window.clearTimeout(pendingSearchRef.current);
      pendingSearchRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearPendingSearch();
    };
  }, [clearPendingSearch]);

  useEffect(() => {
    if (previousStatusRef.current !== status) {
      stateFocusRef.current?.focus();
      previousStatusRef.current = status;
    }
  }, [status]);

  function resolveCityByName(name: string) {
    return MOCK_CITIES.find((city) => city.name.toLowerCase() === name.toLowerCase());
  }

  function handleSearch(cityName: string) {
    const trimmed = cityName.trim();
    clearPendingSearch();
    setLastQuery(trimmed);
    setStatus('loading');
    setErrorMessage('');

    // Simula latencia da rede mantendo a arquitetura mock-first sem API.
    pendingSearchRef.current = window.setTimeout(() => {
      if (trimmed.toLowerCase() === 'erro') {
        setWeatherData(null);
        setStatus('error');
        setErrorMessage('Falha simulada de rede. Digite outra cidade ou tente novamente.');
        pendingSearchRef.current = null;
        return;
      }

      const selectedCity = resolveCityByName(trimmed);

      if (!selectedCity) {
        setWeatherData(null);
        setStatus('empty');
        pendingSearchRef.current = null;
        return;
      }

      setWeatherData(createWeatherMockForCity(selectedCity));
      setStatus('success');
      pendingSearchRef.current = null;
    }, 350);
  }

  function handleRetry() {
    if (!lastQuery) {
      setWeatherData(WEATHER_MOCK);
      setStatus('success');
      return;
    }
    handleSearch(lastQuery);
  }

  return (
    <div className="min-h-screen text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent-400">Weather Lab</p>
            <h1 className="text-2xl font-bold text-white">Previsao inteligente de 5 dias</h1>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <SearchBar onSearch={handleSearch} disabled={status === 'loading'} />
            <UnitToggle unit={unit} onChange={setUnit} />
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
        {status === 'idle' ? (
          <section ref={stateFocusRef} tabIndex={-1}>
            <EmptyState
              title="Busque por uma cidade para ver o clima"
              hint="Sugestoes: Sao Paulo, Lisboa, Seattle"
            />
          </section>
        ) : null}

        {status === 'loading' ? (
          <section ref={stateFocusRef} tabIndex={-1}>
            <LoadingState />
          </section>
        ) : null}

        {status === 'empty' ? (
          <section ref={stateFocusRef} tabIndex={-1}>
            <EmptyState
              title={`Nenhuma cidade encontrada para "${lastQuery}"`}
              hint="Verifique a grafia e tente novamente."
            />
          </section>
        ) : null}

        {status === 'error' ? (
          <section ref={stateFocusRef} tabIndex={-1}>
            <ErrorState message={errorMessage} onRetry={handleRetry} />
          </section>
        ) : null}

        {status === 'success' && weatherData ? (
          <section ref={stateFocusRef} tabIndex={-1}>
            <CurrentWeather city={weatherData.city} current={weatherData.current} unit={unit} />
            <ForecastList forecast={weatherData.forecast} unit={unit} />
          </section>
        ) : null}
      </main>
    </div>
  );
}
