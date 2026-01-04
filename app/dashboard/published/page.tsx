"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { 
  Globe, ExternalLink, Settings, BarChart3, 
  Eye, Edit, Clock, MoreVertical, Plus
} from "lucide-react";
import { Button, Badge } from "../../../components/ui/index.ts";
import { PageHeader, EmptyState } from "../../../components/dashboard/index.ts";
import { ViewState } from "../../../types.ts";

interface PublishedSitesPageProps {
  onNavigate: (view: ViewState) => void;
}

const publishedSites = [
  {
    id: "1",
    name: "صالون الجمال",
    subdomain: "beauty-salon",
    url: "https://beauty-salon.kwq8.com",
    status: "active",
    views: 1250,
    lastUpdated: "منذ ساعتين",
  },
  {
    id: "3",
    name: "متجر الأزياء",
    subdomain: "fashion-store",
    url: "https://fashion-store.kwq8.com",
    status: "active",
    views: 890,
    lastUpdated: "منذ 3 أيام",
  },
];

export default function PublishedSitesPage({ onNavigate }: PublishedSitesPageProps) {
  return (
    <div className="space-y-8" dir="rtl">
      <PageHeader
        title="المواقع المنشورة 🌐"
        description="إدارة جميع مواقعك التي تعمل حالياً على الإنترنت."
      >
        <Button variant="gradient" size="md" onClick={() => onNavigate('dashboard-new-project')}>
          <Plus className="h-5 w-5 ms-2" />
          موقع جديد
        </Button>
      </PageHeader>

      {publishedSites.length > 0 ? (
        <div className="space-y-6">
          {publishedSites.map((site, index) => (
            <motion.div
              key={site.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border-3 border-black shadow-brutal p-8 rounded-3xl relative overflow-hidden group"
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-violet/5 rounded-full -translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-500" />
              
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
                {/* Site Info */}
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-brand-lime border-3 border-black shadow-brutal-sm flex items-center justify-center rounded-2xl group-hover:rotate-6 transition-transform">
                    <Globe className="h-8 w-8 text-black" />
                  </div>
                  <div>
                    <h3 className="font-black text-2xl text-content-primary mb-1">{site.name}</h3>
                    <a 
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-violet font-bold hover:underline text-base flex items-center gap-2"
                      dir="ltr"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {site.url}
                    </a>
                  </div>
                </div>

                {/* Stats & Status */}
                <div className="flex flex-wrap items-center gap-8 bg-slate-50 p-4 rounded-2xl border-2 border-black/5">
                  <div className="text-center px-4">
                    <p className="text-2xl font-black text-content-primary leading-none mb-1">{site.views.toLocaleString()}</p>
                    <p className="text-xs font-black text-content-muted uppercase tracking-widest">زيارة فريدة</p>
                  </div>
                  <div className="h-10 w-[2px] bg-black/10 hidden md:block" />
                  <div className="flex items-center gap-2">
                    <Badge variant="success" size="lg" className="h-8 shadow-brutal-sm">
                      <div className="w-2 h-2 rounded-full bg-black animate-pulse me-2" />
                      نشط الآن
                    </Badge>
                  </div>
                </div>

                {/* Actions Grid */}
                <div className="flex flex-wrap items-center gap-3">
                  <Button 
                    variant="secondary" 
                    size="md" 
                    onClick={() => window.open(site.url, '_blank')}
                    title="مشاهدة الموقع"
                  >
                    <Eye className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="md"
                    onClick={() => onNavigate('builder')}
                    title="تعديل المحتوى"
                  >
                    <Edit className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="md"
                    onClick={() => onNavigate('dashboard-analytics')}
                    title="التحليلات"
                  >
                    <BarChart3 className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="default" 
                    size="md"
                    onClick={() => onNavigate('dashboard-settings')}
                    title="الإعدادات"
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Footer Meta */}
              <div className="mt-8 pt-4 border-t-2 border-slate-100 flex items-center justify-between text-sm text-content-muted font-bold">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>آخر تحديث: {site.lastUpdated}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-tighter opacity-50 font-mono">SITE_ID: {site.id}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white border-3 border-black shadow-brutal rounded-[3rem] overflow-hidden">
          <EmptyState
            icon={Globe}
            title="لا توجد مواقع منشورة حالياً"
            description="لم تقم بنشر أي مشروع حتى الآن. ابنِ موقعك الأول باستخدام الذكاء الاصطناعي وشاركه مع العالم بضغطة زر."
            actionLabel="ابدأ بناء موقعك الأول"
            onAction={() => onNavigate('dashboard-new-project')}
          />
        </div>
      )}
    </div>
  );
}