import React from "react";
import { Metadata } from "next";
import { SidebarDashboard } from "../../components/layout/sidebar-dashboard.tsx";
import { NavbarDashboard } from "../../components/dashboard/navbar-dashboard.tsx";

export const metadata: Metadata = {
  title: {
    default: "لوحة التحكم",
    template: "%s | لوحة التحكم - KWQ8",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-surface-secondary" dir="rtl">
      <SidebarDashboard />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <NavbarDashboard />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}