import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, MoreVertical, ExternalLink, BarChart3, Settings, Edit2, ShieldCheck, AlertTriangle, ArrowRight, FolderOpen, Lock, Power } from 'lucide-react';
import { ViewState } from '../../../types';
import Button from '../../ui/Button';

interface PublishedSitesProps {
  onNavigate: (view: ViewState) => void;
}

const PublishedSites: React.FC<PublishedSitesProps> = ({ onNavigate }) => {
  // Mock Data
  const sites = [
    {
      id: '1',
      name: 'موقع المطعم البحري',
      url: 'https://blue-sea-restaurant.kwq8.com',
      thumbnailColor: 'bg-blue-100',
      visits: '1,234',
      lastUpdate: 'منذ 3 أيام',
      status: 'online',
      ssl: true,
      domainType: 'subdomain',
      expiry: null
    },
    {
      id: '2',
      name: 'متجر العطور الفاخرة',
      url: 'https://luxe-perfumes.com',
      thumbnailColor: 'bg-pink-100',
      visits: '2,567',
      lastUpdate: 'أمس',
      status: 'online',
      ssl: true,
      domainType: 'custom',
      expiry: '8 أشهر'
    }
  ];

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const toggleMenu = (id: string) => {
    if (activeMenu === id) setActiveMenu(null);
    else setActiveMenu(id);
  };

  return (
    <div className="space-y-8 min-h-[80vh]">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-black mb-1">المواقع المنشورة 🌐</h1>
        <p className="text-slate-600 font-bold">إدارة مواقعك المنشورة على الإنترنت</p>
      </div>

      {sites.length > 0 ? (
        <div className="space-y-6">
          {sites.map((site) => (
            <motion.div
              key={site.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border-[3px] border-black rounded-xl p-6 shadow-[6px_6px_0px_0px_#000] flex flex-col lg:flex-row gap-6 lg:items-center relative"
            >
              {/* Thumbnail */}
              <div className={`w-full lg:w-48 h-32 ${site.thumbnailColor} border-[3px] border-black rounded-lg flex items-center justify-center shrink-0`}>
                <Globe size={40} className="text-black/20" />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black text-black mb-1">{site.name}</h2>
                    <a 
                      href={site.url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-[#7C3AED] font-bold hover:underline flex items-center gap-1 dir-ltr"
                    >
                      <ExternalLink size={14} /> {site.url}
                    </a>
                  </div>
                  
                  {/* Quick Stats */}
                  <div className="flex gap-4 text-xs font-bold text-slate-600 bg-slate-50 p-2 rounded-lg border-2 border-slate-100">
                    <div className="flex items-center gap-1">
                      <BarChart3 size={14} /> {site.visits} زيارة هذا الشهر
                    </div>
                    <div className="w-px bg-slate-300"></div>
                    <div>⏱️ آخر تحديث: {site.lastUpdate}</div>
                  </div>
                </div>

                <div className="border-t-2 border-slate-100 my-2"></div>

                <div className="flex flex-wrap gap-4 items-center">
                   {/* Status Badges */}
                   <div className="flex items-center gap-2 px-3 py-1 rounded-full border-2 border-black/10 bg-green-50 text-green-700 font-bold text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      متصل
                   </div>
                   
                   {site.ssl && (
                     <div className="flex items-center gap-2 px-3 py-1 rounded-full border-2 border-black/10 bg-slate-50 text-slate-700 font-bold text-sm">
                        <Lock size={12} /> SSL آمن
                     </div>
                   )}

                   {site.domainType === 'custom' && (
                     <div className="flex items-center gap-2 px-3 py-1 rounded-full border-2 border-black/10 bg-yellow-50 text-yellow-800 font-bold text-sm">
                        ◆ دومين خاص ({site.expiry})
                     </div>
                   )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex lg:flex-col gap-2 w-full lg:w-auto shrink-0 justify-between lg:justify-start">
                  <div className="flex gap-2 w-full">
                     <button 
                        onClick={() => onNavigate('builder')}
                        className="flex-1 lg:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg font-bold hover:bg-slate-800 border-2 border-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] transition-all"
                     >
                        <Edit2 size={16} /> تعديل
                     </button>
                     <button 
                        onClick={() => onNavigate('dashboard-settings')}
                        className="p-2 border-2 border-black rounded-lg hover:bg-slate-50 text-black transition-colors"
                        title="الإعدادات"
                     >
                        <Settings size={20} />
                     </button>
                     <div className="relative">
                        <button 
                            onClick={() => toggleMenu(site.id)}
                            className={`p-2 border-2 border-transparent hover:border-black rounded-lg hover:bg-slate-50 text-slate-400 hover:text-black transition-all ${activeMenu === site.id ? 'bg-slate-100 text-black border-black' : ''}`}
                        >
                            <MoreVertical size={20} />
                        </button>
                        
                        {/* Dropdown Menu */}
                        {activeMenu === site.id && (
                            <div className="absolute top-full left-0 mt-2 w-48 bg-white border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_#000] z-50 overflow-hidden">
                                <button className="w-full text-right px-4 py-2 font-bold text-sm hover:bg-slate-50 border-b-2 border-slate-100 flex items-center gap-2">
                                    <BarChart3 size={16} /> التحليلات
                                </button>
                                <button className="w-full text-right px-4 py-2 font-bold text-sm hover:bg-slate-50 border-b-2 border-slate-100 flex items-center gap-2 text-yellow-600">
                                    <Power size={16} /> إيقاف مؤقت
                                </button>
                                <button className="w-full text-right px-4 py-2 font-bold text-sm hover:bg-red-50 text-red-600 flex items-center gap-2">
                                    <AlertTriangle size={16} /> إلغاء النشر
                                </button>
                            </div>
                        )}
                     </div>
                  </div>
              </div>

              {activeMenu === site.id && (
                 <div className="fixed inset-0 z-40" onClick={() => setActiveMenu(null)}></div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        // Empty State
        <div className="bg-white border-[3px] border-black rounded-2xl p-16 text-center shadow-[6px_6px_0px_0px_#000]">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 border-[3px] border-black border-dashed">
                <Globe size={40} className="text-slate-400" />
            </div>
            <h2 className="text-2xl font-black text-black mb-2">لا توجد مواقع منشورة بعد</h2>
            <p className="text-slate-600 font-bold mb-8">انشر موقعك الأول ليظهر هنا</p>
            <Button onClick={() => onNavigate('dashboard-projects')} className="bg-[#7C3AED] text-white border-black">
                <ArrowRight className="ml-2 w-5 h-5" /> عرض المشاريع
            </Button>
        </div>
      )}
    </div>
  );
};

export default PublishedSites;