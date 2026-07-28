import React from 'react';

interface Props {
  isDarkMode: boolean;
  onItemClick: (item: { title: string; subtitle: string; icon?: string; badge?: string }) => void;
}

const COMPLETED = [
  { doc: 'Employment Agreement - Sterling Corp.pdf', client: 'Alex Sterling', type: 'Contract', date: 'Jul 26, 2026' },
  { doc: 'Sworn Statement of Facts.pdf', client: 'Amina Okafor', type: 'Affidavit', date: 'Jul 25, 2026' },
  { doc: 'Trust Certification.pdf', client: 'Vanguard Financial', type: 'Trust', date: 'Jul 24, 2026' },
  { doc: 'Bill of Sale - Vehicle.pdf', client: 'Isaac Oluwatemilorun', type: 'Bill of Sale', date: 'Jul 23, 2026' },
  { doc: 'Medical Consent Form.pdf', client: 'Helios Pharma Ltd', type: 'Medical', date: 'Jul 22, 2026' },
  { doc: 'Guardianship Agreement.pdf', client: 'David Oshodi', type: 'Guardianship', date: 'Jul 21, 2026' },
];

export const CompletedPage: React.FC<Props> = ({ isDarkMode, onItemClick }) => (
  <div className="space-y-8">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className={`text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Completed
        </h1>
        <p className={`text-sm font-medium mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
          All notarizations you have successfully certified.
        </p>
      </div>
      <button className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[11px] font-extrabold transition-all hover:scale-105 cursor-pointer ${
        isDarkMode ? 'bg-[#18181b] border-[#27272a] text-white' : 'bg-white border-slate-200/80 text-slate-800'
      }`}>
        <span className="material-symbols-outlined text-[16px] text-blue-500">refresh</span>
        Refresh
      </button>
    </div>

    <div className={`rounded-[2.5rem] border-2 float-shadow smooth-card overflow-hidden ${
      isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-slate-200/80'
    }`}>
      <div className={`grid grid-cols-12 gap-4 px-6 py-4 text-[10px] font-extrabold uppercase tracking-widest ${
        isDarkMode ? 'text-zinc-400 border-b border-[#27272a]' : 'text-slate-500 border-b border-slate-100'
      }`}>
        <div className="col-span-4">Document</div>
        <div className="col-span-2">Client</div>
        <div className="col-span-2">Type</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-1">Completed</div>
        <div className="col-span-1 text-right">Action</div>
      </div>

      {COMPLETED.map((c, i) => (
        <div
          key={i}
          onClick={() => onItemClick({ title: c.doc, subtitle: `${c.client} • ${c.type} • Notarized ${c.date}`, icon: 'verified', badge: 'NOTARIZED' })}
          className={`grid grid-cols-12 gap-4 px-6 py-4 items-center text-xs border-b transition-all cursor-pointer ${
            isDarkMode ? 'border-[#27272a] hover:bg-zinc-800/60 text-slate-100' : 'border-slate-100 hover:bg-slate-50 text-slate-800'
          }`}
        >
          <div className="col-span-4 flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">verified</span>
            </div>
            <div className="font-bold truncate">{c.doc}</div>
          </div>
          <div className="col-span-2 font-semibold truncate">{c.client}</div>
          <div className="col-span-2 text-zinc-400 font-semibold">{c.type}</div>
          <div className="col-span-2">
            <span className="inline-block bg-emerald-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full badge-glow-emerald">
              Notarized
            </span>
          </div>
          <div className="col-span-1 text-zinc-400 font-semibold">{c.date}</div>
          <div className="col-span-1 text-right">
            <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-extrabold rounded-full shadow-sm badge-shadow cursor-pointer">
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
