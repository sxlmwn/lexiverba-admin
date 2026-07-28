import React, { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  onLoginClick?: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
  isCollapsed?: boolean;
  onSelectTab?: (tab: string) => void;
  onSupportClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onLoginClick,
  isDarkMode,
  toggleDarkMode,
  searchQuery = '',
  setSearchQuery,
  isCollapsed = false,
  onSelectTab,
  onSupportClick,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
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

  // Global Omnipresent Search Database covering Translator Portal
  const globalDatabase = [
    // Tasks
    { title: 'EU Patent Documentation TS-8042', type: 'Task', category: 'Tasks', tab: 'tasks', icon: 'description', color: 'text-blue-400', desc: '4,500 words • DE → EN • Sworn Certification Required' },
    { title: 'Clinical Trial Protocol TS-8043', type: 'Task', category: 'Tasks', tab: 'in_progress', icon: 'medication', color: 'text-emerald-500', desc: '8,200 words • FR → EN • In Progress (65% complete)' },
    { title: 'Financial Audit Report TS-8044', type: 'Task', category: 'Tasks', tab: 'tasks', icon: 'payments', color: 'text-amber-500', desc: '3,100 words • ES → EN • Due in 2 days' },
    { title: 'Software Localization Bundle TS-8045', type: 'Task', category: 'Tasks', tab: 'completed', icon: 'code', color: 'text-blue-400', desc: '12,400 words • ZH → EN • Completed & Delivered' },

    // Projects
    { title: 'Bancorp Legal Dossiers 2026', type: 'Project', category: 'Projects', tab: 'projects', icon: 'folder', color: 'text-blue-400', desc: 'Bancorp SA • 4 files • DE/EN Sworn' },
    { title: 'Helios Pharma Global Submissions', type: 'Project', category: 'Projects', tab: 'projects', icon: 'science', color: 'text-emerald-500', desc: 'Helios Pharma Ltd • 6 files • Medical & Regulatory' },
    { title: 'Quantum Tech API Specs', type: 'Project', category: 'Projects', tab: 'projects', icon: 'account_tree', color: 'text-purple-500', desc: 'Quantum Dynamics • Technical i18n' },

    // Languages
    { title: 'German to English (DE → EN)', type: 'Language Pair', category: 'Languages', tab: 'languages', icon: 'translate', color: 'text-blue-400', desc: 'Sworn Certified • 99.4% BLEU Benchmark • 3.5k w/day' },
    { title: 'Spanish to English (ES → EN)', type: 'Language Pair', category: 'Languages', tab: 'languages', icon: 'translate', color: 'text-blue-400', desc: 'ISO-17100 Certified • Legal & Commercial Specialization' },
    { title: 'French to English (FR → EN)', type: 'Language Pair', category: 'Languages', tab: 'languages', icon: 'translate', color: 'text-emerald-500', desc: 'Expert Level • Medical & Life Sciences' },

    // Certifications
    { title: 'Court Sworn Translator License', type: 'Certification', category: 'Certification', tab: 'certification', icon: 'verified_user', color: 'text-emerald-500', desc: 'Verified Active • Registration #ST-99124' },
    { title: 'ISO 17100:2015 Translator Credentials', type: 'Certification', category: 'Certification', tab: 'certification', icon: 'workspace_premium', color: 'text-blue-400', desc: 'Audited & Compliant • Valid thru Dec 2027' },
    { title: 'ISO 18587 NMT Post-Editing Certificate', type: 'Certification', category: 'Certification', tab: 'certification', icon: 'psychology', color: 'text-purple-500', desc: 'Neural Machine Translation Advanced Practitioner' },

    // Achievements
    { title: 'NMT Master Badge (BLEU > 98%)', type: 'Achievement', category: 'Achievements', tab: 'achievements', icon: 'military_tech', color: 'text-amber-500', desc: 'AI Evaluated • Top 1% Precision Tier' },
    { title: '50K Words Milestone', type: 'Achievement', category: 'Achievements', tab: 'achievements', icon: 'emoji_events', color: 'text-blue-400', desc: 'Unlocked July 2026' },
  ];

  const searchCategories = ['All', 'Tasks', 'Projects', 'Languages', 'Certification', 'Achievements'];

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
    { id: 1, title: 'New Task Assigned (TS-8042)', desc: 'Arc Company submitted 4,500 words (DE → EN)', time: '5m ago', icon: 'assignment', read: false },
    { id: 2, title: 'Sworn Stamp Approved', desc: 'Court notarization confirmed for Bancorp dossier', time: '45m ago', icon: 'verified', read: false },
    { id: 3, title: 'QA Score Released', desc: 'Your last submission scored 99.4% BLEU accuracy', time: '2h ago', icon: 'stars', read: false },
    { id: 4, title: 'Weekly Payout Processed', desc: '$1,480.00 transferred via Direct Deposit', time: 'Yesterday', icon: 'payments', read: true },
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
          className={`flex items-center rounded-2xl px-4 py-2.5 w-[460px] lg:w-[520px] border transition-all ${
            isSearchFocused
              ? isDarkMode
                ? 'bg-[#18181b] border-blue-400 shadow-lg shadow-blue-400/10'
                : 'bg-white border-blue-400 shadow-lg shadow-blue-400/10'
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
            placeholder="Search tasks, projects, language pairs, certifications, or achievements..."
            className={`bg-transparent border-none text-xs w-full ml-2 outline-none font-semibold placeholder-slate-400 ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery && setSearchQuery('')}
              className="text-slate-400 hover:text-slate-200 text-xs font-semibold cursor-pointer"
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

        {/* Global Omnipresent Instant Search Dropdown */}
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
                      ? 'bg-blue-400 text-white shadow-md shadow-blue-400/30'
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
              <span>{searchQuery ? `SEARCH RESULTS FOR "${searchQuery}"` : 'RECOMMENDED TRANSLATOR ASSETS'}</span>
              <span>{displayedResults.length} MATCHES</span>
            </div>

            <div className="space-y-1.5 mt-2 max-h-96 overflow-y-auto pr-1">
              {displayedResults.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 font-medium">
                  No matching tasks, language pairs, or certifications found for "{searchQuery}".
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
                      isDarkMode ? 'border-zinc-800/60 hover:bg-[#18181b] hover:border-blue-400/50' : 'border-slate-100 hover:bg-slate-50 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`w-10 h-10 rounded-2xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 ${item.color}`}>
                        <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="font-semibold text-xs truncate">{item.title}</div>
                          <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-blue-400/10 text-blue-400 uppercase tracking-wider shrink-0">
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
      <div className="flex items-center gap-3 lg:gap-4">
        {/* Support Button */}
        <button
          onClick={onSupportClick}
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-blue-200 dark:border-blue-800/60 bg-blue-50/50 dark:bg-blue-950/30 text-blue-400 dark:text-blue-300 hover:bg-blue-400 hover:text-white transition-all text-xs font-semibold cursor-pointer shadow-2xs"
        >
          <span className="material-symbols-outlined text-[18px]">help</span>
          <span>Support</span>
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
                ? 'bg-blue-400 text-white border-blue-400 shadow-md shadow-blue-400/30'
                : isDarkMode
                ? 'bg-[#18181b] border-[#27272a] text-slate-300 hover:bg-zinc-800'
                : 'bg-white border-slate-200/80 text-slate-600 hover:bg-slate-50'
            }`}
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-blue-400 rounded-full ring-2 ring-white dark:ring-[#121215] animate-ping"></span>
            )}
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-blue-400 rounded-full ring-2 ring-white dark:ring-[#121215]"></span>
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
                    <span className="bg-blue-400 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      {unreadCount} NEW
                    </span>
                  )}
                </div>
                <button
                  onClick={markAllRead}
                  className="text-[10px] font-semibold text-blue-400 hover:underline cursor-pointer"
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
                          ? 'bg-blue-900/20 border-blue-400/30'
                          : 'bg-blue-50/70 border-blue-200'
                        : isDarkMode
                        ? 'bg-[#18181b] border-zinc-800 opacity-70'
                        : 'bg-slate-50 border-slate-100 opacity-70'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-400/10 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
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
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120"
                alt="Elena Marin"
                className="w-10 h-10 rounded-full object-cover shadow-sm ring-2 ring-blue-400/20 group-hover:ring-blue-400/60 transition-all"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-[#121215]"></span>
            </div>
            <div className="text-left hidden lg:block">
              <div className={`text-xs font-semibold leading-tight flex items-center gap-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                <span>Elena Marin</span>
                <span className="material-symbols-outlined text-[16px] text-slate-400 group-hover:text-blue-400 transition-colors">
                  {isProfileOpen ? 'expand_less' : 'expand_more'}
                </span>
              </div>
              <div className="text-[10px] font-semibold text-blue-400">Certified Sworn Translator</div>
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
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120"
                  alt="Elena Marin"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-400"
                />
                <div className="min-w-0">
                  <div className="font-semibold text-sm truncate">Elena Marin</div>
                  <div className="text-[10px] text-slate-400 font-semibold truncate">elena.marin@lexiverba.ai</div>
                  <span className="inline-block mt-1 bg-emerald-600/10 text-emerald-500 text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase">
                    SWORN TRANSLATOR
                  </span>
                </div>
              </div>

              {/* Menu Items */}
              <div className="space-y-1">
                <button
                  onClick={() => {
                    if (onSelectTab) onSelectTab('certification');
                    setIsProfileOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                    isDarkMode ? 'hover:bg-[#18181b] text-slate-200' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px] text-blue-400">verified</span>
                  <span>Certifications &amp; Credentials</span>
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
                  <span className="material-symbols-outlined text-[20px] text-blue-400">settings</span>
                  <span>Translator Preferences</span>
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
                    <span className="material-symbols-outlined text-[20px] text-blue-400">
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
    </header>
  );
};
