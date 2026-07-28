import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

interface ComingSoonPageProps {
  title: string;
  icon: string;
}

export const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ title, icon }) => {
  return (
    <div className="h-full flex items-center justify-center animate-page-enter">
      <Card className="max-w-md w-full p-10 text-center items-center flex flex-col gap-6">
        <div className="w-20 h-20 bg-blue-50 dark:bg-blue-950/30 text-blue-600 rounded-3xl flex items-center justify-center shadow-inner">
          <span className="material-symbols-outlined text-[40px]">{icon}</span>
        </div>
        <div>
          <Badge status="warning" className="mb-4">Coming Soon</Badge>
          <h2 className="text-2xl font-bold tracking-tight mb-2">{title}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            This module is currently in active development and will be available in the next major platform update.
          </p>
        </div>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/30 transition-all cursor-pointer">
          Notify Me When Live
        </button>
      </Card>
    </div>
  );
};
