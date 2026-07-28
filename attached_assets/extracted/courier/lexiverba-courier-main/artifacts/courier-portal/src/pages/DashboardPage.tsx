import React, { useState } from 'react';
import { MetricCard } from '../components/ui/MetricCard';
import { ArcGauge } from '../components/ui/ArcGauge';

interface DashboardPageProps {
  isDarkMode?: boolean;
  onItemClick?: (item: { title: string; subtitle?: string; icon?: string; badge?: string }) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ isDarkMode = false }) => {
  const statCards = [
    { id: 0, title: 'ACTIVE DELIVERIES', value: '11', badge: '+3 vs YESTERDAY', icon: 'local_shipping' },
    { id: 1, title: 'ON-TIME RATE', value: '98.2%', badge: 'LIVE SLA PASS', icon: 'verified' },
    { id: 2, title: 'WEEKLY EARNINGS', value: '$1,015.00', badge: '+$140 vs GOAL', icon: 'payments' },
    { id: 3, title: 'COMPLETED TODAY', value: '7', badge: '100% SUCCESS', icon: 'task_alt' },
  ];

  const [aiTools] = useState([
    { id: 1, icon: 'route', title: 'Smart Route Optimizer', subtitle: 'AI-optimized routes with live traffic', color: 'text-blue-500' },
    { id: 2, icon: 'smart_toy', title: 'AI Delivery Assistant', subtitle: 'Photo proof, QR scanning, signatures', color: 'text-blue-500' },
    { id: 3, icon: 'savings', title: 'Earnings Optimizer', subtitle: 'Find peak earning windows', color: 'text-blue-500' },
    { id: 4, icon: 'location_on', title: 'Live Tracking', subtitle: 'Real-time location and hot zones', color: 'text-blue-500' },
  ]);

  const recommendedTimes = [
    { day: 'Mon Morning', demand: 'High Demand', optimal: true, reason: 'University application season increases demand', earnings: '$203', confidence: '89%' },
    { day: 'Tue Morning', demand: 'High Demand', optimal: true, reason: 'High volume of legal document requests expected', earnings: '$203', confidence: '85%' },
    { day: 'Tue Afternoon', demand: 'High Demand', optimal: true, reason: 'University application season increases demand', earnings: '$203', confidence: '77%' },
    { day: 'Wed Afternoon', demand: 'High Demand', optimal: true, reason: 'High volume of legal document requests expected', earnings: '$203', confidence: '93%' },
    { day: 'Thu Morning', demand: 'High Demand', optimal: true, reason: 'Peak day for notary appointments', earnings: '$198', confidence: '81%' },
    { day: 'Fri Afternoon', demand: '', optimal: true, reason: 'Afternoon rush for same-day delivery requests', earnings: '$175', confidence: '74%' },
    { day: 'Sat Morning', demand: 'High Demand', optimal: false, reason: 'Weekend document rush', earnings: '$215', confidence: '91%' },
  ];

  return (
    <div className="space-y-8 animate-page-enter">
      {/* Page Header */}
      <div>
        <h1 className={`text-4xl lg:text-5xl font-semibold tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Courier Dashboard
        </h1>
        <p className={`text-sm font-medium mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
          Welcome back, Demo Courier User
        </p>
      </div>

      {/* Top Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {statCards.map((card) => (
          <MetricCard
            key={card.id}
            title={card.title}
            value={card.value}
            badge={card.badge}
            icon={card.icon}
          />
        ))}
      </div>

      {/* AI Profile Setup Banner & ArcGauge Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className={`lg:col-span-7 p-8 rounded-[2.5rem] border-2 float-shadow smooth-card flex flex-col justify-between transition-colors ${
          isDarkMode ? 'bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-blue-500/30' : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'
        }`}>
          <div>
            <h3 className="font-semibold text-xl mb-2">Complete Your AI Profile Setup</h3>
            <div className="w-full max-w-md h-2 bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden my-4">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '50%' }}></div>
            </div>
            <p className="text-xs text-slate-400 font-medium">50% complete — finish setup to unlock full AI route recommendations and automated surge notifications.</p>
          </div>
          <div className="mt-6 flex justify-start">
            <button className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-full shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer">
              Complete Setup →
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <ArcGauge
            title="Delivery Performance SLA"
            badgeText="LIVE SLA"
            percentage={98}
            secondaryPercentage={94}
            centerSubtitle="On-Time Rate"
            labels={{
              primary: 'On-Time',
              secondary: 'In Transit',
              tertiary: 'Pending',
            }}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>

      {/* AI-Powered Tools Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">AI-Powered Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiTools.map((tool) => (
            <div
              key={tool.id}
              className={`p-6 rounded-[2.5rem] border-2 float-shadow float-hover smooth-card cursor-pointer transition-colors ${
                isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-slate-200/80'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center mb-4 ${tool.color}`}>
                <span className="material-symbols-outlined text-[28px]">{tool.icon}</span>
              </div>
              <h3 className="font-semibold text-sm mb-1">{tool.title}</h3>
              <p className="text-[11px] text-slate-400 font-medium">{tool.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Earnings Predictor & Recommended Work Times Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (5 Cols) - AI Earnings Predictor */}
        <div className="lg:col-span-5">
          <div className={`p-8 rounded-[2.5rem] border-2 float-shadow float-hover smooth-card transition-colors h-full flex flex-col justify-between ${
            isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-slate-200/80'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">AI Earnings Predictor</h2>
              <button className="w-9 h-9 rounded-full border flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer bg-blue-600/10 border-blue-500/30 text-blue-500">
                <span className="material-symbols-outlined text-[20px]">refresh</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Weekly Potential</div>
                <div className="text-3xl font-semibold text-emerald-500">$1,015.00</div>
              </div>
              <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Optimal Shift Target</div>
                <div className="text-2xl font-semibold">30 Hours / Week</div>
              </div>
              <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">High Demand Windows</div>
                <div className="text-xs font-semibold text-blue-500 mt-1">Mon Jul 27 • Tue Jul 28 • Wed Jul 29</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols) - Recommended Work Times */}
        <div className="lg:col-span-7">
          <div className={`p-8 rounded-[2.5rem] border-2 float-shadow float-hover smooth-card transition-colors ${
            isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-slate-200/80'
          }`}>
            <h2 className="text-xl font-semibold mb-6">Recommended Work Times</h2>
            <div className="space-y-2">
              {recommendedTimes.map((time, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-2.5 px-4 rounded-2xl border transition-all hover:translate-x-1 cursor-pointer ${
                    isDarkMode ? 'border-zinc-800 hover:bg-zinc-900/50' : 'border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-xs font-semibold w-28">{time.day}</div>
                    <div className="flex gap-2">
                      {time.demand && (
                        <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                          {time.demand}
                        </span>
                      )}
                      {time.optimal && (
                        <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-600/10 text-blue-500 border border-blue-500/30">
                          Optimal
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 font-medium flex-1">{time.reason}</div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-sm font-semibold text-emerald-500">{time.earnings}</div>
                    <div className="text-xs font-semibold text-slate-400">{time.confidence}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
