import React, { useState, useRef, useEffect } from 'react';
import { InteractiveModal } from './InteractiveModal';

interface HeaderProps {
  onLoginClick?: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
  isCollapsed?: boolean;
  onSelectTab?: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onLoginClick,
  isDarkMode,
  toggleDarkMode,
  searchQuery = '',
  setSearchQuery,
  isCollapsed = false,
  onSelectTab,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [unreadCount, setUnreadCount] = useState<number>(3);
  const [selectedSearchCategory, setSelectedSearchCategory] = useState<string>('All');

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Global Courier Search Database
  const globalDatabase = [
    // Deliveries
    { title: 'Translation Accuracy — Return Delivery', type: 'Delivery', category: 'Deliveries', tab: 'deliveries', icon: 'local_shipping', color: 'text-blue-500', desc: 'Courier return delivery to requester • Updated Jul 17' },
    { title: 'Document — Salman Younus', type: 'Delivery', category: 'Deliveries', tab: 'deliveries', icon: 'description', color: 'text-amber-500', desc: 'Waiting for notary time • General delivery' },
    { title: 'Document — Bradley Carter', type: 'Delivery', category: 'Deliveries', tab: 'deliveries', icon: 'description', color: 'text-amber-500', desc: 'Waiting for notary response • General delivery' },
    { title: 'Document — Cullen Vega', type: 'Delivery', category: 'Deliveries', tab: 'deliveries', icon: 'upload_file', color: 'text-blue-500', desc: 'Upload final document • Notary confirmed for Jul 24' },
    { title: 'Document — Kane Wiggins', type: 'Delivery', category: 'Deliveries', tab: 'deliveries', icon: 'priority_high', color: 'text-rose-500', desc: 'Upload document or request notary • General delivery' },
    
    // Routes
    { title: 'Smart Route Optimizer', type: 'Route', category: 'Routes', tab: 'smart-route', icon: 'route', color: 'text-blue-500', desc: 'AI-optimized routes with live traffic analysis' },
    { title: 'Midtown Manhattan Hotzone', type: 'Route', category: 'Routes', tab: 'live-tracking', icon: 'location_on', color: 'text-rose-500', desc: 'Surge demand — $28/hr average' },
    { title: 'Financial District Route', type: 'Route', category: 'Routes', tab: 'live-tracking', icon: 'location_on', color: 'text-amber-500', desc: 'High demand zone — $24/hr average' },
    
    // Earnings
    { title: 'Weekly Earnings Goal', type: 'Earnings', category: 'Earnings', tab: 'earnings', icon: 'savings', color: 'text-emerald-500', desc: '$542 of $800 goal • $258 remaining' },
    { title: 'Work Tuesday 10 AM - 2 PM', type: 'Earnings', category: 'Earnings', tab: 'earnings', icon: 'access_time', color: 'text-blue-500', desc: 'AI suggestion +$85 potential • 92% confidence' },
    { title: 'Focus on Midtown Manhattan', type: 'Earnings', category: 'Earnings', tab: 'earnings', icon: 'location_on', color: 'text-amber-500', desc: 'AI hotspot detected +$120 potential • 88% confidence' },
    
    // Achievements
    { title: 'First Delivery Achievement', type: 'Achievement', category: 'Achievements', tab: 'achievements', icon: 'task_alt', color: 'text-emerald-500', desc: 'Unlocked • 100 XP earned' },
    { title: 'Speed Demon Progress', type: 'Achievement', category: 'Achievements', tab: 'achievements', icon: 'local_fire_department', color: 'text-blue-500', desc: '7/10 deliveries under 20 min • 70% complete' },
    { title: 'Weekly Champion', type: 'Achievement', category: 'Achievements', tab: 'achievements', icon: 'emoji_events', color: 'text-emerald-500', desc: 'Unlocked • 500 XP earned' },
    
    // Settings
    { title: 'Vehicle Information', type: 'Settings', category: 'Settings', tab: 'settings', icon: 'directions_car', color: 'text-blue-500', desc: 'Honda Civic 2022 • Plate ABC-1234' },
    { title: 'Location Tracking', type: 'Settings', category: 'Settings', tab: 'settings', icon: 'location_on', color: 'text-emerald-500', desc: 'Real-time GPS tracking enabled' },
    { title: 'Payment Information', type: 'Settings', category: 'Settings', tab: 'settings', icon: 'payment', color: 'text-blue-500', desc: 'Direct deposit configured' },
  ];

  const searchCategories = ['All', 'Deliveries', 'Routes', 'Earnings', 'Achievements', 'Settings'];

