"use client";

import * as React from "react";
import { 
  Plus, Edit, Trash2, Sparkles, Zap, Crown, Building,
  Check
} from "lucide-react";
import { motion } from "framer-motion";
// Fixed: Standardized casing for Button.tsx import
import Button from "../../../components/ui/Button.tsx";
import { Badge } from "../../../components/ui/badge.tsx";
import Input from "../../../components/ui/input.tsx";
import Modal from "../../../components/ui/modal.tsx";
import { AdminPageHeader } from "../../../components/admin/index.ts";
import { cn } from "../../../lib/utils/cn.ts";

const packages = [
  { id: "1", name: "المبتدئة", nameEn: "Starter", icon: Sparkles, credits: 100, price: 5, bonus: 0, isActive: true, sales: 45 },
  { id: "2", name: "الشائعة", nameEn: "Popular", icon: Zap, credits: 500, price: 20, bonus: 10, isActive: true, sales: 120, isPopular: true },
  { id: "3", name: "القوية", nameEn: "Power", icon: Crown, credits: 1000, price: 35, bonus: 20, isActive: true, sales: 78 },
  { id: "4", name: "المؤسسات", nameEn: "Enterprise", icon: Building, credits: 5000, price: 150, bonus: 40, isActive: true, sales: 12 },
];

export default function CreditPackagesPage() {
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [selectedPackage, setSelectedPackage] = React.useState<typeof packages[0] | null>(null);

  const handleEdit = (pkg: typeof packages[0]) => {
    setSelectedPackage(pkg);
    setShowEditModal(true);
  };

  return (
    <div dir="rtl" className="animate-fade-in">
      <AdminPageHeader
        title="باقات الرصيد"
        description="إدارة باقات الرصيد والتسعير المتاحة للمستخدمين"
      >
        <Button variant="gradient" className="shadow-brutal-sm">
          <Plus className="h-4 w-4 ml-2" />
          باقة جديدة
        </Button>
      </AdminPageHeader>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {packages.map((pkg) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "relative bg-surface-darker border-3 p-6 flex flex-col transition-all",
              pkg.isPopular 
                ? "border-brand-violet shadow-[4px_4px_0px_0px_#7C3AED]" 
                : "border-border-dark shadow-brutal-sm"
            )}
          >
            {/* Popular Badge */}
            {pkg.isPopular && (
              <Badge variant="gradient" className="absolute -top-3 right-4 shadow-brutal-sm">
                الأكثر مبيعاً
              </Badge>
            )}

            {/* Icon */}
            <div className="w-12 h-12 bg-brand-violet/20 border-2 border-brand-violet flex items-center justify-center mb-4 rounded-xl">
              <pkg.icon className="h-6 w-6 text-brand-violet" />
            </div>

            {/* Info */}
            <h3 className="font-black text-white text-xl">{pkg.name}</h3>
            <p className="text-content-muted text-xs mb-4 font-bold uppercase tracking-widest">{pkg.nameEn}</p>

            {/* Price */}
            <div className="mb-6 flex items-baseline gap-1">
              <span className="text-4xl font-black text-white tracking-tighter">{pkg.price}</span>
              <span className="text-content-muted font-bold">د.ك</span>
            </div>

            {/* Details */}
            <div className="space-y-3 mb-8 flex-1">
              <div className="flex justify-between items-center text-sm">
                <span className="text-content-muted font-bold">الرصيد:</span>
                <span className="text-white font-mono font-bold">{pkg.credits} رصيد</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-content-muted font-bold">البونص:</span>
                <span className="text-brand-lime font-bold">+{pkg.bonus}%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-content-muted font-bold">المبيعات:</span>
                <span className="text-white font-bold">{pkg.sales} عملية</span>
              </div>
            </div>

            {/* Status */}
            <div className="mb-6">
              <Badge 
                variant={pkg.isActive ? "success" : "secondary"} 
                className="w-full justify-center py-1 border-black"
              >
                {pkg.isActive ? "نشط" : "معطل"}
              </Badge>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="flex-1"
                onClick={() => handleEdit(pkg)}
              >
                <Edit className="h-4 w-4 ml-2" />
                تعديل
              </Button>
              <button className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 border-2 border-red-500/30 transition-colors rounded-lg">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title={`تعديل باقة ${selectedPackage?.name}`}
      >
        {selectedPackage && (
          <div className="space-y-6 text-right">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="اسم الباقة (عربي)"
                defaultValue={selectedPackage.name}
              />
              <Input
                label="اسم الباقة (إنجليزي)"
                defaultValue={selectedPackage.nameEn}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="الرصيد"
                type="number"
                defaultValue={selectedPackage.credits}
              />
              <Input
                label="السعر (د.ك)"
                type="number"
                defaultValue={selectedPackage.price}
              />
              <Input
                label="البونص %"
                type="number"
                defaultValue={selectedPackage.bonus}
              />
            </div>

            <div className="flex items-center gap-3 p-4 bg-slate-50 border-2 border-black/5 rounded-xl">
              <input 
                type="checkbox" 
                defaultChecked={selectedPackage.isActive} 
                id="isActive"
                className="w-5 h-5 accent-brand-violet cursor-pointer"
              />
              <label htmlFor="isActive" className="font-bold text-sm cursor-pointer">الباقة نشطة ومتاحة للشراء</label>
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button variant="ghost" onClick={() => setShowEditModal(false)}>
                إلغاء
              </Button>
              <Button variant="gradient" className="px-8 shadow-brutal-sm">
                <Check className="h-4 w-4 ml-2" />
                حفظ التغييرات
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}