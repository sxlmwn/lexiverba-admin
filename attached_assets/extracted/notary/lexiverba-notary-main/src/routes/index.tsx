import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/notary/Sidebar';
import { Header } from '@/components/notary/Header';
import { InteractiveModal } from '@/components/notary/InteractiveModal';
import { DashboardPage } from '@/components/notary/pages/DashboardPage';
import { PendingPage } from '@/components/notary/pages/PendingPage';
import { CalendarPage } from '@/components/notary/pages/CalendarPage';
import { CompletedPage } from '@/components/notary/pages/CompletedPage';
import { AchievementsPage } from '@/components/notary/pages/AchievementsPage';
import { PlaceholderPage } from '@/components/notary/pages/PlaceholderPage';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'LexiVerba Notary Portal — Review & Certify Documents' },
      { name: 'description', content: 'Notary Portal for LexiVerba. Track pending signings, manage your calendar, monitor earnings, and unlock achievements.' },
      { property: 'og:title', content: 'LexiVerba Notary Portal' },
      { property: 'og:description', content: 'Review, certify, and manage legal document notarizations.' },
    ],
  }),
  component: NotaryPortal,
});

type DetailItem = { title: string; subtitle: string; icon?: string; badge?: string };

function NotaryPortal() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [detail, setDetail] = useState<DetailItem | null>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  useEffect(() => {
    if (currentTab === 'help') setIsHelpOpen(true);
  }, [currentTab]);

  const meta: Record<string, { title: string; subtitle: string }> = {
    dashboard: { title: 'Notary Dashboard', subtitle: 'Welcome back, Demo Notary User' },
    pending: { title: 'Pending Notarizations', subtitle: 'Review, verify, and certify incoming requests' },
    calendar: { title: 'Calendar', subtitle: 'Upcoming notary appointments' },
    completed: { title: 'Completed', subtitle: 'Notarizations you have certified' },
    achievements: { title: 'Achievements', subtitle: 'Milestones and badges earned' },
    settings: { title: 'Settings', subtitle: 'Manage account, credentials, and preferences' },
    logout: { title: 'Logout', subtitle: 'Sign out of your account' },
    help: { title: 'Help', subtitle: 'Support and knowledge base' },
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return <DashboardPage isDarkMode={isDarkMode} onItemClick={setDetail} />;
      case 'pending':
        return <PendingPage isDarkMode={isDarkMode} onItemClick={setDetail} />;
      case 'calendar':
        return <CalendarPage isDarkMode={isDarkMode} onItemClick={setDetail} />;
      case 'completed':
        return <CompletedPage isDarkMode={isDarkMode} onItemClick={setDetail} />;
      case 'achievements':
        return <AchievementsPage isDarkMode={isDarkMode} onItemClick={setDetail} />;
      case 'settings':
        return <PlaceholderPage isDarkMode={isDarkMode} title="Settings" desc="Manage your commission details, signature, seal, and notification preferences." icon="settings" />;
      case 'logout':
        return <PlaceholderPage isDarkMode={isDarkMode} title="Sign out" desc="You can safely sign out of your LexiVerba Notary Portal from here." icon="logout" />;
      default:
        return <DashboardPage isDarkMode={isDarkMode} onItemClick={setDetail} />;
    }
  };

  const header = meta[currentTab] ?? meta.dashboard;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#09090b] text-slate-100 dark' : 'bg-slate-50 text-slate-900'}`}>
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isDarkMode={isDarkMode}
        isCollapsed={isCollapsed}
        toggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      <div className={`transition-all duration-300 ease-in-out ${isCollapsed ? 'pl-20' : 'pl-72'}`}>
        <Header
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode(v => !v)}
          isCollapsed={isCollapsed}
          onSelectTab={setCurrentTab}
          title={header.title}
          subtitle={header.subtitle}
        />

        <main className="pt-28 px-10 pb-16 min-h-screen">
          <div key={currentTab} className="animate-page-enter">
            {renderContent()}
          </div>
        </main>
      </div>

      <InteractiveModal
        isOpen={detail !== null}
        onClose={() => setDetail(null)}
        title={detail?.title || 'Details'}
        isDarkMode={isDarkMode}
      >
        <div className="space-y-4 text-xs">
          {detail?.badge && (
            <span className="inline-block bg-blue-600 text-white font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {detail.badge}
            </span>
          )}
          <div className="p-4 bg-slate-100 dark:bg-zinc-800/80 rounded-2xl border border-slate-200 dark:border-zinc-700/60 font-medium leading-relaxed">
            {detail?.subtitle}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setDetail(null)}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs shadow-md transition-all cursor-pointer"
            >
              Close Details
            </button>
          </div>
        </div>
      </InteractiveModal>

      <InteractiveModal
        isOpen={isHelpOpen}
        onClose={() => { setIsHelpOpen(false); if (currentTab === 'help') setCurrentTab('dashboard'); }}
        title="Notary Portal Help &amp; Support"
        isDarkMode={isDarkMode}
      >
        <div className="space-y-3 text-xs">
          <p className={isDarkMode ? 'text-zinc-400' : 'text-slate-500'}>
            Need assistance with commission verification, seal uploads, or appointment scheduling?
          </p>
          <div className="p-3 bg-blue-600/10 border border-blue-500/30 rounded-xl font-medium text-blue-500">
            Contact 24/7 Notary Support: notary-support@lexiverba.ai
          </div>
        </div>
      </InteractiveModal>
    </div>
  );
}
