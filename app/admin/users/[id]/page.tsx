"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowRight, Mail, Phone, Calendar, Coins,
  FolderOpen, Ban, Plus, History, AlertTriangle
} from "lucide-react";
// Fix: Standardized import casing to lowercase
import Button from "../../../../components/ui/button.tsx";
import { Badge } from "../../../../components/ui/badge.tsx";
import Input from "../../../../components/ui/input.tsx";
import Modal from "../../../../components/ui/modal.tsx";
import { AdminPageHeader, AdminStatsCard } from "../../../../components/admin/index.ts";

// Mock user data
const user = {
  id: "1",
  name: "أحمد محمد",
  email: "ahmed@example.com",
  phone: "+965 9876 5432",
  credits: 245,
  totalPurchased: 650,
  projects: 5,
  publishedSites: 3,
  status: "active",
  joinedAt: "2024-01-15",
  lastActive: "منذ ساعة",
};

const purchaseHistory = [
  { id: "1", package: "الشائعة", credits: 550, price: 20, date: "2024-01-15" },
  { id: "2", package: "المبتدئة", credits: 100, price: 5, date: "2024-01-01" },
];

const projects = [
  { id: "1", name: "صالون الجمال", status: "published", views: 1250 },
  { id: "2", name: "مطعم الديرة", status: "draft", views: 0 },
];

export default function UserDetailPage() {
  const params = useParams();
  const [showAddCreditsModal, setShowAddCreditsModal] = React.useState(false);
  const [showSuspendModal, setShowSuspendModal] = React.useState(false);
  const [creditsToAdd, setCreditsToAdd] = React.useState("");

  return (
    <div dir="rtl">
      {/* Back Button */}
      <Link href="/admin/users">
        <Button variant="ghost" className="mb-4 text-content-muted hover:text-white">
          <ArrowRight className="h-4 w-4 ml-2" />
          العودة للمستخدمين
        </Button>
      </Link>

      {/* Header */}
      <div className="bg-surface-darker border border-border-dark p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-brand-violet/20 border-2 border-brand-violet flex items-center justify-center text-brand-violet text-2xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="text-right">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                <Badge variant={user.status === "active" ? "success" : "danger"}>
                  {user.status === "active" ? "نشط" : "موقوف"}
                </Badge>
              </div>
              <div className="flex items-center gap-4 mt-2 text-content-muted">
                <span className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {user.phone}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="secondary" 
              onClick={() => setShowAddCreditsModal(true)}
            >
              <Plus className="h-4 w-4 ml-2" />
              إضافة رصيد
            </Button>
            <Button 
              variant="danger"
              onClick={() => setShowSuspendModal(true)}
            >
              <Ban className="h-4 w-4 ml-2" />
              إيقاف
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <AdminStatsCard
          title="الرصيد الحالي"
          value={user.credits}
          icon={Coins}
          color="gold"
        />
        <AdminStatsCard
          title="إجمالي المشتريات"
          value={`${user.totalPurchased} رصيد`}
          icon={History}
          color="violet"
        />
        <AdminStatsCard
          title="المشاريع"
          value={user.projects}
          icon={FolderOpen}
          color="cyan"
        />
        <AdminStatsCard
          title="المواقع المنشورة"
          value={user.publishedSites}
          icon={FolderOpen}
          color="lime"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Purchase History */}
        <div className="bg-surface-darker border border-border-dark">
          <div className="p-4 border-b border-border-dark text-right">
            <h2 className="font-bold text-white">سجل المشتريات</h2>
          </div>
          <div className="divide-y divide-border-dark">
            {purchaseHistory.map((purchase) => (
              <div key={purchase.id} className="flex items-center justify-between p-4">
                <div className="text-right">
                  <p className="font-medium text-white">باقة {purchase.package}</p>
                  <p className="text-sm text-content-muted">{purchase.date}</p>
                </div>
                <div className="text-left">
                  <p className="font-bold text-white">{purchase.price} د.ك</p>
                  <p className="text-sm text-content-muted">+{purchase.credits} رصيد</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="bg-surface-darker border border-border-dark">
          <div className="p-4 border-b border-border-dark text-right">
            <h2 className="font-bold text-white">المشاريع</h2>
          </div>
          <div className="divide-y divide-border-dark">
            {projects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4">
                <div className="text-right">
                  <p className="font-medium text-white">{project.name}</p>
                  <Badge variant={project.status === "published" ? "success" : "secondary"} size="sm">
                    {project.status === "published" ? "منشور" : "مسودة"}
                  </Badge>
                </div>
                <div className="text-left">
                  <p className="text-content-muted">{project.views} زيارة</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Credits Modal */}
      <Modal
        isOpen={showAddCreditsModal}
        onClose={() => setShowAddCreditsModal(false)}
        title="إضافة رصيد"
      >
        <div className="space-y-4">
          <Input
            label="عدد الرصيد"
            type="number"
            value={creditsToAdd}
            onChange={(e) => setCreditsToAdd(e.target.value)}
            placeholder="100"
          />
          <p className="text-sm text-content-muted">
            سيتم إضافة الرصيد مباشرة لحساب المستخدم
          </p>
          <div className="flex gap-3 justify-end">
            <Button variant="ghost" onClick={() => setShowAddCreditsModal(false)}>
              إلغاء
            </Button>
            <Button variant="gradient">
              <Plus className="h-4 w-4 ml-2" />
              إضافة
            </Button>
          </div>
        </div>
      </Modal>

      {/* Suspend Modal */}
      <Modal
        isOpen={showSuspendModal}
        onClose={() => setShowSuspendModal(false)}
        title="إيقاف المستخدم"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500 text-red-400 text-right">
            <AlertTriangle className="h-5 w-5 flex-shrink-0" />
            <p>سيتم إيقاف حساب المستخدم ولن يتمكن من الوصول للمنصة.</p>
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="ghost" onClick={() => setShowSuspendModal(false)}>
              إلغاء
            </Button>
            <Button variant="danger">
              <Ban className="h-4 w-4 ml-2" />
              تأكيد الإيقاف
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}