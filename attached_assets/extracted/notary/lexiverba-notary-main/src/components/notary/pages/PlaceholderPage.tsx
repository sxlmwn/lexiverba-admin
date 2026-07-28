import React from 'react';

interface Props {
  isDarkMode: boolean;
  title: string;
  desc: string;
  icon: string;
}

export const PlaceholderPage: React.FC<Props> = ({ isDarkMode, title, desc, icon }) => (
  <div className="space-y-8">
    <div>
      <h1 className={`text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h1>
      <p className={`text-sm font-medium mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>{desc}</p>
    </div>

    <div className={`p-16 rounded-[2.5rem] border-2 float-shadow smooth-card flex flex-col items-center justify-center text-center ${
      isDarkMode ? 'bg-[#18181b] border-[#27272a] text-white' : 'bg-white border-slate-200/80 text-slate-900'
    }`}>
      <div className="w-16 h-16 rounded-2xl bg-blue-600/10 text-blue-500 flex items-center justify-center mb-4">
        <span className="material-symbols-outlined text-[32px]">{icon}</span>
      </div>
      <div className="font-extrabold text-lg">{title}</div>
      <div className={`text-xs font-medium mt-2 max-w-md ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>{desc}</div>
    </div>
  </div>
);
