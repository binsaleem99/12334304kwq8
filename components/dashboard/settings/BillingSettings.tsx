import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Coins, Plus, Clock, Receipt, ArrowLeft,
  Sparkles, Zap, Crown, Building, AlertTriangle,
  History, Wallet, Timer, MessageCircle, Gift
} from 'lucide-react';
import { ViewState } from '../../../types';
// Fixed: Standardized casing to match Button.tsx
import Button from '../../ui/Button.tsx';
import Badge from '../../ui/badge.tsx';
import { PageHeader, CreditBalance } from '../index.ts';
import { GradientText } from '../../ui/GradientText.tsx';
import { cn } from '../../../lib/utils/cn.ts';

interface BillingSettingsProps {
  onNavigate: (view: ViewState) => void;
}

const packages = [
  {
    id: "starter",
    name: "المبتدئة",
    icon: Sparkles,
    credits: 100,
    price: 5,
    bonus: 0,
    totalCredits: 100,
    color: "bg-white",
    hoverColor: "hover:bg-slate-50",
  },
  {
    id: "popular",
    name: "الشائعة",
    icon: Zap,
    credits: 500,
    price: 20,
    bonus: 10,
    totalCredits: 550,
    color: "bg-brand-violet",
    textColor: "text-white",
    popular: true,
  },
  {
    id: "power",
    name: "القوية",
    icon: Crown,
    credits: 1000,
    price: 35,
    bonus: 20,
    totalCredits: 1200,
    color: "bg-white",
    hoverColor: "hover:bg-slate-50",
  },
  {
    id: "enterprise",
    name: "المؤسسات",
    icon: Building,
    credits: 5000,
    price: 150,
    bonus: 40,
    totalCredits: 7000,
    color: "bg-surface-dark",
    textColor: "text-white",
  },
];

const purchaseHistory = [
  { id: "1", package: "الشائعة", credits: 550, price: 20, date: "15 يناير 2024", status: "completed" },
  { id: "2", package: "المبتدئة", credits: 100, price: 5, date: "01 يناير 2024", status: "completed" },
];

const usageHistory = [
  { id: "1", action: "بناء صفحة رئيسية", credits: 8, date: "منذ ساعة", project: "صالون الجمال" },
  { id: "2", action: "تعديل الألوان", credits: 2, date: "منذ 3 ساعات", project: "صالون الجمال" },
  { id: "3", action: "نشر الموقع", credits: 10, date: "منذ يوم", project: "صالون الجمال" },
];

