"use client";

import * as React from "react";
import { Bell, Search, Shield } from "lucide-react";
import { cn } from "../../lib/utils/cn.ts";

export function NavbarAdmin() {
  return (
    <header className="h-16 bg-surface-darker border-b border-border-dark flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-content-muted" />
          <input
            type="text"
            placeholder="بحث..."
            className="w-full bg-surface-dark border border-border-dark text-white pr-10 pl-4 py-2 focus:outline-none focus:border-brand-violet transition-colors placeholder:text-content-muted"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-content-muted hover:text-white hover:bg-white/5 rounded transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Admin Badge */}
        <div className="flex items-center gap-3 px-3 py-1.5 bg-brand-violet/20 border border-brand-violet rounded">
          <Shield className="h-4 w-4 text-brand-violet" />
          <span className="text-brand-violet font-medium text-sm">Super Admin</span>
        </div>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-violet rounded-full flex items-center justify-center text-white font-bold text-sm">
            م
          </div>
          <span className="text-white font-medium hidden md:block">مدير النظام</span>
        </div>
      </div>
    </header>
  );
}
