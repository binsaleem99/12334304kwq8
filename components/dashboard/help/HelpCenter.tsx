"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Book, Video, MessageCircle, ChevronDown,
  HelpCircle, Coins, Globe, Wand2, Settings,
  Layout
} from "lucide-react";
import { Button, GradientText } from "../../ui/index.ts";
import { PageHeader } from "../index.ts";
import { cn } from "../../../lib/utils/cn.ts";
import { ViewState } from "../../../types.ts";

interface HelpCenterProps {
  onNavigate: (view: ViewState) => void;
}

const categories = [
  { id: "getting-started", label: "البداية", icon: Book },
  { id: "builder", label: "المحرر", icon: Wand2 },
  { id: "credits", label: "الرصيد", icon: Coins },
  { id: "publishing", label: "النشر", icon: Globe },
  { id: "settings", label: "الإعدادات", icon: Settings },
];

const faqs = [
  {
    category: "getting-started",
    question: "كيف أبدأ بناء موقعي الأول؟",
    answer: "اضغط على 'مشروع جديد' من لوحة التحكم، اختر نوع مشروعك، ثم ابدأ بوصف ما تريد للذكاء الاصطناعي. سيقوم النظام بإنشاء الهيكل والمحتوى الأولي لك.",
  },
  {
    category: "credits",
    question: "كيف يعمل نظام الرصيد؟",
    answer: "كل عملية بناء أو تعديل ذكي تستهلك رصيداً بناءً على حجم العمل. يمكنك شراء رصيد من صفحة الفواتير في أي وقت. الرصيد يمنحك مرونة كاملة دون الحاجة لاشتراك شهري ثابت.",
  },
  {
    category: "credits",
    question: "هل الرصيد له تاريخ انتهاء؟",
    answer: "نعم، الرصيد صالح لمدة 90 يوماً من تاريخ الشراء. نرسل تنبيهات عبر البريد الإلكتروني وداخل لوحة التحكم قبل انتهاء الصلاحية بـ 7 أيام.",
  },
  {
    category: "publishing",
    question: "كم يكلف نشر موقعي؟",
    answer: "النشر الأول للموقع يكلف 10 رصيد، وكل تحديث أو إعادة نشر بعد ذلك يكلف 3 رصيد فقط. هذا يشمل الاستضافة وشهادة الأمان SSL مجاناً.",
  },
  {
    category: "builder",
    question: "هل يمكنني تعديل الموقع بعد البناء؟",
    answer: "نعم! يمكنك التعديل بطريقتين: إما بكتابة أوامر نصية للمساعد الذكي (مثلاً: 'اجعل الخط أكبر' أو 'غير اللون للأزرق') أو باستخدام المحرر المرئي التقليدي للسحب والإفلات.",
  },
];

