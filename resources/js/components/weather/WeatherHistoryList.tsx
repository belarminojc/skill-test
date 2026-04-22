import { formatHistoryTimestamp, formatTemperature } from '@/lib/weather';
import type { SearchHistoryItem } from '@/types/weather';

interface WeatherHistoryListProps {
  history: SearchHistoryItem[];
  activeCity: string;
  unit: 'C' | 'F';
  onSelectHistory: (city: string) => void;
}

export function WeatherHistoryList({
  history,
  activeCity,
  unit,
  onSelectHistory,
}: WeatherHistoryListProps) {
  if (history.length === 0) {
    return (
      <div className="px-4 py-3 rounded-xl text-slate-400 bg-slate-50">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[20px]">history</span>
          <span>—</span>
        </div>
      </div>
    );
  }

  return (
    <nav className="space-y-1">
      {history.map(({ id, city, locationLabel, temperatureC, viewedAt }) => (
        <button
          key={id}
          type="button"
          onClick={() => onSelectHistory(city)}
          className={`w-full rounded-xl px-4 py-3 text-left transition-all ${
            activeCity.trim().toLowerCase() === city.toLowerCase()
              ? 'bg-indigo-50 text-indigo-700'
              : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">history</span>
                <span className="truncate font-semibold">
                  {locationLabel !== '—' ? locationLabel : city}
                </span>
              </div>
              <p className="mt-1 pl-8 text-xs opacity-70">
                {formatHistoryTimestamp(viewedAt)}
              </p>
            </div>
            <span className="shrink-0 pt-0.5 text-xs opacity-70">
              {`${formatTemperature(temperatureC, unit)}°${temperatureC === null ? '' : unit}`.replace('—°', '—')}
            </span>
          </div>
        </button>
      ))}
    </nav>
  );
}
