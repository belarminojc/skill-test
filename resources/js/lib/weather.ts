import type { WeatherResult } from '@/types/weather';

export function getWeatherText(code: number): string {
  const weatherMap: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    80: 'Rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    95: 'Thunderstorm',
  };

  return weatherMap[code] || 'Unknown weather';
}

export function getWeatherIcon(code: number): string {
  if (code === 0 || code === 1) {
return 'clear_day';
}

  if (code === 2) {
return 'partly_cloudy_day';
}

  if (code === 3) {
return 'cloud';
}

  if (code === 45 || code === 48) {
return 'foggy';
}

  if (code >= 51 && code <= 55) {
return 'rainy_light';
}

  if (code >= 61 && code <= 65) {
return 'rainy';
}

  if (code >= 80 && code <= 82) {
return 'rainy';
}

  if (code === 95) {
return 'thunderstorm';
}

  return 'partly_cloudy_day';
}

export function getAqiLabel(aqi: number): { label: string; color: string; bg: string; bar: string; width: string } {
  if (aqi <= 50) {
return { label: 'Good', color: 'text-emerald-600', bg: 'bg-emerald-50', bar: 'bg-emerald-500', width: `${(aqi / 300) * 100}%` };
}

  if (aqi <= 100) {
return { label: 'Moderate', color: 'text-amber-600', bg: 'bg-amber-50', bar: 'bg-amber-500', width: `${(aqi / 300) * 100}%` };
}

  if (aqi <= 150) {
return { label: 'Unhealthy', color: 'text-orange-600', bg: 'bg-orange-50', bar: 'bg-orange-500', width: `${(aqi / 300) * 100}%` };
}

  return { label: 'Hazardous', color: 'text-red-600', bg: 'bg-red-50', bar: 'bg-red-500', width: `${Math.min((aqi / 300) * 100, 100)}%` };
}

export function formatDateTime(iso: string): string {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatNumber(value: number | null, decimals = 0): string {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return '—';
  }

  return decimals > 0 ? value.toFixed(decimals) : `${Math.round(value)}`;
}

export function formatTemperature(value: number | null, unit: 'C' | 'F'): string {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return '—';
  }

  if (unit === 'F') {
    return `${Math.round((value * 9) / 5 + 32)}`;
  }

  return `${Math.round(value)}`;
}

export function formatLocationName(location: WeatherResult['location'] | null): string {
  if (!location) {
    return '—';
  }

  const parts = [location.name, location.country].filter(Boolean);

  return parts.length > 0 ? parts.join(', ') : '—';
}

export function formatCoordinates(location: WeatherResult['location'] | null): string {
  if (
    !location ||
    typeof location.latitude !== 'number' ||
    typeof location.longitude !== 'number'
  ) {
    return '—';
  }

  return `${location.latitude.toFixed(2)}, ${location.longitude.toFixed(2)}`;
}

export function formatVisibility(visibility: number | null): string {
  if (typeof visibility !== 'number' || Number.isNaN(visibility)) {
    return '—';
  }

  return `${(visibility / 1000).toFixed(1)} km`;
}

export function formatWindSpeed(speed: number | null): string {
  if (typeof speed !== 'number' || Number.isNaN(speed)) {
    return '—';
  }

  return `${Math.round(speed)} km/h`;
}

export function formatHistoryTimestamp(iso: string | null): string {
  if (!iso) {
    return 'Saved just now';
  }

  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return 'Saved just now';
  }

  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function formatUvIndex(uv: number | null): string {
  if (typeof uv !== 'number' || Number.isNaN(uv)) {
    return '—';
  }

  return uv.toFixed(1);
}
