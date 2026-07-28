import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';

interface AchievementsPageProps {
  onItemClick: (item: { title: string; subtitle: string; icon?: string; badge?: string }) => void;
}

export const AchievementsPage: React.FC<AchievementsPageProps> = ({ onItemClick }) => {
  const achievements = [
    {
      id: 'ach-1',
      title: 'NMT Master',
      icon: 'psychology',
      desc: 'BLEU accuracy > 98% across 50 AI-evaluated tasks.',
      badge: 'AI EVALUATED',
      unlocked: true,
      progress: 100,
      unlockedDate: 'Jul 2026',
      aiEvaluated: true,
    },
    {
      id: 'ach-2',
      title: 'Speed Demon',
      icon: 'bolt',
      desc: 'Translated 5,000+ words in 24 hours.',
      badge: 'UNLOCKED',
      unlocked: true,
      progress: 100,
      unlockedDate: 'Jun 2026',
      aiEvaluated: false,
    },
    {
      id: 'ach-3',
      title: 'Terminology Titan',
      icon: 'menu_book',
      desc: 'Contributed 100+ approved terminology entries.',
      badge: 'IN PROGRESS',
      unlocked: false,
      progress: 82,
      currentCount: '82 / 100 entries',
      aiEvaluated: false,
    },
    {
      id: 'ach-4',
      title: 'Sworn Legal Specialist',
      icon: 'gavel',
      desc: 'Passed Court Sworn Credentialing Exam.',
      badge: 'UNLOCKED',
      unlocked: true,
      progress: 100,
      unlockedDate: 'May 2026',
      aiEvaluated: true,
    },
    {
      id: 'ach-5',
      title: 'Zero Defect QA Streak',
      icon: 'verified',
      desc: '50 consecutive tasks delivered without QA revisions.',
      badge: 'IN PROGRESS',
      unlocked: false,
      progress: 90,
      currentCount: '45 / 50 tasks',
      aiEvaluated: true,
    },
    {
      id: 'ach-6',
      title: 'Multilingual Virtuoso',
      icon: 'translate',
      desc: 'Active sworn certifications across 5 language pairs.',
      badge: 'UNLOCKED',
      unlocked: true,
      progress: 100,
      unlockedDate: 'Apr 2026',
      aiEvaluated: false,
    },
    {
      id: 'ach-7',
      title: 'Medical Precision Expert',
      icon: 'medication',
      desc: 'Translated 100,000+ words in Life Sciences.',
      badge: 'UNLOCKED',
      unlocked: true,
      progress: 100,
      unlockedDate: 'Mar 2026',
      aiEvaluated: true,
    },
    {
      id: 'ach-8',
      title: '24-Hour Express Sprint',
      icon: 'rocket_launch',
      desc: 'Delivered urgent sworn patent in under 12 hours.',
      badge: 'UNLOCKED',
      unlocked: true,
      progress: 100,
      unlockedDate: 'Feb 2026',
      aiEvaluated: false,
    },
  ];

  return (
    <div className="space-y-8 animate-page-enter">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Achievements &amp; Rank</h1>
            <span className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
              AI CERTIFIED
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Translator milestones, AI quality badges, and rank progression.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-white dark:bg-[#18181b] border-2 border-slate-200 dark:border-zinc-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">military_tech</span>
            </div>
            <div>
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">CURRENT RANK</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Level 8 Master Translator</div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Evaluation Performance Banner */}
      <Card hoverable={false} interactive={false} className="p-6 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-700 text-white border-2 border-blue-400">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[24px] text-amber-300">auto_awesome</span>
              <h3 className="text-xl font-bold">Lexi AI Quality Score: 99.4%</h3>
            </div>
            <p className="text-xs text-blue-100 max-w-2xl">
              Evaluated against ISO-17100 compliance, BLEU accuracy, and terminology consistency.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto">
            <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md">
              <div className="text-[10px] uppercase font-semibold text-blue-100">BLEU Benchmark</div>
              <div className="text-xl font-bold mt-0.5">99.1</div>
            </div>
            <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md">
              <div className="text-[10px] uppercase font-semibold text-blue-100">Consistency</div>
              <div className="text-xl font-bold mt-0.5">99.8%</div>
            </div>
            <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md">
              <div className="text-[10px] uppercase font-semibold text-blue-100">Style &amp; Flow</div>
              <div className="text-xl font-bold mt-0.5">98.8%</div>
            </div>
            <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md">
              <div className="text-[10px] uppercase font-semibold text-blue-100">QA Streak</div>
              <div className="text-xl font-bold mt-0.5">45 Tasks</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.map((item) => (
          <Card
            key={item.id}
            onClick={() =>
              onItemClick({
                title: item.title,
                subtitle: `${item.desc} ${item.unlocked ? `Unlocked in ${item.unlockedDate}` : item.currentCount}`,
                badge: item.badge,
              })
            }
            className={`p-6 cursor-pointer float-hover hover-rise flex flex-col justify-between ${
              !item.unlocked && 'opacity-85'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    item.unlocked
                      ? item.aiEvaluated
                        ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg'
                        : 'bg-amber-500/10 text-amber-500'
                      : 'bg-slate-100 dark:bg-zinc-800 text-slate-400'
                  }`}
                >
                  <span className="material-symbols-outlined text-[28px]">{item.icon}</span>
                </div>

                <div className="flex items-center gap-1">
                  {item.aiEvaluated && (
                    <span className="text-[9px] font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-2 py-0.5 rounded-full uppercase">
                      AI
                    </span>
                  )}
                  <Badge variant={item.unlocked ? 'success' : 'warning'}>{item.badge}</Badge>
                </div>
              </div>

              <h3 className="font-bold text-base mb-1">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{item.desc}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-zinc-800/80">
              {item.unlocked ? (
                <div className="flex justify-between items-center text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <span>UNLOCKED</span>
                  <span>{item.unlockedDate}</span>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-semibold text-slate-400">
                    <span>PROGRESS</span>
                    <span>{item.currentCount}</span>
                  </div>
                  <ProgressBar progress={item.progress} height="h-1.5" barColor="bg-blue-400" />
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
