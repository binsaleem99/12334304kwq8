import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Globe, Users, Award, ShieldCheck, Zap } from 'lucide-react';
import { ViewState } from '../../types';

interface AboutPageProps {
  onNavigate: (view: ViewState) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-32 pb-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-24">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 border-2 border-violet-700 text-sm font-black mb-8"
            >
                <Heart size={16} fill="currentColor" /> عن KWQ8
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black text-black mb-8 font-heading leading-tight">
                نحن نبني <span className="text-[#7C3AED]">مستقبل الويب</span> في الخليج العربي
            </h1>
            <p className="text-xl text-slate-600 font-bold max-w-2xl mx-auto leading-relaxed">
                مهمتنا هي تمكين كل رائد أعمال ومبدع في منطقتنا من امتلاك حضور رقمي احترافي خلال دقائق، دون عوائق تقنية أو لغوية.
            </p>
        </div>

        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
            <div className="bg-[#FEF3C7] border-[4px] border-black rounded-3xl p-8 md:p-12 shadow-neo-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 -rotate-45 translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform"></div>
                <Target size={48} className="text-black mb-6" />
                <h2 className="text-3xl font-black text-black mb-6">مهمتنا</h2>
                <p className="text-lg text-black/80 font-bold leading-relaxed">
                    تبسيط تكنولوجيا الويب وجعلها متاحة للجميع. نؤمن أن جودة الموقع الإلكتروني لا يجب أن تعتمد على ميزانية البرمجة، بل على جودة الفكرة.
                </p>
            </div>
            <div className="bg-[#F5F3FF] border-[4px] border-black rounded-3xl p-8 md:p-12 shadow-neo-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 -rotate-45 translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform"></div>
                <Eye size={48} className="text-black mb-6" />
                <h2 className="text-3xl font-black text-black mb-6">رؤيتنا</h2>
                <p className="text-lg text-black/80 font-bold leading-relaxed">
                    أن نصبح المنصة الأولى لبناء وإدارة الهوية الرقمية في العالم العربي، حيث يلتقي الذكاء الاصطناعي العالمي بالثقافة المحلية الأصيلة.
                </p>
            </div>
        </div>

        {/* Stats Section */}
        <div className="bg-black text-white rounded-3xl border-[4px] border-black p-12 mb-32 shadow-neo relative overflow-hidden">
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
             <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                {[
                    { label: 'موقع تم إنشاؤه', val: '+5,000' },
                    { label: 'نقطة رصيد مستخدمة', val: '+120K' },
                    { label: 'دولة نخدمها', val: '6' },
                    { label: 'نسبة رضا العملاء', val: '99%' }
                ].map((stat, i) => (
                    <div key={i}>
                        <div className="text-4xl md:text-5xl font-black text-[#FACC15] mb-2 font-heading">{stat.val}</div>
                        <div className="text-sm md:text-base font-bold text-slate-400">{stat.label}</div>
                    </div>
                ))}
             </div>
        </div>

        {/* Why Us Section */}
        <div className="mb-32 text-center">
             <h2 className="text-4xl font-black text-black mb-16">ما الذي يميزنا؟</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                    { title: 'تركيز محلي', desc: 'قوالبنا ومحتوانا مصمم ليعكس ذوق السوق الكويتي والخليجي.', icon: Globe },
                    { title: 'دعم حقيقي', desc: 'نحن هنا معك، عبر الواتساب والبريد، لنتحدث لغتك ونفهم احتياجك.', icon: Users },
                    { title: 'ابتكار مستمر', desc: 'نقوم بتحديث أنظمتنا يومياً لنضمن حصولك على أحدث تقنيات الـ AI.', icon: Zap }
                ].map((feat, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-white border-[3px] border-black rounded-2xl flex items-center justify-center mb-6 shadow-neo-sm">
                            <feat.icon size={40} className="text-[#7C3AED]" />
                        </div>
                        <h3 className="text-2xl font-black text-black mb-4">{feat.title}</h3>
                        <p className="text-slate-600 font-bold max-w-xs">{feat.desc}</p>
                    </div>
                ))}
             </div>
        </div>

        {/* Founders / Team Section */}
        <div className="max-w-4xl mx-auto bg-slate-50 border-[3px] border-black rounded-3xl p-8 md:p-12 shadow-neo">
            <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="w-48 h-48 rounded-2xl bg-[#7C3AED] border-[4px] border-black shadow-neo-sm shrink-0 flex items-center justify-center">
                    <Award size={80} className="text-white" />
                </div>
                <div>
                    <h2 className="text-3xl font-black text-black mb-4">فريق سبرينغوود</h2>
                    <p className="text-lg text-slate-600 font-bold leading-relaxed mb-6">
                        نحن فريق من المبدعين والمهندسين الكويتيين الذين تجمعوا لتحويل التقنية المعقدة إلى أدوات بسيطة وممتعة. بدأت رحلتنا في عام 2024 ببرنامج تجريبي صغير والآن نخدم آلاف المستخدمين حول الخليج.
                    </p>
                    <div className="flex gap-4">
                        <button className="bg-black text-white px-6 py-2 rounded-xl font-bold border-2 border-black hover:bg-slate-800 transition-colors">
                            تواصل مع الفريق
                        </button>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;