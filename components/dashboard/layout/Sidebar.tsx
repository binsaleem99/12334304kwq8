import React, { useState } from 'react';
import { Home, Folder, LayoutTemplate, Globe, Settings, HelpCircle, LogOut, ChevronRight, ChevronLeft, ShoppingBag, X } from 'lucide-react';
import { ViewState } from '../../../types';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, isMobileOpen, onMobileClose }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'الرئيسية', icon: Home, view: 'dashboard' as ViewState },
    { id: 'projects', label: 'مشاريعي', icon: Folder, view: 'dashboard-projects' as ViewState },
    { id: 'templates', label: 'القوالب', icon: LayoutTemplate, view: 'dashboard-templates' as ViewState },
    { id: 'published', label: 'المنشورة', icon: Globe, view: 'dashboard-published' as ViewState },
  ];

  const bottomItems = [
    { label: 'متجر الرصيد', icon: ShoppingBag, view: 'dashboard-billing' as ViewState },
    { label: 'الدومينات', icon: Globe, view: 'dashboard-domains' as ViewState },
    { label: 'الإعدادات', icon: Settings, view: 'dashboard-account' as ViewState },
    { label: 'المساعدة', icon: HelpCircle, view: 'dashboard-help' as ViewState },
  ];

  const handleNavigate = (view: ViewState) => {
    onNavigate(view);
    if (onMobileClose) onMobileClose();
  };

  return (
    <aside 
      className={`fixed right-0 top-0 md:top-16 bottom-0 bg-white border-l-[3px] border-black transition-all duration-300 z-40 flex flex-col 
        ${isMobileOpen ? 'translate-x-0 w-[280px]' : 'translate-x-full md:translate-x-0'}
        ${isCollapsed ? 'md:w-[72px]' : 'md:w-[260px]'}
      `}
    >
      {/* Mobile Header with Close Button */}
      <div className="flex md:hidden items-center justify-between p-4 border-b-[3px] border-black bg-yellow-50">
        <span className="font-black text-xl">القائمة</span>
        <button onClick={onMobileClose} className="p-2 border-2 border-black rounded-lg bg-white shadow-neo-sm active:shadow-none active:translate-x-0.5 active:translate-y-0.5">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = currentView === item.view || (currentView === 'dashboard' && item.id === 'dashboard') || (currentView.startsWith('dashboard-projects') && item.id === 'projects');
          return (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.view)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative border-[3px] ${
                isActive 
                ? 'bg-[#7C3AED] text-white border-black shadow-neo translate-x-[-2px] translate-y-[-2px]' 
                : 'bg-white text-slate-600 border-transparent hover:border-black hover:shadow-neo-sm hover:bg-violet-50'
              }`}
            >
              <item.icon size={22} strokeWidth={2.5} className={isActive ? 'text-white' : 'text-slate-500 group-hover:text-black'} />
              <span className={`font-black whitespace-nowrap ${isActive ? 'text-white' : 'text-black'} ${isCollapsed ? 'md:hidden' : 'block'}`}>
                {item.label}
              </span>
            </button>
          );
        })}

        <div className="my-4 border-t-[3px] border-black mx-2 border-dashed opacity-20"></div>

        {bottomItems.map((item, idx) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={idx}
                onClick={() => handleNavigate(item.view)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all group border-[3px] ${
                    isActive
                    ? 'bg-[#7C3AED] text-white border-black shadow-neo-sm translate-x-[-2px] translate-y-[-2px]'
                    : 'text-slate-600 border-transparent hover:border-black hover:bg-slate-50 hover:shadow-neo-sm'
                }`}
              >
                <item.icon size={22} strokeWidth={2.5} className={isActive ? 'text-white' : 'text-slate-500 group-hover:text-black'} />
                <span className={`font-bold whitespace-nowrap ${isActive ? 'text-white' : 'text-black'} ${isCollapsed ? 'md:hidden' : 'block'}`}>
                  {item.label}
                </span>
              </button>
            )
        })}
      </div>

      <div className="p-3 border-t-[3px] border-black bg-slate-50">
         <button 
            onClick={() => handleNavigate('landing')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 hover:border-red-600 border-[3px] border-transparent font-bold transition-all ${isCollapsed ? 'md:justify-center' : ''}`}
        >
            <LogOut size={20} strokeWidth={2.5} />
            <span className={isCollapsed ? 'md:hidden' : 'block'}>تسجيل خروج</span>
        </button>
      </div>

      {/* Collapse Toggle - Only on Desktop */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden md:flex absolute bottom-20 -left-4 w-8 h-8 bg-white border-[3px] border-black rounded-lg items-center justify-center hover:bg-yellow-300 shadow-neo-sm transition-colors z-50"
      >
        {isCollapsed ? <ChevronRight size={18} strokeWidth={3} /> : <ChevronLeft size={18} strokeWidth={3} />}
      </button>
    </aside>
  );
};

export default Sidebar;