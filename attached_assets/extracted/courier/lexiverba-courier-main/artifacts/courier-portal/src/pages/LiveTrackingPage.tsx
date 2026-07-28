import React, { useState } from 'react';

interface LiveTrackingPageProps {
  isDarkMode?: boolean;
}

export const LiveTrackingPage: React.FC<LiveTrackingPageProps> = ({ isDarkMode = false }) => {
  const [isLocationOn, setIsLocationOn] = useState(true);

  const hotZones = [
    { name: 'Midtown Manhattan', radius: '0.5mi', demand: 'Surge', color: 'rose', rate: '$28/hr' },
    { name: 'Financial District', radius: '0.3mi', demand: 'High', color: 'amber', rate: '$24/hr' },
    { name: 'Upper West Side', radius: '0.8mi', demand: 'Medium', color: 'blue', rate: '$19/hr' },
    { name: 'Brooklyn Heights', radius: '0.6mi', demand: 'High', color: 'amber', rate: '$22/hr' },
    { name: 'Times Square', radius: '0.4mi', demand: 'Surge', color: 'rose', rate: '$31/hr' },
    { name: 'Soho', radius: '0.7mi', demand: 'Medium', color: 'blue', rate: '$17/hr' },
  ];

  const geofenceAlerts = [
    { time: '2:34 PM', message: 'Entered Midtown Manhattan hotzone — surge pricing active', type: 'info' },
    { time: '1:15 PM', message: 'Left Financial District — demand normalized', type: 'neutral' },
    { time: '11:42 AM', message: 'Approaching Times Square — high traffic detected', type: 'warning' },
  ];

  const getDemandBadge = (color: string) => {
    switch (color) {
      case 'rose':
        return 'bg-rose-500/10 text-rose-500 border-rose-500/30';
      case 'amber':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/30';
      case 'blue':
        return 'bg-blue-600/10 text-blue-500 border-blue-500/30';
      default:
        return 'bg-slate-500/10 text-slate-500 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-8 animate-page-enter">
      {/* Page Header */}
      <div>
        <h1 className={`text-4xl lg:text-5xl font-semibold tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Live Tracking
        </h1>
        <p className={`text-sm font-medium mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
          AI-powered location tracking and demand analysis
        </p>
      </div>

      {/* Connection Status Bar */}
      <div className={`p-6 rounded-[2.5rem] border-2 float-shadow smooth-card transition-colors ${
        isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-slate-200/80'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="w-3 h-3 bg-emerald-500 rounded-full inline-block"></span>
              <span className="w-3 h-3 bg-emerald-500 rounded-full inline-block absolute top-0 left-0 animate-ping"></span>
            </div>
            <div>
              <div className="font-semibold text-sm">Online — 98% Signal</div>
              <div className="text-xs text-slate-400 font-medium">GPS tracking active</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-emerald-500">battery_full</span>
              <span className="text-xs font-semibold">87%</span>
            </div>
            <button
              onClick={() => setIsLocationOn(!isLocationOn)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isLocationOn
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                  : 'bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {isLocationOn ? 'Location On' : 'Location Off'}
            </button>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className={`p-16 rounded-[2.5rem] border-2 float-shadow smooth-card text-center transition-colors ${
        isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-slate-200/80'
      }`}>
        <div className={`w-24 h-24 rounded-3xl mx-auto mb-4 flex items-center justify-center ${
          isDarkMode ? 'bg-zinc-800' : 'bg-slate-100'
        }`}>
          <span className="material-symbols-outlined text-[48px] text-blue-500">map</span>
        </div>
        <h3 className="font-semibold text-lg mb-2">Location Tracking Active</h3>
        <div className="text-sm text-slate-400 font-medium space-y-1">
          <p>Lat: 40.7580° N, Lon: 73.9855° W</p>
          <p>Last update: 2 seconds ago</p>
        </div>
      </div>

      {/* Today's Stats */}
      <div className={`p-8 rounded-[2.5rem] border-2 float-shadow smooth-card transition-colors ${
        isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-slate-200/80'
      }`}>
        <h2 className="text-xl font-semibold mb-6">Today's Stats</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">Distance</div>
            <div className="text-3xl font-semibold">12.4 mi</div>
          </div>
          <div>
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">Time Active</div>
            <div className="text-3xl font-semibold">3h 24m</div>
          </div>
          <div>
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">Avg Speed</div>
            <div className="text-3xl font-semibold">18.2 mph</div>
          </div>
          <div>
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">Updates</div>
            <div className="text-3xl font-semibold">847</div>
          </div>
        </div>
      </div>

      {/* Demand Hot Zones */}
      <div className={`p-8 rounded-[2.5rem] border-2 float-shadow smooth-card transition-colors ${
        isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-slate-200/80'
      }`}>
        <h2 className="text-xl font-semibold mb-6">Demand Hot Zones</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotZones.map((zone, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border-2 transition-all hover:translate-y-[-4px] ${
                isDarkMode ? 'border-zinc-800 hover:border-blue-500/30' : 'border-slate-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-sm mb-1">{zone.name}</h3>
                  <p className="text-xs text-slate-400 font-medium">{zone.radius} radius</p>
                </div>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border uppercase tracking-wider ${getDemandBadge(zone.color)}`}>
                  {zone.demand}
                </span>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-zinc-800">
                <div className="text-lg font-semibold text-emerald-500">{zone.rate}</div>
                <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-all cursor-pointer">
                  Navigate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Geofence Alerts */}
      <div className={`p-8 rounded-[2.5rem] border-2 float-shadow smooth-card transition-colors ${
        isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-slate-200/80'
      }`}>
        <h2 className="text-xl font-semibold mb-6">Geofence Alerts</h2>
        <div className="space-y-3">
          {geofenceAlerts.map((alert, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-4 p-4 rounded-2xl border ${
                isDarkMode ? 'border-zinc-800 bg-zinc-900/50' : 'border-slate-200 bg-slate-50'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] text-blue-500">notifications</span>
              <div className="flex-1">
                <div className="text-xs font-semibold">{alert.message}</div>
                <div className="text-[10px] text-slate-400 font-medium mt-1">{alert.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
