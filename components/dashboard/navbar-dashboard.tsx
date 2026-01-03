
"use client";

import * as React from "react";
import { Bell, Search, User, LogOut, Settings, ChevronDown } from "lucide-react";
// Fix: Standardized casing to use lowercase filename for GradientText
import GradientText from "../ui/gradient-text.tsx";
import { CreditBalance } from "./credit-balance.tsx";
import { cn } from "../../lib/utils/cn.ts";

interface NavbarDashboardProps {
    onNavigate?: (view: any) => void;
}

export function NavbarDashboard({ onNavigate }: NavbarDashboardProps) {
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const user = {
    name: "أحمد محمد",
    email: "ahmed@example.com",
    avatar: null,
  };

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white border-b-3 border-black flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 p-1 hover:bg-surface-secondary transition-all border-3 border-transparent hover:border-black rounded-xl"
          >
            <ChevronDown className="h-4 w-4" />
            <span className="font-bold hidden md:block">{user.name}</span>
            <div className="w-8 h-8 bg-gradient-to-br from-brand-violet to-brand-pink rounded-full border-2 border-black flex items-center justify-center text-white font-black text-sm">
              {user.name.charAt(0)}
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white border-3 border-black shadow-brutal z-50">
              <div className="p-4 border-b-3 border-black text-right">
                <p className="font-black">{user.name}</p>
                <p className="text-xs text-content-muted font-bold">{user.email}</p>
              </div>
              <button 
                onClick={() => { onNavigate?.('dashboard-account'); setShowUserMenu(false); }}
                className="w-full flex items-center justify-start gap-3 px-4 py-3 hover:bg-surface-secondary text-right font-bold"
              >
                <Settings className="h-4 w-4" /> الإعدادات
              </button>
              <button 
                onClick={() => onNavigate?.('landing')}
                className="w-full flex items-center justify-start gap-3 px-4 py-3 hover:bg-red-50 text-red-600 text-right font-bold"
              >
                <LogOut className="h-4 w-4" /> تسجيل الخروج
              </button>
            </div>
          )}
        </div>
        
        <button className="relative p-2 hover:bg-surface-secondary transition-colors border-3 border-transparent hover:border-black rounded-lg">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </button>

        <CreditBalance balance={245} compact onNavigate={onNavigate} />
      </div>

      <div className="flex-1 max-w-md mx-8 hidden lg:block">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-content-muted" />
          <input
            type="text"
            placeholder="ابحث في مشاريعك..."
            className="w-full border-3 border-black bg-surface-secondary pr-10 pl-4 py-2 font-bold focus:outline-none focus:border-brand-violet focus:shadow-brutal-sm transition-all rounded-xl"
          />
        </div>
      </div>

      <div className="flex items-center">
         <span className="text-2xl font-black"><GradientText>KWQ8</GradientText></span>
      </div>
    </header>
  );
}
