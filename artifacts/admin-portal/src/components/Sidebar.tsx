import React, { useState } from 'react';

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
    { id: 'dashboard', label: 'Dashboard', icon: 'grid_view' },
    { id: 'analytics', label: 'Analytics', icon: 'bar_chart', badge: 'NEW' },
    { id: 'nps_analytics', label: 'NPS Analytics', icon: 'sentiment_satisfied', badge: 'NEW' },
    { id: 'finance', label: 'Finance', icon: 'account_balance' },
    { id: 'pricing', label: 'Pricing', icon: 'sell' },
    { id: 'partner_applications', label: 'Partner Applications', icon: 'handshake' },
    { id: 'commissions', label: 'Commissions', icon: 'payments' },
    { id: 'referral_analytics', label: 'Referral Analytics', icon: 'share' },
    { id: 'agency_analytics', label: 'Agency Analytics', icon: 'corporate_fare' },
    { id: 'agency_invoices', label: 'Agency Invoices', icon: 'receipt_long' },
    { id: 'customer_orders', label: 'Customer Orders', icon: 'shopping_cart' },
    { id: 'customer_feedback', label: 'Customer Feedback', icon: 'forum' },
    { id: 'survey_campaigns', label: 'Survey Campaigns', icon: 'poll' },
    { id: 'workflow_builder', label: 'Workflow Builder', icon: 'account_tree' },
    { id: 'email_management', label: 'Email Management', icon: 'mail' },
    { id: 'translation_quality', label: 'Translation Quality', icon: 'verified' },
    { id: 'batch_operations', label: 'Batch Operations', icon: 'batch_prediction', badge: '4', isRedBadge: true },
    { id: 'report_builder', label: 'Report Builder', icon: 'analytics', badge: 'NEW' },
  ];

  const rolePortals = [
    { id: 'customer_portal', label: 'Customer Portal', icon: 'person' },
    { id: 'agency_portal', label: 'Agency Portal', icon: 'corporate_fare' },
    { id: 'qa_portal', label: 'QA Portal', icon: 'fact_check' },
    { id: 'translator_portal', label: 'Translator Portal', icon: 'translate' },
    { id: 'notary_portal', label: 'Notary Portal', icon: 'gavel' },
    { id: 'courier_portal', label: 'Courier Portal', icon: 'local_shipping' },
    { id: 'referral_partner_portal', label: 'Referral Partner Portal', icon: 'share' },
  ];

  // Component to render nav items
  const renderNavGroup = (items: typeof mainNav, title: string, isPortalGroup = false) => (
    <div className="mb-6">
      {!isCollapsed && (
        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.2em] px-3 mb-2.5">
          {title}
        </div>
      )}
      <div className="space-y-1">
        {items.map((item) => {
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
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-blue-500 rounded-r-full shadow-sm shadow-blue-500/50"></span>
              )}

              <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : 'pl-1'}`}>
                <span
                  className={`material-symbols-outlined text-[20px] transition-transform duration-200 group-hover:scale-110 ${
                    isActive
                      ? 'text-blue-500'
                      : isDarkMode
                      ? 'text-slate-500 group-hover:text-slate-300'
                      : 'text-slate-400 group-hover:text-slate-700'
                  }`}
                >
                  {item.icon}
                </span>
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </div>

              {!isCollapsed && item.badge && !isPortalGroup && (
                <span
                  className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                    item.isRedBadge
                      ? 'bg-rose-500 text-white'
                      : isActive
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-200/80 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
              
              {!isCollapsed && isPortalGroup && (
                <span className="material-symbols-outlined text-[16px] text-slate-400 group-hover:text-blue-500">
                  chevron_right
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <aside
      className={`fixed left-0 top-0 h-full border-r-2 z-50 flex flex-col justify-between transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20 p-3' : 'w-72 p-6'
      } ${
        isDarkMode ? 'bg-[#121215] border-[#27272a] text-slate-100' : 'bg-white border-slate-200/80 text-slate-900'
      }`}
    >
      <div className="flex-1 flex flex-col min-h-0">
        {/* Top Logo & Collapse Toggle */}
        <div
          className={`flex mb-8 shrink-0 transition-all ${
            isCollapsed
              ? 'flex-col items-center gap-3 px-0'
              : 'flex-row items-center justify-between px-2'
          }`}
        >
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/30 shrink-0">
              <span className="material-symbols-outlined text-[24px]">shield_person</span>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className={`font-bold text-xl tracking-tight leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  LexiVerba
                </span>
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-1">
                  Admin Portal
                </span>
              </div>
            )}
          </div>

          <button
            onClick={toggleCollapse}
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all shadow-sm cursor-pointer hover:scale-110 active:scale-95 shrink-0 ${
              isDarkMode
                ? 'bg-[#18181b] border-zinc-700 text-slate-300 hover:bg-zinc-800 hover:text-white'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-white hover:text-slate-900'
            }`}
            title={isCollapsed ? 'Maximize Sidebar' : 'Minimize Sidebar'}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isCollapsed ? 'chevron_right' : 'chevron_left'}
            </span>
          </button>
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 overflow-y-auto pr-2 pb-4 -mr-2">
          {renderNavGroup(mainNav, 'NAVIGATION')}
          {renderNavGroup(rolePortals, 'ROLE PORTALS', true)}
        </div>
      </div>
    </aside>
  );
};
