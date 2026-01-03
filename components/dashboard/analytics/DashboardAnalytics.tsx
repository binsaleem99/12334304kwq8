import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, TrendingUp, Users, Eye, Globe,
  Calendar, ArrowUpRight, ArrowDownRight, Clock,
  MousePointer2, ExternalLink
} from 'lucide-react';
import { StatsCard, PageHeader } from '../index.ts';
import { cn } from '../../../lib/utils/cn.ts';

const DashboardAnalytics: React.FC = () => {
  const [period, setPeriod] = useState("week");

  const stats = [
    { title: "إجمالي الزيارات", value: "2,450", change: { value: 12, type: "increase" as const }, icon: Eye, color: "violet" as const },
    { title: "الزوار الفريدون", value: "1,890", change: { value: 8, type: "increase" as const }, icon: Users, color: "pink" as const },
    { title: "معدل الارتداد", value: "32%", change: { value: 5, type: "decrease" as const }, icon: TrendingUp, color: "lime" as const },
    { title: "المواقع النشطة", value: "3", icon: Globe, color: "cyan" as const },
  ];

  const siteStats = [
    { name: "صالون الجمال", views: 1250, visitors: 980, bounce: "28%", trend: "up" },
    { name: "متجر الأزياء", views: 890, visitors: 650, bounce: "35%", trend: "up" },
    { name: "مطعم الديرة", views: 310, visitors: 260, bounce: "40%", trend: "down" },
  ];

  const chartData = [40, 70, 45, 90, 65, 80, 50, 60, 40, 75, 85, 30];

  return (
    <div className="space-y-8" dir="rtl">
      <PageHeader
        title="التحليلات 📊"
        description="تتبع أداء مواقعك وتفاعل جمهورك في مكان واحد."
      >
        <div className="flex items-center border-3 border-black bg-white rounded-xl overflow-hidden shadow-brutal-sm">
          {[
            { value: "day", label: "اليوم" },
            { value: "week", label: "الأسبوع" },
            { value: "month", label: "الشهر" },
          ].map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={cn(
                "px-5 py-2.5 font-black text-sm transition-all border-l-3 last:border-l-0 border-black",
                period === p.value
                  ? "bg-brand-violet text-white"
                  : "bg-white hover:bg-surface-secondary text-content-primary"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </PageHeader>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Card */}
        <div className="lg:col-span-2 bg-white border-3 border-black shadow-brutal p-8 rounded-[2rem] overflow-hidden relative">
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-black text-2xl flex items-center gap-3">
              <div className="p-2 bg-brand-violet/10 rounded-lg">
                <BarChart3 className="h-6 w-6 text-brand-violet" />
              </div>
              الزيارات خلال الفترة
            </h2>
            <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
              <Calendar size={14} />
              {period === 'week' ? 'آخر 7 أيام' : period === 'day' ? 'آخر 24 ساعة' : 'آخر 30 يوم'}
            </div>
          </div>

          <div className="h-72 w-full flex items-end gap-3 px-2 relative">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full h-px bg-black" />
              ))}
            </div>

            {chartData.map((h, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
                className="flex-1 bg-brand-violet border-2 border-black shadow-brutal-sm relative group"
              >
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1.5 rounded-lg text-xs font-black opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 whitespace-nowrap z-10 shadow-brutal-sm">
                  {h * 15} زيارة
                  <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between mt-6 px-2 text-xs font-black text-slate-400">
            <span>البداية</span>
            <span>المنتصف</span>
            <span>الآن</span>
          </div>
        </div>

        {/* Traffic Sources Placeholder */}
        <div className="bg-white border-3 border-black shadow-brutal p-8 rounded-[2rem] flex flex-col">
          <h3 className="font-black text-xl mb-8 flex items-center gap-3">
            <div className="p-2 bg-brand-cyan/10 rounded-lg">
              <MousePointer2 className="h-6 w-6 text-brand-cyan" />
            </div>
            أعلى المصادر
          </h3>
          <div className="space-y-6 flex-1 flex flex-col justify-center">
            {[
              { label: 'بحث عضوي', val: 55, color: 'bg-brand-violet' },
              { label: 'وسائل التواصل', val: 25, color: 'bg-brand-pink' },
              { label: 'زيارات مباشرة', val: 15, color: 'bg-brand-lime' },
              { label: 'أخرى', val: 5, color: 'bg-slate-200' },
            ].map((source) => (
              <div key={source.label}>
                <div className="flex justify-between text-sm font-black mb-2">
                  <span>{source.label}</span>
                  <span>{source.val}%</span>
                </div>
                <div className="h-4 w-full bg-slate-100 border-2 border-black rounded-xl overflow-hidden shadow-brutal-sm">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${source.val}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${source.color} border-l-2 border-black`} 
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t-2 border-slate-100 text-center">
             <button className="text-sm font-black text-brand-violet hover:underline">مشاهدة التفاصيل الكاملة</button>
          </div>
        </div>
      </div>

      {/* Sites Performance Table */}
      <div className="bg-white border-3 border-black shadow-brutal rounded-[2rem] overflow-hidden">
        <div className="p-6 border-b-3 border-black bg-surface-secondary/50 flex items-center justify-between">
          <h2 className="font-black text-2xl">أداء المواقع المنشورة</h2>
          <button className="p-2 hover:bg-white border-2 border-transparent hover:border-black rounded-lg transition-all">
            <ExternalLink size={20} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b-3 border-black text-sm uppercase tracking-widest text-slate-400 font-black">
                <th className="p-6">الموقع</th>
                <th className="p-6">إجمالي الزيارات</th>
                <th className="p-6">الزوار الفريدون</th>
                <th className="p-6">معدل الارتداد</th>
                <th className="p-6">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {siteStats.map((site, index) => (
                <tr key={index} className="border-b-2 border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-violet/10 flex items-center justify-center border-2 border-black group-hover:bg-brand-violet group-hover:text-white transition-colors">
                        <Globe size={18} />
                      </div>
                      <span className="font-black text-lg text-content-primary">{site.name}</span>
                    </div>
                  </td>
                  <td className="p-6 font-mono font-bold text-lg">{site.views.toLocaleString()}</td>
                  <td className="p-6 font-mono font-bold text-lg">{site.visitors.toLocaleString()}</td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold">{site.bounce}</span>
                      {site.trend === 'up' ? (
                        <ArrowUpRight className="h-4 w-4 text-red-500" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-black border-2 border-green-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                      نشط
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
