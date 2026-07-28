import React, { useState } from 'react';
import { Card } from '../components/ui/Card';

interface SettingsPageProps {
  onItemClick: (item: { title: string; subtitle: string; icon?: string; badge?: string }) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onItemClick }) => {
  const [autoSave, setAutoSave] = useState(true);
  const [nmtSuggestions, setNmtSuggestions] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [dailyQuota, setDailyQuota] = useState('4000');

  return (
    <div className="space-y-8 animate-page-enter">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Translator Settings</h1>
        <p className="text-xs text-slate-400 font-medium mt-1">
          Preferences, NMT copilot options, and account notifications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Form Container */}
        <Card hoverable={false} interactive={false} className="p-6 lg:col-span-2 space-y-6">
          <div className="border-b border-slate-200/60 dark:border-zinc-800 pb-4">
            <h3 className="font-semibold text-base">CAT Editor &amp; NMT Copilot</h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Automated segment saving and translation memory settings.</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/70 dark:bg-zinc-800/40 border border-slate-200/60 dark:border-zinc-800">
              <div>
                <div className="font-semibold text-xs text-slate-900 dark:text-white">Auto-Confirm High TM Matches</div>
                <div className="text-[10px] text-slate-400 font-medium mt-0.5">Automatically accept 100% translation memory matches.</div>
              </div>
              <input
                type="checkbox"
                checked={autoSave}
                onChange={(e) => setAutoSave(e.target.checked)}
                className="w-4 h-4 accent-blue-500 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/70 dark:bg-zinc-800/40 border border-slate-200/60 dark:border-zinc-800">
              <div>
                <div className="font-semibold text-xs text-slate-900 dark:text-white">NMT Inline Auto-Suggestions</div>
                <div className="text-[10px] text-slate-400 font-medium mt-0.5">Display neural translation drafts as inline ghosts.</div>
              </div>
              <input
                type="checkbox"
                checked={nmtSuggestions}
                onChange={(e) => setNmtSuggestions(e.target.checked)}
                className="w-4 h-4 accent-blue-500 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/70 dark:bg-zinc-800/40 border border-slate-200/60 dark:border-zinc-800">
              <div>
                <div className="font-semibold text-xs text-slate-900 dark:text-white">New Task Email Alerts</div>
                <div className="text-[10px] text-slate-400 font-medium mt-0.5">Receive immediate notifications for urgent assignments.</div>
              </div>
              <input
                type="checkbox"
                checked={emailNotifs}
                onChange={(e) => setEmailNotifs(e.target.checked)}
                className="w-4 h-4 accent-blue-500 rounded cursor-pointer"
              />
            </div>
          </div>

          <div className="border-t border-slate-200/60 dark:border-zinc-800 pt-5 space-y-3">
            <h4 className="font-semibold text-xs uppercase tracking-wider text-slate-400">Target Daily Capacity</h4>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={dailyQuota}
                onChange={(e) => setDailyQuota(e.target.value)}
                className="px-3.5 py-2 bg-slate-100 dark:bg-zinc-800 rounded-xl border border-slate-200 dark:border-zinc-700 text-xs font-semibold w-36 outline-none focus:ring-2 focus:ring-blue-500/40"
              />
              <span className="text-xs text-slate-400 font-medium">words / day</span>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() =>
                onItemClick({
                  title: 'Settings Saved Successfully',
                  subtitle: 'Translator preferences and NMT rules updated.',
                  badge: 'Saved',
                })
              }
              className="px-5 py-2.5 bg-blue-400 hover:bg-blue-500 text-white rounded-2xl text-xs font-semibold shadow-md shadow-blue-400/20 transition-all cursor-pointer"
            >
              Save Preferences
            </button>
          </div>
        </Card>

        {/* Profile Card */}
        <Card hoverable={false} interactive={false} className="p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120"
                alt="Elena Marin"
                className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-400"
              />
              <div>
                <h3 className="font-bold text-base">Elena Marin</h3>
                <p className="text-xs text-slate-400">Certified Sworn Translator</p>
                <span className="inline-block mt-1 bg-emerald-500/10 text-emerald-500 text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase">
                  SWORN LICENSED
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs border-y border-slate-100 dark:border-zinc-800 py-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Email:</span>
                <span className="font-medium">elena.marin@lexiverba.ai</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Timezone:</span>
                <span className="font-medium">UTC+01:00 Berlin</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Member Since:</span>
                <span className="font-medium">Jan 2025</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-blue-400/10 text-blue-400 dark:text-blue-300 rounded-2xl text-center text-xs font-semibold">
            Status: Active &amp; ISO-17100 Verified
          </div>
        </Card>
      </div>
    </div>
  );
};