const BillingSettings: React.FC<BillingSettingsProps> = ({ onNavigate }) => {
  const currentCredits = 245;
  const expiringCredits = 50;
  const expiryDate = "15 فبراير 2024";

  return (
    <div className="space-y-8" dir="rtl">
      <PageHeader
        title="الرصيد والاشتراكات 💰"
        description="إدارة رصيدك، استعراض سجل الاستخدام، وشراء باقات جديدة."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content (2/3) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Credit Packages Selection */}
          <section>
            <h2 className="text-2xl font-black mb-6">شراء رصيد</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {packages.map((pkg) => (
                <motion.div
                  key={pkg.id}
                  whileHover={{ scale: 1.02, y: -2 }}
                  onClick={() => onNavigate('checkout-payment')}
                  className={cn(
                    "relative p-6 border-3 border-black cursor-pointer transition-all rounded-2xl group",
                    pkg.color,
                    pkg.textColor,
                    pkg.popular ? "shadow-brutal" : "shadow-brutal-sm hover:shadow-brutal",
                    pkg.hoverColor
                  )}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-6">
                      <Badge variant="gradient" size="lg" className="shadow-brutal-sm">
                        الأكثر شيوعاً ⭐
                      </Badge>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className={cn(
                      "p-3 border-2 border-black rounded-xl",
                      pkg.popular ? "bg-white/20" : "bg-brand-violet/10 text-brand-violet"
                    )}>
                      <pkg.icon className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <span className="text-3xl font-black tracking-tighter">{pkg.price}</span>
                      <span className="text-sm font-bold mr-1">د.ك</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-black mb-1">{pkg.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <p className={cn("text-lg font-black", pkg.textColor ? "text-brand-lime" : "text-brand-violet")}>
                      {pkg.totalCredits.toLocaleString()} رصيد
                    </p>
                    {pkg.bonus > 0 && (
                      <span className={cn(
                        "text-[10px] font-black px-2 py-0.5 rounded border border-black",
                        pkg.popular ? "bg-brand-lime text-black" : "bg-yellow-100 text-yellow-700"
                      )}>
                        +{pkg.bonus}% مجاناً
                      </span>
                    )}
                  </div>
                  
                  <div className="pt-4 border-t-2 border-black/10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-black uppercase tracking-widest">اختر هذه الباقة</span>
                    <ArrowLeft className="h-4 w-4 rtl-flip" />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Usage History */}
          <section className="bg-white border-3 border-black shadow-brutal p-8 rounded-[2rem]">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
              <div className="p-2 bg-brand-cyan/10 rounded-lg">
                <Clock className="h-6 w-6 text-brand-cyan" />
              </div>
              سجل الاستخدام
            </h2>
            <div className="space-y-4">
              {usageHistory.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border-3 border-black rounded-2xl hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border-2 border-black flex items-center justify-center font-black group-hover:bg-white transition-colors">
                      {item.id}
                    </div>
                    <div>
                      <p className="font-black text-lg">{item.action}</p>
                      <p className="text-sm text-content-secondary font-bold">
                        <span className="text-brand-violet">{item.project}</span> • {item.date}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" size="lg" className="border-2 px-4 h-10 font-black text-brand-pink bg-brand-pink/5">
                    -{item.credits}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-6 font-black">تحميل التقرير الكامل</Button>
          </section>

          {/* Purchase History */}
          <section className="bg-white border-3 border-black shadow-brutal p-8 rounded-[2rem]">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
              <div className="p-2 bg-brand-lime/20 rounded-lg">
                <Receipt className="h-6 w-6 text-brand-lime" />
              </div>
              سجل المشتريات
            </h2>
            <div className="space-y-4">
              {purchaseHistory.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-5 border-3 border-black rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-brand-lime/10 border-2 border-black rounded-lg">
                      <Wallet className="h-5 w-5 text-brand-lime" />
                    </div>
                    <div>
                      <p className="font-black text-lg">باقة {item.package}</p>
                      <p className="text-sm text-content-secondary font-bold">{item.date}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="font-black text-xl leading-none mb-1">{item.price} د.ك</p>
                    <p className="text-xs text-brand-violet font-black">+{item.credits} رصيد</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar (1/3) */}
        <div className="space-y-6">
          {/* Current Balance Card */}
          <CreditBalance
            balance={currentCredits}
            expiringCredits={expiringCredits}
            expiringDate={expiryDate}
            onNavigate={onNavigate}
          />

          {/* First Purchase Promo */}
          <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-brand-lime border-3 border-black shadow-brutal p-6 rounded-3xl relative overflow-hidden"
          >
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/20 rounded-full blur-xl" />
            <div className="flex items-center gap-3 mb-3 relative z-10">
              <div className="p-2 bg-white border-2 border-black rounded-lg shadow-brutal-sm">
                <Gift className="h-6 w-6 text-brand-pink" />
              </div>
              <h3 className="font-black text-xl">عرض خاص!</h3>
            </div>
            <p className="font-bold leading-relaxed mb-4 relative z-10">
              أول عملية شراء تحصل على <span className="font-black text-brand-violet">+20% رصيد إضافي</span> مجاناً! لا تفوت الفرصة.
            </p>
            <div className="bg-black/5 p-2 rounded-lg border border-black/10 text-xs font-black text-center uppercase tracking-tighter">
              CODE: FIRST20
            </div>
          </motion.div>

          {/* Support Helper */}
          <div className="bg-white border-3 border-black shadow-brutal p-6 rounded-3xl group">
            <h3 className="text-xl font-black mb-3">تحتاج مساعدة؟ 🆘</h3>
            <p className="text-sm text-content-secondary font-bold mb-6 leading-relaxed">
              فريقنا متواجد 24/7 لمساعدتك في أي استفسار بخصوص الرصيد أو الدفع.
            </p>
            <Button 
              variant="secondary" 
              className="w-full h-12 gap-2"
              onClick={() => onNavigate('dashboard-help')}
            >
              <MessageCircle className="h-5 w-5 text-brand-violet" />
              تحدث معنا عبر واتساب
            </Button>
          </div>

          {/* Quick FAQ Snippet */}
          <div className="p-4 bg-slate-900 text-white border-3 border-black shadow-brutal rounded-3xl">
             <div className="flex items-center gap-2 mb-2 text-brand-gold">
                <AlertTriangle size={16} />
                <span className="text-xs font-black uppercase">معلومة هامة</span>
             </div>
             <p className="text-xs font-bold text-slate-400 leading-relaxed">
                الرصيد المشترى صالح لمدة 90 يوماً. نرسل لك تذكيرات قبل انتهاء الصلاحية بـ 7 أيام.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingSettings;