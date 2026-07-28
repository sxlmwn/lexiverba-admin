import React, { useState } from 'react';

interface Props {
  isDarkMode: boolean;
  onItemClick: (item: { title: string; subtitle: string; icon?: string; badge?: string }) => void;
}

const PENDING = [
  { doc: 'Power of Attorney - Ortega.pdf', client: 'Julia Ortega', type: 'POA', status: 'Pending Signature', urgent: true, submitted: 'Jul 27' },
  { doc: 'Affidavit of Residency.pdf', client: 'Marcus Chen', type: 'Affidavit', status: 'Awaiting Review', urgent: false, submitted: 'Jul 27' },
  { doc: 'Loan Modification Agreement.pdf', client: 'Helios Legal LLP', type: 'Loan Docs', status: 'Pending Signature', urgent: true, submitted: 'Jul 26' },
  { doc: 'Real Estate Deed - Unit 402.pdf', client: 'Vanguard Realty', type: 'Deed', status: 'Awaiting Review', urgent: false, submitted: 'Jul 26' },
  { doc: 'Consent to Travel (Minor).pdf', client: 'Amina Okafor', type: 'Travel', status: 'Pending Signature', urgent: false, submitted: 'Jul 25' },
  { doc: 'Living Will & Directive.pdf', client: 'Edwin Adenike', type: 'Will', status: 'Awaiting Review', urgent: true, submitted: 'Jul 25' },
];

export const PendingPage: React.FC<Props> = ({ isDarkMode, onItemClick }) => {
  const [tab, setTab] = useState<'all' | 'urgent' | 'standard'>('all');
  const [q, setQ] = useState('');

  const filtered = PENDING.filter(p => {
    if (tab === 'urgent' && !p.urgent) return false;
    if (tab === 'standard' && p.urgent) return false;
    if (q.trim() && !(p.doc + p.client).toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  const counts = {
    all: PENDING.length,
    urgent: PENDING.filter(p => p.urgent).length,
    standard: PENDING.filter(p => !p.urgent).length,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className={`text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Pending Notarizations
        </h1>
        <p className={`text-sm font-medium mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
          Review, verify, and certify incoming document requests.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className={`flex items-center rounded-2xl px-4 py-2.5 w-full sm:w-[380px] border ${
          isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-slate-200/80'
        }`}>
          <span className="material-symbols-outlined text-slate-400 text-[20px]">search</span>
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search documents or clients..."
            className={`bg-transparent border-none text-xs w-full ml-2 outline-none font-semibold placeholder-slate-400 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}
          />
        </div>

        <div className="flex items-center gap-3">
          <div className={`flex p-1 rounded-full border ${isDarkMode ? 'bg-[#27272a] border-zinc-700' : 'bg-slate-100 border-slate-200'}`}>
            {(['all', 'urgent', 'standard'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1 text-xs font-extrabold rounded-full transition-all uppercase cursor-pointer ${
                  tab === t ? 'bg-blue-600 text-white shadow-md' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {t} <span className="ml-1 opacity-70">{counts[t]}</span>
              </button>
            ))}
          </div>
          <button className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[11px] font-extrabold transition-all hover:scale-105 cursor-pointer ${
            isDarkMode ? 'bg-[#18181b] border-[#27272a] text-white' : 'bg-white border-slate-200/80 text-slate-800'
          }`}>
            <span className="material-symbols-outlined text-[16px] text-blue-500">refresh</span>
            Refresh
          </button>
        </div>
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
          <div className="col-span-1">Submitted</div>
          <div className="col-span-1 text-right">Action</div>
        </div>

        {filtered.length === 0 ? (
          <div className="p-10 text-center text-xs font-medium text-slate-400">No pending notarizations match your filters.</div>
        ) : (
          filtered.map((p, i) => (
            <div
              key={i}
              onClick={() => onItemClick({ title: p.doc, subtitle: `${p.client} • ${p.type} • ${p.status}`, icon: 'draw', badge: p.status.toUpperCase() })}
              className={`grid grid-cols-12 gap-4 px-6 py-4 items-center text-xs border-b transition-all cursor-pointer ${
                isDarkMode ? 'border-[#27272a] hover:bg-zinc-800/60 text-slate-100' : 'border-slate-100 hover:bg-slate-50 text-slate-800'
              }`}
            >
              <div className="col-span-4 flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-blue-600/10 text-blue-500 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">description</span>
                </div>
                <div className="font-bold truncate">{p.doc}</div>
              </div>
              <div className="col-span-2 font-semibold truncate">{p.client}</div>
              <div className="col-span-2 text-zinc-400 font-semibold">{p.type}</div>
              <div className="col-span-2">
                <span className="inline-block bg-amber-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full badge-glow-amber">
                  {p.status}
                </span>
              </div>
              <div className="col-span-1 text-zinc-400 font-semibold">{p.submitted}</div>
              <div className="col-span-1 text-right">
                <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-extrabold rounded-full shadow-sm badge-shadow cursor-pointer">
                  Review
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
