"use client";

import * as React from "react";
import { 
  User, Mail, Phone, Lock, Bell, Globe, Save, Camera, Smartphone, ShieldCheck
} from "lucide-react";
import { Button, Input, GradientText, Badge } from "../../ui/index.ts";
import { PageHeader } from "../index.ts";
import { cn } from "../../../lib/utils/cn.ts";
import { ViewState } from "../../../types.ts";

interface AccountSettingsProps {
  onNavigate: (view: ViewState) => void;
}

const tabs = [
  { id: "profile", label: "الملف الشخصي", icon: User },
  { id: "security", label: "الأمان", icon: Lock },
  { id: "notifications", label: "الإشعارات", icon: Bell },
];

export default function AccountSettings({ onNavigate }: AccountSettingsProps) {
  const [activeTab, setActiveTab] = React.useState("profile");
  const [isSaving, setIsSaving] = React.useState(false);

  const [profile, setProfile] = React.useState({
    fullName: "أحمد محمد",
    email: "ahmed@example.com",
    phone: "+965 9876 5432",
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    setIsSaving(false);
  };

  return (
    <div className="max-w-5xl mx-auto" dir="rtl">
      <PageHeader
        title="إعدادات الحساب"
        description="إدارة معلوماتك الشخصية وإعدادات الأمان والخصوصية"
      />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Tabs Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white border-3 border-black shadow-brutal overflow-hidden rounded-2xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-6 py-4 text-right font-black transition-all border-b-3 border-black last:border-b-0",
                  activeTab === tab.id
                    ? "bg-brand-violet text-white"
                    : "bg-white hover:bg-surface-secondary text-content-primary"
                )}
              >
                <tab.icon className={cn("h-5 w-5", activeTab === tab.id ? "text-white" : "text-brand-violet")} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-brand-lime border-3 border-black shadow-brutal-sm rounded-xl">
            <h4 className="font-black text-sm mb-2 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              حالة الحساب
            </h4>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold">باقة المحترفين</span>
              <Badge variant="success" size="sm">نشط</Badge>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-white border-3 border-black shadow-brutal p-8 rounded-[2rem] space-y-8">
                {/* Avatar Section */}
                <div className="flex flex-col sm:flex-row items-center gap-8 border-b-2 border-slate-100 pb-8">
                  <div className="relative group">
                    <div className="w-28 h-28 bg-gradient-to-br from-brand-violet to-brand-pink rounded-full border-4 border-black flex items-center justify-center text-white text-4xl font-black shadow-brutal-sm group-hover:scale-105 transition-transform">
                      أ
                    </div>
                    <button className="absolute bottom-0 right-0 p-2.5 bg-brand-violet text-white border-3 border-black rounded-xl hover:bg-black transition-colors shadow-brutal-sm">
                      <Camera className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="text-center sm:text-right">
                    <h3 className="text-2xl font-black text-content-primary mb-1">{profile.fullName}</h3>
                    <p className="text-content-secondary font-bold mb-4">{profile.email}</p>
                    <Badge variant="outline" size="md" className="border-2">عضو منذ ديسمبر 2024</Badge>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="الاسم الكامل"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    leftIcon={<User className="h-5 w-5" />}
                  />
                  <Input
                    label="البريد الإلكتروني"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    leftIcon={<Mail className="h-5 w-5" />}
                    disabled
                    hint="لا يمكن تغيير البريد الأساسي حالياً"
                  />
                  <Input
                    label="رقم الهاتف"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    leftIcon={<Phone className="h-5 w-5" />}
                    className="font-mono"
                  />
                  <div className="flex flex-col justify-end">
                     <p className="text-xs text-content-muted font-bold mb-2">تأكد من صحة رقم الهاتف لتلقي تنبيهات الواتساب.</p>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button variant="gradient" size="xl" onClick={handleSave} isLoading={isSaving} className="px-10 shadow-brutal-lg">
                    <Save className="h-6 w-6 ml-2" />
                    حفظ التغييرات
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-white border-3 border-black shadow-brutal p-8 rounded-[2rem] space-y-6">
                <h3 className="text-xl font-black flex items-center gap-2">
                  <Lock className="h-6 w-6 text-brand-violet" />
                  تغيير كلمة المرور
                </h3>
                <div className="space-y-4 max-w-md">
                  <Input
                    label="كلمة المرور الحالية"
                    type="password"
                    placeholder="••••••••"
                  />
                  <Input
                    label="كلمة المرور الجديدة"
                    type="password"
                    placeholder="••••••••"
                  />
                  <Input
                    label="تأكيد كلمة المرور"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
                <div className="pt-4">
                  <Button variant="gradient" size="lg" className="shadow-brutal">
                    <Lock className="h-5 w-5 ml-2" />
                    تحديث كلمة المرور
                  </Button>
                </div>
              </div>

              <div className="bg-slate-900 text-white border-3 border-black shadow-brutal p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-brand-lime rounded-2xl border-2 border-black">
                    <Smartphone className="h-8 w-8 text-black" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black mb-1">المصادقة الثنائية (2FA)</h4>
                    <p className="text-sm text-slate-400 font-bold">أضف طبقة حماية إضافية لحسابك عبر تطبيق الهاتف.</p>
                  </div>
                </div>
                <Button variant="secondary" className="border-white shadow-none hover:bg-brand-lime hover:text-black">
                  تفعيل الحماية
                </Button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-white border-3 border-black shadow-brutal p-8 rounded-[2rem] space-y-6">
                <h3 className="text-xl font-black flex items-center gap-2">
                  <Bell className="h-6 w-6 text-brand-violet" />
                  إعدادات التنبيهات
                </h3>
                <div className="grid gap-4">
                  {[
                    { label: "إشعارات البريد الإلكتروني", desc: "تلقي ملخصات أداء المواقع والفواتير", checked: true },
                    { label: "تنبيهات الرصيد", desc: "سنقوم بتنبيهك عندما يصل رصيدك إلى أقل من 20 نقطة", checked: true },
                    { label: "حالة النظام والمشاريع", desc: "تنبيهات فورية عند تعثر نشر أحد المواقع أو تحديثات النظام", checked: false },
                    { label: "العروض والنشرة الإخبارية", desc: "كن أول من يعلم بالميزات الجديدة والخصومات الحصرية", checked: true },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-6 border-3 border-black rounded-2xl hover:bg-slate-50 transition-colors group">
                      <div className="ml-4">
                        <p className="font-black text-lg text-content-primary mb-1 group-hover:text-brand-violet transition-colors">{item.label}</p>
                        <p className="text-sm text-content-secondary font-bold leading-relaxed">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={item.checked} />
                        <div className="w-14 h-8 bg-slate-200 border-3 border-black rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:right-1 after:bg-white after:border-2 after:border-black after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-brand-violet" />
                      </label>
                    </div>
                  ))}
                </div>
                <div className="pt-4 flex justify-end">
                   <Button variant="default" onClick={handleSave} isLoading={isSaving}>حفظ التفضيلات</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}