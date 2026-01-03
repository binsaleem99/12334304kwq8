
"use client";

import * as React from "react";
import { 
  Settings, Globe, Bell, Shield, Save, 
  Key, Clock, UserPlus, Lock, Check, AlertTriangle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// Fix: Added missing Badge import and standardized casing to lowercase source files
import Button from "../../../components/ui/button.tsx";
import Input from "../../../components/ui/input.tsx";
import Badge from "../../../components/ui/badge.tsx";
import { AdminPageHeader } from "../../../components/admin/index.ts";
import { cn } from "../../../lib/utils/cn.ts";

const tabs = [
  { id: "general", label: "إعدادات عامة", icon: Settings },
  { id: "api", label: "مفاتيح API", icon: Key },
  { id: "notifications", label: "الإشعارات", icon: Bell },
  { id: "security", label: "الأمان والمدراء", icon: Shield },
];

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = React.useState("general");
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSaving(false);
  };

  return (
    <div dir="rtl" className="animate-fade-in max-w-5xl">
      <AdminPageHeader
        title="إعدادات النظام"
        description="تكوين المعايير الأساسية للمنصة، مفاتيح الربط، وسياسات الأمان"
      />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Vertical Tabs */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-surface-darker border-3 border-black shadow-neo-sm overflow-hidden rounded-xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-6 py-4 text-right font-black transition-all border-b-2 border-white/5 last:border-b-0",
                  activeTab === tab.id
                    ? "bg-brand-violet text-white border-r-4 border-r-brand-lime"
                    : "text-content-muted hover:text-white hover:bg-white/5 border-r-4 border-r-transparent"
                )}
              >
                <tab.icon className={cn("h-5 w-5", activeTab === tab.id ? "text-brand-lime" : "text-content-muted")} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-yellow-500/10 border-2 border-yellow-500/30 rounded-xl">
            <p className="text-xs font-bold text-yellow-500 flex items-center gap-2">
              <AlertTriangle size={14} /> تنبيه أمني
            </p>
            <p className="text-[10px] text-yellow-500/80 mt-1 leading-relaxed">
              تغيير مفاتيح API قد يؤدي لتوقف مؤقت في خدمات بناء المواقع أو عمليات الدفع الحية.
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              {/* General Tab */}
              {activeTab === "general" && (
                <div className="bg-surface-darker border-3 border-black shadow-neo p-8 space-y-8 rounded-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-brand-violet/20 border-2 border-brand-violet rounded-lg">
                      <Settings className="text-brand-violet h-5 w-5" />
                    </div>
                    <h3 className="font-black text-white text-xl">المعلومات الأساسية</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="اسم المنصة"
                      defaultValue="KWQ8"
                      className="bg-surface-dark border-border-dark text-white font-bold"
                    />
                    <Input
                      label="البريد الإلكتروني للدعم"
                      type="email"
                      defaultValue="support@kwq8.com"
                      className="bg-surface-dark border-border-dark text-white font-bold"
                      dir="ltr"
                    />
                  </div>

                  <div className="h-px bg-white/10" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="فترة صلاحية الرصيد (بالأيام)"
                      type="number"
                      defaultValue="90"
                      className="bg-surface-dark border-border-dark text-white font-bold"
                    />
                    <Input
                      label="الحد الأقصى لإعادة المحاولة (AI)"
                      type="number"
                      defaultValue="2"
                      className="bg-surface-dark border-border-dark text-white font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="تكلفة النشر الأول (رصيد)"
                      type="number"
                      defaultValue="10"
                      className="bg-surface-dark border-border-dark text-white font-bold"
                    />
                    <Input
                      label="تكلفة إعادة النشر (رصيد)"
                      type="number"
                      defaultValue="3"
                      className="bg-surface-dark border-border-dark text-white font-bold"
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button variant="gradient" size="lg" onClick={handleSave} isLoading={isSaving} className="px-10 shadow-brutal-sm">
                      <Save className="h-5 w-5 ml-2" />
                      حفظ التغييرات العامة
                    </Button>
                  </div>
                </div>
              )}

              {/* API Keys Tab */}
              {activeTab === "api" && (
                <div className="bg-surface-darker border-3 border-black shadow-neo p-8 space-y-8 rounded-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-brand-cyan/20 border-2 border-brand-cyan rounded-lg">
                      <Key className="text-brand-cyan h-5 w-5" />
                    </div>
                    <h3 className="font-black text-white text-xl">مفاتيح الربط والخدمات</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-black text-content-muted uppercase tracking-widest mb-2">
                        Claude API Key (Anthropic)
                      </label>
                      <Input
                        type="password"
                        defaultValue="sk-ant-xxxxxxxxxxxxx"
                        className="bg-surface-dark border-border-dark text-white font-mono text-sm"
                        dir="ltr"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-content-muted uppercase tracking-widest mb-2">
                        Gemini API Key (Google)
                      </label>
                      <Input
                        type="password"
                        defaultValue="AIzaSyXXXXXXXXXXXXXX"
                        className="bg-surface-dark border-border-dark text-white font-mono text-sm"
                        dir="ltr"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-content-muted uppercase tracking-widest mb-2">
                        Tap Secret Key (Payments)
                      </label>
                      <Input
                        type="password"
                        defaultValue="sk_live_XXXXXXXXXXXX"
                        className="bg-surface-dark border-border-dark text-white font-mono text-sm"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-brand-orange/10 border-2 border-brand-orange/30 rounded-xl flex items-start gap-3">
                    <AlertTriangle className="text-brand-orange shrink-0 mt-0.5" size={18} />
                    <p className="text-sm font-bold text-brand-orange/90 leading-relaxed">
                      يتم تشفير هذه المفاتيح قبل تخزينها. لا تقم بمشاركة هذه القيم مع أي طرف ثالث تحت أي ظرف.
                    </p>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button variant="gradient" size="lg" onClick={handleSave} isLoading={isSaving} className="px-10 shadow-brutal-sm">
                      <Save className="h-5 w-5 ml-2" />
                      تحديث المفاتيح
                    </Button>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div className="bg-surface-darker border-3 border-black shadow-neo p-8 space-y-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-brand-pink/20 border-2 border-brand-pink rounded-lg">
                      <Bell className="text-brand-pink h-5 w-5" />
                    </div>
                    <h3 className="font-black text-white text-xl">إشعارات النظام والإدارة</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { label: "إشعار عند تسجيل مستخدم جديد", desc: "تلقي بريد إلكتروني وتنبيه فور تسجيل حساب جديد", defaultChecked: true },
                      { label: "إشعار عند عملية شراء ناجحة", desc: "تنبيه لحظي عند شحن رصيد من قبل أي مستخدم", defaultChecked: true },
                      { label: "إشعار عند فشل عملية دفع", desc: "مراقبة العمليات المتعثرة للتدخل السريع", defaultChecked: true },
                      { label: "إشعار عند أخطاء النظام", desc: "تنبيهات حرجة عند تعطل أي خدمة تابعة للمنصة", defaultChecked: true },
                      { label: "تقرير يومي بالإيرادات", desc: "ملخص مالي يومي يصل في تمام الساعة 12 منتصف الليل", defaultChecked: false },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors group">
                        <div className="text-right">
                          <span className="text-white font-black block group-hover:text-brand-pink transition-colors">{item.label}</span>
                          <span className="text-xs text-content-muted font-bold mt-1 block">{item.desc}</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked={item.defaultChecked} />
                          <div className="w-14 h-8 bg-border-dark border-2 border-black rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:right-1 after:bg-white after:border-2 after:border-black after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-pink" />
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 flex justify-end">
                    <Button variant="gradient" size="lg" onClick={handleSave} isLoading={isSaving} className="px-10 shadow-brutal-sm">
                      <Save className="h-5 w-5 ml-2" />
                      حفظ التغييرات
                    </Button>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  {/* Admins Management */}
                  <div className="bg-surface-darker border-3 border-black shadow-neo p-8 rounded-2xl">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-brand-lime/20 border-2 border-brand-lime rounded-lg">
                          <Shield className="text-brand-lime h-5 w-5" />
                        </div>
                        <h3 className="font-black text-white text-xl">فريق الإدارة والمدراء</h3>
                      </div>
                      <Button variant="secondary" size="sm" className="shadow-none">
                        <UserPlus className="h-4 w-4 ml-2" />
                        إضافة مدير
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {[
                        { name: "مدير النظام", email: "admin@kwq8.com", role: "Super Admin", avatar: "م" },
                        { name: "أحمد المدير", email: "ahmed@kwq8.com", role: "Admin", avatar: "أ" },
                      ].map((admin, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl group hover:border-brand-lime transition-all">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-brand-lime text-black border-2 border-black flex items-center justify-center font-black">
                              {admin.avatar}
                            </div>
                            <div className="text-right">
                              <p className="font-black text-white group-hover:text-brand-lime transition-colors">{admin.name}</p>
                              <p className="text-xs text-content-muted font-mono">{admin.email}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="border-white/20 text-brand-lime font-black">
                            {admin.role}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Password Reset */}
                  <div className="bg-surface-darker border-3 border-black shadow-neo p-8 rounded-2xl">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-2 bg-brand-orange/20 border-2 border-brand-orange rounded-lg">
                        <Lock className="text-brand-orange h-5 w-5" />
                      </div>
                      <h3 className="font-black text-white text-xl">تغيير كلمة المرور الخاصة بك</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Input
                        type="password"
                        label="كلمة المرور الحالية"
                        className="bg-surface-dark border-border-dark text-white font-bold"
                      />
                      <Input
                        type="password"
                        label="كلمة المرور الجديدة"
                        className="bg-surface-dark border-border-dark text-white font-bold"
                      />
                      <Input
                        type="password"
                        label="تأكيد كلمة المرور"
                        className="bg-surface-dark border-border-dark text-white font-bold"
                      />
                    </div>
                    
                    <div className="mt-8 flex justify-end">
                      <Button variant="gradient" size="lg" className="px-10 shadow-brutal-sm">
                        <Check className="h-5 w-5 ml-2" />
                        تحديث كلمة السر
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
