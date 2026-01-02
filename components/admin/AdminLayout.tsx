import React from 'react';
import AdminNavbar from './layout/AdminNavbar';
import AdminSidebar from './layout/AdminSidebar';
import { ViewState } from '../../types';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, currentView, onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFFFF] font-sans">
      <AdminNavbar onNavigate={onNavigate} />
      <AdminSidebar currentView={currentView} onNavigate={onNavigate} />
      
      <main className="pt-14 pl-60 min-h-screen">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;