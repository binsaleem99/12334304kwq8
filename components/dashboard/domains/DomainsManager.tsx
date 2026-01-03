"use client";

import * as React from "react";
import { 
  Link as LinkIcon, Globe, Plus, ExternalLink, 
  Clock, AlertTriangle, ShieldCheck
} from "lucide-react";
import { Button, Badge } from "../../ui/index.ts";
import { PageHeader, EmptyState } from "../index.ts";
import { ViewState } from "../../../types.ts";

interface DomainsManagerProps {
  onNavigate: (view: ViewState) => void;
}

const domains = [
  {
    id: "1",
    subdomain: "beauty-salon",
    fullUrl: "beauty-salon.kwq8.com",
    project: "صالون الجمال",
    status: "active",
    ssl: true,
  },
  {
    id: "2",
    subdomain: "fashion-store",
    fullUrl: "fashion-store.kwq8.com",
    project: "متجر الأزياء",
    status: "active",
    ssl: true,
  },
];

export default function DomainsManager({ onNavigate }: DomainsManagerProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-8" dir="rtl">
      <PageHeader
        title="إدارة النطاقات 🌐"
        description="إدارة العناوين الإلكترونية (النطاقات الفرعية) المرتبطة بمشاريعك."
      >
        <Button variant="gradient" onClick={() => onNavigate('dashboard-new-project')}>
          <Plus className="h-5 w-5 ms-2" />
          موقع جديد
        </Button>
      </PageHeader>

      {/* Info Banner */}
      <div className="bg-brand-cyan/10 border-3 border-black shadow-brutal p-6 rounded-2xl flex items-start gap-4 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 bg-brand-cyan h-full" />
        <div className="p-3 bg-white border-2 border-black rounded-xl shadow-brutal-sm group-hover:rotate-3 transition-transform">
          <Globe className="h-6 w-6 text-brand-cyan" />
        </div>
        <div>
          <h3 className="font-black text-lg mb-1">النطاقات المخصصة قادمة قريباً! 🚀</h3>
          <p className="text-content-secondary font-bold leading-relaxed">
            حالياً جميع المواقع تحصل على نطاق فرعي مجاني ومؤمن بشهادة SSL تلقائياً: 
            <span className="text-brand-violet mx-1 font-mono">yoursite.kwq8.com</span>
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs font-black text-brand-cyan uppercase tracking-widest">
            <Clock className="h-3 w-3" /> جاري العمل على ميزة ربط الدومينات الخاصة (.com, .kw)
          </div>
        </div>
      </div>

      {domains.length > 0 ? (
        <div className="grid gap-6">
          {domains.map((domain) => (
            <div
              key={domain.id}
              className="bg-white border-3 border-black shadow-brutal p-8 rounded-[2rem] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm transition-all group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-brand-lime border-3 border-black shadow-brutal-sm flex items-center justify-center rounded-2xl group-hover:rotate-6 transition-transform">
                    <LinkIcon className="h-8 w-8 text-black" />
                  </div>
                  <div>
                    <h3 className="font-black text-2xl text-content-primary mb-1">{domain.project}</h3>
                    <a 
                      href={`https://${domain.fullUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-violet font-bold hover:underline text-lg flex items-center gap-2"
                      dir="ltr"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {domain.fullUrl}
                    </a>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 bg-slate-50 p-4 rounded-2xl border-2 border-black/5">
                  {domain.ssl && (
                    <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 border-2 border-green-600 rounded-xl font-black text-sm shadow-brutal-sm">
                      <ShieldCheck className="h-4 w-4" />
                      اتصال آمن (SSL)
                    </div>
                  )}
                  <Badge variant="success" size="lg" className="h-10 px-6 shadow-brutal-sm">
                    <div className="w-2 h-2 rounded-full bg-black animate-pulse me-2" />
                    نشط ويعمل
                  </Badge>
                  
                  <div className="h-10 w-[2px] bg-black/10 mx-2 hidden lg:block" />
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => window.open(`https://${domain.fullUrl}`, '_blank')}
                  >
                    فتح الموقع
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border-3 border-black shadow-brutal rounded-[3rem] overflow-hidden">
          <EmptyState
            icon={LinkIcon}
            title="لا توجد نطاقات نشطة"
            description="قم بنشر مشروعك الأول للحصول على عنوان إلكتروني مجاني لموقعك."
            actionLabel="إنشاء مشروعي الأول"
            onAction={() => onNavigate('dashboard-new-project')}
          />
        </div>
      )}

      {/* Helpful Info Section */}
      <div className="mt-12 p-8 border-3 border-black border-dashed rounded-[2rem] bg-slate-50/50">
        <h3 className="font-black text-xl mb-4 flex items-center gap-2">
          <AlertTriangle className="text-brand-gold h-6 w-6" />
          هل تريد تغيير عنوان موقعك؟
        </h3>
        <p className="text-content-secondary font-bold leading-relaxed mb-6">
          يمكنك تغيير العنوان الفرعي لموقعك من خلال إعدادات كل مشروع. يرجى الملاحظة أن تغيير العنوان سيؤدي إلى تعطل الروابط القديمة التي شاركتها سابقاً.
        </p>
        <div className="flex gap-4">
           <Button variant="secondary" onClick={() => onNavigate('dashboard-help')}>مركز المساعدة</Button>
           <Button variant="ghost" onClick={() => onNavigate('dashboard-projects')}>إعدادات المشاريع</Button>
        </div>
      </div>
    </div>
  );
}