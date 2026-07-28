import React, { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
  isCollapsed?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  toggleDarkMode,
  searchQuery = '',
  setSearchQuery,
  isCollapsed = false,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
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

  return (
    <header
      className={`fixed top-0 right-0 h-20 backdrop-blur-xl border-b-2 z-40 px-10 flex items-center justify-between transition-all duration-300 ease-in-out ${
        isCollapsed ? 'left-20' : 'left-72'
      } ${
        isDarkMode ? 'bg-[#121215]/90 border-[#27272a] text-slate-100' : 'bg-white/80 border-slate-200/50 text-slate-900'
      }`}
    >
      {/* Search Bar */}
      <div ref={searchRef} className="relative">
        <div
          className={`flex items-center rounded-2xl px-4 py-2.5 w-[460px] border transition-all ${
            isSearchFocused
              ? isDarkMode
                ? 'bg-[#18181b] border-blue-500 shadow-lg shadow-blue-500/10'
                : 'bg-white border-blue-500 shadow-lg shadow-blue-500/10'
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
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            placeholder="Search users, agencies, documents, orders, invoices..."
            className={`bg-transparent border-none text-xs w-full ml-2 outline-none font-semibold placeholder-slate-400 ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}
          />
          <kbd
            className={`px-2 py-0.5 border text-[10px] font-semibold rounded-md shadow-2xs ${
              isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-300' : 'bg-white border-slate-200 text-slate-400'
            }`}
          >
            ⌘F
          </kbd>
        </div>

        {/* Search Dropdown Placeholder */}
        {isSearchFocused && (
          <div
            className={`absolute left-0 top-14 w-[560px] rounded-3xl border-2 shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-200 ${
              isDarkMode ? 'bg-[#121215] border-[#27272a] text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2.5 mb-2.5 border-b border-slate-100 dark:border-zinc-800">
              {['All', 'Users', 'Agencies', 'Documents', 'Invoices', 'Orders'].map(cat => (
                <button
                  key={cat}
                  className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                    cat === 'All'
                      ? 'bg-blue-500 text-white shadow-md shadow-blue-500/30'
                      : isDarkMode
                      ? 'bg-[#18181b] text-slate-400 border border-zinc-800'
                      : 'bg-slate-100 text-slate-600 border border-slate-200/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="py-4 text-center text-xs text-slate-400 font-medium">Type to search...</div>
          </div>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 lg:gap-4">
        <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-blue-200 dark:border-blue-800/60 bg-blue-50/50 dark:bg-blue-950/30 text-blue-500 dark:text-blue-400 hover:bg-blue-500 hover:text-white transition-all text-xs font-semibold cursor-pointer shadow-2xs">
          <span className="material-symbols-outlined text-[18px]">help</span>
          <span>Support</span>
        </button>

        <button
          onClick={toggleDarkMode}
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer ${
            isDarkMode
              ? 'bg-[#18181b] border-[#27272a] text-amber-400 hover:bg-zinc-800'
              : 'bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        <div ref={notifRef} className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all shadow-2xs relative cursor-pointer hover:scale-105 active:scale-95 ${
              isDarkMode
                ? 'bg-[#18181b] border-[#27272a] text-slate-300'
                : 'bg-white border-slate-200/80 text-slate-600'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-blue-500 rounded-full ring-2 ring-white dark:ring-[#121215]"></span>
          </button>
          
          {isNotificationsOpen && (
            <div className={`absolute right-0 top-14 w-80 rounded-3xl border-2 shadow-2xl p-4 z-50 ${isDarkMode ? 'bg-[#121215] border-[#27272a] text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
              <div className="font-semibold text-sm mb-3 pb-3 border-b dark:border-zinc-800">Notifications</div>
              <div className="text-xs text-slate-400 text-center py-4">No new notifications</div>
            </div>
          )}
        </div>

        <div ref={profileRef} className="relative">
          <div
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 pl-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shadow-sm ring-2 ring-blue-500/20 group-hover:ring-blue-500/60 transition-all">
              CA
            </div>
            <div className="text-left hidden lg:block">
              <div className={`text-xs font-bold leading-tight flex items-center gap-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                <span>Chris Anderson</span>
                <span className="material-symbols-outlined text-[16px] text-slate-400 group-hover:text-blue-500 transition-colors">
                  expand_more
                </span>
              </div>
              <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-0.5">Master Administrator</div>
            </div>
          </div>

          {isProfileOpen && (
            <div className={`absolute right-0 top-14 w-64 rounded-3xl border-2 shadow-2xl p-4 z-50 ${isDarkMode ? 'bg-[#121215] border-[#27272a] text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
              <div className="space-y-1">
                <button className="w-full text-left px-3 py-2 text-xs font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors">View Profile</button>
                <button className="w-full text-left px-3 py-2 text-xs font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors">System Preferences</button>
                <button className="w-full text-left px-3 py-2 text-xs font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors" onClick={toggleDarkMode}>Toggle Theme</button>
                <div className="h-px bg-slate-200 dark:bg-zinc-800 my-2"></div>
                <button className="w-full text-left px-3 py-2 text-xs font-semibold rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors">Sign Out</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