  const filteredSearch = globalDatabase.filter(item => {
    const matchesCategory = selectedSearchCategory === 'All' || item.category === selectedSearchCategory;
    const matchesQuery = searchQuery.trim() === ''
      ? true
      : item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const displayedResults = searchQuery.trim() === '' && selectedSearchCategory === 'All'
    ? globalDatabase.slice(0, 6)
    : filteredSearch;

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Delivery Assigned', desc: 'Document delivery for Cullen Vega — pickup ready', time: '10m ago', icon: 'local_shipping', read: false },
    { id: 2, title: 'Weekly Bonus Unlocked', desc: 'You earned a $50 tier bonus this week!', time: '1h ago', icon: 'emoji_events', read: false },
    { id: 3, title: 'Route Optimized', desc: 'AI saved you 12 minutes on your last route', time: '3h ago', icon: 'route', read: false },
    { id: 4, title: 'Achievement Unlocked', desc: 'Weekly Champion — 500 XP earned', time: 'Yesterday', icon: 'workspace_premium', read: true },
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
      {/* Universal Search Input Container */}
      <div ref={searchRef} className="relative">
        <div
          className={`flex items-center rounded-2xl px-4 py-2.5 w-[500px] border transition-all ${
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
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            placeholder="Search deliveries, routes, earnings, achievements, or settings..."
            className={`bg-transparent border-none text-xs w-full ml-2 outline-none font-semibold placeholder-slate-400 ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery && setSearchQuery('')}
              className="text-slate-400 hover:text-slate-200 text-xs font-semibold"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          ) : (
            <kbd
              className={`px-2 py-0.5 border text-[10px] font-semibold rounded-md shadow-2xs ${
                isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-300' : 'bg-white border-slate-200 text-slate-400'
              }`}
            >
              ⌘F
            </kbd>
          )}
        </div>

