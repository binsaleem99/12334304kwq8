import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MessageCircle, BookOpen, PlayCircle, ChevronDown, Lightbulb, Info, Wallet, Folder, Globe, Layout, CreditCard, LifeBuoy } from 'lucide-react';
import { ViewState } from '../../types';

interface PublicHelpCenterProps {
  onNavigate: (view: ViewState) => void;
}

const PublicHelpCenter: React.FC<PublicHelpCenterProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const faqs = [
    {
      id: '1',
      question: 'هل فعلاً يمكن بناء موقع في 5 دقائق؟',
      answer: 'نعم! محرك الذكاء الاصطناعي الخاص بنا يقوم بإنشاء الهيكل، كتابة المحتوى، واختيار الصور بناءً على وصفك في أقل من دقيقة. الـ 4 دقائق المتبقية هي لتعديلاتك الشخصية والضغط على زر النشر.',
      category: 'عام'
    },
    {
      id: '2',
      question: 'كيف يعمل نظام الرصيد؟',
      answer: 'بدلاً من الاشتراكات الشهرية المرهقة، نعتمد نظام الرصيد. كل عملية بناء أو تعديل ذكي تستهلك عدداً معيناً من النقاط. الرصيد صالح لمدة 90 يوماً ويمكنك الشحن في أي وقت.',
      category: 'الأسعار'
    },
    {
      id: '3',
      question: 'هل يمكنني ربط دومين كويتي (.com.kw)؟',
      answer: 'بالتأكيد! يمكنك ربط أي دومين تملكه بموقعك. نوفر لك إعدادات DNS بسيطة لربطها من خلال لوحة تحكم مزود الدومين الخاص بك.',
      category: 'الدومينات'
    },
    {
      id: '4',
      question: 'ماذا لو أردت تعديل شيء ما لاحقاً؟',
      answer: 'يمكنك الدخول للوحة التحكم في أي وقت واستخدام "المحرر الذكي" لطلب تعديلات عبر المحادثة، أو التعديل يدوياً باستخدام أدواتنا السهلة.',
      category: 'التعديل'
    }
  ];

  const filteredFaqs = faqs.filter(f => f.question.includes(searchQuery) || f.answer.includes(searchQuery));

  return (
    <div className="pt-32 pb-24 bg-white overflow-hidden" dir="rtl">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        
        {/* Hero */}
        <div className="text-center mb-16">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 border-2 border-cyan-700 text-sm font-black mb-8"
            >
                <LifeBuoy size={16} fill="currentColor" /> الدعم والمساعدة
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black text-black mb-8 font-heading leading-tight">كيف يمكننا <span className="text-[#7C3AED]">مساعدتك؟</span></h1>
            
            <div className="relative max-w-2xl mx-auto">
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث عن سؤالك (مثلاً: الدفع، الدومين، التعديلات)..." 
                    className="w-full pl-6 pr-14 py-5 rounded-2xl bg-white border-[3px] border-black text-xl font-bold focus:shadow-neo transition-all outline-none"
                />
                <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" size={28} />
            </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
            {[
                { title: 'دليل البداية', desc: 'تعلم كيف تبني موقعك الأول', icon: PlayCircle, color: 'bg-yellow-300' },
                { title: 'الأسعار والاشتراك', desc: 'كل ما تود معرفته عن الرصيد', icon: Wallet, color: 'bg-green-300' },
                { title: 'مشاكل تقنية', desc: 'حلول سريعة للمشاكل الشائعة', icon: Info, color: 'bg-pink-300' }
            ].map((cat, idx) => (
                <button key={idx} className="bg-white border-[3px] border-black p-8 rounded-2xl shadow-neo hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all text-right group">
                    <div className={`w-14 h-14 rounded-xl ${cat.color} border-2 border-black flex items-center justify-center mb-6 shadow-neo-sm group-hover:scale-110 transition-transform`}>
                        <cat.icon size={28} className="text-black" />
                    </div>
                    <h3 className="text-2xl font-black text-black mb-2">{cat.title}</h3>
                    <p className="text-slate-500 font-bold">{cat.desc}</p>
                </button>
            ))}
        </div>

        {/* FAQs */}
        <div className="mb-24">
            <h2 className="text-3xl font-black text-black mb-10 border-r-8 border-[#7C3AED] pr-4">الأسئلة الشائعة</h2>
            <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                    <div key={faq.id} className="bg-slate-50 border-[3px] border-black rounded-xl overflow-hidden">
                        <button 
                            onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                            className="w-full flex items-center justify-between p-6 text-right font-black text-xl hover:bg-violet-50 transition-colors"
                        >
                            <span>{faq.question}</span>
                            <ChevronDown className={`transition-transform duration-300 ${expandedFaq === faq.id ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {expandedFaq === faq.id && (
                                <motion.div 
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto' }}
                                    exit={{ height: 0 }}
                                    className="overflow-hidden bg-white"
                                >
                                    <div className="p-6 text-lg text-slate-600 font-bold leading-relaxed border-t-2 border-slate-100">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-black text-white rounded-3xl p-10 md:p-16 text-center relative overflow-hidden border-[4px] border-black shadow-neo-lg">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="relative z-10">
                <h3 className="text-3xl md:text-5xl font-black mb-6">لم تجد إجابة؟</h3>
                <p className="text-xl text-slate-400 font-bold mb-10 max-w-2xl mx-auto">فريقنا متاح دائماً للمساعدة عبر الواتساب أو البريد الإلكتروني.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <button 
                        onClick={() => onNavigate('contact')}
                        className="bg-green-500 text-black px-10 py-4 rounded-xl font-black text-xl border-2 border-white shadow-[4px_4px_0px_0px_#ffffff] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-3"
                    >
                        <MessageCircle size={24} /> واتساب الدعم
                    </button>
                    <button 
                        onClick={() => onNavigate('contact')}
                        className="bg-white text-black px-10 py-4 rounded-xl font-black text-xl border-2 border-black shadow-[4px_4px_0px_0px_#7C3AED] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                    >
                        تواصل معنا ←
                    </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default PublicHelpCenter;