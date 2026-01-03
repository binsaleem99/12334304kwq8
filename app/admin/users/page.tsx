"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Search, Filter, Download, MoreVertical,
  Eye, Ban, Coins, Mail
} from "lucide-react";
// Fix: Standardized import casing to lowercase
import Button from "../../../components/ui/button.tsx";
import { Badge } from "../../../components/ui/badge.tsx";
import { AdminPageHeader, AdminTable } from "../../../components/admin/index.ts";
import { cn } from "../../../lib/utils/cn.ts";

const users = [
  { id: "1", name: "أحمد محمد", email: "ahmed@example.com", phone: "+965 9876 5432", credits: 245, projects: 5, status: "active", joinedAt: "2024-01-15" },
  { id: "2", name: "فاطمة علي", email: "fatima@example.com", phone: "+966 5555 1234", credits: 100, projects: 2, status: "active", joinedAt: "2024-01-10" },
  { id: "3", name: "محمد خالد", email: "mohammad@example.com", phone: "+971 5000 0000", credits: 0, projects: 1, status: "suspended", joinedAt: "2024-01-05" },
  { id: "4", name: "سارة أحمد", email: "sara@example.com", phone: "+965 9999 8888", credits: 550, projects: 8, status: "active", joinedAt: "2023-12-20" },
  { id: "5", name: "خالد العلي", email: "khaled@example.com", phone: "+974 7777 6666", credits: 1200, projects: 12, status: "active", joinedAt: "2023-12-01" },
];

const filters = [
  { value: "all", label: "الكل" },
  { value: "active", label: "نشط" },
  { value: "suspended", label: "موقوف" },
];

export default function UsersManagementPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredUsers = users.filter((user) => {
    if (activeFilter !== "all" && user.status !== activeFilter) return false;
    if (searchQuery && !user.name.includes(searchQuery) && !user.email.includes(searchQuery)) return false;
    return true;
  });

  const columns = [
    {
      key: "name",
      label: "المستخدم",
      render: (user: typeof users[0]) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-violet/20 border border-brand-violet flex items-center justify-center text-brand-violet font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-white">{user.name}</p>
            <p className="text-sm text-content-muted">{user.email}</p>
          </div>
        </div>
      ),
    },
    { key: "phone", label: "الهاتف" },
    {
      key: "credits",
      label: "الرصيد",
      render: (user: typeof users[0]) => (
        <div className="flex items-center gap-1">
          <Coins className="h-4 w-4 text-brand-gold" />
          <span>{user.credits}</span>
        </div>
      ),
    },
    { key: "projects", label: "المشاريع" },
    {
      key: "status",
      label: "الحالة",
      render: (user: typeof users[0]) => (
        <Badge variant={user.status === "active" ? "success" : "danger"}>
          {user.status === "active" ? "نشط" : "موقوف"}
        </Badge>
      ),
    },
    { key: "joinedAt", label: "تاريخ التسجيل" },
    {
      key: "actions",
      label: "",
      render: (user: typeof users[0]) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/users/${user.id}`}>
            <button className="p-2 text-content-muted hover:text-white hover:bg-white/10 transition-colors">
              <Eye className="h-4 w-4" />
            </button>
          </Link>
          <button className="p-2 text-content-muted hover:text-white hover:bg-white/10 transition-colors">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div dir="rtl">
      <AdminPageHeader
        title="إدارة المستخدمين"
        description={`${users.length} مستخدم مسجل`}
      >
        <Button variant="secondary">
          <Download className="h-4 w-4 ml-2" />
          تصدير
        </Button>
      </AdminPageHeader>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-content-muted" />
          <input
            type="text"
            placeholder="بحث بالاسم أو البريد..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-darker border border-border-dark text-white pr-10 pl-4 py-3 focus:outline-none focus:border-brand-violet"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center bg-surface-darker border border-border-dark">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                "px-4 py-3 font-medium transition-colors",
                activeFilter === filter.value
                  ? "bg-brand-violet text-white"
                  : "text-content-muted hover:text-white"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <AdminTable
        columns={columns}
        data={filteredUsers}
        onRowClick={(user) => window.location.hash = `#admin-users-${user.id}`}
      />
    </div>
  );
}