import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

interface TasksPageProps {
  onItemClick: (item: { title: string; subtitle: string; icon?: string; badge?: string }) => void;
  onOpenWorkbenchClick: (taskName: string) => void;
}

export const TasksPage: React.FC<TasksPageProps> = ({ onItemClick, onOpenWorkbenchClick }) => {
  const [filter, setFilter] = useState<string>('all');

  const tasks = [
    {
      id: 'TSK-8042',
      title: 'EU Patent Specification - Medical Robotics',
      client: 'Bancorp SA',
      language: 'DE → EN',
      words: 4550,
      payout: '$546.00',
      due: 'Today, 18:00',
      priority: 'Urgent',
      status: 'in_progress',
      category: 'Patents',
    },
    {
      id: 'TSK-8043',
      title: 'Clinical Trial Phase III Informed Consent Form',
      client: 'Helios Pharma Ltd',
      language: 'FR → EN',
      words: 8200,
      payout: '$984.00',
      due: 'Tomorrow, 12:00',
      priority: 'High',
      status: 'in_progress',
      category: 'Medical',
    },
    {
      id: 'TSK-8044',
      title: 'Annual Financial Audit Statement 2026',
      client: 'Popescu & Associates',
      language: 'ES → EN',
      words: 3100,
      payout: '$372.00',
      due: 'Jul 30, 2026',
      priority: 'Normal',
      status: 'pending',
      category: 'Financial',
    },
    {
      id: 'TSK-8045',
      title: 'Articles of Incorporation Sworn Notarial Deed',
      client: 'Quantum Dynamics',
      language: 'DE → EN',
      words: 2800,
      payout: '$392.00',
      due: 'Aug 02, 2026',
      priority: 'Normal',
      status: 'reviewing',
      category: 'Legal',
    },
    {
      id: 'TSK-8046',
      title: 'SaaS Platform Localization Strings (i18n JSON)',
      client: 'Arc Company',
      language: 'ZH → EN',
      words: 6400,
      payout: '$768.00',
      due: 'Aug 05, 2026',
      priority: 'Normal',
      status: 'pending',
      category: 'Software',
    },
    {
      id: 'TSK-8047',
      title: 'Cross-Border Commercial Dispute Brief',
      client: 'Vanguard Legal Group',
      language: 'ES → EN',
      words: 11200,
      payout: '$1,344.00',
      due: 'Aug 10, 2026',
      priority: 'High',
      status: 'pending',
      category: 'Legal',
    },
  ];

  const allCount = tasks.length;
  const inProgressCount = tasks.filter((t) => t.status === 'in_progress').length;
  const urgentCount = tasks.filter((t) => t.priority === 'Urgent').length;
  const pendingCount = tasks.filter((t) => t.status === 'pending').length;
  const reviewingCount = tasks.filter((t) => t.status === 'reviewing').length;

  const filterTabs = [
    { id: 'all', label: `All Tasks (${allCount})` },
    { id: 'in_progress', label: `In Progress (${inProgressCount})` },
    { id: 'urgent', label: `Urgent (${urgentCount})` },
    { id: 'pending', label: `Pending (${pendingCount})` },
    { id: 'reviewing', label: `Reviewing (${reviewingCount})` },
  ];

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'urgent') return t.priority === 'Urgent';
    if (filter === 'in_progress') return t.status === 'in_progress';
    if (filter === 'pending') return t.status === 'pending';
    if (filter === 'reviewing') return t.status === 'reviewing';
    return true;
  });

  return (
    <div className="space-y-8 animate-page-enter">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Tasks</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Translation work queue and target deadlines.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                filter === tab.id
                  ? 'bg-blue-400 text-white shadow-md shadow-blue-400/30'
                  : 'bg-white dark:bg-[#18181b] border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Card-Row Stack Pattern */}
      <div className="space-y-4">
        {filteredTasks.map((t) => (
          <div
            key={t.id}
            onClick={() =>
              onItemClick({
                title: t.title,
                subtitle: `${t.client} • Category: ${t.category} • ${t.words.toLocaleString()} words • Payout: ${t.payout} • Due: ${t.due}`,
                badge: t.status,
              })
            }
            className="p-5 rounded-[2rem] border-2 border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-[#18181b] float-hover hover-rise cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-blue-400/10 text-blue-400 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">assignment</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-slate-900 dark:text-white hover:text-blue-400 transition-colors">
                    {t.title}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                  {t.id} • {t.client} • {t.category}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0 justify-between md:justify-end">
              <span className="font-semibold text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full text-xs">
                {t.language}
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">{t.words.toLocaleString()} words</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-xs">{t.payout}</span>
              <Badge variant={t.priority === 'Urgent' ? 'danger' : t.priority === 'High' ? 'warning' : 'neutral'}>
                {t.priority}
              </Badge>
              <Badge status={t.status}>{t.status}</Badge>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenWorkbenchClick(t.title);
                }}
                className="px-3.5 py-1.5 bg-blue-400 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-2xs transition-all flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">translate</span>
                <span>Workbench</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
