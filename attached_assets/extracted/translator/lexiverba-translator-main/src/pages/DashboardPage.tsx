import React, { useState, useEffect } from 'react';
import { useTheme } from '../theme';
import { Card } from '../components/ui/Card';
import { MetricCard } from '../components/ui/MetricCard';
import { Badge } from '../components/ui/Badge';

interface DashboardPageProps {
  onOpenWorkbenchClick: (taskName?: string) => void;
  onOpenQualityCheckClick: () => void;
  onOpenGlossaryClick: () => void;
  onSelectTab: (tab: string) => void;
  onItemClick: (item: { title: string; subtitle: string; icon?: string; badge?: string }) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onOpenWorkbenchClick,
  onOpenQualityCheckClick,
  onOpenGlossaryClick,
  onSelectTab,
  onItemClick,
}) => {
  const { isDarkMode } = useTheme();

  // Chart & Gauge interactive state
  const [chartType, setChartType] = useState<'bars' | 'line'>('bars');
  const [timeframe, setTimeframe] = useState<'D' | 'W' | 'M'>('W');
  const [gaugePercent, setGaugePercent] = useState<number>(0);
  const [isGaugeAnimating, setIsGaugeAnimating] = useState<boolean>(false);

  const triggerGaugeAnimation = () => {
    if (isGaugeAnimating) return;
    setIsGaugeAnimating(true);
    setGaugePercent(0);

    let start = 0;
    const target = 94; // 94% overall task completion rate (128 completed / 136 total)
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
  const inProgressDashOffset = totalArcLength - (totalArcLength * ((gaugePercent / 94) * 0.70));

  const activeTasks = [
    { id: 'TS-8042', name: 'EU Patent Sworn Translation', client: 'Bancorp SA', language: 'DE → EN', words: '4,500 words', due: 'Today, 18:00', status: 'In Progress', priority: 'Urgent' },
    { id: 'TS-8043', name: 'Clinical Trial Phase III Protocol', client: 'Helios Pharma Ltd', language: 'FR → EN', words: '8,200 words', due: 'Tomorrow, 12:00', status: 'In Progress', priority: 'High' },
    { id: 'TS-8044', name: 'Financial Audit Report 2026', client: 'Popescu & Associates', language: 'ES → EN', words: '3,100 words', due: 'Jul 30, 2026', status: 'Pending', priority: 'Normal' },
    { id: 'TS-8045', name: 'Articles of Incorporation Deed', client: 'Quantum Dynamics', language: 'DE → EN', words: '2,800 words', due: 'Aug 02, 2026', status: 'Reviewing', priority: 'Normal' },
  ];

  const aiTools = [
    {
      id: 'workbench',
      title: 'AI Translation Workbench',
      icon: 'translate',
      desc: 'NMT assistance, real-time glossaries & segment suggestions.',
      action: () => onOpenWorkbenchClick('EU Patent Sworn Translation TS-8042'),
      color: 'bg-blue-400/10 text-blue-400 dark:bg-blue-950/40 dark:text-blue-300',
    },
    {
      id: 'analytics',
      title: 'Performance Analytics',
      icon: 'monitoring',
      desc: 'Throughput velocity, BLEU accuracy & error tracking.',
      action: () => onSelectTab('performance'),
      color: 'bg-emerald-500/10 text-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-400',
    },
    {
      id: 'qa_check',
      title: 'Quality Pre-Check',
      icon: 'fact_check',
      desc: 'Automated terminology, formatting & QA validation.',
      action: onOpenQualityCheckClick,
      color: 'bg-purple-500/10 text-purple-500 dark:bg-purple-950/40 dark:text-purple-400',
    },
    {
      id: 'glossary',
      title: 'Glossary Manager',
      icon: 'menu_book',
      desc: 'Terminology databases & translation memory (.TMX).',
      action: onOpenGlossaryClick,
      color: 'bg-amber-500/10 text-amber-500 dark:bg-amber-950/40 dark:text-amber-400',
    },
  ];

  return (
    <div className="space-y-8 animate-page-enter">
      {/* SVG Definitions for Hatched Pattern */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <pattern id="hatchedPattern" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke={isDarkMode ? '#3f3f46' : '#cbd5e1'} strokeWidth="3" />
          </pattern>
        </defs>
      </svg>

      {/* Header Title Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, Elena</h1>
            <span className="inline-block bg-emerald-500/10 text-emerald-500 text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              ONLINE
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Saturday, 25 July 2026 • Operations Overview
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectTab('tasks')}
            className="px-4 py-2.5 bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-2xl text-xs shadow-md shadow-blue-400/20 transition-all cursor-pointer flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">add_task</span>
            <span>View Tasks</span>
          </button>
        </div>
      </div>

      {/* 1. AI-Powered Tools Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-400 text-[20px]">auto_awesome</span>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">AI TOOLS</h3>
          </div>
          <span className="text-[10px] font-semibold text-blue-400 bg-blue-400/10 px-2.5 py-0.5 rounded-full uppercase">
            NMT Engine v4.2
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {aiTools.map((tool) => (
            <Card
              key={tool.id}
              onClick={tool.action}
              className="p-5 cursor-pointer float-hover"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${tool.color}`}>
                  <span className="material-symbols-outlined text-[24px]">{tool.icon}</span>
                </div>
                <span className="material-symbols-outlined text-slate-300 dark:text-zinc-600 text-[18px]">
                  arrow_forward
                </span>
              </div>
              <h4 className="font-semibold text-sm mb-1">{tool.title}</h4>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{tool.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* 2. Stat Row (MetricCards) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">OVERVIEW METRICS</h3>
          <span className="text-[10px] text-slate-400 font-semibold">Updated 2m ago</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <MetricCard
            title="Assigned Tasks"
            value="6"
            badge="+2 today"
            icon="assignment"
            onClick={() => onSelectTab('tasks')}
          />
          <MetricCard
            title="In Progress"
            value="2"
            badge="Active"
            icon="sync"
            onClick={() => onSelectTab('in_progress')}
          />
          <MetricCard
            title="Completed"
            value="128"
            badge="+18 this month"
            icon="task_alt"
            onClick={() => onSelectTab('completed')}
          />
          <MetricCard
            title="Total Tasks"
            value={String(6 + 2 + 128)}
            badge="99.2% Quality"
            icon="military_tech"
            onClick={() => onSelectTab('achievements')}
          />
        </div>
      </div>

      {/* 3. Agency Portal Middle Grid: Component B (Chart, 7 cols) & Component A (Arc Gauge, 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-0">
        {/* Component B — Project Analytics Bar/Line Toggle Chart Card (7 Cols) */}
        <div className={`lg:col-span-7 p-8 rounded-[2.5rem] border-2 float-shadow smooth-card flex flex-col justify-between transition-colors ${
          isDarkMode ? 'bg-[#18181b] border-[#27272a] text-white' : 'bg-white border-slate-200/80 text-slate-900'
        }`}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-semibold">Translation Throughput</h3>
              <p className="text-xs text-zinc-400 font-semibold">Daily wordcount output &amp; segment volume</p>
            </div>

            <div className="flex items-center gap-3">
              <div className={`flex p-1 rounded-full border ${isDarkMode ? 'bg-[#27272a] border-zinc-700' : 'bg-slate-100 border-slate-200'}`}>
                <button
                  onClick={() => setChartType('bars')}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                    chartType === 'bars'
                      ? 'bg-blue-400 text-white shadow-md'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">bar_chart</span>
                  <span>Bars</span>
                </button>
                <button
                  onClick={() => setChartType('line')}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                    chartType === 'line'
                      ? 'bg-blue-400 text-white shadow-md'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">show_chart</span>
                  <span>Line</span>
                </button>
              </div>

              <div className={`flex p-1 rounded-full ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-100'}`}>
                {(['D', 'W', 'M'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeframe(t)}
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                      timeframe === t
                        ? 'bg-blue-400 text-white shadow-md'
                        : 'text-zinc-400 hover:text-zinc-200'
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
                { day: 'S', height: '60%', type: 'hatched' },
                { day: 'M', height: '85%', type: 'solid' },
                { day: 'T', height: '74%', type: 'active', badge: '3,850 w' },
                { day: 'W', height: '95%', type: 'dark' },
                { day: 'T', height: '65%', type: 'hatched' },
                { day: 'F', height: '50%', type: 'hatched' },
                { day: 'S', height: '70%', type: 'hatched' },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center h-full justify-end relative group">
                  {bar.badge && (
                    <div className="absolute -top-7 bg-blue-400 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full shadow-md">
                      {bar.badge}
                    </div>
                  )}
                  <div
                    className={`w-full rounded-full transition-all duration-300 hover:scale-105 ${
                      bar.type === 'dark'
                        ? isDarkMode
                          ? 'bg-zinc-100 text-slate-900'
                          : 'bg-blue-900'
                        : bar.type === 'solid'
                        ? 'bg-blue-400'
                        : bar.type === 'active'
                        ? 'bg-blue-300'
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
                <svg className="w-full h-full text-blue-400/10 absolute inset-0" preserveAspectRatio="none" viewBox="0 0 800 200">
                  <path d="M0,200 L0,150 C50,140 100,170 150,120 S250,40 300,80 S400,100 450,50 S550,20 600,60 S700,90 800,40 L800,200 Z" fill="currentColor"></path>
                </svg>
                <svg className="w-full h-full text-blue-400 relative z-10" preserveAspectRatio="none" viewBox="0 0 800 200">
                  <path d="M0,150 C50,140 100,170 150,120 S250,40 300,80 S400,100 450,50 S550,20 600,60 S700,90 800,40" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round"></path>
                  <circle cx="150" cy="120" r="6" fill={isDarkMode ? '#09090b' : 'white'} stroke="currentColor" strokeWidth="4"></circle>
                  <circle cx="450" cy="50" r="6" fill={isDarkMode ? '#09090b' : 'white'} stroke="currentColor" strokeWidth="4"></circle>
                  <circle cx="800" cy="40" r="6" fill={isDarkMode ? '#09090b' : 'white'} stroke="currentColor" strokeWidth="4"></circle>
                </svg>
              </div>
              <div className="flex justify-between mt-3 text-xs font-semibold text-zinc-400 px-2">
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
                <span>SAT</span>
                <span>SUN</span>
              </div>
            </div>
          )}
        </div>

        {/* Component A — Task Completion Dual-Arc Gauge Card (5 Cols) */}
        <div
          onMouseEnter={triggerGaugeAnimation}
          className={`lg:col-span-5 p-8 rounded-[2.5rem] border-2 float-shadow float-hover smooth-card flex flex-col justify-between transition-colors ${
            isDarkMode ? 'bg-[#18181b] border-[#27272a] text-white' : 'bg-white border-slate-200/80 text-slate-900'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold">Task Completion</h3>
            <span className="text-xs font-semibold text-blue-400 bg-blue-50 dark:bg-blue-900/40 px-3 py-1 rounded-full">LIVE SLA</span>
          </div>

          <div className="relative w-64 h-40 mx-auto flex flex-col items-center justify-end my-4 cursor-pointer group">
            <svg className="w-64 h-40" viewBox="0 0 200 110">
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="url(#hatchedPattern)"
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
              <span className="text-xs font-semibold text-zinc-400 mt-1">Tasks Delivered</span>
            </div>
          </div>

          <div className={`flex justify-between items-center text-xs font-semibold border-t pt-4 mt-2 ${
            isDarkMode ? 'border-zinc-800 text-zinc-300' : 'border-slate-100 text-slate-600'
          }`}>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#004ac6]"></span>
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#38bdf8]"></span>
              <span>In Progress</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 border-2 border-dashed border-zinc-400 rounded-sm bg-slate-100 dark:bg-zinc-800"></span>
              <span>Pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Active Tasks Card-Row List */}
      <Card hoverable={false} interactive={false} className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base font-semibold">Current Active Tasks</h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Active translation tasks assigned to your queue.</p>
          </div>
          <button
            onClick={() => onSelectTab('tasks')}
            className="text-xs font-semibold text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Tasks</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        {/* Card-Row Stack with hover-rise motion */}
        <div className="space-y-3">
          {activeTasks.map((t) => (
            <div
              key={t.id}
              onClick={() => onItemClick({ title: t.name, subtitle: `${t.client} • ${t.language} • ${t.words} • Due: ${t.due}`, badge: t.status })}
              className="p-4 rounded-2xl border-2 border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-[#121215] float-hover hover-rise cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-blue-400/10 text-blue-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">assignment</span>
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-xs text-slate-900 dark:text-white truncate hover:text-blue-400 transition-colors">
                    {t.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{t.id} • {t.client}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end">
                <span className="font-semibold text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-full text-[10px]">
                  {t.language}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.words}</span>
                <Badge status={t.status}>{t.status}</Badge>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenWorkbenchClick(t.name);
                  }}
                  className="px-3 py-1.5 bg-blue-400 hover:bg-blue-500 text-white rounded-xl text-[10px] font-semibold shadow-2xs transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">edit_note</span>
                  <span>Workbench</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
