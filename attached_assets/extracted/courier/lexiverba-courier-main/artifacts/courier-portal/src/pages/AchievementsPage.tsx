import React from 'react';
import { RecordCard } from '../components/ui/RecordCard';

interface AchievementsPageProps {
  isDarkMode?: boolean;
  onItemClick?: (item: { title: string; subtitle?: string; icon?: string; badge?: string }) => void;
}

export const AchievementsPage: React.FC<AchievementsPageProps> = ({ isDarkMode = false, onItemClick }) => {
  const achievements = [
    { id: 1, title: 'First Delivery Milestone', category: 'Onboarding Milestone', status: 'Completed', xp: '100 XP', tags: ['UNLOCKED', 'BEGINNER'], icon: 'task_alt' },
    { id: 2, title: 'Speed Demon Sprint', category: 'Velocity Achievement', status: 'In Transit', xp: '250 XP', tags: ['7/10 COMPLETED', 'EXPRESS'], icon: 'local_fire_department' },
    { id: 3, title: 'Notary Expert Master', category: 'Specialization Badge', status: 'Pending', xp: '500 XP', tags: ['18/25 NOTARY', 'SWORN'], icon: 'gavel' },
    { id: 4, title: 'Weekly Champion Rank', category: 'Leaderboard Recognition', status: 'Completed', xp: '500 XP', tags: ['TOP 1% COURIER', 'GOLD'], icon: 'emoji_events' },
  ];

  return (
    <div className="space-y-8 animate-page-enter">
      {/* Page Header */}
      <div>
        <h1 className={`text-4xl lg:text-5xl font-semibold tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Achievements
        </h1>
        <p className={`text-sm font-medium mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
          AI Performance Badges & Leaderboard Milestones
        </p>
      </div>

      {/* Total XP Banner */}
      <div className={`p-8 rounded-[2.5rem] border-2 float-shadow smooth-card text-center transition-colors ${
        isDarkMode ? 'bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-500/30' : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'
      }`}>
        <div className="text-6xl font-semibold mb-2">2,840 XP</div>
        <span className="inline-block text-xs font-semibold px-4 py-1.5 rounded-full bg-blue-600 text-white shadow-md shadow-blue-600/30">
          TOTAL COURIER POINTS
        </span>
      </div>

      {/* Achievements Record Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((item) => (
          <RecordCard
            key={item.id}
            title={item.title}
            category={item.category}
            icon={item.icon}
            iconColor="bg-blue-600/10 text-blue-500"
            topRightIcon="emoji_events"
            tags={item.tags}
            metaLine={`Reward: ${item.xp}`}
            subMetaLine="Status: Active Milestone"
            status={item.status}
            actionIcon="workspace_premium"
            onClick={() => onItemClick && onItemClick({ title: item.title, subtitle: `${item.category} • Reward: ${item.xp}`, icon: item.icon, badge: item.status })}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
    </div>
  );
};
