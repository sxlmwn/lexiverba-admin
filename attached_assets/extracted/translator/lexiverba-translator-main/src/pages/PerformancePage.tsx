import React, { useState, useEffect } from 'react';
import { useTheme } from '../theme';
import { Card } from '../components/ui/Card';
import { MetricCard } from '../components/ui/MetricCard';
import { ProgressBar } from '../components/ui/ProgressBar';

interface PerformancePageProps {
  onItemClick: (item: { title: string; subtitle: string; icon?: string; badge?: string }) => void;
}

export const PerformancePage: React.FC<PerformancePageProps> = ({ onItemClick }) => {
  const { isDarkMode } = useTheme();
  const [timeframe, setTimeframe] = useState<'7D' | '30D' | '90D' | '1Y'>('30D');

  // Component A Interactive Dual-Arc Gauge State for Velocity Meter
  const [gaugePercent, setGaugePercent] = useState<number>(0);
  const [isGaugeAnimating, setIsGaugeAnimating] = useState<boolean>(false);

  const triggerGaugeAnimation = () => {
    if (isGaugeAnimating) return;
    setIsGaugeAnimating(true);
    setGaugePercent(0);

    let start = 0;
    const target = 85; // 85% Velocity SLA Capacity (3,850 WPD throughput)
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

  useEffect(() => {
    triggerGaugeAnimation();
  }, []);

  const totalArcLength = 251.32;
  const completedDashOffset = totalArcLength - (totalArcLength * (gaugePercent / 100));
  const inProgressDashOffset = totalArcLength - (totalArcLength * ((gaugePercent / 85) * 0.70));

  const domainScores = [
    { name: 'Legal & Sworn Deeds', score: 99.8, words: '98,400 words' },
    { name: 'Patents & IP Rights', score: 99.5, words: '64,200 words' },
    { name: 'Medical & Life Sciences', score: 99.2, words: '52,100 words' },
    { name: 'Software i18n & Tech', score: 98.9, words: '31,100 words' },
  ];

  const clientReviews = [
    {
      client: 'Bancorp SA',
      rating: 5,
      date: 'Jul 22, 2026',
      comment: 'Exceptional sworn German legal translation with zero errors.',
    },
    {
      client: 'Helios Pharma Ltd',
      rating: 5,
      date: 'Jul 15, 2026',
      comment: 'Flawless French medical clinical protocol delivered ahead of schedule.',
    },
    {
      client: 'Vanguard Legal Group',
      rating: 5,
      date: 'Jul 04, 2026',
      comment: 'Highly meticulous Spanish legal compliance framework translation.',
    },
  ];

  return (
    <div className="space-y-8 animate-page-enter">
      {/* SVG Definitions for Hatched Pattern */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <pattern id="hatchedPatternPerf" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke={isDarkMode ? '#3f3f46' : '#cbd5e1'} strokeWidth="3" />
          </pattern>
        </defs>
      </svg>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance Analytics</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Throughput velocity, BLEU precision benchmarks, and quality ratings.
          </p>
        </div>

        {/* Timeframe Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-[#18181b] border border-slate-200 dark:border-zinc-800 rounded-2xl">
          {(['7D', '30D', '90D', '1Y'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                timeframe === t
                  ? 'bg-blue-400 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Avg. Daily Throughput"
          value="3,850 WPD"
          badge="+12% vs avg"
          icon="bolt"
        />
        <MetricCard
          title="BLEU Accuracy Score"
          value="99.4%"
          badge="Top 1% Tier"
          icon="verified"
        />
        <MetricCard
          title="Post-Editing Speed"
          value="850 WPH"
          badge="NMT Accelerated"
          icon="speed"
        />
        <MetricCard
          title="Client Satisfaction"
          value="4.98 / 5.0"
          badge="128 Reviews"
          icon="star"
        />
      </div>

      {/* Detailed Performance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Domain Precision Breakdown (7 Cols) */}
        <Card hoverable={false} interactive={false} className="lg:col-span-7 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-base">Domain Quality Breakdown</h3>
              <p className="text-xs text-slate-400 font-medium">Precision scores evaluated across specializations.</p>
            </div>
            <span className="text-[10px] font-semibold bg-blue-400/10 text-blue-400 px-3 py-1 rounded-full uppercase">
              ISO-17100 Compliant
            </span>
          </div>

          <div className="space-y-5">
            {domainScores.map((domain, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-800 dark:text-slate-200">{domain.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-[11px] font-mono">{domain.words}</span>
                    <span className="text-blue-400 font-bold">{domain.score}%</span>
                  </div>
                </div>
                <ProgressBar progress={domain.score} height="h-2.5" barColor="bg-blue-400" />
              </div>
            ))}
          </div>
        </Card>

        {/* Component A — Velocity Meter Dual-Arc Gauge Card (5 Cols) */}
        <div
          onMouseEnter={triggerGaugeAnimation}
          className={`lg:col-span-5 p-8 rounded-[2.5rem] border-2 float-shadow float-hover smooth-card flex flex-col justify-between transition-colors ${
            isDarkMode ? 'bg-[#18181b] border-[#27272a] text-white' : 'bg-white border-slate-200/80 text-slate-900'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold">Velocity Meter</h3>
            <span className="text-xs font-semibold text-blue-500 bg-blue-50 dark:bg-blue-900/40 px-3 py-1 rounded-full">3,850 WPD</span>
          </div>

          <div className="relative w-64 h-40 mx-auto flex flex-col items-center justify-end my-4 cursor-pointer group">
            <svg className="w-64 h-40" viewBox="0 0 200 110">
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="url(#hatchedPatternPerf)"
                strokeWidth="28"
                strokeLinecap="round"
              />

              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="28"
                strokeDasharray="251.32"
                strokeDashoffset={inProgressDashOffset}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />

              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#004ac6"
                strokeWidth="28"
                strokeDasharray="251.32"
                strokeDashoffset={completedDashOffset}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
            </svg>

            <div className="absolute bottom-2 flex flex-col items-center justify-center group-hover:scale-110 transition-transform">
              <span className={`text-5xl font-semibold tracking-tight leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {gaugePercent}%
              </span>
              <span className="text-xs font-semibold text-zinc-400 mt-1">Target Capacity</span>
            </div>
          </div>

          <div className={`flex justify-between items-center text-xs font-semibold border-t pt-4 mt-2 ${
            isDarkMode ? 'border-zinc-800 text-zinc-300' : 'border-slate-100 text-slate-600'
          }`}>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#004ac6]"></span>
              <span>Today (3.8k)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#38bdf8]"></span>
              <span>Weekly Avg</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 border-2 border-dashed border-zinc-400 rounded-sm bg-slate-100 dark:bg-zinc-800"></span>
              <span>Target</span>
            </div>
          </div>
        </div>
      </div>

      {/* Client Reviews */}
      <Card hoverable={false} interactive={false} className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-semibold text-base">Client QA Feedback</h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Recent ratings from project coordinators.</p>
          </div>
          <span className="text-xs font-semibold text-amber-500 flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">star</span>
            <span>4.98 Rating</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clientReviews.map((rev, i) => (
            <div
              key={i}
              onClick={() => onItemClick({ title: `Review from ${rev.client}`, subtitle: `Rating: ${rev.rating}/5 • Date: ${rev.date} • ${rev.comment}`, badge: '5-Star Review' })}
              className="p-5 rounded-2xl bg-slate-50/80 dark:bg-zinc-800/50 border border-slate-200/60 dark:border-zinc-800 space-y-3 cursor-pointer float-hover hover-rise"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-xs">{rev.client}</span>
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <span key={idx} className="material-symbols-outlined text-[16px]">star</span>
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 italic font-medium leading-relaxed">
                "{rev.comment}"
              </p>
              <div className="text-[10px] font-semibold text-slate-400 text-right">{rev.date}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
