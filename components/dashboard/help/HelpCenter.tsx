import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MessageCircle, BookOpen, PlayCircle, ChevronDown, ChevronUp, Mail, ExternalLink, Play, Lightbulb, Info, Wallet, Folder, Globe, Layout, CreditCard } from 'lucide-react';
import { ViewState } from '../../../types';
import Button from '../../ui/Button';

interface HelpCenterProps {
  onNavigate: (view: ViewState) => void;
}

type FaqCategory = 'all' | 'getting-started' | 'pricing' | 'projects' | 'publishing' | 'domains' | 'billing';

interface FaqItem {
  id: string;
  question: string;
  answer: React.ReactNode;
  category: FaqCategory;
}

const HelpCenter: React.FC<HelpCenterProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('all');
  const [expandedFaq, setExpandedFaq] = useState<string | null>('1');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: FaqCategory; label: string; icon: any }[] = [
    { id: 'all', label: 'الكل', icon: Info },
    { id: 'getting-started', label: 'البداية', icon: PlayCircle },
    { id: 'pricing', label: 'الباقات', icon: CreditCard },
    { id: 'projects', label: 'المشاريع', icon: Folder },
    { id: 'publishing', label: 'النشر', icon: Globe },
    { id: 'domains', label: 'الدومينات', icon: Layout },
    { id: 'billing', label: 'الفوترة', icon: Wallet },
  ];

  const faqs: FaqItem[] = [
    {
      id: '1',
      category: 'getting-started',
      question: 'كيف أبدأ مشروعي الأول؟',
      answer: (
        <div className="space-y-4">
          <p className="font-bold text-slate-700">لبدء مشروعك الأول، اتبع هذه الخطوات:</p>
          <ol className="list-decimal list-inside space-y-2 text-slate-600 font-medium">
            <li>اضغط على "مشروع جديد" في لوحة التحكم</li>
            <li>اختر طريقة البناء (AI أو قالب جاهز)</li>
            <li>اتبع الخطوات لوصف موقعك أو اختيار التصميم</li>
            <li>شاهد الذكاء الاصطناعي يبني موقعك في ثوانٍ</li>
          </ol>
          <Button size="sm" variant="secondary" className="flex items-center gap-2 mt-4 text-[#7C3AED]">
            <Play size={16} fill="currentColor" /> شاهد الفيديو التعليمي
          </Button>
        </div>
      )
    },
    {
      id: '2',
      category: 'publishing',
      question: 'كيف أنشر موقعي؟',
      answer: (
        <p className="text-slate-600 font-medium">
          بعد الانتهاء من تصميم موقعك في المحرر، اضغط على زر "نشر" في الزاوية العلوية اليسرى. 
          سيطلب منك النظام اختيار دومين (مجاني أو خاص) ثم سيتم نشر الموقع وتفعيله فوراً.
        </p>
      )
    },
    {
      id: '3',
      category: 'domains',
      question: 'هل يمكنني استخدام دومين خاص؟',
      answer: (
        <p className="text-slate-600 font-medium">
          نعم، بالتأكيد! يمكنك ربط أي دومين تملكه (مثل .com أو .kw) من خلال إعدادات المشروع > الدومين. 
          كما يمكنك شراء دومين جديد مباشرة من خلالنا، وهو مشمول مجاناً مع بعض الباقات السنوية.
        </p>
      )
    },
    {
      id: '4',
      category: 'projects',
      question: 'كيف أضيف صور لموقعي؟',
      answer: (
        <p className="text-slate-600 font-medium">
          في محرر الموقع، اضغط على أي صورة لاستبدالها. يمكنك رفع صور من جهازك، أو استخدام مكتبة الصور المجانية المدمجة، 
          أو حتى الطلب من الذكاء الاصطناعي توليد صور جديدة تناسب محتواك.
        </p>
      )
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    (activeCategory === 'all' || faq.category === activeCategory) &&
    faq.question.includes(searchQuery)
  );

  return (
    <div className="space-y-12 min-h-[80vh]">
      {/* Header & Search */}
      <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-black text-black mb-1 flex items-center gap-3">
                مركز المساعدة <Lightbulb className="text-[#7C3AED]" />
            </h1>
            <p className="text-slate-600 font-bold">كيف يمكننا مساعدتك اليوم؟</p>
        </div>

        <div className="relative max-w-2xl">
            <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن سؤالك..." 
                className="w-full pl-4 pr-12 py-4 rounded-xl bg-white border-[3px] border-black text-lg font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="bg-white p-6 rounded-2xl border-[3px] border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#7C3AED] hover:-translate-y-1 transition-all group text-right">
            <div className="w-14 h-14 bg-green-100 rounded-xl border-2 border-black flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle size={32} className="text-green-600" />
            </div>
            <h3 className="text-xl font-black text-black mb-2">تواصل معنا</h3>
            <p className="text-slate-600 font-bold text-sm">واتساب أو بريد إلكتروني</p>
        </button>

        <button className="bg-white p-6 rounded-2xl border-[3px] border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#7C3AED] hover:-translate-y-1 transition-all group text-right">
            <div className="w-14 h-14 bg-blue-100 rounded-xl border-2 border-black flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                < BookOpen size={32} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-black text-black mb-2">دليل البداية</h3>
            <p className="text-slate-600 font-bold text-sm">خطوة بخطوة لبناء موقعك</p>
        </button>

        <button className="bg-white p-6 rounded-2xl border-[3px] border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#7C3AED] hover:-translate-y-1 transition-all group text-right">
            <div className="w-14 h-14 bg-pink-100 rounded-xl border-2 border-black flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <PlayCircle size={32} className="text-pink-600" />
            </div>
            <h3 className="text-xl font-black text-black mb-2">فيديوهات تعليمية</h3>
            <p className="text-slate-600 font-bold text-sm">شاهد وتعلم من الخبراء</p>
        </button>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-[3px] border-black/10 pb-4">
            <h2 className="text-2xl font-black text-black">الأسئلة الشائعة</h2>
            
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap border-[3px] transition-all flex items-center gap-2 ${
                            activeCategory === cat.id 
                            ? 'bg-black text-white border-black shadow-[2px_2px_0px_0px_#000]' 
                            : 'bg-white text-slate-500 border-transparent hover:bg-slate-100'
                        }`}
                    >
                        <cat.icon size={14} />
                        {cat.label}
                    </button>
                ))}
            </div>
         </div>

         <div className="space-y-4">
            {filteredFaqs.map((faq) => {
                const isExpanded = expandedFaq === faq.id;
                return (
                    <motion.div
                        key={faq.id}
                        initial={false}
                        className={`bg-white border-[3px] rounded-xl overflow-hidden transition-all ${
                            isExpanded 
                            ? 'border-black shadow-[6px_6px_0px_0px_#000]' 
                            : 'border-slate-200 hover:border-black'
                        }`}
                    >
                        <button
                            onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                            className={`w-full flex items-center justify-between p-5 text-right font-black text-lg transition-colors ${
                                isExpanded 
                                ? 'bg-slate-50 border-l-[6px] border-l-[#7C3AED]' 
                                : 'text-slate-700 hover:text-black border-l-[6px] border-l-transparent'
                            }`}
                        >
                            <span className="flex items-center gap-3">
                                <ChevronDown size={20} className={`text-[#7C3AED] transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`} /> 
                                {faq.question}
                            </span>
                        </button>
                        
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                >
                                    <div className="p-6 pt-2 border-t-2 border-slate-100 ml-[6px]">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}
         </div>
      </div>

      {/* Contact Section */}
      <div className="border-t-[3px] border-black border-dashed pt-8">
        <h2 className="text-2xl font-black text-black mb-6">تواصل معنا</h2>
        
        <div className="bg-white border-[3px] border-black rounded-2xl p-8 shadow-[6px_6px_0px_0px_#000] relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                
                {/* WhatsApp */}
                <div className="bg-slate-50 border-[3px] border-slate-200 rounded-xl p-6 text-center hover:border-green-500 hover:bg-green-50 transition-colors group">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-black group-hover:scale-110 transition-transform">
                        <MessageCircle size={32} className="text-green-600" />
                    </div>
                    <h3 className="font-black text-xl text-black mb-2">WhatsApp</h3>
                    <p className="text-sm font-bold text-slate-500 mb-6">رد فوري خلال ساعات العمل</p>
                    <Button variant="primary" className="bg-green-600 border-black hover:bg-green-700 shadow-[2px_2px_0px_0px_#000]">
                        فتح واتساب
                    </Button>
                </div>

                {/* Email */}
                <div className="bg-slate-50 border-[3px] border-slate-200 rounded-xl p-6 text-center hover:border-[#7C3AED] hover:bg-violet-50 transition-colors group">
                    <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-black group-hover:scale-110 transition-transform">
                        <Mail size={32} className="text-[#7C3AED]" />
                    </div>
                    <h3 className="font-black text-xl text-black mb-2">البريد الإلكتروني</h3>
                    <p className="text-sm font-bold text-slate-500 mb-6">رد خلال 24 ساعة</p>
                    <Button variant="primary" className="bg-[#7C3AED] border-black hover:bg-[#6D28D9] shadow-[2px_2px_0px_0px_#000]">
                        إرسال رسالة
                    </Button>
                </div>
            </div>

            <div className="mt-8 text-center pt-6 border-t-2 border-slate-100">
                <p className="text-slate-500 font-bold">
                    ساعات العمل: الأحد - الخميس، 9 ص - 6 م (توقيت الكويت)
                </p>
            </div>
        </div>
      </div>

    </div>
  );
};

export default HelpCenter;