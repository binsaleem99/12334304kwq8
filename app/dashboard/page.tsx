"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { 
  FolderOpen, Globe, Coins, TrendingUp, Plus, 
  ArrowLeft, Sparkles, Clock, Rocket, Zap, MessageSquare
} from "lucide-react";
// Fixed casing: Using lowercase to match canonical root file casing
import Button from "../../components/ui/button.tsx";
import GradientText from "../../components/ui/gradient-text.tsx";
import { StatsCard, ProjectCard, EmptyState } from "../../components/dashboard/index.ts";
import { ViewState } from "../../types.ts";
import { cn } from "../../lib/utils/cn.ts";

interface DashboardPageProps {
  onNavigate?: (view: ViewState) => void;
}

const mockStats = {
  projects: 5,
  published: 3,
  credits: 245,
  views: 1250,
};

const mockProjects = [
  {
    id: "1",
    name: "صالون الجمال الفاخر",
    industry: "صالونات",
    status: "published" as const,
    subdomain: "beauty-salon",
    updatedAt: "منذ ساعتين",
    thumbnail: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80"
  },
  {
    id: "2",
    name: "مطعم الديرة البحري",
    industry: "مطاعم",
    status: "draft" as const,
    updatedAt: "منذ يوم",
    thumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80"
  },
  {
    id: "3",
    name: "متجر الأزياء التراثية",
    industry: "متاجر",
    status: "published" as const,
    subdomain: "fashion-store",
    updatedAt: "منذ 3 أيام",
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80"
  },
];

const quickActions = [
  { 
    icon: Rocket, 
    label: "مشروع جديد", 
    view: "dashboard-new-project" as ViewState,
    color: "bg-brand-violet",
    shadow: "shadow-[6px_6px_0px_0px_#4c1d95]"
  },
  { 
    icon: Sparkles, 
    label: "استكشف القوالب", 
    view: "dashboard-templates" as ViewState,
    color: "bg-brand-pink",
    shadow: "shadow-[6px_6px_0px_0px_#9d174d]"
  },
  { 
    icon: Coins, 
    label: "شحن الرصيد", 
    view: "dashboard-billing" as ViewState,
    color: "bg-brand-lime",
    shadow: "shadow-[6px_6px_0px_0px_#4d7c0f]"
  },
];

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  const navigate = (view: ViewState) => {
    if (onNavigate) {
      onNavigate(view);
    } else {
      window.location.hash = `#${view}`;
    }
  };

  return (
    <div className="space-y-10 pb-20" dir="rtl">
      {/* Welcome Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-right"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-yellow-100 border-2 border-black mb-3 shadow-brutal-sm">
             <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
             <span className="text-xs font-black">حساب مفعل - باقة المحترفين</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-2">
            مرحباً، <GradientText>أحمد</GradientText> 👋
          </h1>
          <p className="text-xl text-content-secondary font-bold">
            لديك <span className="text-brand-violet font-black underline underline-offset-4 decoration-3 decoration-brand-violet/30">{mockStats.projects} مشاريع</span> جاهزة للتطوير.
          </p>
        </motion.div>

        <div className="flex gap-4">
           <Button variant="secondary" onClick={() => navigate('dashboard-analytics')} className="gap-2">
             <TrendingUp size={18} /> الاحصائيات
           </Button>
           <Button variant="gradient" size="lg" onClick={() => navigate('dashboard-new-project')} className="gap-2">
             <Plus size={20} strokeWidth={3} /> مشروع جديد
           </Button>
        </div>
      </header>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <motion.button 
            key={index} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => navigate(action.view)}
            className={cn(
              "flex flex-col items-start gap-6 p-8 border-3 border-black text-white text-right group relative overflow-hidden transition-all active:translate-x-1 active:translate-y-1 active:shadow-none",
              action.color,
              action.shadow
            )}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-4 bg-white border-3 border-black shadow-brutal-sm text-black group-hover:rotate-12 transition-transform">
              <action.icon size={32} strokeWidth={2.5} />
            </div>
            <div className="space-y-1">
              <span className="font-black text-2xl block">{action.label}</span>
              <p className="text-white/70 font-bold text-sm">ابدأ رحلة البناء الذكي الآن</p>
            </div>
            <div className="absolute bottom-6 left-6 opacity-40 group-hover:opacity-100 group-hover:-translate-x-2 transition-all">
               <ArrowLeft size={32} />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Stats and Projects Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Stats (1/4) */}
        <div className="lg:col-span-1 space-y-6">
           <h3 className="font-black text-xs uppercase tracking-widest text-slate-400 px-2">نظرة سريعة</h3>
           <StatsCard title="المشاريع" value={mockStats.projects} icon={FolderOpen} color="violet" />
           <StatsCard title="المنشورة" value={mockStats.published} icon={Globe} color="cyan" />
           <StatsCard title="الرصيد" value={mockStats.credits} icon={Coins} color="lime" />
           
           <div className="bg-slate-900 border-3 border-black p-6 rounded-[2rem] text-white relative overflow-hidden shadow-brutal">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 -rotate-45 translate-x-8 -translate-y-8 rounded-full" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-brand-gold mb-3">
                  <Zap size={18} fill="currentColor" />
                  <span className="text-xs font-black uppercase">نصيحة اليوم</span>
                </div>
                <p className="font-bold text-sm leading-relaxed mb-4">
                  "استخدم الكلمات المفتاحية المحلية مثل 'ديوانية' أو 'غبقة' لتحسين نتائج البحث في الكويت."
                </p>
                <button className="text-xs font-black underline hover:text-brand-gold">اقرأ المزيد</button>
              </div>
           </div>
        </div>

        {/* Main Content Area (3/4) */}
        <div className="lg:col-span-3 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black flex items-center gap-3">
              <div className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center shadow-brutal-sm">
                 <Clock size={20} />
              </div>
              أحدث المشاريع
            </h2>
            <Button variant="ghost" onClick={() => navigate('dashboard-projects')}>عرض الكل</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mockProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project}
                onNavigate={navigate}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}