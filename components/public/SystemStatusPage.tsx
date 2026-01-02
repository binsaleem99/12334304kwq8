import React from 'react';
import { CheckCircle2, Cpu, Globe, Zap, Database, Clock, AlertTriangle } from 'lucide-react';
import { ViewState } from '../../types';

interface SystemStatusPageProps {
  onNavigate: (view: ViewState) => void;
}

const SystemStatusPage: React.FC<SystemStatusPageProps> = ({ onNavigate }) => {
  const services = [
    { name: 'محرك الذكاء الاصطناعي', status: 'operational', uptime: '100%', icon: Cpu },
    { name: 'استضافة المواقع', status: 'operational', uptime: '99.98%', icon: Globe },
    { name: 'لوحة التحكم', status: 'operational', uptime: '100%', icon: Zap },
    { name: 'قاعدة البيانات', status: 'operational', uptime: '99.99%', icon: Database },
  ];

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen" dir="rtl">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
            <div>
                <h1 className="text-3xl md:text-5xl font-black text-black mb-2 font-heading">حالة النظام</h1>
                <p className="text-slate-500 font-bold">تحديثات مباشرة عن أداء خدماتنا</p>
            </div>
            <div className="bg-green-100 text-green-700 px-6 py-3 rounded-2xl border-[3px] border-green-600 flex items-center gap-3 font-black shadow-neo-sm">
                <CheckCircle2 size={24} /> جميع الأنظمة تعمل بكفاءة
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {services.map((service, idx) => (
                <div key={idx} className="bg-white border-[3px] border-black p-6 rounded-2xl shadow-neo flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl border-2 border-black flex items-center justify-center text-slate-600">
                            <service.icon size={24} />
                        </div>
                        <div>
                            <div className="font-black text-black text-lg">{service.name}</div>
                            <div className="text-xs font-bold text-slate-400">آخر 90 يوم: {service.uptime}</div>
                        </div>
                    </div>
                    <div className="text-green-500 font-black text-sm flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        مستقر
                    </div>
                </div>
            ))}
        </div>

        <div className="bg-white border-[3px] border-black rounded-3xl p-6 md:p-8 shadow-neo-lg mb-12">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl md:text-2xl font-black text-black">سجل التشغيل</h3>
                <span className="text-sm font-bold text-slate-400 uppercase">30 يوم الماضية</span>
            </div>
            
            <div className="space-y-8">
                {['الاستضافة', 'منصة البناء'].map(label => (
                    <div key={label}>
                        <div className="flex justify-between text-sm font-bold mb-2">
                            <span className="text-black">{label}</span>
                            <span className="text-green-600">100%</span>
                        </div>
                        <div className="flex gap-1 h-8 overflow-hidden">
                            {[...Array(30)].map((_, i) => (
                                <div 
                                    key={i} 
                                    className={`flex-1 rounded-sm border border-black/10 transition-colors ${i === 15 ? 'bg-yellow-300' : 'bg-green-400'} hover:opacity-70`}
                                ></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="space-y-6">
            <h3 className="text-2xl font-black text-black flex items-center gap-3">
                <Clock size={24} /> السجل التاريخي
            </h3>
            
            <div className="relative border-r-4 border-slate-200 pr-8 space-y-12 py-4">
                <div className="relative">
                    <div className="absolute top-1 right-[-42px] w-6 h-6 bg-white border-[3px] border-black rounded-full"></div>
                    <div className="text-xs font-black text-slate-400 mb-2 uppercase">28 ديسمبر 2024</div>
                    <h4 className="text-xl font-black text-black mb-2">تحديث مجدول لقاعدة البيانات</h4>
                    <p className="text-slate-600 font-medium text-sm md:text-base">تم الانتهاء من تحديث أنظمة التخزين بنجاح.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatusPage;