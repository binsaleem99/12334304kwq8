
import React, { useState, useEffect } from 'react';
import { ViewState } from './types.ts';
import LandingPage from './app/(public)/page.tsx';
import LoginPage from './app/(auth)/login/page.tsx';
import SignupPage from './app/(auth)/signup/page.tsx';
import DashboardPage from './app/dashboard/page.tsx';
import BuilderPage from './app/builder/page.tsx';
import PublicLayout from './app/(public)/layout.tsx';
import DashboardLayout from './components/dashboard/DashboardLayout.tsx';
import ProjectsListPage from './app/dashboard/projects/page.tsx';
import NewProjectWizard from './components/dashboard/projects/NewProjectWizard.tsx';
import TemplatesPage from './app/dashboard/templates/page.tsx';
import PublishedSitesPage from './app/dashboard/published/page.tsx';
import BillingSettings from './components/dashboard/settings/BillingSettings.tsx';
import AccountSettings from './components/dashboard/settings/AccountSettings.tsx';
import HelpCenter from './components/dashboard/help/HelpCenter.tsx';
import PreviewPage from './components/preview/PreviewPage.tsx';

export default function App() {
  const [view, setView] = useState<ViewState>('landing');

  // Simple hash-based router for external links or direct access
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as ViewState;
      if (hash) setView(hash);
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigate = (newView: ViewState) => {
    window.location.hash = newView;
    setView(newView);
  };

  const renderView = () => {
    switch (view) {
      case 'landing':
        return (
          <PublicLayout>
            <LandingPage />
          </PublicLayout>
        );
      case 'login':
        return <LoginPage onNavigate={navigate} />;
      case 'signup':
        return <SignupPage onNavigate={navigate} />;
      case 'dashboard':
        return (
          <DashboardLayout currentView={view} onNavigate={navigate}>
            <DashboardPage />
          </DashboardLayout>
        );
      case 'dashboard-projects':
        return (
          <DashboardLayout currentView={view} onNavigate={navigate}>
            <ProjectsListPage />
          </DashboardLayout>
        );
      case 'dashboard-new-project':
        return (
          <DashboardLayout currentView={view} onNavigate={navigate}>
            <NewProjectWizard onNavigate={navigate} />
          </DashboardLayout>
        );
      case 'dashboard-templates':
        return (
          <DashboardLayout currentView={view} onNavigate={navigate}>
            <TemplatesPage onNavigate={navigate} />
          </DashboardLayout>
        );
      case 'dashboard-published':
        return (
          <DashboardLayout currentView={view} onNavigate={navigate}>
            <PublishedSitesPage onNavigate={navigate} />
          </DashboardLayout>
        );
      case 'dashboard-billing':
        return (
          <DashboardLayout currentView={view} onNavigate={navigate}>
            <BillingSettings onNavigate={navigate} />
          </DashboardLayout>
        );
      case 'dashboard-account':
        return (
          <DashboardLayout currentView={view} onNavigate={navigate}>
            <AccountSettings onNavigate={navigate} />
          </DashboardLayout>
        );
      case 'dashboard-help':
        return (
          <DashboardLayout currentView={view} onNavigate={navigate}>
            <HelpCenter onNavigate={navigate} />
          </DashboardLayout>
        );
      case 'builder':
        return <BuilderPage onNavigate={navigate} />;
      case 'dashboard-preview':
        return <PreviewPage onNavigate={navigate} />;
      default:
        return (
          <PublicLayout>
            <LandingPage />
          </PublicLayout>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {renderView()}
    </div>
  );
}
