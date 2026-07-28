import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';

interface ProjectsPageProps {
  onItemClick: (item: { title: string; subtitle: string; icon?: string; badge?: string }) => void;
  onOpenWorkbenchClick: (projectName: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onItemClick, onOpenWorkbenchClick }) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'reviewing' | 'completed'>('all');

  const projects = [
    {
      id: 'PRJ-2026-01',
      title: 'Bancorp Corporate Governance Dossier',
      client: 'Bancorp SA',
      domain: 'Legal & Sworn',
      language: 'DE → EN',
      totalWords: 18500,
      translatedWords: 14200,
      progress: 76,
      deadline: 'Nov 30, 2026',
      status: 'in_progress',
      filesCount: 4,
      sworn: true,
    },
    {
      id: 'PRJ-2026-02',
      title: 'Helios Oncology Phase III Protocol',
      client: 'Helios Pharma Ltd',
      domain: 'Medical & Life Sciences',
      language: 'FR → EN',
      totalWords: 24000,
      translatedWords: 15600,
      progress: 65,
      deadline: 'Dec 05, 2026',
      status: 'in_progress',
      filesCount: 6,
      sworn: false,
    },
    {
      id: 'PRJ-2026-03',
      title: 'Quantum Cloud API Architecture Manual',
      client: 'Quantum Dynamics',
      domain: 'Software & Technical',
      language: 'ZH → EN',
      totalWords: 12400,
      translatedWords: 12400,
      progress: 100,
      deadline: 'Nov 20, 2026',
      status: 'reviewing',
      filesCount: 3,
      sworn: false,
    },
    {
      id: 'PRJ-2026-04',
      title: 'EU Privacy Directive Compliance',
      client: 'Vanguard Legal Group',
      domain: 'Legal',
      language: 'ES → EN',
      totalWords: 31000,
      translatedWords: 31000,
      progress: 100,
      deadline: 'Oct 15, 2026',
      status: 'completed',
      filesCount: 8,
      sworn: true,
    },
    {
      id: 'PRJ-2026-05',
      title: 'Nordic Clean Energy Patent Portfolio',
      client: 'Equinor Innovation',
      domain: 'Patents & Technical',
      language: 'DE → EN',
      totalWords: 15200,
      translatedWords: 15200,
      progress: 100,
      deadline: 'Sep 28, 2026',
      status: 'completed',
      filesCount: 5,
      sworn: true,
    },
  ];

  const allCount = projects.length;
  const activeCount = projects.filter((p) => p.status === 'in_progress').length;
  const reviewingCount = projects.filter((p) => p.status === 'reviewing').length;
  const completedCount = projects.filter((p) => p.status === 'completed').length;

  const filterTabs = [
    { id: 'all', label: `All Projects (${allCount})` },
    { id: 'active', label: `Active (${activeCount})` },
    { id: 'reviewing', label: `Reviewing (${reviewingCount})` },
    { id: 'completed', label: `Completed (${completedCount})` },
  ] as const;

  const filteredProjects = projects.filter((p) => {
    if (filter === 'active') return p.status === 'in_progress';
    if (filter === 'reviewing') return p.status === 'reviewing';
    if (filter === 'completed') return p.status === 'completed';
    return true;
  });

  return (
    <div className="space-y-8 animate-page-enter">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Projects</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Translation project packages assigned to your profile.
          </p>
        </div>

        {/* Dynamic Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((p) => (
          <Card
            key={p.id}
            onClick={() =>
              onItemClick({
                title: p.title,
                subtitle: `${p.client} • ${p.domain} • ${p.language} • ${p.translatedWords.toLocaleString()} / ${p.totalWords.toLocaleString()} words • Deadline: ${p.deadline}`,
                badge: p.status,
              })
            }
            className="p-6 cursor-pointer float-hover hover-rise flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono font-semibold text-slate-400">{p.id}</span>
                <div className="flex items-center gap-1.5">
                  {p.sworn && (
                    <span className="bg-emerald-500/10 text-emerald-500 text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase">
                      SWORN
                    </span>
                  )}
                  <Badge status={p.status}>{p.status}</Badge>
                </div>
              </div>

              <h3 className="font-semibold text-base mb-1 hover:text-blue-500 transition-colors">
                {p.title}
              </h3>
              <p className="text-xs text-slate-400 font-medium mb-4">{p.client} • {p.domain}</p>

              <div className="space-y-3 py-3 border-y border-slate-100 dark:border-zinc-800/80 mb-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium">Language Pair:</span>
                  <span className="font-semibold text-blue-500 dark:text-blue-400">{p.language}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium">Attached Files:</span>
                  <span className="font-semibold">{p.filesCount} documents</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium">Deadline:</span>
                  <span className="font-semibold text-amber-600 dark:text-amber-400">{p.deadline}</span>
                </div>
              </div>

              <div className="space-y-1.5 mb-6">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400 uppercase text-[10px] tracking-wider">PROJECT PROGRESS</span>
                  <span className="text-blue-400">{p.progress}%</span>
                </div>
                <ProgressBar progress={p.progress} height="h-2" barColor="bg-blue-400" />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-zinc-800/80">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  <span>Due {p.deadline}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenWorkbenchClick(p.title);
                  }}
                  className="px-3.5 py-1.5 bg-blue-400 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">edit_note</span>
                  <span>Workbench</span>
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
