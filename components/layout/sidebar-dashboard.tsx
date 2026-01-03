"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, FolderOpen, Layout, Globe, CreditCard, 
  BarChart3, Link as LinkIcon, Settings, HelpCircle,
  ChevronRight, LogOut
} from "lucide-react";
import { cn } from "../../lib/utils/cn.ts";
import { GradientText } from "../ui/index.ts";

const iconMap: Record<string, React.ElementType> = {
  Home,
  FolderOpen,
  Layout,
  Globe,
  CreditCard,
  BarChart3,
  Link: LinkIcon,
  Settings,
  HelpCircle,
};

const navItems = [
  { href: "/dashboard", label: "الرئيسية", icon: "Home" },
  { href: "/dashboard/projects", label: "مشاريعي", icon: "FolderOpen" },
  { href: "/dashboard/templates", label: "القوالب", icon: "Layout" },
  { href: "/dashboard/published", label: "المنشورة", icon: "Globe" },
  { href: "/dashboard/billing", label: "الرصيد", icon: "CreditCard" },
  { href: "/dashboard/analytics", label: "التحليلات", icon: "BarChart3" },
  { href: "/dashboard/domains", label: "النطاقات", icon: "Link" },
  { href: "/dashboard/settings", label: "الإعدادات", icon: "Settings" },
  { href: "/dashboard/help", label: "المساعدة", icon: "HelpCircle" },
];

export function SidebarDashboard() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 bg-white border-l-3 border-black transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b-3 border-black">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-xl font-bold">
            <GradientText>KWQ8</GradientText>
          </span>
          {!isCollapsed && (
            <span className="text-xs text-content-muted">لوحة التحكم</span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = pathname === item.href || 
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 transition-all",
                "border-3 border-transparent rounded-xl",
                isActive
                  ? "bg-brand-violet text-white border-black shadow-brutal-sm"
                  : "hover:bg-surface-secondary hover:border-black"
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="flex-1 font-medium">{item.label}</span>
                  {isActive && <ChevronRight className="h-4 w-4 rtl-flip" />}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white border-3 border-black p-1 shadow-brutal-sm hover:shadow-none transition-all rounded"
      >
        <ChevronRight
          className={cn("h-4 w-4 transition-transform", !isCollapsed && "rotate-180")}
        />
      </button>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t-3 border-black">
        <button
          className={cn(
            "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl",
            "text-red-500 hover:bg-red-50 transition-colors font-bold"
          )}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span className="font-medium">تسجيل الخروج</span>}
        </button>
      </div>
    </aside>
  );
}

export default SidebarDashboard;