import React from 'react';
import { Card } from '../components/ui/Card';

interface RolePortalPageProps {
  title: string;
  icon: string;
}

export const RolePortalPage: React.FC<RolePortalPageProps> = ({ title, icon }) => {
  return (
    <div className="h-full flex items-center justify-center animate-page-enter">
      <Card className="max-w-md w-full p-10 text-center items-center flex flex-col gap-6 border-blue-200 dark:border-blue-900 shadow-xl shadow-blue-500/10">
        <div className="w-24 h-24 bg-blue-600 text-white rounded-[2rem] flex items-center justify-center shadow-lg shadow-blue-600/40">
          <span className="material-symbols-outlined text-[48px]">{icon}</span>
        </div>
        <div>
          <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">ROLE PORTAL ACCESS</div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">{title}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Manage permissions, interface layouts, and configuration specifically for the {title} environment.
          </p>
        </div>
        <button className="w-full py-3 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-900 dark:text-white rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2">
          <span>Opens the {title}</span>
          <span className="material-symbols-outlined text-[18px]">open_in_new</span>
        </button>
      </Card>
    </div>
  );
};
