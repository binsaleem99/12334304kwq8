import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { Shield, Users, Trophy, Hand, Medal, Sparkles } from 'lucide-react';

const TrustCard = ({ title, icon: Icon, accent, children }: any) => {
    const accentStyles: any = {
        violet: 'bg-violet-100 text-violet-700',
        pink: 'bg-pink-100 text-pink-700',
        orange: 'bg-orange-100 text-orange-700',
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`bg-white p-6 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_#000]`}
        >
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded border-2 border-black text-sm font-black mb-4 ${accentStyles[accent]}`}>
                <Icon size={16} />
                {title}
            </div>
            {children}
        </motion.div>
    )
}

const SocialProof = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-2 text-black flex items-center justify-center gap-2">
                لماذا تثق بنا؟ <Users size={32} className="text-violet-600" />
            </h2>
            <p className="text-slate-600 font-bold">نحن شركة جديدة — وهذا أفضل شيء لك</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <TrustCard title="ضماناتنا لك" icon={Shield} accent="violet">
                <ul className="space-y-3 text-black font-bold">
                    <li className="flex gap-2"><span>✓</span> شركة مسجلة في الكويت 🇰🇼</li>
                    <li className="flex gap-2"><span>✓</span> فريق محلي يتحدث لغتك</li>
                    <li className="flex gap-2"><span>✓</span> دعم واتساب حقيقي</li>
                </ul>
            </TrustCard>

            <TrustCard title="مزايا المستخدم الأول" icon={Sparkles} accent="pink">
                <ul className="space-y-3 text-black font-bold">
                    <li className="flex gap-2"><span>→</span> أسعار تأسيسية قبل الزيادة</li>
                    <li className="flex gap-2"><span>→</span> صوتك يشكّل المنتج</li>
                    <li className="flex gap-2"><span>→</span> دعم شخصي ومباشر</li>
                    <li className="flex gap-2"><span>→</span> قصة نجاح من البداية</li>
                </ul>
            </TrustCard>

            <TrustCard title="فريق سبرينغوود" icon={Hand} accent="orange">
                <div className="mb-4 text-black font-bold">
                    صُنع في الكويت 🇰🇼<br/>
                    للخليج العربي 🌴
                </div>
                <p className="text-slate-700 font-medium mb-4">
                    نحن فريق صغير بحلم كبير: جعل بناء المواقع متاحاً لكل عربي.
                </p>
                <a href="#" className="text-black bg-orange-200 px-2 py-0.5 border-2 border-black text-sm font-black hover:bg-orange-300">تعرف علينا ←</a>
            </TrustCard>
        </div>

        {/* Founder Badge CTA */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 border-2 border-black shadow-[8px_8px_0px_0px_#000] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 to-orange-500 border-b-2 border-black"></div>
            
            <h3 className="text-3xl font-black text-black mb-2 flex items-center justify-center gap-2">
                <Trophy className="text-yellow-500 fill-yellow-500" /> سجّل اسمك في تاريخنا
            </h3>
            <p className="text-slate-800 font-medium mb-8">أول 100 مستخدم يحصلون على شارة "المؤسس" الذهبية</p>
            
            <div className="relative h-8 bg-slate-100 rounded-lg border-2 border-black mb-2 overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '23%' }}
                    transition={{ duration: 1.5 }}
                    className="absolute top-0 right-0 h-full bg-yellow-400 border-l-2 border-black"
                />
                <span className="absolute inset-0 flex items-center justify-center text-xs font-black z-10">23%</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500 font-bold mb-8">
                <span>0</span>
                <span>23/100 محجوز</span>
                <span>100</span>
            </div>

            <Button variant="primary" className="flex items-center gap-2">
                <Medal size={18} /> احجز مكانك الآن
            </Button>
        </div>

        <div className="mt-16 text-center">
            <p className="text-sm text-slate-500 font-bold mb-4">مبني بأحدث التقنيات</p>
            <div className="flex justify-center gap-4 flex-wrap">
                {['Next.js', 'Supabase', 'Vercel', 'AI'].map(tech => (
                    <span key={tech} className="bg-white border-2 border-black px-3 py-1 rounded shadow-[2px_2px_0px_0px_#000] text-xs font-bold text-black transform hover:-translate-y-1 transition-transform cursor-default flex items-center gap-1">
                        {tech} {tech === 'AI' && <Sparkles size={10} />}
                    </span>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;