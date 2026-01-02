import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Globe, Database, Cpu, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
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
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
            <div>
                <h1 className="text-4xl md:text-5xl font-black text-black mb-2 font-heading">حالة النظام</h1>
                <p className="text-slate-500 font-bold">تحديثات مباشرة عن أداء خدماتنا</p>
            </div>
            <div className="bg-green-100 text-green-700 px-6 py-3 rounded-2xl border-[3px] border-green-600 flex items-center gap-3 font-black shadow-neo-sm">
                <CheckCircle2 size={24} /> جميع الأنظمة تعمل بكفاءة
            </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
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

        {/* Uptime History Chart (Neo-Brutalist Style) */}
        <div className="bg-white border-[3px] border-black rounded-3xl p-8 shadow-neo-lg mb-12">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-black">سجل التشغيل</h3>
                <span className="text-sm font-bold text-slate-400 uppercase">30 يوم الماضية</span>
            </div>
            
            <div className="space-y-8">
                {['الاستضافة', 'منصة البناء'].map(label => (
                    <div key={label}>
                        <div className="flex justify-between text-sm font-bold mb-2">
                            <span className="text-black">{label}</span>
                            <span className="text-green-600">100%</span>
                        </div>
                        <div className="flex gap-1 h-8">
                            {[...Array(30)].map((_, i) => (
                                <div 
                                    key={i} 
                                    className={`flex-1 rounded-sm border border-black/10 transition-colors ${i === 15 ? 'bg-yellow-300' : 'bg-green-400'} hover:opacity-70 cursor-help`}
                                    title={`Day ${30-i}: ${i === 15 ? 'Minor Lag' : 'Operational'}`}
                                ></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                <span>قبل 30 يوم</span>
                <span>اليوم</span>
            </div>
        </div>

        {/* Incident History */}
        <div className="space-y-6">
            <h3 className="text-2xl font-black text-black flex items-center gap-3">
                <Clock size={24} /> السجل التاريخي
            </h3>
            
            <div className="relative border-r-4 border-slate-200 pr-8 space-y-12 py-4">
                <div className="relative">
                    <div className="absolute top-1 right-[-42px] w-6 h-6 bg-white border-[3px] border-black rounded-full"></div>
                    <div className="text-xs font-black text-slate-400 mb-2 uppercase">28 ديسمبر 2024</div>
                    <h4 className="text-xl font-black text-black mb-2">تحديث مجدول لقاعدة البيانات</h4>
                    <p className="text-slate-600 font-medium">تم الانتهاء من تحديث أنظمة التخزين دون أي تأثير على المستخدمين. استغرق العمل 12 دقيقة.</p>
                    <div className="mt-3 text-green-600 font-bold text-xs">✓ مكتمل</div>
                </div>

                <div className="relative">
                    <div className="absolute top-1 right-[-42px] w-6 h-6 bg-white border-[3px] border-black rounded-full"></div>
                    <div className="text-xs font-black text-slate-400 mb-2 uppercase">15 ديسمبر 2024</div>
                    <h4 className="text-xl font-black text-black mb-2">ضغط غير متوقع على محرك AI</h4>
                    <p className="text-slate-600 font-medium">لاحظنا تأخراً في استجابة محرك البناء بسبب زيادة مفاجئة في عدد الطلبات. تم رفع كفاءة السيرفرات وعاد العمل للطبيعي.</p>
                    <div className="mt-3 text-yellow-600 font-bold text-xs flex items-center gap-1">
                        <AlertTriangle size={14} /> تم الحل
                    </div>
                </div>
            </div>
        </div>

        {/* Subscribe to Alerts */}
        <div className="mt-20 bg-yellow-300 border-[4px] border-black rounded-3xl p-8 md:p-12 shadow-neo text-center">
            <h3 className="text-2xl md:text-3xl font-black text-black mb-4">اشترك في تنبيهات الحالة</h3>
            <p className="text-black/70 font-bold mb-8">سنرسل لك رسالة فوراً في حال حدوث أي عطل مفاجئ.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                    type="email" 
                    placeholder="بريدك الإلكتروني" 
                    className="flex-1 px-5 py-3 rounded-xl border-[3px] border-black focus:shadow-neo-sm outline-none font-bold"
                />
                <button className="bg-black text-white px-8 py-3 rounded-xl font-black border-[3px] border-black hover:translate-y-[-2px] transition-all shadow-neo-sm">
                    اشترك
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default SystemStatusPage;