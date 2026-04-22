import { formatNumber, getAqiLabel } from '@/lib/weather';
import type { WeatherResult } from '@/types/weather';

interface WeatherAirQualityProps {
  result: WeatherResult | null;
}

export function WeatherAirQuality({ result }: WeatherAirQualityProps) {
  const aqiValue = result?.air_quality.us_aqi ?? null;
  const aqi = typeof aqiValue === 'number' ? getAqiLabel(aqiValue) : null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-slate-900 font-manrope">Air Quality</h3>
        {aqi ? (
          <div className={`flex items-center gap-1.5 px-3 py-1 ${aqi.bg} ${aqi.color} rounded-full`}>
            <div className={`w-2 h-2 rounded-full ${aqi.bar}`} />
            <span className="text-xs font-bold">{aqi.label}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-500 rounded-full">
            <div className="w-2 h-2 rounded-full bg-slate-400" />
            <span className="text-xs font-bold">—</span>
          </div>
        )}
      </div>
      <div className="overflow-hidden h-2 rounded-full bg-slate-100 mb-3">
        <div
          className={`h-full rounded-full transition-all duration-700 ${aqi ? aqi.bar : 'bg-slate-300'}`}
          style={{ width: aqi ? aqi.width : '0%' }}
        />
      </div>
      <p className="text-sm text-slate-500">
        US AQI: <span className="font-bold text-slate-900">{formatNumber(result?.air_quality.us_aqi ?? null)}</span>
        {' · '}PM2.5: <span className="font-bold text-slate-900">{formatNumber(result?.air_quality.pm2_5 ?? null, 1)}</span>
        {' · '}PM10: <span className="font-bold text-slate-900">{formatNumber(result?.air_quality.pm10 ?? null, 1)}</span>
      </p>
    </div>
  );
}
