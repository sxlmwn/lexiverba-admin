import React, { useState } from 'react';
import { StatCard, type StatCardData } from '../StatCard';

interface Props {
  isDarkMode: boolean;
  onItemClick: (item: { title: string; subtitle: string; icon?: string; badge?: string }) => void;
}

export const DashboardPage: React.FC<Props> = ({ isDarkMode, onItemClick }) => {
  const [hoveredCard, setHoveredCard] = useState<number>(0);
  const [chartType, setChartType] = useState<'bars' | 'line'>('bars');
  const [timeframe, setTimeframe] = useState<'D' | 'W' | 'M'>('W');
  const [gaugePercent, setGaugePercent] = useState<number>(41);
  const [isGaugeAnimating, setIsGaugeAnimating] = useState(false);

  const triggerGaugeAnimation = () => {
    if (isGaugeAnimating) return;
    setIsGaugeAnimating(true);
    setGaugePercent(0);
    let start = 0;
    const target = 41;
    const duration = 1000;
    const stepTime = Math.abs(Math.floor(duration / target));
    const timer = setInterval(() => {
      start += 1;
      setGaugePercent(start);
      if (start >= target) {
        clearInterval(timer);
        setIsGaugeAnimating(false);
      }
    }, stepTime);
  };

  const tools = [
    { id: 'cal', title: 'Smart Calendar', desc: 'AI-optimized appointment scheduling', icon: 'calendar_month' },
    { id: 'avail', title: 'Availability Manager', desc: 'Set and manage your schedule', icon: 'event_available' },
    { id: 'perf', title: 'Performance Metrics', desc: 'Track completions and ratings', icon: 'monitoring' },
    { id: 'earn', title: 'Earnings Dashboard', desc: 'Monitor your notary earnings', icon: 'payments' },
  ];

  const statCards: StatCardData[] = [
    { id: 0, title: 'PENDING NOTARIZATIONS', value: '12', badge: '3 ▲ Increased', icon: 'hourglass_top' },
    { id: 1, title: 'COMPLETED THIS MONTH', value: '148', badge: '5 ▲ Increased', icon: 'task_alt' },
    { id: 2, title: 'TOTAL EARNINGS', value: '$8,420', badge: 'On Track', icon: 'payments' },
    { id: 3, title: 'CLIENT RATING', value: '4.9', badge: '★ Excellent', icon: 'star' },
  ];

  const workTimes = [
    { day: 'Mon', slot: 'Morning', demand: 'High Demand', demandTone: 'emerald', desc: 'Business hours peak demand for corporate translations', earn: 608, conf: 90, icon: 'wb_sunny' },
    { day: 'Tue', slot: 'Morning', demand: 'High Demand', demandTone: 'emerald', desc: 'Immigration deadlines typically fall on weekdays', earn: 608, conf: 77, icon: 'wb_sunny' },
    { day: 'Tue', slot: 'Afternoon', demand: 'High Demand', demandTone: 'emerald', desc: 'Immigration deadlines typically fall on weekdays', earn: 608, conf: 86, icon: 'schedule' },
    { day: 'Wed', slot: 'Afternoon', demand: 'High Demand', demandTone: 'emerald', desc: 'Business hours peak demand for corporate translations', earn: 608, conf: 76, icon: 'schedule' },
    { day: 'Thu', slot: 'Morning', demand: 'High Demand', demandTone: 'emerald', desc: 'University application season increases demand', earn: 608, conf: 81, icon: 'wb_sunny' },
    { day: 'Mon', slot: 'Afternoon', demand: 'Medium Demand', demandTone: 'amber', desc: 'Regular business document processing', earn: 518, conf: 79, icon: 'schedule' },
  ];

  const totalArcLength = 251.32;
  const completedDashOffset = totalArcLength - (totalArcLength * (gaugePercent / 100));
  const inProgressDashOffset = totalArcLength - (totalArcLength * 0.70);

  return (
    <div className="space-y-8">
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <pattern id="hatchedPattern" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke={isDarkMode ? '#3f3f46' : '#cbd5e1'} strokeWidth="3" />
          </pattern>
        </defs>
      </svg>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className={`text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Notary Dashboard
          </h1>
          <p className={`text-sm font-medium mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
            Welcome back, Demo Notary User
          </p>
        </div>
      </div>

      {/* AI-Powered Tools */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-blue-500 text-[20px]">bolt</span>
          <h2 className={`text-sm font-extrabold uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            AI-Powered Tools
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map(t => (
            <button
              key={t.id}
              onClick={() => onItemClick({ title: t.title, subtitle: t.desc, icon: t.icon, badge: 'AI TOOL' })}
              className={`text-left p-5 rounded-[2rem] border-2 smooth-card float-shadow float-hover transition-all duration-300 flex items-start gap-3 cursor-pointer ${
                isDarkMode ? 'bg-[#18181b] border-[#27272a] text-white' : 'bg-white border-slate-200/80 text-slate-900'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">{t.icon}</span>
              </div>
              <div className="min-w-0">
                <div className="text-sm font-extrabold leading-tight">{t.title}</div>
                <div className={`text-[11px] font-medium mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>{t.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {statCards.map(card => (
          <StatCard
            key={card.id}
            card={card}
            isExpanded={hoveredCard === card.id}
            isDarkMode={isDarkMode}
            onMouseEnter={() => setHoveredCard(card.id)}
            onClick={() => onItemClick({ title: card.title, subtitle: `${card.value} • ${card.badge}`, icon: card.icon, badge: card.badge })}
          />
        ))}
      </div>

      {/* Gauge + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-0">
        <div className={`lg:col-span-7 p-8 rounded-[2.5rem] border-2 float-shadow smooth-card flex flex-col justify-between transition-colors ${
          isDarkMode ? 'bg-[#18181b] border-[#27272a] text-white' : 'bg-white border-slate-200/80 text-slate-900'
        }`}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-extrabold">Notarizations &amp; Earnings</h3>
              <p className="text-xs text-zinc-400 font-semibold">Documents notarized and revenue per period</p>
            </div>

            <div className="flex items-center gap-3">
              <div className={`flex p-1 rounded-full border ${isDarkMode ? 'bg-[#27272a] border-zinc-700' : 'bg-slate-100 border-slate-200'}`}>
                <button
                  onClick={() => setChartType('bars')}
                  className={`px-3 py-1 text-xs font-extrabold rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                    chartType === 'bars' ? 'bg-blue-600 text-white shadow-md' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">bar_chart</span>
                  <span>Bars</span>
                </button>
                <button
                  onClick={() => setChartType('line')}
                  className={`px-3 py-1 text-xs font-extrabold rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                    chartType === 'line' ? 'bg-blue-600 text-white shadow-md' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">show_chart</span>
                  <span>Line</span>
                </button>
              </div>

              <div className={`flex p-1 rounded-full ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-100'}`}>
                {(['D', 'W', 'M'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setTimeframe(t)}
                    className={`px-3 py-1 text-xs font-extrabold rounded-full transition-colors cursor-pointer ${
                      timeframe === t ? 'bg-blue-600 text-white shadow-md' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {chartType === 'bars' ? (
            <div className="h-60 pt-8 flex items-end justify-between px-2 gap-3 relative">
              {[
                { day: 'S', height: '55%', type: 'hatched' },
                { day: 'M', height: '82%', type: 'solid' },
                { day: 'T', height: '74%', type: 'active', badge: '74%' },
                { day: 'W', height: '92%', type: 'dark' },
                { day: 'T', height: '68%', type: 'hatched' },
                { day: 'F', height: '48%', type: 'hatched' },
                { day: 'S', height: '30%', type: 'hatched' },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center h-full justify-end relative group">
                  {bar.badge && (
                    <div className="absolute -top-7 bg-blue-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-md badge-shadow">
                      {bar.badge}
                    </div>
                  )}
                  <div
                    className={`w-full rounded-full transition-all duration-300 hover:scale-105 ${
                      bar.type === 'dark'
                        ? isDarkMode ? 'bg-zinc-100 text-slate-900' : 'bg-blue-900'
                        : bar.type === 'solid'
                        ? 'bg-blue-600'
                        : bar.type === 'active'
                        ? 'bg-blue-500'
                        : isDarkMode
                        ? 'bg-zinc-800 border-2 border-dashed border-zinc-700'
                        : 'bg-blue-50 border-2 border-dashed border-blue-200'
                    }`}
                    style={{ height: bar.height }}
                  ></div>
                  <span className="text-xs font-semibold text-zinc-400 mt-3">{bar.day}</span>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div className="h-60 relative w-full flex items-end">
                <svg className="w-full h-full text-blue-500/10 absolute inset-0" preserveAspectRatio="none" viewBox="0 0 800 200">
                  <path d="M0,200 L0,150 C50,140 100,170 150,120 S250,40 300,80 S400,100 450,50 S550,20 600,60 S700,90 800,40 L800,200 Z" fill="currentColor"></path>
                </svg>
                <svg className="w-full h-full text-blue-500 relative z-10" preserveAspectRatio="none" viewBox="0 0 800 200">
                  <path d="M0,150 C50,140 100,170 150,120 S250,40 300,80 S400,100 450,50 S550,20 600,60 S700,90 800,40" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round"></path>
                  <circle cx="150" cy="120" r="6" fill={isDarkMode ? '#09090b' : 'white'} stroke="currentColor" strokeWidth="4"></circle>
                  <circle cx="450" cy="50" r="6" fill={isDarkMode ? '#09090b' : 'white'} stroke="currentColor" strokeWidth="4"></circle>
                  <circle cx="800" cy="40" r="6" fill={isDarkMode ? '#09090b' : 'white'} stroke="currentColor" strokeWidth="4"></circle>
                </svg>
              </div>
              <div className="flex justify-between mt-3 text-xs font-extrabold text-zinc-400 px-2">
                <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
              </div>
            </div>
          )}
        </div>

        <div
          onMouseEnter={triggerGaugeAnimation}
          className={`lg:col-span-5 p-8 rounded-[2.5rem] border-2 float-shadow float-hover smooth-card flex flex-col justify-between transition-colors ${
            isDarkMode ? 'bg-[#18181b] border-[#27272a] text-white' : 'bg-white border-slate-200/80 text-slate-900'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-extrabold">Completion Rate</h3>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 dark:bg-blue-900/40 px-3 py-1 rounded-full">LIVE</span>
          </div>

          <div className="relative w-64 h-40 mx-auto flex flex-col items-center justify-end my-4 cursor-pointer group">
            <svg className="w-64 h-40" viewBox="0 0 200 110">
              <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="url(#hatchedPattern)" strokeWidth="28" strokeLinecap="round" />
              <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#38bdf8" strokeWidth="28" strokeDasharray="251.32" strokeDashoffset={inProgressDashOffset} strokeLinecap="round" className="transition-all duration-700 ease-out" />
              <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#004ac6" strokeWidth="28" strokeDasharray="251.32" strokeDashoffset={completedDashOffset} strokeLinecap="round" className="transition-all duration-700 ease-out" />
            </svg>
            <div className="absolute bottom-2 flex flex-col items-center justify-center group-hover:scale-110 transition-transform">
              <span className={`text-5xl font-extrabold tracking-tight leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {gaugePercent}%
              </span>
              <span className="text-xs font-semibold text-zinc-400 mt-1">Notarized</span>
            </div>
          </div>

          <div className={`flex justify-between items-center text-xs font-semibold border-t pt-4 mt-2 ${
            isDarkMode ? 'border-zinc-800 text-zinc-300' : 'border-slate-100 text-slate-600'
          }`}>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#004ac6]"></span>
              <span>Notarized</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#38bdf8]"></span>
              <span>Awaiting Signature</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 border-2 border-dashed border-zinc-400 rounded-sm bg-slate-100 dark:bg-zinc-800"></span>
              <span>Pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Work Times */}
      <div className={`p-8 rounded-[2.5rem] border-2 float-shadow smooth-card transition-colors ${
        isDarkMode ? 'bg-[#18181b] border-[#27272a] text-white' : 'bg-white border-slate-200/80 text-slate-900'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-500 text-[22px]">calendar_month</span>
            <h3 className="text-lg font-extrabold">Recommended Work Times</h3>
          </div>
        </div>
        <p className="text-[11px] text-zinc-400 font-medium mb-5">AI-selected time slots with highest earning potential</p>

        <div className="space-y-3">
          {workTimes.map((w, idx) => (
            <div
              key={idx}
              onClick={() => onItemClick({ title: `${w.day} ${w.slot}`, subtitle: w.desc, icon: w.icon, badge: w.demand.toUpperCase() })}
              className={`rounded-2xl border p-3 transition-all hover:translate-x-1 cursor-pointer ${
                isDarkMode ? 'border-zinc-800 hover:bg-zinc-800/60' : 'border-slate-100 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                    w.slot === 'Morning' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-600/10 text-blue-500'
                  }`}>
                    <span className="material-symbols-outlined text-[20px]">{w.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-xs">{w.day}</span>
                      <span className="text-[10px] text-zinc-400 font-semibold">{w.slot}</span>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full text-white ${
                        w.demandTone === 'emerald' ? 'bg-emerald-500 badge-glow-emerald' : 'bg-amber-500 badge-glow-amber'
                      }`}>
                        {w.demand}
                      </span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500 text-white badge-glow-emerald">
                        Optimal
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-400 font-medium truncate mt-1">{w.desc}</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-lg font-extrabold text-emerald-500">${w.earn}</div>
                  <div className="text-[10px] text-zinc-400 font-semibold">{w.conf}% confidence</div>
                </div>
              </div>
              <div className={`mt-3 h-1 w-full rounded-full ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-100'}`}>
                <div className="h-1 rounded-full bg-blue-600 transition-all duration-500" style={{ width: `${w.conf}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
