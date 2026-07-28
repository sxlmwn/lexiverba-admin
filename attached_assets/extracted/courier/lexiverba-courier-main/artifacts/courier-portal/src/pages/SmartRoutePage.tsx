import React from 'react';

interface SmartRoutePageProps {
  isDarkMode?: boolean;
}

export const SmartRoutePage: React.FC<SmartRoutePageProps> = ({ isDarkMode = false }) => {
  const plannedStops = [
    { address: '123 Main Street, New York, NY 10001', recipient: 'John Smith', time: '10:30 AM' },
    { address: '456 Park Avenue, New York, NY 10022', recipient: 'Jane Doe', time: '11:15 AM' },
    { address: '789 Broadway, New York, NY 10003', recipient: 'Robert Johnson', time: '12:00 PM' },
  ];

  return (
    <div className="space-y-8 animate-page-enter">
      {/* Page Header */}
      <div>
        <h1 className={`text-4xl lg:text-5xl font-semibold tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Smart Route Optimizer
        </h1>
        <p className={`text-sm font-medium mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
          AI-powered route optimization with real-time traffic
        </p>
      </div>

      {/* Map Placeholder Empty State */}
      <div className={`p-16 rounded-[2.5rem] border-2 float-shadow smooth-card text-center transition-colors ${
        isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-slate-200/80'
      }`}>
        <div className="max-w-md mx-auto">
          <div className={`w-24 h-24 rounded-3xl mx-auto mb-6 flex items-center justify-center ${
            isDarkMode ? 'bg-zinc-800' : 'bg-slate-100'
          }`}>
            <span className="material-symbols-outlined text-[48px] text-slate-400">location_off</span>
          </div>
          <h3 className="font-semibold text-xl mb-2">Map Not Configured</h3>
          <p className="text-sm text-slate-400 font-medium mb-6">
            Please configure your Maps API key to enable route optimization.
          </p>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-full shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer">
            Configure API Key
          </button>
        </div>
      </div>

      {/* Today's Planned Stops */}
      <div className={`p-8 rounded-[2.5rem] border-2 float-shadow smooth-card transition-colors ${
        isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-slate-200/80'
      }`}>
        <h2 className="text-xl font-semibold mb-6">Today's Planned Stops</h2>
        <div className="space-y-3">
          {plannedStops.map((stop, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                isDarkMode ? 'border-zinc-800 hover:bg-zinc-900/50' : 'border-slate-100 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-semibold text-sm ${
                  isDarkMode ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-50 text-blue-600'
                }`}>
                  {idx + 1}
                </div>
                <div>
                  <div className="font-semibold text-sm">{stop.address}</div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">{stop.recipient}</div>
                </div>
              </div>
              <div className="text-xs font-semibold text-slate-400">{stop.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
