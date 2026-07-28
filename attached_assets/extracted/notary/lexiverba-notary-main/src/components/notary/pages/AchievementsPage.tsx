import React from 'react';

interface Props {
  isDarkMode: boolean;
  onItemClick: (item: { title: string; subtitle: string; icon?: string; badge?: string }) => void;
}

interface Achv {
  title: string;
  desc: string;
  icon: string;
  color: string;
  unlocked?: boolean;
  progress?: number;
}

const LIST: Achv[] = [
  { title: 'First Seal', desc: 'Certify your first notarization', icon: 'verified', color: 'emerald', unlocked: true },
  { title: 'Century Club', desc: 'Complete 100 notarizations', icon: 'workspace_premium', color: 'emerald', unlocked: true },
  { title: '5-Star Reputation', desc: 'Maintain a 4.8+ rating for 30 days', icon: 'star', color: 'amber', unlocked: true },
  { title: 'Speed Demon', desc: 'Turn around 25 documents in under 24h', icon: 'bolt', color: 'blue', progress: 72 },
  { title: 'Weekend Warrior', desc: 'Work 10 weekend shifts', icon: 'weekend', color: 'blue', progress: 40 },
  { title: '500 Certified', desc: 'Reach 500 lifetime notarizations', icon: 'emoji_events', color: 'blue', progress: 30 },
];

const colorMap: Record<string, string> = {
  emerald: 'bg-emerald-500/10 text-emerald-500',
  amber: 'bg-amber-500/10 text-amber-500',
  blue: 'bg-blue-600/10 text-blue-500',
  rose: 'bg-rose-500/10 text-rose-500',
};

export const AchievementsPage: React.FC<Props> = ({ isDarkMode, onItemClick }) => (
  <div className="space-y-8">
    <div>
      <h1 className={`text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
        Achievements
      </h1>
      <p className={`text-sm font-medium mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
        Milestones and badges earned from your notary work.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {LIST.map((a, i) => (
        <div
          key={i}
          onClick={() => onItemClick({
            title: a.title,
            subtitle: a.unlocked ? `${a.desc} — Unlocked` : `${a.desc} — ${a.progress}% toward next milestone`,
            icon: a.icon,
            badge: a.unlocked ? 'UNLOCKED' : 'IN PROGRESS',
          })}
          className={`p-6 rounded-[2rem] border-2 smooth-card float-shadow float-hover cursor-pointer transition-all duration-300 ${
            isDarkMode ? 'bg-[#18181b] border-[#27272a] text-white' : 'bg-white border-slate-200/80 text-slate-900'
          }`}
        >
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colorMap[a.color]}`}>
            <span className="material-symbols-outlined text-[28px]">{a.icon}</span>
          </div>
          <div className="mt-4 font-extrabold text-base">{a.title}</div>
          <div className={`text-[11px] font-medium mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>{a.desc}</div>

          <div className="mt-5">
            {a.unlocked ? (
              <span className="inline-block bg-emerald-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full badge-glow-emerald uppercase tracking-wider">
                Unlocked
              </span>
            ) : (
              <>
                <div className="flex items-center justify-between text-[10px] font-extrabold mb-1.5">
                  <span className={isDarkMode ? 'text-zinc-400' : 'text-slate-500'}>Progress</span>
                  <span className="text-blue-500">{a.progress}%</span>
                </div>
                <div className={`h-1.5 w-full rounded-full ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-100'}`}>
                  <div className="h-1.5 rounded-full bg-blue-600 transition-all duration-500" style={{ width: `${a.progress}%` }}></div>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);
