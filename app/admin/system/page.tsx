"use client";

import * as React from "react";
import { 
  Server, Database, Cpu, HardDrive, Wifi,
  CheckCircle, AlertTriangle, XCircle, RefreshCw,
  Activity, TrendingUp
} from "lucide-react";
// Fix: Standardized import casing to uppercase Button.tsx
import Button from "../../../components/ui/Button.tsx";
import { Badge } from "../../../components/ui/badge.tsx";
import { AdminPageHeader } from "../../../components/admin/index.ts";
import { cn } from "../../../lib/utils/cn.ts";

const services = [
  { name: "Supabase", status: "healthy", responseTime: "45ms", uptime: "99.99%" },
  { name: "Vercel", status: "healthy", responseTime: "120ms", uptime: "99.95%" },
  { name: "Claude API", status: "healthy", responseTime: "890ms", uptime: "99.90%" },
  { name: "Gemini API", status: "healthy", responseTime: "750ms", uptime: "99.85%" },
  { name: "Tap Payments", status: "healthy", responseTime: "230ms", uptime: "99.99%" },
];

const recentErrors = [
  { id: "1", message: "Claude API rate limit exceeded", count: 3, lastOccurred: "منذ 5 دقائق", severity: "warning" },
  { id: "2", message: "Payment webhook timeout", count: 1, lastOccurred: "منذ ساعة", severity: "error" },
  { id: "3", message: "Database connection pool exhausted", count: 2, lastOccurred: "منذ 3 ساعات", severity: "warning" },
];

const systemMetrics = [
  { name: "CPU Usage", value: "23%", icon: Cpu, status: "good" },
  { name: "Memory", value: "45%", icon: HardDrive, status: "good" },
  { name: "Database", value: "12GB / 50GB", icon: Database, status: "good" },
  { name: "Bandwidth", value: "234GB", icon: Wifi, status: "good" },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "healthy":
    case "good":
      return <CheckCircle className="h-5 w-5 text-green-400" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
    case "error":
    case "down":
      return <XCircle className="h-5 w-5 text-red-400" />;
    default:
      return null;
  }
};

export default function SystemHealthPage() {
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsRefreshing(false);
  };

  return (
    <div dir="rtl" className="animate-fade-in">
      <AdminPageHeader
        title="صحة النظام"
        description="مراقبة حالة الخدمات والأداء الحي للمنصة"
      >
        <Button variant="secondary" onClick={handleRefresh}>
          <RefreshCw className={cn("h-4 w-4 ml-2", isRefreshing && "animate-spin")} />
          تحديث الحالة
        </Button>
      </AdminPageHeader>

      {/* Overall Status Banner */}
      <div className="bg-green-500/10 border-2 border-green-500 p-6 mb-8 rounded-xl flex items-center gap-4 shadow-brutal-sm">
        <div className="bg-green-500 p-2 rounded-lg border-2 border-black">
          <CheckCircle className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="font-black text-green-400 text-lg">جميع الأنظمة تعمل بشكل طبيعي</p>
          <p className="text-sm text-green-400/70 font-bold">آخر فحص تلقائي: منذ دقيقتين</p>
        </div>
      </div>

      {/* System Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {systemMetrics.map((metric, index) => (
          <div key={index} className="bg-surface-darker border-3 border-black p-5 shadow-neo-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-white/5 border border-white/10 rounded">
                <metric.icon className="h-5 w-5 text-content-muted" />
              </div>
              {getStatusIcon(metric.status)}
            </div>
            <p className="text-xs font-black text-content-muted uppercase tracking-widest">{metric.name}</p>
            <p className="text-2xl font-mono font-bold text-white mt-1">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Services Status Table */}
        <div className="bg-surface-darker border-3 border-black shadow-neo-sm overflow-hidden">
          <div className="p-5 border-b-2 border-border-dark bg-white/5 flex items-center gap-3">
            <Server className="h-5 w-5 text-brand-violet" />
            <h2 className="font-black text-white">حالة الخدمات الخارجية</h2>
          </div>
          <div className="divide-y divide-border-dark">
            {services.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-5 hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                  {getStatusIcon(service.status)}
                  <div>
                    <p className="font-black text-white">{service.name}</p>
                    <p className="text-xs text-content-muted font-bold">
                      زمن الاستجابة: <span className="font-mono">{service.responseTime}</span>
                    </p>
                  </div>
                </div>
                <div className="text-left">
                  <Badge variant="success" className="font-mono border-black">
                    {service.uptime}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Errors Log */}
        <div className="bg-surface-darker border-3 border-black shadow-neo-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b-2 border-border-dark bg-white/5 flex items-center gap-3">
            <Activity className="h-5 w-5 text-red-400" />
            <h2 className="font-black text-white">الأخطاء والتنبيهات الأخيرة</h2>
          </div>
          <div className="divide-y divide-border-dark flex-1">
            {recentErrors.map((error) => (
              <div key={error.id} className="p-5 hover:bg-white/5 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "p-2 rounded border border-black",
                    error.severity === "error" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"
                  )}>
                    {error.severity === "error" ? (
                      <XCircle className="h-4 w-4" />
                    ) : (
                      <AlertTriangle className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-bold leading-tight">{error.message}</p>
                    <div className="flex items-center gap-4 mt-2 text-[10px] font-black text-content-muted uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <RefreshCw className="h-3 w-3" /> التكرار: {error.count}
                      </span>
                      <span>حدث {error.lastOccurred}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-white/5 text-center">
            <button className="text-xs font-black text-brand-violet hover:underline uppercase tracking-widest">
              مشاهدة السجل الكامل للأنظمة
            </button>
          </div>
        </div>
      </div>

      {/* API Usage & Costs */}
      <div className="mt-8 bg-surface-darker border-3 border-black p-8 shadow-neo">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-black text-xl text-white">استهلاك تكاليف API اليوم</h2>
          <Badge variant="outline" className="text-white/50 border-white/20">تحديث لحظي</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-dark p-6 border border-border-dark rounded-xl">
            <p className="text-content-muted text-xs font-black uppercase tracking-widest mb-1">Claude API</p>
            <p className="text-3xl font-black text-white tracking-tighter">$12.50</p>
            <p className="text-xs text-content-muted mt-1 font-mono">~45,000 tokens used</p>
          </div>
          <div className="bg-surface-dark p-6 border border-border-dark rounded-xl">
            <p className="text-content-muted text-xs font-black uppercase tracking-widest mb-1">Gemini API</p>
            <p className="text-3xl font-black text-white tracking-tighter">$8.30</p>
            <p className="text-xs text-content-muted mt-1 font-mono">~120,000 tokens used</p>
          </div>
          <div className="bg-surface-dark p-6 border-2 border-brand-lime/30 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-brand-lime/5 -rotate-45 translate-x-4 -translate-y-4" />
            <p className="text-content-muted text-xs font-black uppercase tracking-widest mb-1">إجمالي التكلفة</p>
            <p className="text-3xl font-black text-brand-lime tracking-tighter">$20.80</p>
            <p className="text-xs text-green-400 mt-1 font-bold flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> ↓ 12% مقارنة بأمس
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
