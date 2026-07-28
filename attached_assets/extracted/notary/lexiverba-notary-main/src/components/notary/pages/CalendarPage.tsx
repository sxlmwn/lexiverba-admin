import React from 'react';

interface Props {
  isDarkMode: boolean;
  onItemClick: (item: { title: string; subtitle: string; icon?: string; badge?: string }) => void;
}

const DAYS = [
  {
    label: 'Today · Tue, Jul 28',
    appts: [
      { time: '10:00 AM', client: 'Julia Ortega', doc: 'Power of Attorney', status: 'Confirmed', tone: 'emerald' },
      { time: '1:30 PM', client: 'Marcus Chen', doc: 'Affidavit of Residency', status: 'Awaiting Client', tone: 'amber' },
      { time: '3:00 PM', client: 'Helios Legal LLP', doc: 'Loan Modification', status: 'Confirmed', tone: 'emerald' },
    ],
  },
  {
    label: 'Wed, Jul 29',
    appts: [
      { time: '9:15 AM', client: 'Vanguard Realty', doc: 'Real Estate Deed', status: 'Confirmed', tone: 'emerald' },
      { time: '11:45 AM', client: 'Amina Okafor', doc: 'Consent to Travel', status: 'Awaiting Client', tone: 'amber' },
    ],
  },
  {
    label: 'Thu, Jul 30',
    appts: [
      { time: '10:30 AM', client: 'Edwin Adenike', doc: 'Living Will & Directive', status: 'Confirmed', tone: 'emerald' },
      { time: '4:00 PM', client: 'Arc Company', doc: 'Corporate Resolution', status: 'Rescheduled', tone: 'rose' },
    ],
  },
];

const toneMap: Record<string, string> = {
  emerald: 'bg-emerald-500 badge-glow-emerald',
  amber: 'bg-amber-500 badge-glow-amber',
  rose: 'bg-rose-500 badge-glow-rose',
};

export const CalendarPage: React.FC<Props> = ({ isDarkMode, onItemClick }) => (
  <div className="space-y-8">
    <div>
      <h1 className={`text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
        Calendar
      </h1>
      <p className={`text-sm font-medium mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
        Upcoming notary appointments and scheduled signings.
      </p>
    </div>

    <div className="space-y-8">
      {DAYS.map(day => (
        <div key={day.label}>
          <div className={`text-[11px] font-extrabold uppercase tracking-[0.2em] mb-3 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
            {day.label}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {day.appts.map((a, i) => (
              <div
                key={i}
                onClick={() => onItemClick({ title: `${a.time} — ${a.client}`, subtitle: `${a.doc} • ${a.status}`, icon: 'event', badge: a.status.toUpperCase() })}
                className={`p-6 rounded-[2rem] border-2 smooth-card float-shadow float-hover cursor-pointer transition-all duration-300 ${
                  isDarkMode ? 'bg-[#18181b] border-[#27272a] text-white' : 'bg-white border-slate-200/80 text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-blue-600/10 text-blue-500 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">schedule</span>
                    </div>
                    <div className="font-extrabold text-sm">{a.time}</div>
                  </div>
                  <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full text-white ${toneMap[a.tone]}`}>
                    {a.status}
                  </span>
                </div>
                <div className="font-extrabold text-base">{a.client}</div>
                <div className={`text-[11px] font-semibold mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>{a.doc}</div>
                <button className="mt-5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-extrabold rounded-full shadow-sm badge-shadow cursor-pointer">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);
