import React from 'react';

export interface StatCardData {
  id: number;
  title: string;
  value: string;
  badge: string;
  icon: string;
}

interface Props {
  card: StatCardData;
  isExpanded: boolean;
  isDarkMode: boolean;
  onMouseEnter: () => void;
  onClick: () => void;
}

export const StatCard: React.FC<Props> = ({ card, isExpanded, isDarkMode, onMouseEnter, onClick }) => (
  <div
    onMouseEnter={onMouseEnter}
    onClick={onClick}
    className={`p-6 rounded-[2.5rem] cursor-pointer smooth-card float-shadow float-hover transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
      isExpanded
        ? 'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white shadow-2xl border-2 border-blue-500'
        : isDarkMode
        ? 'bg-[#18181b] border-2 border-[#27272a] text-white shadow-sm hover:shadow-lg'
        : 'bg-white border-2 border-slate-200/80 text-slate-900 shadow-sm hover:shadow-lg'
    }`}
  >
    {isExpanded && (
      <div className="absolute -right-6 -top-6 opacity-10 text-white pointer-events-none transition-all duration-500">
        <span className="material-symbols-outlined text-[160px]">{card.icon}</span>
      </div>
    )}

    <div className="flex justify-between items-start relative z-10">
      <span className={`text-xs font-extrabold uppercase tracking-widest ${
        isExpanded ? 'text-blue-100' : isDarkMode ? 'text-zinc-300' : 'text-slate-700'
      }`}>
        {card.title}
      </span>
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
          isExpanded ? 'bg-white/20 text-white' : isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'border border-slate-200 text-slate-600'
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">north_east</span>
      </div>
    </div>

    <div className="mt-8 relative z-10">
      <div className="text-5xl font-extrabold tracking-tight mb-3">{card.value}</div>
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold transition-colors ${
          isExpanded
            ? 'bg-white/20 text-white'
            : isDarkMode
            ? 'bg-zinc-800 text-zinc-300 border border-zinc-700'
            : 'bg-slate-100 text-slate-600 border border-slate-200/60'
        }`}
      >
        {card.badge}
      </div>
    </div>
  </div>
);
