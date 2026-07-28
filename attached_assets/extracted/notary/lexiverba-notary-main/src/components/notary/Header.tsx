import React, { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isCollapsed?: boolean;
  onSelectTab?: (tab: string) => void;
  title: string;
  subtitle: string;
}

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  toggleDarkMode,
  isCollapsed = false,
  onSelectTab,
  title,
  subtitle,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setIsSearchFocused(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setIsNotificationsOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setIsProfileOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Notarization Certified', desc: 'Affidavit of Residency signed & sealed for J. Ortega', time: '8m ago', icon: 'verified', read: false },
    { id: 2, title: 'New Signature Request', desc: 'Power of Attorney submitted by Helios Legal', time: '42m ago', icon: 'draw', read: false },
    { id: 3, title: 'Appointment Reminder', desc: 'Loan document signing at 3:00 PM with A. Chen', time: '2h ago', icon: 'event', read: false },
    { id: 4, title: 'Earnings Payout Processed', desc: '$1,240.00 deposited via ACH', time: 'Yesterday', icon: 'payments', read: true },
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  return (
    <header
      className={`fixed top-0 right-0 h-20 backdrop-blur-xl border-b-2 z-40 px-10 flex items-center justify-between transition-all duration-300 ease-in-out ${
        isCollapsed ? 'left-20' : 'left-72'
      } ${
        isDarkMode ? 'bg-[#121215]/90 border-[#27272a] text-slate-100' : 'bg-white/80 border-slate-200/50 text-slate-900'
      }`}
    >
      <div className="min-w-0">
        <h1 className={`text-lg font-extrabold tracking-tight truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{title}</h1>
        <p className={`text-[11px] font-semibold ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>{subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        <div ref={searchRef} className="relative hidden md:block">
          <div
            className={`flex items-center rounded-2xl px-4 py-2.5 w-[340px] border transition-all ${
              isSearchFocused
                ? isDarkMode
                  ? 'bg-[#18181b] border-blue-500 shadow-lg shadow-blue-500/10'
                  : 'bg-white border-blue-600 shadow-lg shadow-blue-600/10'
                : isDarkMode
                ? 'bg-[#18181b] border-[#27272a]'
                : 'bg-slate-100/80 border-slate-200/60'
            }`}
          >
            <span className="material-symbols-outlined text-slate-400 text-[20px]">search</span>
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notarizations, clients, appointments..."
              className={`bg-transparent border-none text-xs w-full ml-2 outline-none font-semibold placeholder-slate-400 ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}
            />
            <kbd
              className={`px-2 py-0.5 border text-[10px] font-extrabold rounded-md shadow-2xs ${
                isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-300' : 'bg-white border-slate-200 text-slate-400'
              }`}
            >
              ⌘F
            </kbd>
          </div>
        </div>

        <button
          className={`hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[11px] font-extrabold transition-all hover:scale-105 active:scale-95 cursor-pointer ${
            isDarkMode ? 'bg-[#18181b] border-[#27272a] text-slate-200 hover:bg-zinc-800' : 'bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className="material-symbols-outlined text-[16px] text-blue-500">support_agent</span>
          Support
        </button>

        <button
          onClick={toggleDarkMode}
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer ${
            isDarkMode
              ? 'bg-[#18181b] border-[#27272a] text-amber-400 hover:bg-zinc-800'
              : 'bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50'
          }`}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          <span className="material-symbols-outlined text-[20px]">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        <div ref={notifRef} className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all shadow-2xs relative cursor-pointer hover:scale-105 active:scale-95 ${
              isNotificationsOpen
                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/30'
                : isDarkMode
                ? 'bg-[#18181b] border-[#27272a] text-slate-300 hover:bg-zinc-800'
                : 'bg-white border-slate-200/80 text-slate-600 hover:bg-slate-50'
            }`}
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-blue-500 rounded-full ring-2 ring-white dark:ring-[#121215] animate-ping"></span>
            )}
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-blue-600 rounded-full ring-2 ring-white dark:ring-[#121215]"></span>
            )}
          </button>

          {isNotificationsOpen && (
            <div
              className={`absolute right-0 top-14 w-96 rounded-3xl border-2 shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-200 ${
                isDarkMode ? 'bg-[#121215] border-[#27272a] text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm">Notifications</h4>
                  {unreadCount > 0 && (
                    <span className="bg-blue-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                      {unreadCount} NEW
                    </span>
                  )}
                </div>
                <button onClick={markAllRead} className="text-[10px] font-semibold text-blue-500 hover:underline cursor-pointer">
                  Mark all read
                </button>
              </div>

              <div className="space-y-2 mt-3 max-h-80 overflow-y-auto pr-1">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 rounded-2xl border transition-all ${
                      !n.read
                        ? isDarkMode ? 'bg-blue-900/20 border-blue-500/30' : 'bg-blue-50/70 border-blue-200'
                        : isDarkMode ? 'bg-[#18181b] border-zinc-800 opacity-70' : 'bg-slate-50 border-slate-100 opacity-70'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-600/10 text-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[18px]">{n.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h5 className="font-bold text-xs leading-tight">{n.title}</h5>
                          <span className="text-[9px] text-slate-400 font-semibold shrink-0">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium mt-1 leading-snug">{n.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div ref={profileRef} className="relative">
          <div onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3 pl-2 cursor-pointer group">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-extrabold text-xs shadow-sm ring-2 ring-blue-500/20 group-hover:ring-blue-500/60 transition-all">
                DN
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-[#121215]"></span>
            </div>
            <div className="text-left hidden lg:block">
              <div className={`text-xs font-extrabold leading-tight flex items-center gap-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                <span>Demo Notary</span>
                <span className="material-symbols-outlined text-[16px] text-slate-400 group-hover:text-blue-500 transition-colors">
                  {isProfileOpen ? 'expand_less' : 'expand_more'}
                </span>
              </div>
              <div className="text-[10px] font-semibold text-blue-500">Commissioned Notary</div>
            </div>
          </div>

          {isProfileOpen && (
            <div
              className={`absolute right-0 top-14 w-72 rounded-3xl border-2 shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-200 ${
                isDarkMode ? 'bg-[#121215] border-[#27272a] text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3 pb-4 mb-3 border-b border-slate-100 dark:border-zinc-800">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-extrabold ring-2 ring-blue-500">
                  DN
                </div>
                <div className="min-w-0">
                  <div className="font-extrabold text-sm truncate">Demo Notary User</div>
                  <div className="text-[10px] text-slate-400 font-semibold truncate">notary@lexiverba.ai</div>
                  <span className="inline-block mt-1 bg-blue-600/10 text-blue-500 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                    NOTARY PRO
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <button
                  onClick={() => { onSelectTab && onSelectTab('settings'); setIsProfileOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                    isDarkMode ? 'hover:bg-[#18181b] text-slate-200' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px] text-blue-500">person</span>
                  <span>View Profile &amp; Role</span>
                </button>

                <button
                  onClick={() => { onSelectTab && onSelectTab('settings'); setIsProfileOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                    isDarkMode ? 'hover:bg-[#18181b] text-slate-200' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px] text-blue-500">settings</span>
                  <span>System Preferences</span>
                </button>

                <button
                  onClick={() => toggleDarkMode()}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                    isDarkMode ? 'hover:bg-[#18181b] text-slate-200' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px] text-blue-500">
                      {isDarkMode ? 'light_mode' : 'dark_mode'}
                    </span>
                    <span>{isDarkMode ? 'Switch to Light' : 'Switch to Dark'}</span>
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300">
                    {isDarkMode ? 'DARK' : 'LIGHT'}
                  </span>
                </button>

                <div className="pt-2 mt-2 border-t border-slate-100 dark:border-zinc-800">
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-all cursor-pointer">
                    <span className="material-symbols-outlined text-[20px]">logout</span>
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
