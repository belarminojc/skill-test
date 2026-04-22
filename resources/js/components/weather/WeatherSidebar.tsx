import type { SearchHistoryItem } from '@/types/weather';
import { WeatherHistoryList } from './WeatherHistoryList';

interface WeatherSidebarProps {
  history: SearchHistoryItem[];
  activeCity: string;
  unit: 'C' | 'F';
  onSelectHistory: (city: string) => void;
  onClearHistory: () => void;
}

export function WeatherSidebar({
  history,
  activeCity,
  unit,
  onSelectHistory,
  onClearHistory,
}: WeatherSidebarProps) {
  return (
    <aside className="bg-white border-r border-slate-200/60 shadow-xl hidden lg:flex flex-col fixed left-0 top-0 pt-24 pb-6 px-4 space-y-2 h-screen w-64 rounded-r-2xl font-manrope text-sm z-40">
      <div className="px-4 mb-6">
        <h2 className="text-lg font-bold text-indigo-600">Search History</h2>
        <p className="text-xs text-slate-500">Last 10 viewed searches</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <WeatherHistoryList
          history={history}
          activeCity={activeCity}
          unit={unit}
          onSelectHistory={onSelectHistory}
        />
      </div>
      <div className="px-4 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onClearHistory}
          className="text-slate-400 hover:text-red-500 text-xs font-medium flex items-center gap-2 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
          Clear History
        </button>
      </div>
    </aside>
  );
}
