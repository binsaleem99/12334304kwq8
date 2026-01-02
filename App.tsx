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
import PublicHelpCenter from './components/public/PublicHelpCenter';
import SystemStatusPage from './components/public/SystemStatusPage';
import ContactPage from './components/public/ContactPage';
import AboutPage from './components/public/AboutPage';
import BlogHome from './components/public/BlogHome';
import BlogPost from './components/public/BlogPost';
import ChangelogPage from './components/public/ChangelogPage';
import LegalPage from './components/public/LegalPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './components/dashboard/home/DashboardHome';
import AIBuilder from './components/builder/AIBuilder';
import { ViewState } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  useEffect(() => {
    const handleHashChange = () => {
       const hash = window.location.hash;
       if (hash.startsWith('#login')) setCurrentView('login');
       else if (hash.startsWith('#signup')) setCurrentView('signup');
       else if (hash.startsWith('#help') || hash.startsWith('#faq')) setCurrentView('public-help');
       else if (hash.startsWith('#status')) setCurrentView('system-status');
       else if (hash.startsWith('#contact')) setCurrentView('contact');
       else if (hash.startsWith('#about')) setCurrentView('about');
       else if (hash.startsWith('#blog-post')) setCurrentView('blog-post');
       else if (hash.startsWith('#blog')) setCurrentView('blog');
       else if (hash.startsWith('#changelog')) setCurrentView('changelog');
       else if (hash.startsWith('#terms')) setCurrentView('terms');
       else if (hash.startsWith('#dashboard')) setCurrentView('dashboard');
       else if (hash.startsWith('#builder')) setCurrentView('builder');
       else if (!hash || hash === '#' || hash === '') setCurrentView('landing');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (view: ViewState) => {
    setCurrentView(view);
    const hashMap: Record<string, string> = {
      'landing': '', 'login': 'login', 'signup': 'signup', 'public-help': 'help',
      'system-status': 'status', 'contact': 'contact', 'about': 'about', 'blog': 'blog',
      'blog-post': 'blog-post', 'changelog': 'changelog', 'terms': 'terms', 'dashboard': 'dashboard', 'builder': 'builder'
    };
    window.location.hash = hashMap[view] || '';
    window.scrollTo(0, 0);
  };

  const renderPublicLayout = (children: React.ReactNode) => (
    <div className="min-h-screen bg-white">
      <Navbar onNavigate={navigate} />
      {children}
      <Footer onNavigate={navigate} />
    </div>
  );

  if (currentView === 'login') return <LoginForm onNavigate={navigate} />;
  if (currentView === 'signup') return <SignupForm onNavigate={navigate} />;
  if (currentView === 'public-help') return renderPublicLayout(<PublicHelpCenter onNavigate={navigate} />);
  if (currentView === 'system-status') return renderPublicLayout(<SystemStatusPage onNavigate={navigate} />);
  if (currentView === 'contact') return renderPublicLayout(<ContactPage onNavigate={navigate} />);
  if (currentView === 'about') return renderPublicLayout(<AboutPage onNavigate={navigate} />);
  if (currentView === 'blog') return renderPublicLayout(<BlogHome onNavigate={navigate} />);
  if (currentView === 'blog-post') return renderPublicLayout(<BlogPost onNavigate={navigate} />);
  if (currentView === 'changelog') return renderPublicLayout(<ChangelogPage onNavigate={navigate} />);
  if (currentView === 'terms') return renderPublicLayout(<LegalPage view="terms" />);
  if (currentView === 'builder') return <AIBuilder onNavigate={navigate} />;

  if (currentView.startsWith('dashboard')) {
    return (
      <DashboardLayout currentView={currentView} onNavigate={navigate}>
        {currentView === 'dashboard' && <DashboardHome onNavigate={navigate} />}
      </DashboardLayout>
    );
  }

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
    </div>
  );
}

export default App;