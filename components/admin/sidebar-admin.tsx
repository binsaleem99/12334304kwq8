
"use client";

import * as React from "react";
import Link from "next/link";
import { 
  LayoutDashboard, Users, FolderOpen, UserPlus, 
  FileText, Package, TrendingUp, Server, Settings,
  ChevronRight, LogOut, Shield
} from "lucide-react";
import { cn } from "../../lib/utils/cn.ts";
// Fix: Standardized casing to use lowercase filename for GradientText
import GradientText from "../ui/gradient-text.tsx";

const navItems = [
  { href: "/admin", label: "نظرة عامة", icon: LayoutDashboard },
  { href: "/admin/users", label: "المستخدمين", icon: Users },
  { href: "/admin/projects", label: "المشاريع", icon: FolderOpen },
  { href: "/admin/affiliates", label: "المسوقين", icon: UserPlus },
  { href: "/admin/blog", label: "المدونة", icon: FileText },
  { href: "/admin/packages", label: "الباقات", icon: Package },
  { href: "/admin/analytics", label: "التحليلات", icon: TrendingUp },
  { href: "/admin/system", label: "النظام", icon: Server },
  { href: "/admin/settings", label: "الإعدادات", icon: Settings },
];

export function SidebarAdmin() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 bg-surface-darker border-l border-border-dark transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-border-dark">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-violet border-2 border-brand-violet flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <span className="text-xl font-bold text-white">KWQ8</span>
              <span className="text-xs text-content-muted block">لوحة الإدارة</span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded transition-all",
              "text-content-muted hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && (
              <>
                <span className="flex-1 font-medium">{item.label}</span>
                <ChevronRight className="h-4 w-4 rtl-flip opacity-0 group-hover:opacity-100" />
              </>
            )}
          </Link>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -left-3 top-1/2 -translate-y-1/2 bg-surface-dark border border-border-dark p-1.5 hover:bg-brand-violet transition-colors"
      >
        <ChevronRight
          className={cn("h-4 w-4 text-white transition-transform", !isCollapsed && "rotate-180")}
        />
      </button>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border-dark">
        <Link href="/dashboard">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-content-muted hover:text-white hover:bg-white/5 rounded transition-colors">
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span className="font-medium">لوحة المستخدم</span>}
          </button>
        </Link>
      </div>
    </aside>
  );
}
