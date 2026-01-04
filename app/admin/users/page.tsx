"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { 
  Search, Filter, Download, MoreVertical,
  Eye, Coins
} from "lucide-react";
// Fixed: Standardized casing for Button.tsx import
import Button from "../../../components/ui/Button.tsx";
import { Badge } from "../../../components/ui/badge.tsx";
import { AdminPageHeader, AdminTable } from "../../../components/admin/index.ts";
import { cn } from "../../../lib/utils/cn.ts";
import { createClient } from "../../../lib/supabase/client.ts";
import { User } from "../../../types/index.ts";

const filters = [
  { value: "all", label: "الكل" },
  { value: "active", label: "نشط" },
  { value: "suspended", label: "موقوف" },
];

export default function UsersManagementPage() {
  const router = useRouter();
  const supabase = createClient();
  const [users, setUsers] = React.useState<User[]>([]);
  const [activeFilter, setActiveFilter] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    const fetchUsers = async () => {
      let query = supabase.from('profiles').select('*');
      if (activeFilter !== 'all') {
        query = query.eq('status', activeFilter);
      }
      const { data } = await query;
      if (data) {
        setUsers(data as User[]);
      }
    };
    fetchUsers();
  }, [activeFilter]);

  const filteredUsers = users.filter((user) => {
    if (searchQuery && !user.full_name?.includes(searchQuery) && !user.email.includes(searchQuery)) return false;
    return true;
  });

  const columns = [
    {
      key: "name",
      label: "المستخدم",
      render: (user: User) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-violet/20 border border-brand-violet flex items-center justify-center text-brand-violet font-bold">
            {user.full_name?.charAt(0) || user.email.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-white">{user.full_name || 'بدون اسم'}</p>
            <p className="text-sm text-content-muted">{user.email}</p>
          </div>
        </div>
      ),
    },
    { key: "phone", label: "الهاتف" },
    {
      key: "credits",
      label: "الرصيد",
      render: (user: User) => (
        <div className="flex items-center gap-1">
          <Coins className="h-4 w-4 text-brand-gold" />
          <span>{user.credits ?? 0}</span>
        </div>
      ),
    },
    {
      key: "status",
      label: "الحالة",
      render: (user: User) => (
        <Badge variant={user.status === "active" ? "success" : "danger"}>
          {user.status === "active" ? "نشط" : "موقوف"}
        </Badge>
      ),
    },
    { key: "joinedAt", label: "تاريخ التسجيل" },
    {
      key: "actions",
      label: "",
      render: (user: User) => (
        <div className="flex items-center gap-2">
          <button 
            className="p-2 text-content-muted hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => router.push(`/admin/users/${user.id}`)}
          >
            <Eye className="h-4 w-4" />
          </button>
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

      <div className="flex flex-col md:flex-row gap-4 mb-6">
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

      <AdminTable
        columns={columns}
        data={filteredUsers}
        onRowClick={(user) => router.push(`/admin/users/${user.id}`)}
      />
    </div>
  );
}