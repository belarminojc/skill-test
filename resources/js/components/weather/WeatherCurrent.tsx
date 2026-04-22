import { CircularProgress } from '@mui/material';

interface WeatherCurrentProps {
  locationName: string;
  weatherDate: string;
  temperature: string;
  unit: 'C' | 'F';
  weatherIcon: string;
  weatherText: string;
  coordinates: string;
  visibility: string;
  windSpeed: string;
  loading: boolean;
}

export function WeatherCurrent({
  locationName,
  weatherDate,
  temperature,
  unit,
  weatherIcon,
  weatherText,
  coordinates,
  visibility,
  windSpeed,
  loading,
}: WeatherCurrentProps) {
  return (
    <div className="relative overflow-hidden bg-white p-8 rounded-2xl shadow-sm border border-slate-200/60 h-full">
      <button className="absolute top-6 right-6 text-slate-300 hover:text-amber-400 transition-colors">
        <span className="material-symbols-outlined text-[32px]">star</span>
      </button>

      <div className="flex flex-col h-full justify-between">
        <div>
          <p className="text-indigo-600 font-bold text-[11px] uppercase tracking-widest mb-2 font-inter">Current Weather</p>
          <h2 className="text-3xl font-bold text-slate-900 font-manrope mb-1">
            {locationName}
          </h2>
          <p className="text-slate-400 text-sm">
            {weatherDate}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 sm:gap-12 my-8 sm:my-10">
          <div className="flex items-baseline">
            <span className="font-manrope font-extrabold text-[60px] sm:text-[84px] leading-none text-slate-900">
              {temperature}
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-slate-400 ml-1">°{unit}</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="material-symbols-outlined text-[60px] sm:text-[80px] text-indigo-500">
              {weatherIcon}
            </span>
            <span className="text-base sm:text-lg font-semibold text-slate-600 font-manrope">
              {weatherText}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-8 border-t border-slate-100">
          <div className="bg-slate-50 p-4 rounded-xl">
            <p className="text-slate-400 text-[11px] font-semibold mb-1 uppercase tracking-wide">Coordinates</p>
            <p className="text-slate-900 font-bold text-sm">
              {coordinates}
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl">
            <p className="text-slate-400 text-[11px] font-semibold mb-1 uppercase tracking-wide">Visibility</p>
            <p className="text-slate-900 font-bold text-sm">
              {visibility}
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl">
            <p className="text-slate-400 text-[11px] font-semibold mb-1 uppercase tracking-wide">Wind Speed</p>
            <p className="text-slate-900 font-bold text-sm">
              {windSpeed}
            </p>
          </div>
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-2xl">
          <div className="flex flex-col items-center gap-3 text-indigo-600">
            <CircularProgress size={48} thickness={4} color="inherit" />
            <span className="text-sm font-semibold font-manrope">Fetching weather…</span>
          </div>
        </div>
      )}
    </div>
  );
}
