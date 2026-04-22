interface WeatherMetricsProps {
  unit: 'C' | 'F';
  setUnit: (unit: 'C' | 'F') => void;
  windSpeed: string;
  visibility: string;
  temperature: string;
  uvIndex: string;
}

export function WeatherMetrics({ unit, setUnit, windSpeed, visibility, temperature, uvIndex }: WeatherMetricsProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-slate-900 font-manrope">Metrics</h3>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setUnit('C')}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
              unit === 'C' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            °C
          </button>
          <button
            type="button"
            onClick={() => setUnit('F')}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
              unit === 'F' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            °F
          </button>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-indigo-500 text-[22px]">air</span>
            <span className="text-sm font-medium text-slate-600">Wind</span>
          </div>
          <span className="text-sm font-bold text-slate-900">
            {windSpeed}
          </span>
        </div>
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-indigo-500 text-[22px]">visibility</span>
            <span className="text-sm font-medium text-slate-600">Visibility</span>
          </div>
          <span className="text-sm font-bold text-slate-900">
            {visibility}
          </span>
        </div>
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-indigo-500 text-[22px]">thermostat</span>
            <span className="text-sm font-medium text-slate-600">Temperature</span>
          </div>
          <span className="text-sm font-bold text-slate-900">
            {temperature === '—' ? `—°${unit}` : `${temperature}°${unit}`}
          </span>
        </div>
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-indigo-500 text-[22px]">light_mode</span>
            <span className="text-sm font-medium text-slate-600">UV Index</span>
          </div>
          <span className="text-sm font-bold text-slate-900">
            {uvIndex}
          </span>
        </div>
      </div>
    </div>
  );
}
