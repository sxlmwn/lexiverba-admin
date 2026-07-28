import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';

interface LanguagesPageProps {
  onAddLanguageClick: () => void;
  onItemClick: (item: { title: string; subtitle: string; icon?: string; badge?: string }) => void;
}

export const LanguagesPage: React.FC<LanguagesPageProps> = ({ onAddLanguageClick, onItemClick }) => {
  const [pairs] = useState([
    {
      id: 'lp-1',
      source: 'German (DE)',
      target: 'English (EN)',
      native: true,
      sworn: true,
      isoCertified: true,
      rate: '$0.12 / word',
      wordsTranslated: '124,500 words',
      bleuScore: 99.4,
      status: 'active',
      specializations: ['Sworn Deeds', 'Patents & IP', 'Commercial Law'],
    },
    {
      id: 'lp-2',
      source: 'French (FR)',
      target: 'English (EN)',
      native: false,
      sworn: false,
      isoCertified: true,
      rate: '$0.12 / word',
      wordsTranslated: '68,200 words',
      bleuScore: 99.2,
      status: 'active',
      specializations: ['Medical & Life Sciences', 'Clinical Trials'],
    },
    {
      id: 'lp-3',
      source: 'Spanish (ES)',
      target: 'English (EN)',
      native: false,
      sworn: true,
      isoCertified: true,
      rate: '$0.12 / word',
      wordsTranslated: '45,600 words',
      bleuScore: 98.9,
      status: 'active',
      specializations: ['Sworn Notarial', 'Corporate Contracts'],
    },
    {
      id: 'lp-4',
      source: 'Chinese (ZH)',
      target: 'English (EN)',
      native: false,
      sworn: false,
      isoCertified: true,
      rate: '$0.12 / word',
      wordsTranslated: '28,400 words',
      bleuScore: 98.5,
      status: 'active',
      specializations: ['Software i18n', 'API Specifications'],
    },
    {
      id: 'lp-5',
      source: 'Italian (IT)',
      target: 'English (EN)',
      native: false,
      sworn: false,
      isoCertified: false,
      rate: '$0.10 / word',
      wordsTranslated: '9,100 words',
      bleuScore: 97.8,
      status: 'pending_eval',
      specializations: ['General Commercial'],
    },
  ]);

  return (
    <div className="space-y-8 animate-page-enter">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Certified Language Pairs</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Active certified translation pairs, BLEU benchmarks, and sworn licenses.
          </p>
        </div>

        <button
          onClick={onAddLanguageClick}
          className="px-4 py-2.5 bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-2xl text-xs shadow-md shadow-blue-400/20 transition-all flex items-center gap-2 cursor-pointer self-start md:self-auto"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span>Add Language Pair</span>
        </button>
      </div>

      {/* Language Pairs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pairs.map((lp) => (
          <Card
            key={lp.id}
            onClick={() =>
              onItemClick({
                title: `${lp.source} → ${lp.target}`,
                subtitle: `Rate: ${lp.rate} • Volume: ${lp.wordsTranslated} • BLEU Accuracy: ${lp.bleuScore}% • Specializations: ${lp.specializations.join(', ')}`,
                badge: lp.sworn ? 'Sworn Certified' : 'ISO Certified',
              })
            }
            className="p-6 cursor-pointer float-hover hover-rise flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-blue-400/10 text-blue-400 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">translate</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-base">
                      {lp.source} → {lp.target}
                    </h3>
                    <div className="text-[10px] text-slate-400 font-semibold">{lp.wordsTranslated} delivered</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {lp.sworn && (
                    <span className="bg-emerald-500/10 text-emerald-500 text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase">
                      SWORN
                    </span>
                  )}
                  <Badge status={lp.status === 'active' ? 'active' : 'pending'}>
                    {lp.status === 'active' ? 'Active' : 'Pending Eval'}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3 py-3 border-y border-slate-100 dark:border-zinc-800/80 mb-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Standard Payout Rate:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{lp.rate}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">BLEU Quality Accuracy:</span>
                  <span className="font-semibold text-blue-400 dark:text-blue-300">{lp.bleuScore}%</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">ISO-17100 Verified:</span>
                  <span className="font-semibold">{lp.isoCertified ? 'Yes' : 'In Audit'}</span>
                </div>
              </div>

              {/* Specialization Tags */}
              <div className="space-y-1.5 mb-4">
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  APPROVED SPECIALIZATIONS
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {lp.specializations.map((spec, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 text-[10px] font-semibold"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-semibold text-slate-400">
                  <span>ACCURACY BENCHMARK</span>
                  <span className="text-blue-400 font-semibold">{lp.bleuScore}%</span>
                </div>
                <ProgressBar progress={lp.bleuScore} height="h-2" barColor="bg-blue-400" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
