import { Alert, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

import {
  WeatherAirQuality,
  WeatherCurrent,
  WeatherHeader,
  WeatherHistoryList,
  WeatherMetrics,
  WeatherSearch,
  WeatherSidebar,
} from '@/components/weather';
import {
  formatCoordinates,
  formatDateTime,
  formatLocationName,
  formatTemperature,
  formatVisibility,
  formatWindSpeed,
  formatUvIndex,
  getWeatherIcon,
  getWeatherText,
} from '@/lib/weather';
import type { SearchHistoryItem, WeatherResult } from '@/types/weather';

type HistoryResponseItem = {
  id: number;
  city: string;
  location_label: string | null;
  temperature_c: number | null;
  updated_at: string | null;
};

const CSRF = () =>
  document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';

export default function Weather() {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<WeatherResult | null>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  useEffect(() => {
    fetch('/weather/history')
      .then((res) => res.json())
      .then((data: HistoryResponseItem[]) => {
        setHistory(
          data.map((item) => ({
            id: item.id,
            city: item.city,
            locationLabel: item.location_label ?? '—',
            temperatureC: item.temperature_c,
            viewedAt: item.updated_at,
          })),
        );
      })
      .catch(() => {
        // Ignore history load failures; search still works.
      });
  }, []);

  const locationName = formatLocationName(result?.location ?? null);
  const weatherDate = result?.weather.time ? formatDateTime(result.weather.time) : '—';
  const temperature = formatTemperature(result?.weather.temperature_2m ?? null, unit);
  const weatherIcon =
    typeof result?.weather.weather_code === 'number'
      ? getWeatherIcon(result.weather.weather_code)
      : 'partly_cloudy_day';
  const weatherText =
    typeof result?.weather.weather_code === 'number'
      ? getWeatherText(result.weather.weather_code)
      : '—';
  const coordinates = formatCoordinates(result?.location ?? null);
  const visibility = formatVisibility(result?.weather.visibility ?? null);
  const windSpeed = formatWindSpeed(result?.weather.wind_speed_10m ?? null);
  const uvIndex = formatUvIndex(result?.weather.uv_index ?? null);

  function updateHistory(searchTerm: string, data: WeatherResult) {
    const trimmedSearch = searchTerm.trim();

    if (!trimmedSearch) {
      return;
    }

    const entry: SearchHistoryItem = {
      id: Date.now(),
      city: trimmedSearch,
      locationLabel: formatLocationName(data.location),
      temperatureC: data.weather.temperature_2m,
      viewedAt: new Date().toISOString(),
    };

    setHistory((current) => {
      const next = [
        entry,
        ...current.filter((item) => item.city.toLowerCase() !== trimmedSearch.toLowerCase()),
      ];

      return next.slice(0, 10);
    });
  }

  async function clearHistory() {
    await fetch('/weather/history', {
      method: 'DELETE',
      headers: { 'X-CSRF-TOKEN': CSRF() },
    });
    setHistory([]);
  }

  async function searchWeather(searchTerm: string) {
    const trimmedCity = searchTerm.trim();

    if (!trimmedCity) {
      setError('Enter a city name to search.');
      setResult(null);

      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/weather/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': CSRF(),
        },
        body: JSON.stringify({ city: trimmedCity }),
      });

      const data = (await response.json()) as Partial<WeatherResult> & { message?: string };

      if (!response.ok) {
        setError(data.message || 'Unable to fetch weather data right now.');

        return;
      }

      const nextResult: WeatherResult = {
        location: {
          name: data.location?.name ?? null,
          country: data.location?.country ?? null,
          latitude: data.location?.latitude ?? null,
          longitude: data.location?.longitude ?? null,
        },
        weather: {
          time: data.weather?.time ?? null,
          temperature_2m: data.weather?.temperature_2m ?? null,
          weather_code: data.weather?.weather_code ?? null,
          wind_speed_10m: data.weather?.wind_speed_10m ?? null,
          visibility: data.weather?.visibility ?? null,
          uv_index: data.weather?.uv_index ?? null,
        },
        air_quality: {
          us_aqi: data.air_quality?.us_aqi ?? null,
          pm2_5: data.air_quality?.pm2_5 ?? null,
          pm10: data.air_quality?.pm10 ?? null,
        },
      };

      setResult(nextResult);
      setCity(trimmedCity);
      updateHistory(trimmedCity, nextResult);
    } catch {
      setError('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await searchWeather(city);
  }

  async function handleHistorySelect(searchTerm: string) {
    setCity(searchTerm);
    await searchWeather(searchTerm);
  }

  return (
    <div className="min-h-screen bg-slate-50 font-inter text-slate-800 antialiased">
      <WeatherHeader />

      <WeatherSidebar
        history={history}
        activeCity={city}
        unit={unit}
        onSelectHistory={(selectedCity) => void handleHistorySelect(selectedCity)}
        onClearHistory={clearHistory}
      />

      <main className="mx-auto max-w-screen-xl px-4 pb-12 pt-24 sm:px-6 lg:ml-64">
        <WeatherSearch
          city={city}
          setCity={setCity}
          loading={loading}
          onSearch={handleSearch}
          onLocate={() => void searchWeather(city)}
        />

        <section className="mb-6 rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm lg:hidden">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="font-manrope text-base font-bold text-indigo-600">Search History</h2>
              <p className="text-xs text-slate-500">Last 10 viewed searches</p>
            </div>
            {history.length > 0 ? (
              <button
                type="button"
                onClick={() => void clearHistory()}
                className="text-xs font-medium text-slate-400 transition-colors hover:text-red-500"
              >
                Clear
              </button>
            ) : null}
          </div>
          <WeatherHistoryList
            history={history}
            activeCity={city}
            unit={unit}
            onSelectHistory={(selectedCity) => void handleHistorySelect(selectedCity)}
          />
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="col-span-full lg:col-span-8">
            <WeatherCurrent
              locationName={locationName}
              weatherDate={weatherDate}
              temperature={temperature}
              unit={unit}
              weatherIcon={weatherIcon}
              weatherText={weatherText}
              coordinates={coordinates}
              visibility={visibility}
              windSpeed={windSpeed}
              loading={loading}
            />
          </div>

          <div className="col-span-full space-y-6 lg:col-span-4">
            <WeatherAirQuality result={result} />
            <WeatherMetrics
              unit={unit}
              setUnit={setUnit}
              windSpeed={windSpeed}
              visibility={visibility}
              temperature={temperature}
              uvIndex={uvIndex}
            />
          </div>
        </div>
      </main>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setError('')}
          severity="error"
          variant="filled"
          sx={{ width: '100%', borderRadius: 3, fontWeight: 600 }}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}
