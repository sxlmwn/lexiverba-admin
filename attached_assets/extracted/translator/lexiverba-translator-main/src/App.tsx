import { useState, useEffect } from 'react';
import { useTheme } from './theme';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { FloatingAIAssistant } from './components/FloatingAIAssistant';
import { InteractiveModal } from './components/InteractiveModal';
import { DashboardPage } from './pages/DashboardPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { TasksPage } from './pages/TasksPage';
import { InProgressPage } from './pages/InProgressPage';
import { CompletedPage } from './pages/CompletedPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { LanguagesPage } from './pages/LanguagesPage';
import { PerformancePage } from './pages/PerformancePage';
import { CertificationPage } from './pages/CertificationPage';
import { SettingsPage } from './pages/SettingsPage';
import { LoginPage } from './pages/LoginPage';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [isAddLanguageOpen, setIsAddLanguageOpen] = useState<boolean>(false);
  const [isStartTestOpen, setIsStartTestOpen] = useState<boolean>(false);
  const [workbenchTaskTitle, setWorkbenchTaskTitle] = useState<string | null>(null);
  const [isQualityCheckOpen, setIsQualityCheckOpen] = useState<boolean>(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [isUploadDocOpen, setIsUploadDocOpen] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  // Item Detail Modal State
  const [activeDetailItem, setActiveDetailItem] = useState<{ title: string; subtitle: string; icon?: string; badge?: string } | null>(null);

  // Handle Help Tab navigation
  useEffect(() => {
    if (currentTab === 'help') {
      setIsHelpOpen(true);
    }
  }, [currentTab]);

  if (currentTab === 'login') {
    return <LoginPage onLoginSuccess={() => setCurrentTab('dashboard')} />;
  }

  const handleItemClick = (item: { title: string; subtitle: string; icon?: string; badge?: string }) => {
    setActiveDetailItem(item);
  };

  const handleOpenWorkbench = (title?: string) => {
    setWorkbenchTaskTitle(title || 'EU Patent Specification TS-8042');
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return (
          <DashboardPage
            onOpenWorkbenchClick={handleOpenWorkbench}
            onOpenQualityCheckClick={() => setIsQualityCheckOpen(true)}
            onOpenGlossaryClick={() => setIsGlossaryOpen(true)}
            onSelectTab={(tab) => setCurrentTab(tab)}
            onItemClick={handleItemClick}
          />
        );
      case 'projects':
        return (
          <ProjectsPage
            onItemClick={handleItemClick}
            onOpenWorkbenchClick={handleOpenWorkbench}
          />
        );
      case 'tasks':
        return (
          <TasksPage
            onItemClick={handleItemClick}
            onOpenWorkbenchClick={handleOpenWorkbench}
          />
        );
      case 'in_progress':
        return (
          <InProgressPage
            onItemClick={handleItemClick}
            onOpenWorkbenchClick={handleOpenWorkbench}
          />
        );
      case 'completed':
        return <CompletedPage onItemClick={handleItemClick} />;
      case 'achievements':
        return <AchievementsPage onItemClick={handleItemClick} />;
      case 'languages':
        return (
          <LanguagesPage
            onAddLanguageClick={() => setIsAddLanguageOpen(true)}
            onItemClick={handleItemClick}
          />
        );
      case 'performance':
        return <PerformancePage onItemClick={handleItemClick} />;
      case 'certification':
        return (
          <CertificationPage
            onItemClick={handleItemClick}
          />
        );
      case 'settings':
        return <SettingsPage onItemClick={handleItemClick} />;
      default:
        return (
          <DashboardPage
            onOpenWorkbenchClick={handleOpenWorkbench}
            onOpenQualityCheckClick={() => setIsQualityCheckOpen(true)}
            onOpenGlossaryClick={() => setIsGlossaryOpen(true)}
            onSelectTab={(tab) => setCurrentTab(tab)}
            onItemClick={handleItemClick}
          />
        );
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
          onLoginClick={() => setCurrentTab('login')}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isCollapsed={isCollapsed}
          onSelectTab={(tab) => setCurrentTab(tab)}
          onSupportClick={() => setIsHelpOpen(true)}
        />

        {/* Dynamic Main Page Content */}
        <main className="pt-28 px-10 pb-16 min-h-screen">{renderContent()}</main>
      </div>

      {/* Floating AI Translator Copilot */}
      <FloatingAIAssistant />

      {/* Add Language Pair Modal */}
      <InteractiveModal
        isOpen={isAddLanguageOpen}
        onClose={() => setIsAddLanguageOpen(false)}
        title="Add Certified Language Pair"
        isDarkMode={isDarkMode}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsAddLanguageOpen(false);
          }}
          className="space-y-4 text-xs"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Source Language</label>
              <select
                className={`w-full px-3.5 py-2.5 rounded-xl border font-medium outline-none ${
                  isDarkMode ? 'bg-[#18181b] border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <option>German (DE)</option>
                <option>Spanish (ES)</option>
                <option>French (FR)</option>
                <option>Chinese (ZH)</option>
                <option>Italian (IT)</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Target Language</label>
              <select
                className={`w-full px-3.5 py-2.5 rounded-xl border font-medium outline-none ${
                  isDarkMode ? 'bg-[#18181b] border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <option>English (EN-US)</option>
                <option>English (EN-GB)</option>
                <option>German (DE)</option>
                <option>Spanish (ES)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Daily Capacity (Words/Day)</label>
            <input
              type="number"
              defaultValue={3500}
              className={`w-full px-3.5 py-2.5 rounded-xl border font-medium outline-none ${
                isDarkMode ? 'bg-[#18181b] border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
              }`}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Credential Upload</label>
            <input
              type="file"
              className={`w-full px-3 py-2 rounded-xl border text-slate-400 text-[11px] ${
                isDarkMode ? 'bg-[#18181b] border-zinc-700' : 'bg-slate-50 border-slate-200'
              }`}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAddLanguageOpen(false)}
              className="px-4 py-2 font-semibold text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-md transition-all cursor-pointer"
            >
              Submit for Verification
            </button>
          </div>
        </form>
      </InteractiveModal>

      {/* Start Certification Test Modal */}
      <InteractiveModal
        isOpen={isStartTestOpen}
        onClose={() => setIsStartTestOpen(false)}
        title="Sworn Credentialing Exam"
        isDarkMode={isDarkMode}
      >
        <div className="text-center py-4 space-y-4 text-xs">
          <div className="w-16 h-16 bg-blue-400/10 text-blue-400 rounded-3xl mx-auto flex items-center justify-center">
            <span className="material-symbols-outlined text-[32px]">quiz</span>
          </div>
          <div>
            <h4 className="font-bold text-base">ISO-17100 Certification Examination</h4>
            <p className="text-slate-400 mt-1 max-w-sm mx-auto">
              60-minute proctored assessment evaluating legal terminology accuracy and sworn compliance.
            </p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-zinc-800 rounded-2xl text-blue-400 dark:text-blue-300 font-semibold border border-blue-200 dark:border-zinc-700">
            Time Limit: 60 minutes • 30 Multiple Choice &amp; 2 Live Segments
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => setIsStartTestOpen(false)}
              className="px-4 py-2 font-semibold text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsStartTestOpen(false)}
              className="px-6 py-2.5 bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-md transition-all cursor-pointer"
            >
              Begin Exam
            </button>
          </div>
        </div>
      </InteractiveModal>

      {/* Full AI Translation Workbench Overlay Modal */}
      <InteractiveModal
        isOpen={workbenchTaskTitle !== null}
        onClose={() => setWorkbenchTaskTitle(null)}
        title={`AI Translation Workbench — ${workbenchTaskTitle}`}
        isDarkMode={isDarkMode}
      >
        <div className="space-y-4 text-xs">
          <div className="p-4 bg-gradient-to-r from-blue-400/10 to-indigo-500/10 border border-blue-400/30 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-400 text-[24px]">translate</span>
              <div>
                <h4 className="font-bold text-sm">German (DE) → English (EN)</h4>
                <p className="text-[10px] text-slate-400">Sworn Court Deed • Legal_DE_EN_v4.tmx</p>
              </div>
            </div>
            <span className="bg-emerald-500 text-white text-[9px] font-semibold px-2.5 py-0.5 rounded-full uppercase">
              100% TM MATCH
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-slate-100 dark:bg-zinc-800/80 rounded-xl font-medium">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Source Segment:</span>
              "Der Unterzeichnende bestätigt hiermit die Vollständigkeit der beigefügten Rechtsdokumente."
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-semibold text-blue-400 block">AI Translation:</span>
              <textarea
                defaultValue="The undersigned hereby confirms the completeness of the attached legal documents."
                rows={3}
                className={`w-full p-3 rounded-xl border text-xs font-medium outline-none focus:ring-2 focus:ring-blue-400/40 ${
                  isDarkMode ? 'bg-[#18181b] border-zinc-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-[10px] text-slate-400 font-mono">12 words • 86 characters</span>
            <div className="flex gap-2">
              <button
                onClick={() => setWorkbenchTaskTitle(null)}
                className="px-4 py-2 font-semibold text-slate-400 hover:text-slate-200"
              >
                Close
              </button>
              <button
                onClick={() => setWorkbenchTaskTitle(null)}
                className="px-5 py-2 bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs shadow-md transition-all cursor-pointer flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>Deliver Segment</span>
              </button>
            </div>
          </div>
        </div>
      </InteractiveModal>

      {/* Quality Pre-Check Modal */}
      <InteractiveModal
        isOpen={isQualityCheckOpen}
        onClose={() => setIsQualityCheckOpen(false)}
        title="Quality Pre-Check &amp; QA Scoring"
        isDarkMode={isDarkMode}
      >
        <div className="space-y-4 text-xs">
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl flex items-center gap-3">
            <span className="material-symbols-outlined text-emerald-500 text-[28px]">verified</span>
            <div>
              <h4 className="font-bold text-sm text-emerald-800 dark:text-emerald-300">QA Pass: 99.6% Compliance</h4>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400">Zero untranslated tags, zero spelling errors.</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800">
              <span>Terminology Consistency:</span>
              <span className="font-semibold text-emerald-500">Pass (100%)</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800">
              <span>Formatting &amp; Numbers:</span>
              <span className="font-semibold text-emerald-500">Pass (100%)</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800">
              <span>Spelling &amp; Grammar:</span>
              <span className="font-semibold text-emerald-500">Pass (99.2%)</span>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setIsQualityCheckOpen(false)}
              className="px-5 py-2.5 bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs shadow-md transition-all cursor-pointer"
            >
              Close Inspector
            </button>
          </div>
        </div>
      </InteractiveModal>

      {/* Glossary Manager Modal */}
      <InteractiveModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        title="Glossary &amp; Memory Manager"
        isDarkMode={isDarkMode}
      >
        <div className="space-y-4 text-xs">
          <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 rounded-2xl flex items-center gap-3">
            <span className="material-symbols-outlined text-amber-500 text-[24px]">menu_book</span>
            <div>
              <h4 className="font-bold text-sm text-amber-800 dark:text-amber-300">Sworn Legal Terminology DB</h4>
              <p className="text-[11px] text-amber-700 dark:text-amber-400">12,450 terms across DE, ES &amp; FR legal domains.</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="p-3 bg-slate-50 dark:bg-zinc-800 rounded-xl flex justify-between items-center">
              <div>
                <div className="font-semibold">DE_EN_Sworn_Legal_2026.tmx</div>
                <div className="text-[10px] text-slate-400">8,420 translation units</div>
              </div>
              <span className="text-[10px] font-semibold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full">ACTIVE</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800 rounded-xl flex justify-between items-center">
              <div>
                <div className="font-semibold">FR_EN_Pharma_Clinical_Glossary.xliff</div>
                <div className="text-[10px] text-slate-400">4,030 translation units</div>
              </div>
              <span className="text-[10px] font-semibold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full">ACTIVE</span>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setIsGlossaryOpen(false)}
              className="px-5 py-2.5 bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs shadow-md transition-all cursor-pointer"
            >
              Import Glossary (.TMX)
            </button>
          </div>
        </div>
      </InteractiveModal>

      {/* Upload Certificate Modal */}
      <InteractiveModal
        isOpen={isUploadDocOpen}
        onClose={() => setIsUploadDocOpen(false)}
        title="Upload Credential Document"
        isDarkMode={isDarkMode}
      >
        <div className="text-center py-4 space-y-4 text-xs">
          <div className="w-16 h-16 bg-blue-400/10 text-blue-400 rounded-3xl mx-auto flex items-center justify-center">
            <span className="material-symbols-outlined text-[32px]">cloud_upload</span>
          </div>
          <div>
            <h4 className="font-bold text-sm">Upload Sworn License or Diploma</h4>
            <p className="text-slate-400 mt-1">Upload PDF scan of court registration.</p>
          </div>
          <button
            onClick={() => setIsUploadDocOpen(false)}
            className="px-6 py-2.5 bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-md transition-all cursor-pointer"
          >
            Select PDF Document
          </button>
        </div>
      </InteractiveModal>

      {/* Help & Support Modal */}
      <InteractiveModal
        isOpen={isHelpOpen}
        onClose={() => {
          setIsHelpOpen(false);
          if (currentTab === 'help') setCurrentTab('dashboard');
        }}
        title="Translator Help &amp; Support"
        isDarkMode={isDarkMode}
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-400">Need help with sworn certifications, CAT editor integration, or payouts?</p>
          <div className="p-4 bg-blue-400/10 border border-blue-400/30 rounded-2xl space-y-2">
            <div className="font-bold text-blue-400 text-sm">Priority Support</div>
            <div className="text-slate-300">Email: translators-support@lexiverba.ai</div>
          </div>
        </div>
      </InteractiveModal>

      {/* Item Detail Inspector Modal */}
      <InteractiveModal
        isOpen={activeDetailItem !== null}
        onClose={() => setActiveDetailItem(null)}
        title={activeDetailItem?.title || 'Translator Asset Inspector'}
        isDarkMode={isDarkMode}
      >
        <div className="space-y-4 text-xs">
          {activeDetailItem?.badge && (
            <span className="inline-block bg-blue-400 text-white font-semibold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {activeDetailItem.badge}
            </span>
          )}
          <div className="p-4 bg-slate-100 dark:bg-zinc-800/80 rounded-2xl border border-slate-200 dark:border-zinc-700/60 font-medium leading-relaxed">
            {activeDetailItem?.subtitle}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setActiveDetailItem(null)}
              className="px-6 py-2.5 bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs shadow-md transition-all cursor-pointer"
            >
              Close Details
            </button>
          </div>
        </div>
      </InteractiveModal>
    </div>
  );
}

export default App;
