import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Zap, Heart, Globe, ArrowRight, Code, Palette, Search, Briefcase, MapPin, Clock, Coffee, Monitor, Pizza, Sofa } from 'lucide-react';
import { ViewState } from '../../types';
import Button from '../ui/Button';

interface HiringPageProps {
  onNavigate: (view: ViewState) => void;
}

const HiringPage: React.FC<HiringPageProps> = ({ onNavigate }) => {
  const jobs = [
    {
      id: '1',
      title: 'مهندس ذكاء اصطناعي (AI Engineer)',
      department: 'التقنية',
      type: 'دوام كامل',
      location: 'عن بعد / الكويت',
      icon: Code,
      accent: 'bg-violet-100 text-violet-700'
    },
    {
      id: '2',
      title: 'مصمم واجهات وتجربة مستخدم (UI/UX)',
      department: 'التصميم',
      type: 'دوام كامل',
      location: 'الكويت',
      icon: Palette,
      accent: 'bg-pink-100 text-pink-700'
    },
    {
      id: '3',
      title: 'مدير نمو وتسويق (Growth Lead)',
      department: 'الأعمال',
      type: 'دوام كامل',
      location: 'عن بعد',
      icon: Rocket,
      accent: 'bg-yellow-100 text-yellow-700'
    }
  ];

  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-24">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 border-2 border-violet-700 text-sm font-black mb-8"
            >
                <Zap size={16} fill="currentColor" /> نحن نوظف!
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black text-black mb-8 font-heading leading-tight">
                انضم إلى ثورة <br/>
                <span className="text-violet-600 underline decoration-yellow-400 decoration-8 underline-offset-8">الذكاء الاصطناعي</span>
            </h1>
            <p className="text-xl text-slate-600 font-bold max-w-2xl mx-auto leading-relaxed">
                نحن نبني مستقبل الويب في العالم العربي. هل تملك الشغف والمهارة للمشاركة في هذه الرحلة؟
            </p>
        </div>

        {/* Culture Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {[
                { title: 'سرعة البرق', desc: 'نحن نتحرك بسرعة، ونتعلم بسرعة، ونبني بسرعة.', icon: Zap, color: 'bg-yellow-300' },
                { title: 'أثر حقيقي', desc: 'كل سطر برمجي أو تصميم تقوم به سيستخدمه آلاف الأشخاص في المنطقة.', icon: Globe, color: 'bg-violet-400' },
                { title: 'مرونة تامة', desc: 'نركز على النتائج، لا على عدد ساعات العمل أو مكان تواجدك.', icon: Heart, color: 'bg-pink-400' }
            ].map((item, idx) => (
                <div key={idx} className="bg-white border-[3px] border-black rounded-2xl p-8 shadow-[6px_6px_0px_0px_#000]">
                    <div className={`w-14 h-14 rounded-xl ${item.color} border-2 border-black flex items-center justify-center mb-6 shadow-[3px_3px_0px_0px_#000]`}>
                        <item.icon size={28} className="text-black" />
                    </div>
                    <h3 className="text-2xl font-black text-black mb-4">{item.title}</h3>
                    <p className="text-slate-600 font-bold">{item.desc}</p>
                </div>
            ))}
        </div>

        {/* Open Positions */}
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black text-black mb-12 flex items-center gap-4">
                الوظائف الشاغرة <div className="h-1 flex-1 bg-slate-100 rounded"></div>
            </h2>

            <div className="space-y-6">
                {jobs.map(job => (
                    <motion.div 
                        key={job.id}
                        whileHover={{ x: -10 }}
                        className="bg-white border-[3px] border-black rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] transition-all cursor-pointer group"
                    >
                        <div className="flex items-center gap-6">
                            <div className={`w-16 h-16 rounded-2xl ${job.accent} border-2 border-black flex items-center justify-center shrink-0`}>
                                <job.icon size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-black text-black mb-2 group-hover:text-violet-600 transition-colors">{job.title}</h3>
                                <div className="flex flex-wrap gap-4 text-sm font-bold text-slate-400">
                                    <span className="flex items-center gap-1"><Briefcase size={14} /> {job.department}</span>
                                    <span className="flex items-center gap-1"><Clock size={14} /> {job.type}</span>
                                    <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                                </div>
                            </div>
                        </div>
                        <button className="bg-black text-white px-6 py-3 rounded-xl font-black flex items-center gap-2 hover:bg-violet-600 transition-colors shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]">
                            تقدم الآن <ArrowRight size={18} className="rotate-180" />
                        </button>
                    </motion.div>
                ))}
            </div>

            <div className="mt-16 text-center">
                <p className="text-slate-500 font-bold mb-6">لا تجد ما يناسبك؟</p>
                <button className="text-violet-600 font-black text-lg hover:underline decoration-2 underline-offset-4">
                    أرسل سيرتك الذاتية لطلبات التوظيف العامة ←
                </button>
            </div>
        </div>

        {/* Office Life Gallery */}
        <div className="mt-32">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="aspect-square bg-slate-100 rounded-3xl border-[3px] border-black shadow-[6px_6px_0px_0px_#000] flex items-center justify-center">
                    <Coffee size={48} strokeWidth={2.5} className="text-slate-400" />
                </div>
                <div className="aspect-square bg-violet-100 rounded-3xl border-[3px] border-black shadow-[6px_6px_0px_0px_#000] flex items-center justify-center translate-y-8">
                    <Monitor size={48} strokeWidth={2.5} className="text-violet-400" />
                </div>
                <div className="aspect-square bg-pink-100 rounded-3xl border-[3px] border-black shadow-[6px_6px_0px_0px_#000] flex items-center justify-center">
                    <Pizza size={48} strokeWidth={2.5} className="text-pink-400" />
                </div>
                <div className="aspect-square bg-yellow-100 rounded-3xl border-[3px] border-black shadow-[6px_6px_0px_0px_#000] flex items-center justify-center translate-y-8">
                    <Sofa size={48} strokeWidth={2.5} className="text-yellow-600" />
                </div>
             </div>
        </div>

      </div>
    </div>
  );
};

export default HiringPage;