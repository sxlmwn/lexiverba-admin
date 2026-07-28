import React from 'react';
import { MetricCard } from '../components/ui/MetricCard';

interface PerformancePageProps {
  isDarkMode?: boolean;
  onItemClick?: (item: { title: string; subtitle?: string; icon?: string; badge?: string }) => void;
}

export const PerformancePage: React.FC<PerformancePageProps> = ({ isDarkMode = false, onItemClick }) => {
  const weeklyData = [
    { day: 'MON', count: 6 },
    { day: 'TUE', count: 7 },
    { day: 'WED', count: 5 },
    { day: 'THU', count: 8 },
    { day: 'FRI', count: 7 },
    { day: 'SAT', count: 3 },
    { day: 'SUN', count: 2 },
  ];

  const maxCount = Math.max(...weeklyData.map(d => d.count));

  const handleBarClick = (bar: { day: string; count: number }) => {
    if (onItemClick) {
      onItemClick({
        title: `${bar.day} Deliveries Breakdown`,
        subtitle: `${bar.count} Deliveries Completed • 100% On-Time SLA`,
        icon: 'bar_chart',
        badge: 'PASSED',
      });
    }
  };

  return (
    <div className="space-y-8 animate-page-enter">
      {/* Page Header */}
      <div>
        <h1 className={`text-4xl lg:text-5xl font-semibold tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Performance
        </h1>
        <p className={`text-sm font-medium mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
          Your delivery statistics and performance metrics
        </p>
      </div>

      {/* Top 4 Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="TOTAL DELIVERIES" value="247" badge="+14 THIS WEEK" icon="local_shipping" />
        <MetricCard title="ON-TIME RATE" value="94.2%" badge="EXCEPTIONAL" icon="verified" />
        <MetricCard title="TODAY'S DELIVERIES" value="8" badge="100% SUCCESS" icon="task_alt" />
        <MetricCard title="CUSTOMER RATING" value="★ 4.9" badge="TOP 1% COURIER" icon="star" />
      </div>

      {/* Responsive 2-Column Section Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (5 Cols) - On-Time Compact Card & Delivery Stats & Badges */}
        <div className="lg:col-span-5 space-y-6">
          {/* On-Time Delivery Compact Stat Card */}
          <div className={`p-6 rounded-[2.5rem] border-2 float-shadow float-hover smooth-card transition-colors ${
            isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-slate-200/80'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">On-Time SLA Rate</h3>
              <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">
                94.2% PASS
              </span>
            </div>
            <div className="w-full h-3 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden mb-3">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '94.2%' }}></div>
            </div>
            <p className="text-xs text-slate-400 font-medium">Exceptional delivery punctuality logged across 247 deliveries.</p>
          </div>

          {/* Delivery Stats Card */}
          <div className={`p-6 rounded-[2.5rem] border-2 float-shadow float-hover smooth-card transition-colors ${
            isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-slate-200/80'
          }`}>
            <h3 className="text-lg font-semibold mb-4">Delivery Metrics</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className={`p-3 rounded-2xl border ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-[9px] font-semibold text-slate-400 uppercase">This Week</div>
                <div className="text-xl font-semibold mt-1">38</div>
              </div>
              <div className={`p-3 rounded-2xl border ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-[9px] font-semibold text-slate-400 uppercase">Avg Time</div>
                <div className="text-xl font-semibold mt-1">23m</div>
              </div>
              <div className={`p-3 rounded-2xl border ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-[9px] font-semibold text-slate-400 uppercase">Distance</div>
                <div className="text-xl font-semibold mt-1">312mi</div>
              </div>
            </div>
          </div>

          {/* Active Badges */}
          <div className={`p-6 rounded-[2.5rem] border-2 float-shadow float-hover smooth-card transition-colors ${
            isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-slate-200/80'
          }`}>
            <h3 className="text-lg font-semibold mb-4">Active Badges</h3>
            <div className="flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 text-xs font-semibold clickable-badge cursor-pointer">
                <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
                12-Day Streak
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600/10 text-blue-500 border border-blue-500/30 text-xs font-semibold clickable-badge cursor-pointer">
                <span className="material-symbols-outlined text-[16px]">emoji_events</span>
                Weekly Champion
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30 text-xs font-semibold clickable-badge cursor-pointer">
                <span className="material-symbols-outlined text-[16px]">workspace_premium</span>
                Top 10% Courier
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols) - Weekly Deliveries Capsule Bar Chart */}
        <div className="lg:col-span-7">
          <div className={`p-8 rounded-[2.5rem] border-2 float-shadow float-hover smooth-card transition-colors h-full flex flex-col justify-between ${
            isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-slate-200/80'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Weekly Deliveries</h2>
              <span className="text-xs font-semibold text-blue-500 bg-blue-50 dark:bg-blue-900/40 px-3 py-1 rounded-full">
                PEAK: THU (8)
              </span>
            </div>

            <div className="h-64 pt-6 flex items-end justify-between gap-3 px-2">
              {weeklyData.map((bar, i) => {
                const isPeak = bar.count === maxCount;
                const heightPercent = `${(bar.count / maxCount) * 100}%`;
                return (
                  <div
                    key={i}
                    onClick={() => handleBarClick(bar)}
                    className="flex-1 flex flex-col items-center h-full justify-end relative group cursor-pointer"
                  >
                    <div
                      className={`w-full rounded-full transition-all duration-300 hover:scale-105 ${
                        isPeak
                          ? 'bg-blue-900 dark:bg-blue-400'
                          : 'bg-blue-600'
                      }`}
                      style={{ height: heightPercent }}
                    ></div>
                    <span className="text-xs font-semibold text-slate-400 mt-3">{bar.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
