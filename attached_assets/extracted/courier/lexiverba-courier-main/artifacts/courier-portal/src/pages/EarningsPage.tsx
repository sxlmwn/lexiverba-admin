import React, { useState } from 'react';

interface EarningsPageProps {
  isDarkMode?: boolean;
}

export const EarningsPage: React.FC<EarningsPageProps> = ({ isDarkMode = false }) => {
  const [acceptedSuggestions, setAcceptedSuggestions] = useState<number[]>([]);

  const suggestions = [
    { id: 1, title: 'Work Tuesday 10 AM - 2 PM', icon: 'access_time', color: 'text-blue-500', desc: 'High demand period with 40% more delivery requests. Perfect weather conditions forecasted.', potential: '+$85', confidence: '92%' },
    { id: 2, title: 'Focus on Midtown Manhattan', icon: 'location_on', color: 'text-blue-500', desc: 'Hotspot detected with multiple notarization pickups within 0.5 mile radius.', potential: '+$120', confidence: '88%' },
    { id: 3, title: 'Complete 5 More This Week', icon: 'emoji_events', color: 'text-blue-500', desc: 'You\'re 5 deliveries away from the weekly bonus tier. $50 extra if achieved.', potential: '+$50', confidence: '95%' },
    { id: 4, title: 'Optimize Route Order', icon: 'route', color: 'text-blue-500', desc: 'AI detected 15% shorter route by reordering your stops. Save 45 minutes.', potential: '+$35', confidence: '87%' },
  ];

  const toggleAccept = (id: number) => {
    if (acceptedSuggestions.includes(id)) {
      setAcceptedSuggestions(acceptedSuggestions.filter(sid => sid !== id));
    } else {
      setAcceptedSuggestions([...acceptedSuggestions, id]);
    }
  };

  return (
    <div className="space-y-8 animate-page-enter">
      {/* Page Header */}
      <div>
        <h1 className={`text-4xl lg:text-5xl font-semibold tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Earnings Optimizer
        </h1>
        <p className={`text-sm font-medium mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
          AI suggestions to maximize your earnings
        </p>
      </div>

      {/* Weekly Earnings Goal */}
      <div className={`p-8 rounded-[2.5rem] border-2 float-shadow smooth-card transition-colors ${
        isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-slate-200/80'
      }`}>
        <h2 className="text-xl font-semibold mb-4">Weekly Earnings Goal</h2>
        <div className="mb-4">
          <div className={`h-4 rounded-full overflow-hidden ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-200'}`}>
            <div className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="font-semibold text-2xl">$542</span>
            <span className="text-slate-400 font-medium"> of $800 goal</span>
          </div>
          <div className="text-right">
            <div className="text-slate-400 font-medium text-xs">4 days remaining</div>
            <div className="font-semibold text-emerald-500">$258.00 more to reach your goal</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`p-6 rounded-[2.5rem] border-2 float-shadow smooth-card transition-colors ${
          isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-slate-200/80'
        }`}>
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">Today</div>
          <div className="text-3xl font-semibold text-emerald-500">$92</div>
        </div>
        <div className={`p-6 rounded-[2.5rem] border-2 float-shadow smooth-card transition-colors ${
          isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-slate-200/80'
        }`}>
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">Avg/Delivery</div>
          <div className="text-3xl font-semibold">$15.94</div>
        </div>
        <div className={`p-6 rounded-[2.5rem] border-2 float-shadow smooth-card transition-colors ${
          isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-slate-200/80'
        }`}>
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">vs Last Week</div>
          <div className="text-3xl font-semibold text-emerald-500">+12%</div>
        </div>
        <div className={`p-6 rounded-[2.5rem] border-2 float-shadow smooth-card transition-colors ${
          isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-slate-200/80'
        }`}>
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">Tier Bonus</div>
          <div className="text-3xl font-semibold text-blue-500">$50</div>
        </div>
      </div>

      {/* AI Earnings Suggestions */}
      <div className={`p-8 rounded-[2.5rem] border-2 float-shadow smooth-card transition-colors ${
        isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-slate-200/80'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">AI Earnings Suggestions</h2>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
            +$290 potential
          </span>
        </div>
        <div className="space-y-4">
          {suggestions.map((suggestion) => {
            const isAccepted = acceptedSuggestions.includes(suggestion.id);
            return (
              <div
                key={suggestion.id}
                className={`p-6 rounded-2xl border-2 transition-all ${
                  isDarkMode ? 'border-zinc-800 hover:border-blue-500/30' : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center ${suggestion.color}`}>
                      <span className="material-symbols-outlined text-[24px]">{suggestion.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{suggestion.title}</h3>
                      <p className="text-xs text-slate-400 font-medium mt-1">{suggestion.desc}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-zinc-800">
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-semibold text-emerald-500">{suggestion.potential}</div>
                    <div className="text-xs font-semibold text-slate-400">{suggestion.confidence} confidence</div>
                  </div>
                  <button
                    onClick={() => toggleAccept(suggestion.id)}
                    className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isAccepted
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/30'
                    }`}
                  >
                    {isAccepted ? (
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">check</span>
                        Accepted
                      </span>
                    ) : (
                      'Accept'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
