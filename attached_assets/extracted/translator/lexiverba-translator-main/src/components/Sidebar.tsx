import React from 'react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isDarkMode: boolean;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  isDarkMode,
  isCollapsed,
  toggleCollapse,
}) => {
  const mainNav = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'projects', label: 'My Projects', icon: 'folder_open', badge: '5' },
    { id: 'tasks', label: 'My Tasks', icon: 'assignment', badge: '6' },
    { id: 'in_progress', label: 'In Progress', icon: 'sync', badge: '2' },
    { id: 'completed', label: 'Completed', icon: 'task_alt' },
    { id: 'achievements', label: 'Achievements', icon: 'emoji_events', badge: 'AI', isAiBadge: true },
    { id: 'languages', label: 'Languages', icon: 'translate', badge: '5 Pairs' },
    { id: 'performance', label: 'Performance', icon: 'monitoring' },
    { id: 'certification', label: 'Certification Settings', icon: 'verified' },
  ];

  const generalNav = [
    { id: 'settings', label: 'Settings', icon: 'settings' },
    { id: 'help', label: 'Help', icon: 'help' },
    { id: 'login', label: 'Logout', icon: 'logout' },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-full border-r-2 z-50 flex flex-col justify-between transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20 p-3' : 'w-72 p-6'
      } ${
        isDarkMode ? 'bg-[#121215] border-[#27272a] text-slate-100' : 'bg-white border-slate-200/80 text-slate-900'
      }`}
    >
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
        {/* Top Logo & Collapse Toggle */}
        <div
          className={`flex mb-6 shrink-0 transition-all ${
            isCollapsed
              ? 'flex-col items-center gap-3 px-0'
              : 'flex-row items-center justify-between px-2'
          }`}
        >
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
            <div className="w-10 h-10 bg-blue-400 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-400/30 shrink-0">
              <span className="material-symbols-outlined text-[24px]">translate</span>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className={`font-semibold text-xl tracking-tight leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  LexiVerba
                </span>
                <span className="text-[9px] font-semibold text-blue-400 uppercase tracking-widest mt-1">
                  Translator Portal
                </span>
              </div>
            )}
          </div>

          {/* Minimize / Maximize Toggle Button */}
          <button
            onClick={toggleCollapse}
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all shadow-sm cursor-pointer hover:scale-110 active:scale-95 shrink-0 ${
              isDarkMode
                ? 'bg-[#18181b] border-zinc-700 text-slate-300 hover:bg-zinc-800 hover:text-white'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-white hover:text-slate-900'
            }`}
            title={isCollapsed ? 'Maximize Sidebar (Expand)' : 'Minimize Sidebar (Collapse)'}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isCollapsed ? 'chevron_right' : 'chevron_left'}
            </span>
          </button>
        </div>

        {/* Navigation Groups */}
        <div className="space-y-5 flex-1 pr-1">
          {/* MAIN NAVIGATION Group */}
          <div>
            {!isCollapsed && (
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.2em] px-3 mb-2.5">
                MAIN NAVIGATION
              </div>
            )}
            <div className="space-y-1">
              {mainNav.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTab(item.id)}
                    title={isCollapsed ? item.label : undefined}
                    className={`w-full flex items-center ${
                      isCollapsed ? 'justify-center py-2.5' : 'justify-between px-3.5 py-2.5'
                    } rounded-2xl font-semibold transition-all text-xs relative group cursor-pointer ${
                      isActive
                        ? isDarkMode
                          ? 'bg-[#1e1e24] text-white font-semibold shadow-sm'
                          : 'bg-slate-100 text-slate-900 font-semibold shadow-2xs'
                        : isDarkMode
                        ? 'text-slate-400 hover:bg-[#18181c] hover:text-white'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {/* Active Indicator Bar */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-blue-400 rounded-r-full shadow-sm shadow-blue-400/50"></span>
                    )}

                    <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : 'pl-1'}`}>
                      <span
                        className={`material-symbols-outlined text-[20px] transition-transform duration-200 group-hover:scale-110 ${
                          isActive
                            ? 'text-blue-400'
                            : isDarkMode
                            ? 'text-slate-500 group-hover:text-slate-300'
                            : 'text-slate-400 group-hover:text-slate-700'
                        }`}
                      >
                        {item.icon}
                      </span>
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </div>

                    {!isCollapsed && item.badge && (
                      <span
                        className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                          item.isAiBadge
                            ? 'bg-gradient-to-r from-blue-400 to-indigo-600 text-white shadow-xs'
                            : isActive
                            ? 'bg-blue-400 text-white'
                            : 'bg-slate-200/80 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* GENERAL Group */}
          <div>
            {!isCollapsed && (
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.2em] px-3 mb-2.5">
                GENERAL
              </div>
            )}
            <div className="space-y-1">
              {generalNav.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTab(item.id)}
                    title={isCollapsed ? item.label : undefined}
                    className={`w-full flex items-center ${
                      isCollapsed ? 'justify-center py-2.5' : 'justify-between px-3.5 py-2.5'
                    } rounded-2xl font-semibold transition-all text-xs relative group cursor-pointer ${
                      isActive
                        ? isDarkMode
                          ? 'bg-[#1e1e24] text-white font-semibold shadow-sm'
                          : 'bg-slate-100 text-slate-900 font-semibold shadow-2xs'
                        : isDarkMode
                        ? 'text-slate-400 hover:bg-[#18181c] hover:text-white'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-blue-400 rounded-r-full shadow-sm shadow-blue-400/50"></span>
                    )}

                    <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : 'pl-1'}`}>
                      <span
                        className={`material-symbols-outlined text-[20px] transition-transform duration-200 group-hover:scale-110 ${
                          isActive
                            ? 'text-blue-400'
                            : isDarkMode
                            ? 'text-slate-500 group-hover:text-slate-300'
                            : 'text-slate-400 group-hover:text-slate-700'
                        }`}
                      >
                        {item.icon}
                      </span>
                      {!isCollapsed && <span>{item.label}</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
