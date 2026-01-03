import React from "react";
import { Metadata } from "next";
import { SidebarAdmin, NavbarAdmin } from "../../components/admin/index.ts";

export const metadata: Metadata = {
  title: {
    default: "لوحة الإدارة",
    template: "%s | إدارة KWQ8",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-surface-dark" dir="rtl">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col">
        <NavbarAdmin />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
