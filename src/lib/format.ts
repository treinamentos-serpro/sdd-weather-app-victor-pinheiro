export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(year ?? 1970, (month ?? 1) - 1, day ?? 1);
  return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function formatDayName(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(year ?? 1970, (month ?? 1) - 1, day ?? 1);
  return date.toLocaleDateString('pt-BR', { weekday: 'long' });
}

export function formatWindSpeed(value: number): string {
  return `${Math.round(value)} km/h`;
}

export function formatHumidity(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatPrecipitation(value: number): string {
  return `${value.toFixed(1)} mm`;
}
