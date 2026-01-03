"use client";

import * as React from "react";
import Link from "next/link";
import { 
  Plus, Search, UserPlus, Percent, DollarSign,
  Users, Copy, Check, MoreVertical
} from "lucide-react";
// Fix: Standardized import casing to lowercase
import Button from "../../../components/ui/button.tsx";
import { Badge } from "../../../components/ui/badge.tsx";
import { AdminPageHeader, AdminStatsCard, AdminTable } from "../../../components/admin/index.ts";
import { cn } from "../../../lib/utils/cn.ts";
// Add missing motion import
import { motion } from "framer-motion";

const stats = [
  { title: "إجمالي المسوقين", value: "12", icon: UserPlus, color: "violet" as const },
  { title: "الأكواد النشطة", value: "25", icon: Percent, color: "cyan" as const },
  { title: "الإيرادات من الإحالات", value: "2,450 د.ك", icon: DollarSign, color: "lime" as const },
  { title: "المستخدمين المُحالين", value: "156", icon: Users, color: "pink" as const },
];

const affiliates = [
  { id: "1", name: "محمد التسويق", email: "affiliate1@example.com", codes: 3, revenue: 850, users: 45, status: "active" },
  { id: "2", name: "سارة للتسويق", email: "affiliate2@example.com", codes: 2, revenue: 620, users: 32, status: "active" },
  { id: "3", name: "أحمد المسوق", email: "affiliate3@example.com", codes: 1, revenue: 0, users: 0, status: "pending" },
];

const discountCodes = [
  { id: "1", code: "AHMED20", discount: "20%", type: "percentage", usageCount: 45, usageLimit: 100, affiliate: "محمد التسويق", status: "active", expiresAt: "2024-03-01" },
  { id: "2", code: "WELCOME10", discount: "10%", type: "percentage", usageCount: 120, usageLimit: null, affiliate: null, status: "active", expiresAt: null },
  { id: "3", code: "FLAT5", discount: "5 د.ك", type: "fixed", usageCount: 30, usageLimit: 50, affiliate: "سارة للتسويق", status: "active", expiresAt: "2024-02-15" },
];

export default function AffiliatesPage() {
  const [activeTab, setActiveTab] = React.useState<"affiliates" | "codes">("affiliates");
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const affiliateColumns = [
    {
      key: "name",
      label: "المسوق",
      render: (item: typeof affiliates[0]) => (
        <div className="text-right">
          <p className="font-bold text-white">{item.name}</p>
          <p className="text-sm text-content-muted">{item.email}</p>
        </div>
      ),
    },
    { key: "codes", label: "الأكواد" },
    {
      key: "revenue",
      label: "الإيرادات",
      render: (item: typeof affiliates[0]) => <span className="font-mono text-brand-lime">{item.revenue} د.ك</span>,
    },
    { key: "users", label: "المستخدمين" },
    {
      key: "status",
      label: "الحالة",
      render: (item: typeof affiliates[0]) => (
        <Badge variant={item.status === "active" ? "success" : "warning"}>
          {item.status === "active" ? "نشط" : "قيد المراجعة"}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "",
      render: () => (
        <button className="p-2 text-content-muted hover:text-white transition-colors">
          <MoreVertical className="h-4 w-4" />
        </button>
      ),
    },
  ];

  const codeColumns = [
    {
      key: "code",
      label: "الكود",
      render: (item: typeof discountCodes[0]) => (
        <div className="flex items-center gap-2" dir="ltr">
          <code className="bg-surface-dark border border-border-dark px-2 py-1 text-brand-cyan font-mono rounded">
            {item.code}
          </code>
          <button
            onClick={() => handleCopyCode(item.code)}
            className="p-1 text-content-muted hover:text-white transition-colors"
          >
            {copiedCode === item.code ? (
              <Check className="h-4 w-4 text-brand-lime" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      ),
    },
    { key: "discount", label: "الخصم" },
    {
      key: "usage",
      label: "الاستخدام",
      render: (item: typeof discountCodes[0]) => 
        <span className="font-mono text-white">{item.usageCount}{item.usageLimit ? ` / ${item.usageLimit}` : ""}</span>,
    },
    {
      key: "affiliate",
      label: "المسوق",
      render: (item: typeof discountCodes[0]) => <span className="text-content-muted">{item.affiliate || "عام"}</span>,
    },
    {
      key: "status",
      label: "الحالة",
      render: (item: typeof discountCodes[0]) => (
        <Badge variant={item.status === "active" ? "success" : "secondary"}>
          {item.status === "active" ? "نشط" : "منتهي"}
        </Badge>
      ),
    },
    {
      key: "expiresAt",
      label: "ينتهي في",
      render: (item: typeof discountCodes[0]) => <span className="text-sm font-mono">{item.expiresAt || "—"}</span>,
    },
  ];

  return (
    <div dir="rtl" className="animate-fade-in">
      <AdminPageHeader
        title="المسوقين وأكواد الخصم"
        description="إدارة برنامج التسويق بالعمولة وحملات الترويج"
      >
        <Button variant="gradient" className="shadow-brutal-sm">
          <Plus className="h-4 w-4 ml-2" />
          {activeTab === "affiliates" ? "إضافة مسوق" : "إنشاء كود"}
        </Button>
      </AdminPageHeader>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* Fixed: Use explicit mapping to ensure key is not part of the props object in certain strict TS environments */}
        {stats.map((stat, index) => (
          <AdminStatsCard 
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Modern Brutalist Tabs */}
      <div className="flex items-center gap-2 mb-8 bg-surface-dark border border-border-dark p-1 w-fit rounded-lg">
        <button
          onClick={() => setActiveTab("affiliates")}
          className={cn(
            "px-6 py-2.5 font-black text-sm transition-all rounded-md flex items-center gap-2",
            activeTab === "affiliates"
              ? "bg-brand-violet text-white shadow-neo-sm"
              : "text-content-muted hover:text-white"
          )}
        >
          <UserPlus className="h-4 w-4" />
          المسوقين ({affiliates.length})
        </button>
        <button
          onClick={() => setActiveTab("codes")}
          className={cn(
            "px-6 py-2.5 font-black text-sm transition-all rounded-md flex items-center gap-2",
            activeTab === "codes"
              ? "bg-brand-violet text-white shadow-neo-sm"
              : "text-content-muted hover:text-white"
          )}
        >
          <Percent className="h-4 w-4" />
          أكواد الخصم ({discountCodes.length})
        </button>
      </div>

      {/* Tab Content with animations */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === "affiliates" ? (
          <AdminTable columns={affiliateColumns} data={affiliates} />
        ) : (
          <AdminTable columns={codeColumns} data={discountCodes} />
        )}
      </motion.div>
    </div>
  );
}