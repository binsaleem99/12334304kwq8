import React, { useState, useEffect } from 'react';
import Navbar from './components/landing/Navbar';
import Hero from './components/landing/Hero';
import PromptHub from './components/landing/PromptHub';
import Features from './components/landing/Features';
import Pricing from './components/landing/Pricing';
import SocialProof from './components/landing/SocialProof';
import FinalCTA from './components/landing/FinalCTA';
import Footer from './components/layout/Footer';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';
import ResetPasswordForm from './components/auth/ResetPasswordForm';
import EmailVerification from './components/auth/EmailVerification';
import BlogHome from './components/public/BlogHome';
import BlogPost from './components/public/BlogPost';
import HiringPage from './components/public/HiringPage';
import AboutPage from './components/public/AboutPage';
import ContactPage from './components/public/ContactPage';
import ChangelogPage from './components/public/ChangelogPage';
import LegalPage from './components/public/LegalPage';
import PublicHelpCenter from './components/public/PublicHelpCenter';
import SystemStatusPage from './components/public/SystemStatusPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './components/dashboard/home/DashboardHome';
import ProjectsList from './components/dashboard/projects/ProjectsList';
import NewProjectWizard from './components/dashboard/projects/NewProjectWizard';
import TemplatesGallery from './components/dashboard/templates/TemplatesGallery';
import PublishedSites from './components/dashboard/published/PublishedSites';
import ProjectSettings from './components/dashboard/settings/ProjectSettings';
import AccountSettings from './components/dashboard/settings/AccountSettings';
import BillingSettings from './components/dashboard/settings/BillingSettings';
import DomainsManager from './components/dashboard/domains/DomainsManager';
import HelpCenter from './components/dashboard/help/HelpCenter';
import AIBuilder from './components/builder/AIBuilder';
import PreviewPage from './components/preview/PreviewPage';
import PaymentPage from './components/checkout/PaymentPage';
import SuccessPage from './components/checkout/SuccessPage';
import FailedPage from './components/checkout/FailedPage';
import NotFoundPage from './components/errors/NotFoundPage';
import ServerErrorPage from './components/errors/ServerErrorPage';
import MaintenancePage from './components/errors/MaintenancePage';
import InsufficientCreditsModal from './components/modals/InsufficientCreditsModal';
import NetworkStatus from './components/ui/NetworkStatus';
// Admin Imports
import AdminLayout from './components/admin/AdminLayout';
import AdminOverview from './components/admin/overview/AdminOverview';
import AdminUsers from './components/admin/users/AdminUsers';
import AdminProjects from './components/admin/projects/AdminProjects';
import AdminTemplates from './components/admin/templates/AdminTemplates';
import AdminBilling from './components/admin/billing/AdminBilling';
import AdminAnalytics from './components/admin/analytics/AdminAnalytics';
import AdminBlog from './components/admin/blog/AdminBlog';
import AdminLogs from './components/admin/logs/AdminLogs';
import AdminReferrals from './components/admin/referrals/AdminReferrals';
import AdminSettings from './components/admin/settings/AdminSettings';
import { ViewState } from './types';

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
       else if (hash.startsWith('#blog-post')) setCurrentView('blog-post');
       else if (hash.startsWith('#blog')) setCurrentView('blog');
       else if (hash.startsWith('#hiring')) setCurrentView('hiring');
       else if (hash.startsWith('#about')) setCurrentView('about');
       else if (hash.startsWith('#contact')) setCurrentView('contact');
       else if (hash.startsWith('#changelog')) setCurrentView('changelog');
       else if (hash.startsWith('#terms')) setCurrentView('terms');
       else if (hash.startsWith('#privacy')) setCurrentView('privacy');
       else if (hash.startsWith('#refund')) setCurrentView('refund');
       else if (hash.startsWith('#help') || hash.startsWith('#faq')) setCurrentView('public-help');
       else if (hash.startsWith('#status')) setCurrentView('system-status');
       else if (hash.startsWith('#dashboard/new')) setCurrentView('dashboard-new-project');
       else if (hash.startsWith('#dashboard/templates')) setCurrentView('dashboard-templates');
       else if (hash.startsWith('#dashboard/published')) setCurrentView('dashboard-published');
       else if (hash.startsWith('#dashboard/projects/settings')) setCurrentView('dashboard-settings');
       else if (hash.startsWith('#dashboard/projects')) setCurrentView('dashboard-projects');
       else if (hash.startsWith('#dashboard/billing')) setCurrentView('dashboard-billing');
       else if (hash.startsWith('#dashboard/account')) setCurrentView('dashboard-account');
       else if (hash.startsWith('#dashboard/domains')) setCurrentView('dashboard-domains');
       else if (hash.startsWith('#dashboard/help')) setCurrentView('dashboard-help');
       else if (hash.startsWith('#builder')) setCurrentView('builder');
       else if (hash.startsWith('#dashboard-preview')) setCurrentView('dashboard-preview');
       else if (hash.startsWith('#checkout/payment')) setCurrentView('checkout-payment');
       else if (hash.startsWith('#checkout/success')) setCurrentView('checkout-success');
       else if (hash.startsWith('#checkout/failed')) setCurrentView('checkout-failed');
       else if (hash.startsWith('#404')) setCurrentView('404');
       else if (hash.startsWith('#500')) setCurrentView('500');
       else if (hash.startsWith('#maintenance')) setCurrentView('maintenance');
       else if (hash.startsWith('#admin/users')) setCurrentView('admin-users');
       else if (hash.startsWith('#admin/projects')) setCurrentView('admin-projects');
       else if (hash.startsWith('#admin/templates')) setCurrentView('admin-templates');
       else if (hash.startsWith('#admin/billing')) setCurrentView('admin-billing');
       else if (hash.startsWith('#admin/analytics')) setCurrentView('admin-analytics');
       else if (hash.startsWith('#admin/blog')) setCurrentView('admin-blog');
       else if (hash.startsWith('#admin/logs')) setCurrentView('admin-logs');
       else if (hash.startsWith('#admin/referrals')) setCurrentView('admin-referrals');
       else if (hash.startsWith('#admin/settings')) setCurrentView('admin-settings');
       else if (hash.startsWith('#admin')) setCurrentView('admin');
       else if (!hash || hash === '#' || hash === '') setCurrentView('landing');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (view: ViewState) => {
    setCurrentView(view);
    const hashMap: Record<string, string> = {
      'login': 'login',
      'signup': 'signup',
      'forgot-password': 'forgot-password',
      'reset-password': 'reset-password',
      'verify-email': 'verify-email',
      'blog': 'blog',
      'blog-post': 'blog-post',
      'hiring': 'hiring',
      'about': 'about',
      'contact': 'contact',
      'changelog': 'changelog',
      'terms': 'terms',
      'privacy': 'privacy',
      'refund': 'refund',
      'public-help': 'help',
      'system-status': 'status',
      'dashboard': 'dashboard',
      'dashboard-projects': 'dashboard/projects',
      'dashboard-settings': 'dashboard/projects/settings',
      'dashboard-new-project': 'dashboard/new',
      'dashboard-templates': 'dashboard/templates',
      'dashboard-published': 'dashboard/published',
      'dashboard-billing': 'dashboard/billing',
      'dashboard-account': 'dashboard/account',
      'dashboard-domains': 'dashboard/domains',
      'dashboard-help': 'dashboard/help',
      'builder': 'builder',
      'dashboard-preview': 'dashboard-preview',
      'checkout-payment': 'checkout/payment',
      'checkout-success': 'checkout/success',
      'checkout-failed': 'checkout/failed',
      '404': '404',
      '500': '500',
      'maintenance': 'maintenance',
      'admin': 'admin',
      'admin-users': 'admin/users',
      'admin-projects': 'admin/projects',
      'admin-templates': 'admin/templates',
      'admin-billing': 'admin/billing',
      'admin-analytics': 'admin/analytics',
      'admin-blog': 'admin/blog',
      'admin-logs': 'admin/logs',
      'admin-referrals': 'admin/referrals',
      'admin-settings': 'admin/settings',
      'landing': ''
    };
    window.location.hash = hashMap[view] || '';
    window.scrollTo(0, 0);
  };

  // Public Views (Non-Dashboard)
  if (currentView === 'login') return <LoginForm onNavigate={navigate} />;
  if (currentView === 'signup') return <SignupForm onNavigate={navigate} />;
  if (currentView === 'forgot-password') return <ForgotPasswordForm onNavigate={navigate} />;
  if (currentView === 'reset-password') return <ResetPasswordForm onNavigate={navigate} />;
  if (currentView === 'verify-email') return <EmailVerification onNavigate={navigate} />;
  
  // Reusable wrapper for standard public pages
  const renderPublicLayout = (children: React.ReactNode) => (
    <div className="min-h-screen bg-white">
      <Navbar onNavigate={navigate} />
      {children}
      <Footer onNavigate={navigate} />
      <NetworkStatus />
    </div>
  );

  if (currentView === 'blog') return renderPublicLayout(<BlogHome onNavigate={navigate} />);
  if (currentView === 'blog-post') return renderPublicLayout(<BlogPost onNavigate={navigate} />);
  if (currentView === 'hiring') return renderPublicLayout(<HiringPage onNavigate={navigate} />);
  if (currentView === 'about') return renderPublicLayout(<AboutPage onNavigate={navigate} />);
  if (currentView === 'contact') return renderPublicLayout(<ContactPage onNavigate={navigate} />);
  if (currentView === 'changelog') return renderPublicLayout(<ChangelogPage onNavigate={navigate} />);
  if (currentView === 'public-help') return renderPublicLayout(<PublicHelpCenter onNavigate={navigate} />);
  if (currentView === 'system-status') return renderPublicLayout(<SystemStatusPage onNavigate={navigate} />);
  if (['terms', 'privacy', 'refund'].includes(currentView)) return renderPublicLayout(<LegalPage view={currentView as any} />);

  if (currentView === 'builder') return <AIBuilder onNavigate={navigate} />;
  if (currentView === 'dashboard-preview') return <PreviewPage onNavigate={navigate} />;
  if (currentView === 'checkout-payment') return <PaymentPage onNavigate={navigate} />;
  if (currentView === 'checkout-success') return <SuccessPage onNavigate={navigate} />;
  if (currentView === 'checkout-failed') return <FailedPage onNavigate={navigate} />;
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
        {currentView === 'admin-analytics' && <AdminAnalytics />}
        {currentView === 'admin-blog' && <AdminBlog />}
        {currentView === 'admin-logs' && <AdminLogs />}
        {currentView === 'admin-referrals' && <AdminReferrals />}
        {currentView === 'admin-settings' && <AdminSettings />}
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
        {currentView === 'dashboard-templates' && <TemplatesGallery onNavigate={navigate} />}
        {currentView === 'dashboard-published' && <PublishedSites onNavigate={navigate} />}
        {currentView === 'dashboard-settings' && <ProjectSettings onNavigate={navigate} />}
        {currentView === 'dashboard-account' && <AccountSettings onNavigate={navigate} />}
        {currentView === 'dashboard-billing' && <BillingSettings onNavigate={navigate} />}
        {currentView === 'dashboard-domains' && <DomainsManager onNavigate={navigate} />}
        {currentView === 'dashboard-help' && <HelpCenter onNavigate={navigate} />}
        <NetworkStatus />
      </DashboardLayout>
    );
  }

  // Landing Page (Default)
  return (
    <div className="min-h-screen bg-white">
      <Navbar onNavigate={navigate} />
      <main>
        <Hero onNavigate={navigate} />
        <PromptHub onNavigate={navigate} />
        <Features />
        <Pricing />
        <SocialProof />
        <FinalCTA onNavigate={navigate} />
      </main>
      <Footer onNavigate={navigate} />
      <NetworkStatus />
    </div>
  );
}

export default App;