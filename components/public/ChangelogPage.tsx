import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Zap, Sparkles, Layout, Globe, Smartphone, ShieldCheck, Bug, Heart } from 'lucide-react';
import { ViewState } from '../../types';

interface ChangelogPageProps {
  onNavigate: (view: ViewState) => void;
}

const ChangelogPage: React.FC<ChangelogPageProps> = ({ onNavigate }) => {
  const updates = [
    {
      version: 'v2.1.0',
      date: '28 ديسمبر 2024',
      title: 'محرك Gemini 1.5 Flash الجديد ⚡',
      description: 'قمنا بتحديث محرك الذكاء الاصطناعي ليصبح أسرع بـ 3 أضعاف في بناء المواقع.',
      icon: Zap,
      accent: 'bg-yellow-100 text-yellow-700 border-yellow-700',
      changes: [
        'تحسين سرعة الاستجابة للأوامر العربية.',
        'إضافة ميزة "تعديل الصور" عبر المحادثة.',
        'تحسين دقة كتابة المحتوى التسويقي للمطاعم.'
      ]
    },
    {
      version: 'v2.0.4',
      date: '15 ديسمبر 2024',
      title: 'قوالب التجارة الإلكترونية 🛒',
      description: 'إطلاق 5 قوالب جديدة مصممة خصيصاً للمتاجر التي تعمل في الكويت والخليج.',
      icon: Layout,
      accent: 'bg-blue-100 text-blue-700 border-blue-700',
      changes: [
        'تكامل كامل مع روابط دفع MyFatoorah.',
        'تصميمات سريعة جداً للموبايل.',
        'دعم تعدد اللغات (عربي/إنجليزي) بضغطة زر.'
      ]
    },
    {
      version: 'v2.0.0',
      date: '1 ديسمبر 2024',
      title: 'الإطلاق الرسمي للمنصة 🚀',
      description: 'مرحباً بكم في KWQ8! المنصة الأولى لبناء المواقع بالذكاء الاصطناعي باللغة العربية.',
      icon: Rocket,
      accent: 'bg-violet-100 text-violet-700 border-violet-700',
      changes: [
        'إطلاق نظام "البناء بالمحادثة".',
        'نظام الرصيد المرن (بدون اشتراك شهري).',
        'لوحة تحكم كاملة لإدارة المواقع والدومينات.'
      ]
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-24">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-700 border-2 border-slate-700 text-sm font-black mb-8"
            >
                <Sparkles size={16} fill="currentColor" /> سجل التحديثات
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-black text-black mb-6 font-heading">ما الجديد في KWQ8؟</h1>
            <p className="text-xl text-slate-600 font-bold max-w-2xl mx-auto leading-relaxed">
                نحن نعمل ليل نهار لنقدم لك أفضل تجربة بناء مواقع في العالم. تابع آخر التطورات والميزات هنا.
            </p>
        </div>

        {/* Timeline */}
        <div className="relative space-y-16">
            {/* Vertical Line */}
            <div className="absolute top-0 bottom-0 right-[27px] md:right-1/2 w-[4px] bg-slate-100 rounded-full"></div>

            {updates.map((update, idx) => (
                <div key={idx} className="relative flex flex-col md:flex-row items-start md:items-center group">
                    
                    {/* Icon / Marker */}
                    <div className="absolute right-0 md:right-1/2 md:translate-x-1/2 z-10 w-14 h-14 bg-white border-[4px] border-black rounded-2xl flex items-center justify-center shadow-neo-sm group-hover:scale-110 transition-transform">
                        <update.icon size={24} className="text-black" />
                    </div>

                    {/* Content Card */}
                    <div className={`w-full md:w-[45%] pr-20 md:pr-0 ${idx % 2 === 0 ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'}`}>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 font-black text-xs mb-4 ${update.accent}`}>
                            {update.version} • {update.date}
                        </div>
                        <h2 className="text-2xl font-black text-black mb-4">{update.title}</h2>
                        <p className="text-slate-600 font-bold mb-6 leading-relaxed">
                            {update.description}
                        </p>
                        
                        <div className={`bg-slate-50 border-2 border-slate-200 rounded-2xl p-6 text-right shadow-neo-sm group-hover:border-black transition-colors ${idx % 2 === 0 ? 'md:ml-0' : 'md:mr-0'}`}>
                            <ul className="space-y-3">
                                {update.changes.map((change, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm font-bold text-slate-700">
                                        <div className="w-5 h-5 rounded-full bg-white border border-slate-300 flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</div>
                                        <span>{change}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* CTA Footer */}
        <div className="mt-32 text-center bg-violet-600 border-[4px] border-black rounded-3xl p-12 shadow-neo relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rotate-12 -translate-y-10"></div>
            <div className="relative z-10">
                <h3 className="text-3xl font-black text-white mb-6">لديك اقتراح لميزة جديدة؟</h3>
                <p className="text-white/80 font-bold mb-8 max-w-lg mx-auto">
                    نحن نبني هذا المنتج لأجلك. شاركنا أفكارك وسنقوم بتنفيذها في التحديثات القادمة.
                </p>
                <button className="bg-yellow-400 text-black px-8 py-3 rounded-xl font-black text-lg border-2 border-black shadow-neo-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                    أرسل اقتراحك ←
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ChangelogPage;