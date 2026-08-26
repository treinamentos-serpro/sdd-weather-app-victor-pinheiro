interface WeatherVisual {
  label: string;
  icon: string;
}

const WEATHER_MAP: Record<number, WeatherVisual> = {
  0: { label: 'Ceu limpo', icon: '☀️' },
  1: { label: 'Predominantemente limpo', icon: '🌤️' },
  2: { label: 'Parcialmente nublado', icon: '⛅' },
  3: { label: 'Nublado', icon: '☁️' },
  45: { label: 'Neblina', icon: '🌫️' },
  48: { label: 'Neblina com geada', icon: '🌫️' },
  51: { label: 'Garoa fraca', icon: '🌦️' },
  53: { label: 'Garoa moderada', icon: '🌦️' },
  55: { label: 'Garoa intensa', icon: '🌧️' },
  61: { label: 'Chuva fraca', icon: '🌧️' },
  63: { label: 'Chuva moderada', icon: '🌧️' },
  65: { label: 'Chuva forte', icon: '🌧️' },
  71: { label: 'Neve fraca', icon: '🌨️' },
  73: { label: 'Neve moderada', icon: '🌨️' },
  75: { label: 'Neve forte', icon: '❄️' },
  80: { label: 'Pancadas fracas', icon: '🌦️' },
  81: { label: 'Pancadas moderadas', icon: '🌧️' },
  82: { label: 'Pancadas fortes', icon: '⛈️' },
  95: { label: 'Trovoada', icon: '⛈️' },
};

const FALLBACK: WeatherVisual = {
  label: 'Condicao desconhecida',
  icon: '❔',
};

export function getWeatherLabel(code: number): string {
  return WEATHER_MAP[code]?.label ?? FALLBACK.label;
}

export function getWeatherIcon(code: number): string {
  return WEATHER_MAP[code]?.icon ?? FALLBACK.icon;
}
