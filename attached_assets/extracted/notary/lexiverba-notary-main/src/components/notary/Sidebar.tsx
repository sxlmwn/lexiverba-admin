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
  const menuNav = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'pending', label: 'Pending', icon: 'hourglass_top', badge: '12' },
    { id: 'calendar', label: 'Calendar', icon: 'calendar_month' },
    { id: 'completed', label: 'Completed', icon: 'task_alt' },
    { id: 'achievements', label: 'Achievements', icon: 'emoji_events', badge: 'AI' },
  ];

  const generalNav = [
    { id: 'settings', label: 'Settings', icon: 'settings' },
    { id: 'help', label: 'Help', icon: 'help' },
    { id: 'logout', label: 'Logout', icon: 'logout' },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-full border-r-2 z-50 flex flex-col justify-between transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20 p-3' : 'w-72 p-6'
      } ${
        isDarkMode ? 'bg-[#121215] border-[#27272a] text-slate-100' : 'bg-white border-slate-200/80 text-slate-900'
      }`}
    >
      <div>
        <div className={`flex items-center justify-between mb-8 ${isCollapsed ? 'px-1' : 'px-2'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/30 shrink-0">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            {!isCollapsed && (
              <div className="transition-opacity duration-200">
                <div className={`font-extrabold text-2xl tracking-tight leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  LexiVerba
                </div>
                <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mt-1">
                  Notary Portal
                </div>
              </div>
            )}
          </div>

          <button
            onClick={toggleCollapse}
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all shadow-sm cursor-pointer hover:scale-110 active:scale-95 ${
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

        <div className="space-y-6">
          <div>
            {!isCollapsed && (
              <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] px-3 mb-3">
                MENU
              </div>
            )}
            <div className="space-y-1.5">
              {menuNav.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTab(item.id)}
                    title={isCollapsed ? item.label : undefined}
                    className={`w-full flex items-center ${
                      isCollapsed ? 'justify-center py-3' : 'justify-between px-3.5 py-3'
                    } rounded-2xl font-semibold transition-all text-xs relative group cursor-pointer ${
                      isActive
                        ? isDarkMode
                          ? 'bg-[#1e1e24] text-white font-bold shadow-sm'
                          : 'bg-slate-100 text-slate-900 font-bold shadow-2xs'
                        : isDarkMode
                        ? 'text-slate-400 hover:bg-[#18181c] hover:text-white'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-blue-600 rounded-r-full shadow-sm shadow-blue-500/50"></span>
                    )}

                    <div className={`flex items-center gap-3.5 ${isCollapsed ? 'justify-center' : 'pl-1'}`}>
                      <span
                        className={`material-symbols-outlined text-[22px] transition-transform duration-200 group-hover:scale-110 ${
                          isActive
                            ? 'text-blue-500'
                            : isDarkMode
                            ? 'text-slate-500 group-hover:text-slate-300'
                            : 'text-slate-400 group-hover:text-slate-700'
                        }`}
                      >
                        {item.icon}
                      </span>
                      {!isCollapsed && <span>{item.label}</span>}
                    </div>

                    {!isCollapsed && item.badge && (
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                          isActive
                            ? 'bg-blue-600 text-white'
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

          <div>
            {!isCollapsed && (
              <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] px-3 mb-3">
                GENERAL
              </div>
            )}
            <div className="space-y-1.5">
              {generalNav.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTab(item.id)}
                    title={isCollapsed ? item.label : undefined}
                    className={`w-full flex items-center ${
                      isCollapsed ? 'justify-center py-3' : 'justify-between px-3.5 py-3'
                    } rounded-2xl font-semibold transition-all text-xs relative group cursor-pointer ${
                      isActive
                        ? isDarkMode
                          ? 'bg-[#1e1e24] text-white font-bold shadow-sm'
                          : 'bg-slate-100 text-slate-900 font-bold shadow-2xs'
                        : isDarkMode
                        ? 'text-slate-400 hover:bg-[#18181c] hover:text-white'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-blue-600 rounded-r-full shadow-sm shadow-blue-500/50"></span>
                    )}

                    <div className={`flex items-center gap-3.5 ${isCollapsed ? 'justify-center' : 'pl-1'}`}>
                      <span
                        className={`material-symbols-outlined text-[22px] transition-transform duration-200 group-hover:scale-110 ${
                          isActive
                            ? 'text-blue-500'
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