export default function HelpCenter({ onNavigate }: HelpCenterProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const filteredFaqs = faqs.filter((faq) => {
    if (activeCategory && faq.category !== activeCategory) return false;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    if (searchQuery && !matchesSearch) return false;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8" dir="rtl">
      <PageHeader
        title="مركز المساعدة 💡"
        description="نحن هنا لمساعدتك في كل خطوة من رحلة بناء موقعك."
      />

      {/* Search Section */}
      <div className="relative group">
        <div className="absolute inset-0 bg-brand-violet translate-x-1 translate-y-1 rounded-2xl group-focus-within:translate-x-2 group-focus-within:translate-y-2 transition-all" />
        <div className="relative flex items-center bg-white border-3 border-black rounded-2xl overflow-hidden">
          <div className="pr-6">
            <Search className="h-6 w-6 text-content-muted" />
          </div>
          <input
            type="text"
            placeholder="ابحث عن سؤالك أو المشكلة التي تواجهها..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 py-6 text-xl font-bold bg-transparent focus:outline-none placeholder:text-slate-300"
          />
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "فيديوهات تعليمية", icon: Video, color: "bg-brand-orange" },
          { label: "دليل المستخدم", icon: Book, color: "bg-brand-cyan" },
          { label: "تواصل معنا", icon: MessageCircle, color: "bg-brand-lime" },
          { label: "الأسئلة الشائعة", icon: HelpCircle, color: "bg-brand-pink" },
        ].map((item, idx) => (
          <button
            key={idx}
            className="group relative h-full w-full"
          >
            <div className="absolute inset-0 bg-black rounded-2xl translate-x-1 translate-y-1 group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-all" />
            <div className="relative bg-white border-3 border-black p-6 rounded-2xl flex flex-col items-center gap-3 transition-transform group-hover:-translate-y-0.5 group-active:translate-x-1 group-active:translate-y-1">
              <div className={cn("p-3 rounded-xl border-2 border-black text-white shadow-brutal-sm group-hover:rotate-6 transition-transform", item.color)}>
                <item.icon className="h-6 w-6" />
              </div>
              <span className="font-black text-sm">{item.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Categories */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-4 px-2">التصنيفات</h3>
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 border-3 border-black font-black text-sm transition-all rounded-xl",
              !activeCategory
                ? "bg-brand-violet text-white shadow-brutal translate-x-[2px] translate-y-[2px]"
                : "bg-white hover:bg-surface-secondary"
            )}
          >
            <Layout className="h-5 w-5" />
            الكل
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 border-3 border-black font-black text-sm transition-all rounded-xl",
                activeCategory === cat.id
                  ? "bg-brand-violet text-white shadow-brutal translate-x-[2px] translate-y-[2px]"
                  : "bg-white hover:bg-surface-secondary"
              )}
            >
              <cat.icon className="h-5 w-5" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Results */}
        <div className="lg:col-span-3 space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white border-3 border-black shadow-brutal rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-right group"
                  >
                    <span className="font-black text-lg group-hover:text-brand-violet transition-colors">{faq.question}</span>
                    <div className={cn(
                      "p-1.5 rounded-lg border-2 border-black transition-all",
                      openFaq === index ? "bg-brand-violet text-white rotate-180" : "bg-slate-50"
                    )}>
                      <ChevronDown className="h-5 w-5" />
                    </div>
                  </button>
                  {openFaq === index && (
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      className="border-t-3 border-black bg-slate-50/50"
                    >
                      <div className="p-6">
                        <p className="text-content-secondary font-bold text-lg leading-relaxed">{faq.answer}</p>
                        <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between">
                          <span className="text-xs font-black text-slate-400 uppercase">هل كانت الإجابة مفيدة؟</span>
                          <div className="flex gap-2">
                             <Button variant="outline" size="sm">نعم</Button>
                             <Button variant="outline" size="sm">لا</Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="py-20 text-center bg-white border-3 border-black shadow-brutal rounded-[3rem]">
                <div className="w-20 h-20 bg-slate-100 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-6">
                   <Search className="h-10 w-10 text-slate-400" />
                </div>
                <h4 className="text-2xl font-black mb-2">لا توجد نتائج</h4>
                <p className="text-content-secondary font-bold">لم نجد أي إجابة تطابق بحثك. جرب كلمات مفتاحية أخرى.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Support Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-brand-lime border-3 border-black shadow-brutal p-10 rounded-[3rem] text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 -rotate-45 translate-x-10 -translate-y-10 rounded-full" />
        <div className="relative z-10">
          <h3 className="text-3xl font-black mb-4">لم تجد إجابة وافية؟ 🧐</h3>
          <p className="text-xl font-bold mb-8 max-w-lg mx-auto leading-relaxed">
            فريق الدعم الفني متواجد لمساعدتك عبر محادثة مباشرة لحل أي مشكلة تقنية تواجهك.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="xl" className="px-10 h-16 text-xl shadow-brutal-lg">
              <MessageCircle className="h-6 w-6 ml-3" />
              تحدث معنا عبر واتساب
            </Button>
            <Button variant="secondary" size="xl" className="px-10 h-16 text-xl" onClick={() => onNavigate('contact')}>
              تذكرة دعم جديدة
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}