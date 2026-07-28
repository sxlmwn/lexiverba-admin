import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { MetricCard } from '../components/ui/MetricCard';

interface CompletedPageProps {
  onItemClick: (item: { title: string; subtitle: string; icon?: string; badge?: string }) => void;
}

export const CompletedPage: React.FC<CompletedPageProps> = ({ onItemClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const completedList = [
    {
      id: 'TSK-7991',
      title: 'EU Privacy Compliance Framework v4',
      client: 'Vanguard Legal Group',
      language: 'ES → EN',
      words: 14500,
      payout: '$1,740.00',
      deliveredAt: 'Jul 22, 2026',
      qaScore: '99.8%',
      bleuScore: '98.9',
      sworn: true,
    },
    {
      id: 'TSK-7988',
      title: 'Clean Energy Patent Specification & Claims',
      client: 'Equinor Innovation',
      language: 'DE → EN',
      words: 15200,
      payout: '$2,128.00',
      deliveredAt: 'Jul 18, 2026',
      qaScore: '99.5%',
      bleuScore: '98.4',
      sworn: true,
    },
    {
      id: 'TSK-7975',
      title: 'Global Oncology Trial Patient Information Sheet',
      client: 'Helios Pharma Ltd',
      language: 'FR → EN',
      words: 9800,
      payout: '$1,176.00',
      deliveredAt: 'Jul 14, 2026',
      qaScore: '99.2%',
      bleuScore: '97.8',
      sworn: false,
    },
    {
      id: 'TSK-7960',
      title: 'Software Localization Terms & Licensing Agreement',
      client: 'Arc Company',
      language: 'ZH → EN',
      words: 12400,
      payout: '$1,488.00',
      deliveredAt: 'Jul 08, 2026',
      qaScore: '99.6%',
      bleuScore: '98.2',
      sworn: false,
    },
    {
      id: 'TSK-7942',
      title: 'Sworn Articles of Incorporation Notarization',
      client: 'Bancorp SA',
      language: 'DE → EN',
      words: 8600,
      payout: '$1,204.00',
      deliveredAt: 'Jun 29, 2026',
      qaScore: '100%',
      bleuScore: '99.1',
      sworn: true,
    },
  ];

  const filteredCompleted = completedList.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-page-enter">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Completed Deliveries</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Archive of verified translation deliveries and quality metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-2xl px-3.5 py-2 bg-white dark:bg-[#18181b] border border-slate-200 dark:border-zinc-800 text-xs w-64">
            <span className="material-symbols-outlined text-slate-400 text-[18px] mr-2">search</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search deliveries..."
              className="bg-transparent border-none outline-none font-medium w-full text-slate-800 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Total Words Delivered"
          value="245,800"
          badge="Lifetime"
          icon="description"
        />
        <MetricCard
          title="Average QA Score"
          value="99.4%"
          badge="Top Tier"
          icon="verified"
        />
        <MetricCard
          title="Total Earnings"
          value="$29,496.00"
          badge="Verified"
          icon="payments"
        />
        <MetricCard
          title="On-Time Delivery Rate"
          value="100%"
          badge="Zero Delays"
          icon="schedule"
        />
      </div>

      {/* Completed Stack (Card-Row Pattern with hover-rise motion) */}
      <div className="space-y-4">
        {filteredCompleted.map((item) => (
          <div
            key={item.id}
            onClick={() =>
              onItemClick({
                title: item.title,
                subtitle: `${item.client} • Delivered: ${item.deliveredAt} • ${item.words.toLocaleString()} words • QA Score: ${item.qaScore} • BLEU: ${item.bleuScore}`,
                badge: 'Completed',
              })
            }
            className="p-5 rounded-[2rem] border-2 border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-[#18181b] float-hover hover-rise cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">task_alt</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-slate-900 dark:text-white hover:text-blue-500 transition-colors">
                    {item.title}
                  </span>
                  {item.sworn && (
                    <span className="text-[9px] font-semibold bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full uppercase">
                      SWORN
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                  {item.id} • {item.client} • {item.deliveredAt}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0 justify-between md:justify-end">
              <span className="font-semibold text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full text-xs">
                {item.language}
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">{item.words.toLocaleString()} words</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-xs">{item.payout}</span>
              <span className="font-semibold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full text-[10px]">
                {item.qaScore}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onItemClick({
                    title: `Download Package: ${item.title}`,
                    subtitle: `Delivered TMX and PDF bundle for ${item.client}`,
                    badge: 'Ready',
                  });
                }}
                className="px-3.5 py-1.5 bg-slate-100 dark:bg-zinc-800 hover:bg-blue-400 hover:text-white text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
