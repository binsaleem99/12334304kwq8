import React from 'react';
import { ChevronRight, Download, Rocket, Share2, Menu } from 'lucide-react';
import { ViewState } from '../../types';
// Fixed: Standardized casing to match Button.tsx
import Button from '../ui/Button.tsx';

interface BuilderNavbarProps {
  onNavigate: (view: ViewState) => void;
  projectName?: string;
}

/**
 * Navbar component for the AI Website Builder interface.
 */
const BuilderNavbar: React.FC<BuilderNavbarProps> = ({ onNavigate, projectName = "موقع المطعم البحري" }) => {
  return (
    <nav className="h-16 bg-white border-b-[3px] border-black flex items-center justify-between px-4 lg:px-6 fixed top-0 left-0 right-0 z-50">
      
      {/* Right: Brand & Back */}
      <div className="flex items-center gap-4">
        <button 
            onClick={() => onNavigate('dashboard')}
            className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-lg hover:bg-slate-800 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] active:translate-y-[1px] active:translate-x-[1px] active:shadow-none"
            title="العودة للرئيسية"
        >
            <span className="font-black text-xs">KW</span>
        </button>
        
        <div className="hidden md:flex items-center gap-2">
            <span className="text-slate-400">/</span>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors border-2 border-transparent hover:border-slate-200">
                <span className="font-bold text-black">{projectName}</span>
            </div>
        </div>
      </div>

      {/* Left: Actions */}
      <div className="flex items-center gap-3">
        <Button 
            variant="ghost" 
            size="sm"
            className="hidden md:flex items-center gap-2 text-slate-600 hover:text-black"
        >
            <Share2 size={18} />
            <span className="hidden lg:inline">مشاركة</span>
        </Button>
        <Button 
            variant="secondary" 
            size="sm"
            onClick={() => onNavigate('dashboard-preview')}
            className="flex items-center gap-2"
        >
            <Eye size={18} />
            <span className="hidden lg:inline">معاينة</span>
        </Button>
        <Button 
            variant="default" 
            size="sm"
            onClick={() => onNavigate('dashboard-publish')}
            className="flex items-center gap-2"
        >
            <Rocket size={18} />
            <span>نشر الموقع</span>
        </Button>
      </div>
    </nav>
  );
};

export default BuilderNavbar;
import { Eye } from 'lucide-react';