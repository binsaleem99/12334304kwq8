import React, { useState, useEffect } from 'react';
/* Fixed: Standardized imports to use lowercase facades to resolve casing conflicts */
import Navbar from './components/landing/navbar.tsx';
import Hero from './components/landing/Hero.tsx';
import PromptHub from './components/landing/PromptHub.tsx';
import Features from './components/landing/Features.tsx';
import Pricing from './components/landing/Pricing.tsx';
import SocialProof from './components/landing/SocialProof.tsx';
import FinalCTA from './components/landing/FinalCTA.tsx';
/* Fixed: Standardized imports to use lowercase facades to resolve casing conflicts */
import Footer from './components/layout/footer.tsx';
import LoginForm from './components/auth/LoginForm.tsx';
import SignupForm from './components/auth/SignupForm.tsx';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm.tsx';
import ResetPasswordForm from './components/auth/ResetPasswordForm.tsx';
import EmailVerification from './components/auth/EmailVerification.tsx';
import PublicHelpCenter from './components/public/PublicHelpCenter.tsx';
import SystemStatusPage from './components/public/SystemStatusPage.tsx';
import ContactPage from './components/public/ContactPage.tsx';
import AboutPage from './components/public/AboutPage.tsx';
import BlogHome from './components/public/BlogHome.tsx';
import BlogPost from './components/public/BlogPost.tsx';
import ChangelogPage from './components/public/ChangelogPage.tsx';
import LegalPage from './components/public/LegalPage.tsx';
import DashboardLayout from './components/dashboard/DashboardLayout.tsx';
import DashboardHome from './components/dashboard/home/DashboardHome.tsx';
import ProjectsList from './components/dashboard/projects/ProjectsList.tsx';
import NewProjectWizard from './components/dashboard/projects/NewProjectWizard.tsx';
import TemplatesPage from './app/dashboard/templates/page.tsx';
import PublishedSites from './components/dashboard/published/PublishedSites.tsx';
import AccountSettings from './components/dashboard/settings/AccountSettings.tsx';
import BillingSettings from './components/dashboard/settings/BillingSettings.tsx';
import ProjectSettings from './components/dashboard/settings/ProjectSettings.tsx';
import DomainsManager from './components/dashboard/domains/DomainsManager.tsx';
import HelpCenter from './components/dashboard/help/HelpCenter.tsx';
import DashboardAnalytics from './components/dashboard/analytics/DashboardAnalytics.tsx';
import PublishPage from './app/dashboard/projects/[id]/publish/page.tsx';
import AIBuilder from './components/builder/AIBuilder.tsx';
import PreviewPage from './components/preview/PreviewPage.tsx';
import PaymentPage from './components/checkout/PaymentPage.tsx';
import SuccessPage from './components/checkout/SuccessPage.tsx';
import FailedPage from './components/checkout/FailedPage.tsx';
import NotFoundPage from './components/errors/NotFoundPage.tsx';
import ServerErrorPage from './components/errors/ServerErrorPage.tsx';
import MaintenancePage from './components/errors/MaintenancePage.tsx';
import AdminLayout from './components/admin/AdminLayout.tsx';
import AdminOverview from './components/admin/overview/AdminOverview.tsx';
import AdminUsers from './components/admin/users/AdminUsers.tsx';
import AdminProjects from './components/admin/projects/AdminProjects.tsx';
import AdminTemplates from './components/admin/templates/AdminTemplates.tsx';
import AdminBilling from './components/admin/billing/AdminBilling.tsx';
import AdminPackages from './app/admin/packages/page.tsx';
import AdminAnalytics from './components/admin/analytics/AdminAnalytics.tsx';
import AdminBlog from './app/admin/blog/page.tsx';
import AdminLogs from './components/admin/logs/AdminLogs.tsx';
import AdminReferrals from './components/admin/referrals/AdminReferrals.tsx';
import AdminSettings from './components/admin/settings/AdminSettings.tsx';
import AdminSystem from './app/admin/system/page.tsx';
// Importing the new Affiliates page component
import AffiliatesPage from './app/admin/affiliates/page.tsx';
import { ViewState } from './types.ts';
import NetworkStatus from './components/ui/NetworkStatus.tsx';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  useEffect(() => {
    const handleHashChange = () => {
       const hash = window.location.hash;
       if (hash.startsWith('#login')) setCurrentView('login');
       else if (hash.startsWith('#signup')) setCurrentView('signup');
       else if (hash.startsWith('#forgot-password')) setCurrentView('forgot-password');
       else if (hash.startsWith('#reset-password')) setCurrentView('reset-password');
       else if (hash.startsWith('#verify-email')) setCurrentView('verify-email');
       else if (hash.startsWith('#help') || hash.startsWith('#faq')) setCurrentView('public-help');
       else if (hash.startsWith('#status')) setCurrentView('system-status');
       else if (hash.startsWith('#contact')) setCurrentView('contact');
       else if (hash.startsWith('#about')) setCurrentView('about');
       else if (hash.startsWith('#blog-post')) setCurrentView('blog-post');
       else if (hash.startsWith('#blog')) setCurrentView('blog');
       else if (hash.startsWith('#changelog')) setCurrentView('changelog');
       else if (hash.startsWith('#terms')) setCurrentView('terms');
       else if (hash.startsWith('#privacy')) setCurrentView('privacy');
       else if (hash.startsWith('#refund')) setCurrentView('refund');
       else if (hash.startsWith('#dashboard-projects')) setCurrentView('dashboard-projects');
       else if (hash.startsWith('#dashboard-new-project')) setCurrentView('dashboard-new-project');
       else if (hash.startsWith('#dashboard-templates')) setCurrentView('dashboard-templates');
       else if (hash.startsWith('#dashboard-published')) setCurrentView('dashboard-published');
       else if (hash.startsWith('#dashboard-account')) setCurrentView('dashboard-account');
       else if (hash.startsWith('#dashboard-billing')) setCurrentView('dashboard-billing');
       else if (hash.startsWith('#dashboard-settings')) setCurrentView('dashboard-settings');
       else if (hash.startsWith('#dashboard-domains')) setCurrentView('dashboard-domains');
       else if (hash.startsWith('#dashboard-help')) setCurrentView('dashboard-help');
       else if (hash.startsWith('#dashboard-analytics')) setCurrentView('dashboard-analytics');
       else if (hash.startsWith('#dashboard-publish')) setCurrentView('dashboard-publish');
       else if (hash.startsWith('#dashboard-preview')) setCurrentView('dashboard-preview');
       else if (hash.startsWith('#dashboard')) setCurrentView('dashboard');
       else if (hash.startsWith('#builder')) setCurrentView('builder');
       else if (hash.startsWith('#checkout-payment')) setCurrentView('checkout-payment');
       else if (hash.startsWith('#checkout-success')) setCurrentView('checkout-success');
       else if (hash.startsWith('#checkout-failed')) setCurrentView('checkout-failed');
       else if (hash.startsWith('#admin-users')) setCurrentView('admin-users');
       else if (hash.startsWith('#admin-projects')) setCurrentView('admin-projects');
       else if (hash.startsWith('#admin-templates')) setCurrentView('admin-templates');
       else if (hash.startsWith('#admin-billing')) setCurrentView('admin-billing');
       else if (hash.startsWith('#admin-packages')) setCurrentView('admin-packages');
       else if (hash.startsWith('#admin-analytics')) setCurrentView('admin-analytics');
       else if (hash.startsWith('#admin-blog')) setCurrentView('admin-blog');
       else if (hash.startsWith('#admin-logs')) setCurrentView('admin-logs');
       else if (hash.startsWith('#admin-referrals')) setCurrentView('admin-referrals');
       else if (hash.startsWith('#admin-affiliates')) setCurrentView('admin-affiliates');
       else if (hash.startsWith('#admin-settings')) setCurrentView('admin-settings');
       else if (hash.startsWith('#admin-system')) setCurrentView('admin-system');
       else if (hash.startsWith('#admin')) setCurrentView('admin');
       else if (hash.startsWith('#404')) setCurrentView('404');
       else if (hash.startsWith('#500')) setCurrentView('500');
       else if (hash.startsWith('#maintenance')) setCurrentView('maintenance');
       else if (!hash || hash === '#' || hash === '') setCurrentView('landing');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (view: ViewState) => {
    setCurrentView(view);
    const hashMap: Record<ViewState, string> = {
      'landing': '', 'login': 'login', 'signup': 'signup', 'forgot-password': 'forgot-password', 
      'reset-password': 'reset-password', 'verify-email': 'verify-email', 'public-help': 'help',
      'system-status': 'status', 'contact': 'contact', 'about': 'about', 'blog': 'blog',
      'blog-post': 'blog-post', 'changelog': 'changelog', 'terms': 'terms', 'privacy': 'privacy', 
      'refund': 'refund', 'dashboard': 'dashboard', 'dashboard-projects': 'dashboard-projects',
      'dashboard-new-project': 'dashboard-new-project', 'dashboard-templates': 'dashboard-templates',
      'dashboard-published': 'dashboard-published', 'dashboard-account': 'dashboard-account',
      'dashboard-billing': 'dashboard-billing', 'dashboard-settings': 'dashboard-settings',
      'dashboard-domains': 'dashboard-domains', 'dashboard-help': 'dashboard-help',
      'dashboard-preview': 'dashboard-preview', 'builder': 'builder', 'checkout-payment': 'checkout-payment',
      'checkout-success': 'checkout-success', 'checkout-failed': 'checkout-failed', 'admin': 'admin',
      'admin-users': 'admin-users', 'admin-projects': 'admin-projects', 'admin-templates': 'admin-templates',
      'admin-billing': 'admin-billing', 'admin-packages': 'admin-packages', 'admin-analytics': 'admin-analytics', 'admin-blog': 'admin-blog',
      'admin-logs': 'admin-logs', 'admin-referrals': 'admin-referrals', 'admin-affiliates': 'admin-affiliates', 'admin-settings': 'admin-settings',
      'admin-system': 'admin-system',
      'dashboard-analytics': 'dashboard-analytics', 'dashboard-publish': 'dashboard-publish',
      '404': '404', '500': '500', 'maintenance': 'maintenance', 
      'debug-insufficient-credits': 'debug-insufficient-credits', 'hiring': 'hiring'
    };
    window.location.hash = hashMap[view] || '';
    window.scrollTo(0, 0);
  };

  const renderPublicLayout = (children: React.ReactNode) => (
    <div className="min-h-screen bg-white">
      <Navbar onNavigate={navigate} />
      {children}
      <Footer />
    </div>
  );

  // Authentication Views
  if (currentView === 'login') return <LoginForm onNavigate={navigate} />;
  if (currentView === 'signup') return <SignupForm onNavigate={navigate} />;
  if (currentView === 'forgot-password') return <ForgotPasswordForm onNavigate={navigate} />;
  if (currentView === 'reset-password') return <ResetPasswordForm onNavigate={navigate} />;
  if (currentView === 'verify-email') return <EmailVerification onNavigate={navigate} />;

  // Public Information Views
  if (currentView === 'public-help') return renderPublicLayout(<PublicHelpCenter onNavigate={navigate} />);
  if (currentView === 'system-status') return renderPublicLayout(<SystemStatusPage onNavigate={navigate} />);
  if (currentView === 'contact') return renderPublicLayout(<ContactPage onNavigate={navigate} />);
  if (currentView === 'about') return renderPublicLayout(<AboutPage onNavigate={navigate} />);
  if (currentView === 'blog') return renderPublicLayout(<BlogHome onNavigate={navigate} />);
  if (currentView === 'blog-post') return renderPublicLayout(<BlogPost onNavigate={navigate} />);
  if (currentView === 'changelog') return renderPublicLayout(<ChangelogPage onNavigate={navigate} />);
  if (currentView === 'terms') return renderPublicLayout(<LegalPage view="terms" />);
  if (currentView === 'privacy') return renderPublicLayout(<LegalPage view="privacy" />);
  if (currentView === 'refund') return renderPublicLayout(<LegalPage view="refund" />);

  // Functional Builder & Checkout Views
  if (currentView === 'builder') return <AIBuilder onNavigate={navigate} />;
  if (currentView === 'dashboard-preview') return <PreviewPage onNavigate={navigate} />;
  if (currentView === 'checkout-payment') return <PaymentPage onNavigate={navigate} />;
  if (currentView === 'checkout-success') return <SuccessPage onNavigate={navigate} />;
  if (currentView === 'checkout-failed') return <FailedPage onNavigate={navigate} />;

  // Error Pages
  if (currentView === '404') return <NotFoundPage onNavigate={navigate} />;
  if (currentView === '500') return <ServerErrorPage onNavigate={navigate} />;
  if (currentView === 'maintenance') return <MaintenancePage onNavigate={navigate} />;

  // Admin Views
  if (currentView.startsWith('admin')) {
    return (
      <AdminLayout currentView={currentView} onNavigate={navigate}>
        {currentView === 'admin' && <AdminOverview />}
        {currentView === 'admin-users' && <AdminUsers />}
        {currentView === 'admin-projects' && <AdminProjects />}
        {currentView === 'admin-templates' && <AdminTemplates />}
        {currentView === 'admin-billing' && <AdminBilling />}
        {currentView === 'admin-packages' && <AdminPackages />}
        {currentView === 'admin-analytics' && <AdminAnalytics />}
        {currentView === 'admin-blog' && <AdminBlog onNavigate={navigate} />}
        {currentView === 'admin-logs' && <AdminLogs />}
        {currentView === 'admin-referrals' && <AdminReferrals />}
        {currentView === 'admin-affiliates' && <AffiliatesPage />}
        {currentView === 'admin-settings' && <AdminSettings />}
        {currentView === 'admin-system' && <AdminSystem />}
      </AdminLayout>
    );
  }

  // Dashboard Views
  if (currentView.startsWith('dashboard')) {
    return (
      <DashboardLayout currentView={currentView} onNavigate={navigate}>
        {currentView === 'dashboard' && <DashboardHome onNavigate={navigate} />}
        {currentView === 'dashboard-projects' && <ProjectsList onNavigate={navigate} />}
        {currentView === 'dashboard-new-project' && <NewProjectWizard onNavigate={navigate} />}
        {currentView === 'dashboard-templates' && <TemplatesPage onNavigate={navigate} />}
        {currentView === 'dashboard-published' && <PublishedSites onNavigate={navigate} />}
        {currentView === 'dashboard-account' && <AccountSettings onNavigate={navigate} />}
        {currentView === 'dashboard-billing' && <BillingSettings onNavigate={navigate} />}
        {currentView === 'dashboard-settings' && <ProjectSettings onNavigate={navigate} />}
        {currentView === 'dashboard-domains' && <DomainsManager onNavigate={navigate} />}
        {currentView === 'dashboard-help' && <HelpCenter onNavigate={navigate} />}
        {currentView === 'dashboard-analytics' && <DashboardAnalytics />}
        {currentView === 'dashboard-publish' && <PublishPage onNavigate={navigate} />}
      </DashboardLayout>
    );
  }

  // Landing Page (Default)
  return (
    <div className="min-h-screen bg-white">
      <NetworkStatus />
      <Navbar onNavigate={navigate} />
      <main>
        <Hero />
        <PromptHub onNavigate={navigate} />
        <Features />
        <Pricing />
        <SocialProof />
        <FinalCTA onNavigate={navigate} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
