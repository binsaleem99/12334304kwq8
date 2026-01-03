"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Scissors, UtensilsCrossed, ShoppingBag, 
  Briefcase, Camera, Stethoscope, Sparkles 
} from "lucide-react";
// Standardized casing for button import
import Button from "../ui/button.tsx";
// Fixed casing: Standardized to lowercase to match canonical root file casing
import GradientText from "../ui/gradient-text.tsx";
import { cn } from "../../lib/utils/cn.ts";
import { ViewState } from "../../types.ts";

interface PromptHubProps {
  onNavigate: (view: ViewState) => void;
}

const useCases = [
  {
    icon: Scissors,
    title: "صالونات التجميل",
    prompt: "أريد موقع لصالون تجميل نسائي فاخر في الكويت مع نظام حجز مواعيد وكتالوج خدمات",
    color: "bg-brand-pink",
    activeColor: "bg-brand-pink",
  },
  {
    icon: UtensilsCrossed,
    title: "المطاعم والكافيهات",
    prompt: "أريد موقع لمطعم مأكولات بحرية كويتي يعرض قائمة الطعام اليومية وموقعنا في سوق شرق",
    color: "bg-brand-orange",
    activeColor: "bg-brand-orange",
  },
  {
    icon: ShoppingBag,
    title: "المتاجر الإلكترونية",
    prompt: "أريد متجر إلكتروني لبيع العطور الشرقية مع بوابة دفع KNET وسلة تسوق ذكية",
    color: "bg-brand-violet",
    activeColor: "bg-brand-violet",
  },
  {
    icon: Briefcase,
    title: "الشركات والأعمال",
    prompt: "أريد موقع تعريفي لشركة عقارات في دبي يعرض المشاريع المتاحة ونماذج التواصل",
    color: "bg-brand-cyan",
    activeColor: "bg-brand-cyan",
  },
  {
    icon: ShoppingBag,
    title: "المصورين والمبدعين",
    prompt: "أريد بورتفوليو لعرض أعمالي في تصوير المناسبات والبورتريه بأسلوب عصري وبسيط",
    color: "bg-brand-gold",
    activeColor: "bg-brand-gold",
  },
  {
    icon: Stethoscope,
    title: "العيادات الطبية",
    prompt: "أريد موقع لعيادة أسنان تخصصية يتيح للمرضى معرفة الطاقم الطبي وحجز المواعيد أونلاين",
    color: "bg-brand-lime",
    activeColor: "bg-brand-lime",
  },
];

export function PromptHub({ onNavigate }: PromptHubProps) {
  const [selectedPrompt, setSelectedPrompt] = React.useState(useCases[0].prompt);

  const handleStartBuilding = () => {
    // Save prompt to session storage to persist across auth flow
    sessionStorage.setItem('pending_website_prompt', selectedPrompt);
    onNavigate('signup');
  };

  return (
    <section id="use-cases" className="py-24 bg-white relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-violet/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-violet/10 text-brand-violet font-black text-sm mb-4 border-2 border-brand-violet/20"
          >
            <Sparkles size={16} fill="currentColor" /> أفكار وإلهام
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-black text-black mb-6 leading-tight"
          >
            ماذا تريد أن
            <br />
            <GradientText>تبني اليوم؟</GradientText>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-content-secondary text-lg md:text-xl font-bold max-w-2xl mx-auto"
          >
            اختر من الأفكار الجاهزة أو استلهم فكرتك الخاصة للمشاريع الخليجية
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Use Cases Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {useCases.map((useCase, index) => (
              <button
                key={index}
                onClick={() => setSelectedPrompt(useCase.prompt)}
                className={cn(
                  "p-6 border-3 border-black text-right transition-all flex flex-col items-start gap-4 rounded-2xl",
                  selectedPrompt === useCase.prompt
                    ? `${useCase.activeColor} text-white shadow-brutal translate-x-[2px] translate-y-[2px]`
                    : "bg-white hover:bg-surface-secondary shadow-brutal hover:shadow-brutal-sm"
                )}
              >
                <div className={cn(
                  "p-3 border-2 border-black rounded-xl",
                  selectedPrompt === useCase.prompt ? "bg-white/20" : useCase.color + " text-white"
                )}>
                  <useCase.icon className="h-6 w-6" />
                </div>
                <div className="font-black text-sm leading-tight">{useCase.title}</div>
              </button>
            ))}
          </motion.div>

          {/* Prompt Preview / Terminal View */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-surface-dark text-white border-3 border-black shadow-brutal-lg rounded-[2rem] overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 p-5 border-b border-white/10 bg-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-black/20" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-black/20" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-black/20" />
                </div>
                <span className="text-xs font-mono font-bold text-white/40 ms-4">KWQ8 AI Builder v3.0</span>
              </div>

              {/* Terminal Body */}
              <div className="p-8 md:p-10 min-h-[280px] flex flex-col">
                <div className="flex-1">
                  <div className="flex items-start gap-3 text-lg md:text-xl leading-relaxed">
                    <span className="text-brand-cyan font-mono font-bold">Q8_AI_PROMPT:</span>
                    <div className="flex-1">
                      <span className="text-white font-bold">{selectedPrompt}</span>
                      <motion.span 
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-2.5 h-6 bg-brand-violet ms-2 translate-y-1" 
                      />
                    </div>
                  </div>
                  
                  <div className="mt-8 flex flex-wrap gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30">تحليل المكونات المطلوبة...</span>
                    <div className="flex gap-1">
                      {['Responsive', 'Arabic-First', 'GCC-Localized', 'Payment-Ready'].map(tag => (
                        <span key={tag} className="text-[9px] px-1.5 py-0.5 border border-white/10 rounded-sm font-mono text-white/50">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-10">
                  <Button 
                    variant="gradient" 
                    size="xl" 
                    className="w-full text-xl shadow-[4px_4px_0px_0px_#FFFFFF20]"
                    onClick={handleStartBuilding}
                  >
                    <span>ابدأ البناء الذكي</span>
                    <ArrowLeft className="h-6 w-6 ms-3 rtl-flip" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Tooltip decor */}
            <div className="absolute -bottom-6 -right-6 hidden md:block">
              <div className="bg-brand-gold text-black px-4 py-2 rounded-xl border-3 border-black shadow-brutal font-black text-sm rotate-6">
                أسرع بـ 3 أضعاف ⚡
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default PromptHub;