        {/* Global Instant Search Dropdown */}
        {isSearchFocused && (
          <div
            className={`absolute left-0 top-14 w-[560px] rounded-3xl border-2 shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-200 ${
              isDarkMode ? 'bg-[#121215] border-[#27272a] text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2.5 mb-2.5 border-b border-slate-100 dark:border-zinc-800">
              {searchCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedSearchCategory(cat)}
                  className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                    selectedSearchCategory === cat
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : isDarkMode
                      ? 'bg-[#18181b] text-slate-400 hover:text-white border border-zinc-800'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-2 py-1 flex justify-between items-center">
              <span>{searchQuery ? `SEARCH RESULTS FOR "${searchQuery}"` : 'RECOMMENDED ITEMS'}</span>
              <span>{displayedResults.length} MATCHES</span>
            </div>

            <div className="space-y-1.5 mt-2 max-h-96 overflow-y-auto pr-1">
              {displayedResults.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 font-medium">
                  No matching deliveries, routes, or items found for "{searchQuery}".
                </div>
              ) : (
                displayedResults.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (onSelectTab) onSelectTab(item.tab);
                      setIsSearchFocused(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer text-left border ${
                      isDarkMode ? 'border-zinc-800/60 hover:bg-[#18181b] hover:border-blue-500/50' : 'border-slate-100 hover:bg-slate-50 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`w-10 h-10 rounded-2xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 ${item.color}`}>
                        <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="font-semibold text-xs truncate">{item.title}</div>
                          <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-blue-600/10 text-blue-500 uppercase tracking-wider shrink-0">
                            {item.type}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium truncate mt-0.5">{item.desc}</div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 text-[18px] shrink-0 ml-2">arrow_forward</span>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Header Right Actions */}
      <div className="flex items-center gap-4">
        {/* Help Modal Button */}
        <button
          onClick={() => setIsHelpOpen(true)}
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer ${
            isDarkMode
              ? 'bg-[#18181b] border-[#27272a] text-slate-300 hover:bg-zinc-800'
              : 'bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50'
          }`}
          title="Courier Support & Help Center"
        >
          <span className="material-symbols-outlined text-[20px]">help</span>
        </button>

        {/* Dark Mode Toggle Button */}
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

        {/* Notifications Dropdown Container */}
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

          {/* Notifications Dropdown Panel */}
          {isNotificationsOpen && (
            <div
              className={`absolute right-0 top-14 w-96 rounded-3xl border-2 shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-200 ${
                isDarkMode ? 'bg-[#121215] border-[#27272a] text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm">Notifications</h4>
                  {unreadCount > 0 && (
                    <span className="bg-blue-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      {unreadCount} NEW
                    </span>
                  )}
                </div>
                <button
                  onClick={markAllRead}
                  className="text-[10px] font-semibold text-blue-500 hover:underline cursor-pointer"
                >
                  Mark all read
                </button>
              </div>

              <div className="space-y-2 mt-3 max-h-80 overflow-y-auto pr-1">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 rounded-2xl border transition-all ${
                      !n.read
                        ? isDarkMode
                          ? 'bg-blue-900/20 border-blue-500/30'
                          : 'bg-blue-50/70 border-blue-200'
                        : isDarkMode
                        ? 'bg-[#18181b] border-zinc-800 opacity-70'
                        : 'bg-slate-50 border-slate-100 opacity-70'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-600/10 text-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[18px]">{n.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h5 className="font-semibold text-xs leading-tight">{n.title}</h5>
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

        {/* User Account Profile Dropdown Container */}
        <div ref={profileRef} className="relative">
          <div
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 pl-2 cursor-pointer group"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm shadow-sm ring-2 ring-blue-500/20 group-hover:ring-blue-500/60 transition-all">
                DC
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-[#121215]"></span>
            </div>
            <div className="text-left hidden lg:block">
              <div className={`text-xs font-semibold leading-tight flex items-center gap-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                <span>Demo Courier User</span>
                <span className="material-symbols-outlined text-[16px] text-slate-400 group-hover:text-blue-500 transition-colors">
                  {isProfileOpen ? 'expand_less' : 'expand_more'}
                </span>
              </div>
              <div className="text-[10px] font-semibold text-blue-500">Verified Courier</div>
            </div>
          </div>

          {/* User Account Profile Dropdown Panel */}
          {isProfileOpen && (
            <div
              className={`absolute right-0 top-14 w-72 rounded-3xl border-2 shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-200 ${
                isDarkMode ? 'bg-[#121215] border-[#27272a] text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {/* Account Header */}
              <div className="flex items-center gap-3 pb-4 mb-3 border-b border-slate-100 dark:border-zinc-800">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-lg ring-2 ring-blue-500">
                  DC
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm truncate">Demo Courier User</div>
                  <div className="text-[10px] text-slate-400 font-semibold truncate">courier@lexiverba.ai</div>
                  <span className="inline-block mt-1 bg-blue-600/10 text-blue-500 text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase">
                    VERIFIED
                  </span>
                </div>
              </div>

              {/* Menu Items */}
              <div className="space-y-1">
                <button
                  onClick={() => {
                    if (onSelectTab) onSelectTab('performance');
                    setIsProfileOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                    isDarkMode ? 'hover:bg-[#18181b] text-slate-200' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px] text-blue-500">person</span>
                  <span>View Profile &amp; Performance</span>
                </button>

                <button
                  onClick={() => {
                    if (onSelectTab) onSelectTab('settings');
                    setIsProfileOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                    isDarkMode ? 'hover:bg-[#18181b] text-slate-200' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px] text-blue-500">settings</span>
                  <span>Courier Preferences</span>
                </button>

                <button
                  onClick={() => {
                    toggleDarkMode();
                  }}
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
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300">
                    {isDarkMode ? 'DARK' : 'LIGHT'}
                  </span>
                </button>

                <div className="pt-2 mt-2 border-t border-slate-100 dark:border-zinc-800">
                  <button
                    onClick={() => {
                      if (onLoginClick) onLoginClick();
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">logout</span>
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Courier Support Help InteractiveModal */}
      <InteractiveModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        title="Courier Help & Support Center"
        isDarkMode={isDarkMode}
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-400 font-medium">Need immediate assistance with a delivery, route, or notary appointment?</p>
          
          <div className="space-y-2.5">
            <div className={`p-3.5 rounded-2xl border flex items-center justify-between ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-blue-500">support_agent</span>
                <div>
                  <div className="font-semibold text-xs">Live Dispatch Hotline</div>
                  <div className="text-[10px] text-slate-400">Available 24/7 for urgent delivery issues</div>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[10px] rounded-xl cursor-pointer">
                Call Now
              </button>
            </div>

            <div className={`p-3.5 rounded-2xl border flex items-center justify-between ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-emerald-500">gavel</span>
                <div>
                  <div className="font-semibold text-xs">Notary Appointment Desk</div>
                  <div className="text-[10px] text-slate-400">Reschedule or confirm notary arrival</div>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[10px] rounded-xl cursor-pointer">
                Message
              </button>
            </div>
          </div>
        </div>
      </InteractiveModal>
    </header>
  );
};
