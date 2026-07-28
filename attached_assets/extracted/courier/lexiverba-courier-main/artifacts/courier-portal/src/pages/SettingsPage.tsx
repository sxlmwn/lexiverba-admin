import React, { useState } from 'react';

interface SettingsPageProps {
  isDarkMode?: boolean;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ isDarkMode = false }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeLocal, setDarkModeLocal] = useState(isDarkMode);
  const [locationTracking, setLocationTracking] = useState(true);

  return (
    <div className="space-y-8 animate-page-enter">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-1.5 w-10 bg-blue-600 rounded-full shadow-md shadow-blue-500/30"></div>
            <span className="text-xs font-semibold text-blue-500 uppercase tracking-[0.25em]">COURIER CONFIGURATION</span>
          </div>
          <h1 className={`text-4xl lg:text-5xl font-semibold tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Settings
          </h1>
          <p className={`text-sm font-medium mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Manage your courier profile and preferences
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className={`flex items-center gap-2 px-6 py-3.5 border font-semibold text-xs rounded-full shadow-2xs transition-all hover:scale-105 active:scale-95 float-hover cursor-pointer ${
            isDarkMode ? 'bg-[#18181b] border-[#27272a] text-white hover:bg-zinc-800' : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
          }`}>
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export Data
          </button>
          <button className="flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-full shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 float-hover cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">save</span>
            Save Changes
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div className={`p-8 rounded-[2.5rem] border-2 float-shadow smooth-card transition-colors ${
        isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-slate-200/80'
      }`}>
        <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-2xl shadow-lg ring-4 ring-blue-500/20">
            DC
          </div>
          <div>
            <h3 className="font-semibold text-lg">Demo Courier User</h3>
            <p className="text-sm text-blue-500 font-semibold">Verified Courier</p>
            <p className="text-xs text-slate-400 font-medium mt-1">courier@lexiverba.ai</p>
          </div>
        </div>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-full shadow-md shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer">
          Edit Profile
        </button>
      </div>

      {/* Preferences */}
      <div className={`p-8 rounded-[2.5rem] border-2 float-shadow smooth-card space-y-6 transition-colors ${
        isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-slate-200/80'
      }`}>
        <h2 className="text-xl font-semibold mb-6">Preferences</h2>

        <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-zinc-800">
          <div>
            <h3 className="font-semibold text-base">Push Notifications</h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Receive alerts for new deliveries and updates</p>
          </div>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={(e) => setNotificationsEnabled(e.target.checked)}
            className="w-5 h-5 rounded text-blue-600 focus:ring-blue-600 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-zinc-800">
          <div>
            <h3 className="font-semibold text-base">Dark Mode</h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Enable dark theme across the app</p>
          </div>
          <input
            type="checkbox"
            checked={darkModeLocal}
            onChange={(e) => setDarkModeLocal(e.target.checked)}
            className="w-5 h-5 rounded text-blue-600 focus:ring-blue-600 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-base">Location Tracking</h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Real-time GPS tracking for route optimization</p>
          </div>
          <input
            type="checkbox"
            checked={locationTracking}
            onChange={(e) => setLocationTracking(e.target.checked)}
            className="w-5 h-5 rounded text-blue-600 focus:ring-blue-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Vehicle Information */}
      <div className={`p-8 rounded-[2.5rem] border-2 float-shadow smooth-card transition-colors ${
        isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-slate-200/80'
      }`}>
        <h2 className="text-xl font-semibold mb-6">Vehicle Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold mb-2 text-slate-400">Vehicle Make & Model</label>
            <input
              type="text"
              defaultValue="Honda Civic 2022"
              className={`w-full px-4 py-3 rounded-xl border text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/40 transition-all ${
                isDarkMode ? 'bg-[#18181b] border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
              }`}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-2 text-slate-400">License Plate</label>
            <input
              type="text"
              defaultValue="ABC-1234"
              className={`w-full px-4 py-3 rounded-xl border text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/40 transition-all ${
                isDarkMode ? 'bg-[#18181b] border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className={`p-8 rounded-[2.5rem] border-2 float-shadow smooth-card transition-colors ${
        isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-slate-200/80'
      }`}>
        <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
        <div className={`p-4 rounded-xl border mb-4 ${
          isDarkMode ? 'bg-emerald-900/20 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200'
        }`}>
          <div className="flex items-center gap-2 text-emerald-500">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            <span className="text-xs font-semibold">Direct deposit configured</span>
          </div>
        </div>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-full shadow-md shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer">
          Update Payment Method
        </button>
      </div>
    </div>
  );
};
