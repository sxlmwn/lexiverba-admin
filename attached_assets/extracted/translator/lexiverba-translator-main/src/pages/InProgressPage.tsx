import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';

interface InProgressPageProps {
  onItemClick: (item: { title: string; subtitle: string; icon?: string; badge?: string }) => void;
  onOpenWorkbenchClick: (taskName: string) => void;
}

export const InProgressPage: React.FC<InProgressPageProps> = ({ onOpenWorkbenchClick }) => {
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);

  const activeTasks = [
    {
      id: 'TSK-8042',
      title: 'EU Patent Specification - Medical Robotics',
      client: 'Bancorp SA',
      language: 'DE → EN',
      progress: 68,
      wordsTranslated: 3094,
      totalWords: 4550,
      due: 'Today, 18:00',
      priority: 'Urgent',
      segments: [
        {
          id: 1,
          source: 'Die vorliegende Erfindung betrifft ein chirurgisches Robotersystem mit haptischem Feedback.',
          target: 'The present invention relates to a surgical robotic system with haptic feedback.',
          status: 'confirmed',
          match: '100% TM Match',
        },
        {
          id: 2,
          source: 'Insbesondere umfasst die Vorrichtung eine Vielzahl von zweiarmigen Manipulatoren.',
          target: 'In particular, the apparatus comprises a plurality of dual-arm manipulators.',
          status: 'confirmed',
          match: '95% NMT Suggestion',
        },
        {
          id: 3,
          source: 'Der Steuerungsprozessor ist dafür konfiguriert, Gewebewiderstände in Echtzeit zu berechnen.',
          target: 'The control processor is configured to calculate tissue resistances in real-time.',
          status: 'editing',
          match: '98% Term Match',
        },
        {
          id: 4,
          source: 'Ein Notabschaltventil schützt vor unerwarteten Druckschwankungen im Hydraulikkreislauf.',
          target: 'An emergency shut-off valve protects against unexpected pressure fluctuations.',
          status: 'draft',
          match: 'NMT Draft',
        },
      ],
    },
    {
      id: 'TSK-8043',
      title: 'Clinical Trial Phase III Informed Consent Form',
      client: 'Helios Pharma Ltd',
      language: 'FR → EN',
      progress: 45,
      wordsTranslated: 3690,
      totalWords: 8200,
      due: 'Tomorrow, 12:00',
      priority: 'High',
      segments: [
        {
          id: 1,
          source: 'Le présent formulaire a pour objet d’informer le participant sur les modalités de l’étude clinique.',
          target: 'The purpose of this form is to inform the participant about the terms of the clinical study.',
          status: 'confirmed',
          match: '100% TM Match',
        },
        {
          id: 2,
          source: 'Les données médicales seront traitées conformément au règlement général sur la protection des données.',
          target: 'Medical data will be processed in accordance with the General Data Protection Regulation.',
          status: 'editing',
          match: '99% Term Match',
        },
      ],
    },
  ];

  const currentTask = activeTasks[selectedTaskIndex];
  const [segments, setSegments] = useState(currentTask.segments);

  const handleSegmentChange = (id: number, text: string) => {
    setSegments((prev) =>
      prev.map((s) => (s.id === id ? { ...s, target: text, status: 'editing' } : s))
    );
  };

  const handleConfirmSegment = (id: number) => {
    setSegments((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'confirmed' } : s))
    );
  };

  return (
    <div className="space-y-8 animate-page-enter">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">In Progress</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Active translation segments and live CAT editor workspace.
          </p>
        </div>

        <button
          onClick={() => onOpenWorkbenchClick(currentTask.title)}
          className="px-4 py-2.5 bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-2xl text-xs shadow-md shadow-blue-400/20 transition-all flex items-center gap-2 cursor-pointer self-start md:self-auto"
        >
          <span className="material-symbols-outlined text-[18px]">open_in_full</span>
          <span>Full Workbench</span>
        </button>
      </div>

      {/* Task Selector Stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeTasks.map((t, idx) => (
          <Card
            key={t.id}
            onClick={() => {
              setSelectedTaskIndex(idx);
              setSegments(t.segments);
            }}
            className={`p-6 cursor-pointer float-hover transition-all ${
              selectedTaskIndex === idx
                ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                : ''
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-mono font-semibold text-slate-400">{t.id}</span>
              <div className="flex items-center gap-1.5">
                <Badge variant={t.priority === 'Urgent' ? 'danger' : 'warning'}>{t.priority}</Badge>
                <span className="font-semibold text-blue-500 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-full text-[10px]">
                  {t.language}
                </span>
              </div>
            </div>
            <h3 className="font-semibold text-base mb-1">{t.title}</h3>
            <p className="text-xs text-slate-400 mb-4">{t.client} • Due {t.due}</p>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-400 text-[10px] uppercase tracking-wider">PROGRESS</span>
                <span className="text-blue-400">{t.progress}% ({t.wordsTranslated} / {t.totalWords} words)</span>
              </div>
              <ProgressBar progress={t.progress} height="h-2" barColor="bg-blue-400" />
            </div>
          </Card>
        ))}
      </div>

      {/* CAT Editor Workspace */}
      <Card hoverable={false} interactive={false} className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/60 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-400 text-[20px]">translate</span>
              <h3 className="font-semibold text-base">{currentTask.title}</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {currentTask.client} • Language Pair: <span className="font-semibold text-blue-400">{currentTask.language}</span>
            </p>
          </div>

          <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full uppercase border border-emerald-200 dark:border-emerald-800/50 self-start sm:self-auto">
            NMT Auto-Suggest Active
          </span>
        </div>

        {/* Segment Stack */}
        <div className="space-y-4">
          {segments.map((seg, idx) => (
            <div
              key={seg.id}
              className={`p-4 rounded-2xl border transition-all ${
                seg.status === 'confirmed'
                  ? 'bg-slate-50/70 dark:bg-zinc-900/40 border-slate-200/60 dark:border-zinc-800'
                  : 'bg-white dark:bg-[#121215] border-blue-500/50 ring-1 ring-blue-500/20 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 mb-2">
                <span>SEGMENT #{idx + 1}</span>
                <span className="text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full">{seg.match}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Source Segment */}
                <div className="p-3 bg-slate-100/70 dark:bg-zinc-800/60 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                  {seg.source}
                </div>

                {/* Target Translation Input */}
                <div className="space-y-2">
                  <textarea
                    value={seg.target}
                    onChange={(e) => handleSegmentChange(seg.id, e.target.value)}
                    rows={2}
                    className="w-full p-3 bg-white dark:bg-[#18181b] rounded-xl border border-slate-200 dark:border-zinc-700 text-xs font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/40 leading-relaxed resize-none"
                  />
                  <div className="flex justify-end gap-2">
                    {seg.status !== 'confirmed' ? (
                      <button
                        onClick={() => handleConfirmSegment(seg.id)}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-semibold shadow-2xs transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                        <span>Confirm Segment</span>
                      </button>
                    ) : (
                      <span className="text-[10px] font-semibold text-emerald-500 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">verified</span>
                        <span>Confirmed</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
