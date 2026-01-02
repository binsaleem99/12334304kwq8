import React from 'react';
import { LayoutDashboard, Users, Folder, LayoutTemplate, CreditCard, BarChart3, FileText, Settings, Server, Link, AlertTriangle } from 'lucide-react';
import { ViewState } from '../../../types';

interface AdminSidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentView, onNavigate }) => {
  
  const menuGroups = [
    {
      title: 'Main',
      items: [
        { id: 'admin', label: 'Overview', icon: LayoutDashboard, view: 'admin' },
        { id: 'users', label: 'Users', icon: Users, view: 'admin-users' },
        { id: 'projects', label: 'Projects', icon: Folder, view: 'admin-projects' },
        { id: 'templates', label: 'Templates', icon: LayoutTemplate, view: 'admin-templates' },
      ]
    },
    {
      title: 'Content',
      items: [
        { id: 'blog', label: 'Blog', icon: FileText, view: 'admin-blog' },
      ]
    },
    {
        title: 'Business',
        items: [
          { id: 'billing', label: 'Billing', icon: CreditCard, view: 'admin-billing' },
          { id: 'analytics', label: 'Analytics', icon: BarChart3, view: 'admin-analytics' },
        ]
    },
    {
        title: 'System',
        items: [
          { id: 'logs', label: 'System Logs', icon: Server, view: 'admin-logs' },
          { id: 'referrals', label: 'Referrals', icon: Link, view: 'admin-referrals' },
          { id: 'settings', label: 'Settings', icon: Settings, view: 'admin-settings' },
        ]
    }
  ];

  return (
    <aside className="fixed top-14 bottom-0 left-0 w-60 bg-[#0A0A0A] border-r border-[#333333] overflow-y-auto py-6 flex flex-col z-40">
      {menuGroups.map((group, idx) => (
        <div key={idx} className="mb-6">
            <h3 className="px-6 text-xs font-bold text-[#666666] uppercase tracking-wider mb-2">{group.title}</h3>
            <ul>
                {group.items.map((item) => {
                    // Simple active check
                    const isActive = currentView === item.view || (currentView === 'admin' && item.id === 'admin');
                    
                    return (
                        <li key={item.id}>
                            <button
                                onClick={() => onNavigate(item.view as ViewState)}
                                className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-bold transition-all ${
                                    isActive 
                                    ? 'bg-[#1A1A1A] text-[#7C3AED] border-l-[3px] border-[#7C3AED]' 
                                    : 'text-[#A0A0A0] hover:bg-[#1A1A1A] hover:text-white border-l-[3px] border-transparent'
                                }`}
                            >
                                <item.icon size={18} />
                                {item.label}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
      ))}

      <div className="mt-auto px-6">
        <div className="bg-[#1A1A1A] border border-[#333333] rounded p-4">
            <div className="flex items-center gap-2 text-[#FACC15] text-xs font-bold mb-2">
                <AlertTriangle size={14} /> System Status
            </div>
            <div className="flex items-center justify-between text-xs text-[#A0A0A0]">
                <span>API Usage</span>
                <span>84%</span>
            </div>
            <div className="w-full h-1 bg-[#333] rounded-full mt-1">
                <div className="h-full bg-[#FACC15] w-[84%] rounded-full"></div>
            </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;