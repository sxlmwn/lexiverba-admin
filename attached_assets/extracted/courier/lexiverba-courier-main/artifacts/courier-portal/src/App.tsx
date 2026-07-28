import { useState } from 'react';
import { useTheme } from './theme';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { FloatingAIAssistant } from './components/FloatingAIAssistant';
import { InteractiveModal } from './components/InteractiveModal';
import { DashboardPage } from './pages/DashboardPage';
import { AssignedDeliveriesPage } from './pages/AssignedDeliveriesPage';
import { SmartRoutePage } from './pages/SmartRoutePage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { EarningsPage } from './pages/EarningsPage';
import { LiveTrackingPage } from './pages/LiveTrackingPage';
import { PendingPage } from './pages/PendingPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { PerformancePage } from './pages/PerformancePage';
import { CompletedPage } from './pages/CompletedPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Global Item Detail Modal State
  const [selectedRecord, setSelectedRecord] = useState<{
    title: string;
    subtitle?: string;
    icon?: string;
    badge?: string;
    details?: string[];
  } | null>(null);

  const handleItemClick = (record: { title: string; subtitle?: string; icon?: string; badge?: string; details?: string[] }) => {
    setSelectedRecord(record);
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return <DashboardPage isDarkMode={isDarkMode} onItemClick={handleItemClick} />;
      case 'deliveries':
        return <AssignedDeliveriesPage isDarkMode={isDarkMode} onItemClick={handleItemClick} />;
      case 'smart-route':
        return <SmartRoutePage isDarkMode={isDarkMode} />;
      case 'ai-assistant':
        return <AIAssistantPage isDarkMode={isDarkMode} />;
      case 'earnings':
        return <EarningsPage isDarkMode={isDarkMode} />;
      case 'live-tracking':
        return <LiveTrackingPage isDarkMode={isDarkMode} />;
      case 'pending':
        return <PendingPage isDarkMode={isDarkMode} onItemClick={handleItemClick} />;
      case 'achievements':
        return <AchievementsPage isDarkMode={isDarkMode} onItemClick={handleItemClick} />;
      case 'performance':
        return <PerformancePage isDarkMode={isDarkMode} />;
      case 'completed':
        return <CompletedPage isDarkMode={isDarkMode} onItemClick={handleItemClick} />;
      case 'settings':
        return <SettingsPage isDarkMode={isDarkMode} />;
      default:
        return <DashboardPage isDarkMode={isDarkMode} onItemClick={handleItemClick} />;
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-[#09090b] text-slate-100 dark' : 'bg-[#f4f7ff] text-[#001033]'
      }`}
    >
      {/* Fixed Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isDarkMode={isDarkMode}
        isCollapsed={isCollapsed}
        toggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Main Layout Area */}
      <div className={`transition-all duration-300 ease-in-out ${isCollapsed ? 'pl-20' : 'pl-72'}`}>
        {/* Fixed Top Header */}
        <Header
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isCollapsed={isCollapsed}
          onSelectTab={(tab) => setCurrentTab(tab)}
        />

        {/* Dynamic Main Page Content */}
        <main className="pt-28 px-10 pb-16 min-h-screen">{renderContent()}</main>
      </div>

      {/* Floating AI Chatbot Assistant */}
      <FloatingAIAssistant />

      {/* Global Interactive Record Detail Inspector Modal */}
      {selectedRecord && (
        <InteractiveModal
          isOpen={!!selectedRecord}
          onClose={() => setSelectedRecord(null)}
          title={selectedRecord.title}
          isDarkMode={isDarkMode}
        >
          <div className="space-y-4 text-xs">
            {selectedRecord.subtitle && (
              <div className="text-sm font-semibold text-blue-500">{selectedRecord.subtitle}</div>
            )}
            <div className={`p-4 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="font-semibold text-slate-400 uppercase tracking-widest text-[10px]">Record Status Timeline</div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="font-semibold">Verified & Active in Logistics System</span>
              </div>
              <p className="text-slate-400 font-medium mt-1">
                Detailed audit trail logged. All notary timestamps and GPS coordinates are stored securely.
              </p>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </InteractiveModal>
      )}
    </div>
  );
}

export default App;
