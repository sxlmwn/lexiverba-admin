import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './theme';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { FloatingAIAssistant } from './components/FloatingAIAssistant';
import { DashboardPage } from './pages/DashboardPage';
import { UsersPage } from './pages/UsersPage';
import { FinancePage } from './pages/FinancePage';
import { PricingPage } from './pages/PricingPage';
import { AgencyAnalyticsPage } from './pages/AgencyAnalyticsPage';
import { AgencyInvoicesPage } from './pages/AgencyInvoicesPage';
import { CustomerOrdersPage } from './pages/CustomerOrdersPage';
import { CustomerFeedbackPage } from './pages/CustomerFeedbackPage';
import { TranslationQualityPage } from './pages/TranslationQualityPage';
import { BatchOperationsPage } from './pages/BatchOperationsPage';
import { ComingSoonPage } from './pages/ComingSoonPage';
import { RolePortalPage } from './pages/RolePortalPage';

const AppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { isDarkMode, toggleDarkMode } = useTheme();

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'users':
        return <UsersPage />;
      case 'finance':
        return <FinancePage />;
      case 'pricing':
        return <PricingPage />;
      case 'agency_analytics':
        return <AgencyAnalyticsPage />;
      case 'agency_invoices':
        return <AgencyInvoicesPage />;
      case 'customer_orders':
        return <CustomerOrdersPage />;
      case 'customer_feedback':
        return <CustomerFeedbackPage />;
      case 'translation_quality':
        return <TranslationQualityPage />;
      case 'batch_operations':
        return <BatchOperationsPage />;
        
      // Coming soon pages
      case 'analytics': return <ComingSoonPage title="Analytics Platform" icon="bar_chart" />;
      case 'nps_analytics': return <ComingSoonPage title="Advanced NPS Analytics" icon="sentiment_satisfied" />;
      case 'partner_applications': return <ComingSoonPage title="Partner Applications" icon="handshake" />;
      case 'commissions': return <ComingSoonPage title="Commissions System" icon="payments" />;
      case 'referral_analytics': return <ComingSoonPage title="Referral Analytics" icon="share" />;
      case 'survey_campaigns': return <ComingSoonPage title="Survey Campaigns" icon="poll" />;
      case 'workflow_builder': return <ComingSoonPage title="Visual Workflow Builder" icon="account_tree" />;
      case 'email_management': return <ComingSoonPage title="Email Template Management" icon="mail" />;
      case 'report_builder': return <ComingSoonPage title="Custom Report Builder" icon="analytics" />;

      // Role Portals
      case 'customer_portal': return <RolePortalPage title="Customer Portal" icon="person" />;
      case 'agency_portal': return <RolePortalPage title="Agency Portal" icon="corporate_fare" />;
      case 'qa_portal': return <RolePortalPage title="QA Portal" icon="fact_check" />;
      case 'translator_portal': return <RolePortalPage title="Translator Portal" icon="translate" />;
      case 'notary_portal': return <RolePortalPage title="Notary Portal" icon="gavel" />;
      case 'courier_portal': return <RolePortalPage title="Courier Portal" icon="local_shipping" />;
      case 'referral_partner_portal': return <RolePortalPage title="Referral Partner Portal" icon="share" />;

      default:
        // Default catch-all (like clicking a fast link or unmapped)
        if (currentTab === 'users') return <UsersPage />;
        return <DashboardPage />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#09090b] text-slate-100' : 'bg-[#f8fafc] text-slate-900'}`}>
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
          toggleDarkMode={toggleDarkMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isCollapsed={isCollapsed}
        />
        
        <main className="pt-28 px-10 pb-16 min-h-screen">
          {renderContent()}
        </main>
      </div>

      <FloatingAIAssistant />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider defaultDark={true}>
      <AppContent />
    </ThemeProvider>
  );
}
