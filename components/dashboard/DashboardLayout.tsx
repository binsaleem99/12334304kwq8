import React, { useState } from 'react';
import DashboardNavbar from './layout/DashboardNavbar';
import Sidebar from './layout/Sidebar';
import { ViewState } from '../../types';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

/**
 * DashboardLayout component providing the main shell for the application's authenticated views.
 */
// Refactored from React.FC to standard function to resolve children type missing errors
export default function DashboardLayout({ children, currentView, onNavigate }: DashboardLayoutProps) {
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA]" dir="rtl">
      {/* Pass toggle to navbar for mobile menu trigger if needed */}
      <DashboardNavbar onNavigate={onNavigate} />
      
      <Sidebar 
        currentView={currentView} 
        onNavigate={onNavigate} 
        isMobileOpen={isSidebarMobileOpen}
        onMobileClose={() => setIsSidebarMobileOpen(false)}
      />
      
      {/* 
        Responsive Padding:
        - Mobile: Minimal padding on the right (pr-0) because sidebar is a drawer
        - Desktop: pr-[72px] or pr-[260px] based on sidebar width
      */}
      <main className="pt-20 pr-0 md:pr-[72px] lg:pr-[260px] transition-all duration-300 min-h-screen">
        <div className="container mx-auto p-4 md:p-8 max-w-7xl">
          {children}
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {isSidebarMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarMobileOpen(false)}
        />
      )}
    </div>
  );
}