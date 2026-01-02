import React from 'react';
import { Search, Bell, User, LogOut } from 'lucide-react';
import { ViewState } from '../../../types';

interface AdminNavbarProps {
  onNavigate: (view: ViewState) => void;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ onNavigate }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-14 bg-[#0A0A0A] border-b border-[#333333] z-50 flex items-center justify-between px-4">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('admin')}>
        <div className="bg-[#7C3AED] w-8 h-8 flex items-center justify-center font-black text-white rounded">A</div>
        <span className="font-bold text-white tracking-wider">KWQ8 ADMIN</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xl mx-8 relative hidden md:block">
        <input 
            type="text" 
            placeholder="Search users, projects, logs..." 
            className="w-full bg-[#1A1A1A] border border-[#333333] rounded px-4 py-2 text-[#A0A0A0] text-sm focus:outline-none focus:border-[#7C3AED] transition-colors pl-10"
        />
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]" />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-[#A0A0A0] hover:text-white transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-[#333333]">
            <div className="text-right hidden md:block">
                <div className="text-sm font-bold text-white">Admin User</div>
                <div className="text-xs text-[#666666]">Super Admin</div>
            </div>
            <div className="w-8 h-8 bg-[#333] rounded-full flex items-center justify-center text-white border border-[#555]">
                <User size={16} />
            </div>
            <button 
                onClick={() => onNavigate('landing')}
                className="text-[#666666] hover:text-[#EF4444] transition-colors ml-2" 
                title="Exit Admin"
            >
                <LogOut size={18} />
            </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;