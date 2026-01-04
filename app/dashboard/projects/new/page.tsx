"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, ArrowLeft, Sparkles, Layout, Wand2,
  Scissors, UtensilsCrossed, ShoppingBag, Briefcase,
  Camera, Stethoscope, Building, GraduationCap,
  Check
} from "lucide-react";
// Fixed: Standardized casing for Button.tsx
import Button from "../../../../components/ui/Button.tsx";
import Input from "../../../../components/ui/input.tsx";
// Standardized casing for GradientText import
import { GradientText } from "../../../../components/ui/GradientText.tsx";
import { cn } from "../../../../lib/utils/cn.ts";

const industries = [
  { id: "salon", label: "صالون تجميل", icon: Scissors, color: "bg-brand-pink" },
  { id: "restaurant", label: "مطعم / كافيه", icon: UtensilsCrossed, color: "bg-brand-orange" },
  { id: "store", label: "متجر إلكتروني", icon: ShoppingBag, color: "bg-brand-violet" },
  { id: "business", label: "شركة / أعمال", icon: Briefcase, color: "bg-brand-cyan" },
  { id: "portfolio", label: "بورتفوليو", icon: Camera, color: "bg-brand-gold" },
  { id: "clinic", label: "عيادة / طبي", icon: Stethoscope, color: "bg-brand-lime" },
  { id: "realestate", label: "عقارات", icon: Building, color: "bg-brand-pink" },
  { id: "education", label: "تعليم / دورات", icon: GraduationCap, color: "bg-brand-violet" },
];

const buildModes = [
  {
    id: "template",
    title: "اختر قالب",
    description: "ابدأ من قالب جاهز وخصّصه",
    icon: Layout,
  },
  {
    id: "scratch",
    title: "ابدأ من الصفر",
    description: "دع الذكاء الاصطناعي يبني لك من البداية",
    icon: Wand2,
  },
];

export default function NewProjectPage() {
  const router = useRouter();
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    name: "",
    industry: "",
    buildMode: "",
    description: "",
  });

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.name.length >= 3 && formData.industry;
      case 2:
        return formData.buildMode;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Create project and redirect to builder
      console.log("Creating project:", formData);
      // Assuming navigation to builder view
      if (typeof window !== 'undefined' && window.location.hash) {
          window.location.hash = "#builder";
      } else {
          router.push("/builder");
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto" dir="rtl">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-content-muted font-bold">
            الخطوة {step} من {totalSteps}
          </span>
          <span className="text-sm font-black">{Math.round(progress)}%</span>
        </div>
        <div className="h-3 bg-surface-secondary border-3 border-black rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-violet via-brand-pink to-brand-orange"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Name & Industry */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h1 className="text-3xl font-black mb-2">
                أخبرنا عن <GradientText>مشروعك</GradientText>
              </h1>
              <p className="text-content-secondary font-bold text-lg">
                اسم المشروع ونوع النشاط
              </p>
            </div>

            {/* Project Name */}
            <div className="bg-white border-3 border-black shadow-brutal p-6 rounded-2xl">
              <Input
                label="اسم المشروع"
                placeholder="مثال: صالون الجمال"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                hint="اختر اسمًا يعبر عن مشروعك"
              />
            </div>

            {/* Industry Selection */}
            <div className="bg-white border-3 border-black shadow-brutal p-6 rounded-2xl">
              <label className="block text-sm font-black mb-4">نوع النشاط</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {industries.map((industry) => (
                  <button
                    key={industry.id}
                    onClick={() => setFormData({ ...formData, industry: industry.id })}
                    className={cn(
                      "p-4 border-3 border-black text-center transition-all rounded-xl flex flex-col items-center justify-center gap-2",
                      formData.industry === industry.id
                        ? `${industry.color} text-white shadow-brutal-sm translate-x-[2px] translate-y-[2px]`
                        : "bg-white hover:bg-surface-secondary hover:border-brand-violet"
                    )}
                  >
                    <industry.icon className={cn("h-6 w-6", formData.industry === industry.id ? "text-white" : "text-content-primary")} />
                    <span className="text-xs font-black">{industry.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Build Mode */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h1 className="text-3xl font-black mb-2">
                كيف تريد <GradientText>البناء</GradientText>؟
              </h1>
              <p className="text-content-secondary font-bold text-lg">
                اختر الطريقة التي تناسبك
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {buildModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setFormData({ ...formData, buildMode: mode.id })}
                  className={cn(
                    "p-8 border-3 border-black text-right transition-all rounded-[2rem] relative group",
                    formData.buildMode === mode.id
                      ? "bg-brand-violet text-white shadow-brutal translate-x-[2px] translate-y-[2px]"
                      : "bg-white hover:bg-surface-secondary shadow-brutal hover:shadow-brutal-sm"
                  )}
                >
                  <div className={cn(
                      "p-4 border-2 border-black rounded-2xl inline-block mb-4",
                      formData.buildMode === mode.id ? "bg-white/20" : "bg-surface-secondary"
                  )}>
                    <mode.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-black mb-2">{mode.title}</h3>
                  <p className={cn(
                    "font-bold",
                    formData.buildMode === mode.id ? "text-white/80" : "text-content-secondary"
                  )}>
                    {mode.description}
                  </p>
                  {formData.buildMode === mode.id && (
                    <div className="absolute top-6 left-6">
                      <div className="bg-brand-lime p-1 rounded-full border-2 border-black shadow-brutal-sm">
                        <Check className="h-4 w-4 text-black" strokeWidth={3} />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Description (Optional) */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h1 className="text-3xl font-black mb-2">
                صف <GradientText>موقعك</GradientText>
              </h1>
              <p className="text-content-secondary font-bold text-lg">
                اختياري - أخبر الذكاء الاصطناعي بالتفاصيل
              </p>
            </div>

            <div className="bg-white border-3 border-black shadow-brutal p-6 rounded-2xl">
              <label className="block text-sm font-black mb-2">
                وصف المشروع (اختياري)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="مثال: أريد موقع لصالون تجميل نسائي مع نظام حجز مواعيد، معرض صور للأعمال، وقائمة بالخدمات والأسعار..."
                className="w-full h-40 border-3 border-black bg-surface-secondary/30 p-4 resize-none focus:outline-none focus:border-brand-violet focus:bg-white transition-all font-bold rounded-xl"
              />
              <p className="text-sm text-content-muted mt-2 font-bold">
                💡 كلما كان الوصف أوضح، كانت النتيجة أفضل
              </p>
            </div>

            {/* Summary */}
            <div className="bg-brand-gold/10 border-3 border-black p-6 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold" />
              <h3 className="font-black text-lg mb-4">ملخص المشروع</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-white/50 p-2 rounded-lg border-2 border-black/5">
                  <span className="text-content-secondary font-bold text-sm">اسم المشروع:</span>
                  <span className="font-black">{formData.name}</span>
                </div>
                <div className="flex justify-between items-center bg-white/50 p-2 rounded-lg border-2 border-black/5">
                  <span className="text-content-secondary font-bold text-sm">نوع النشاط:</span>
                  <span className="font-black">
                    {industries.find(i => i.id === formData.industry)?.label}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-white/50 p-2 rounded-lg border-2 border-black/5">
                  <span className="text-content-secondary font-bold text-sm">طريقة البناء:</span>
                  <span className="font-black">
                    {buildModes.find(m => m.id === formData.buildMode)?.title}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-12">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={step === 1}
          className={cn("px-8", step === 1 ? "invisible" : "")}
        >
          <ArrowRight className="h-5 w-5 ms-2" />
          السابق
        </Button>

        <Button
          variant="gradient"
          size="lg"
          onClick={handleNext}
          disabled={!canProceed()}
          className="px-10 shadow-brutal font-black text-lg"
        >
          {step === totalSteps ? (
            <>
              <Sparkles className="h-5 w-5 ms-2" />
              ابدأ البناء الذكي
            </>
          ) : (
            <>
              التالي
              <ArrowLeft className="h-5 w-5 me-2 rtl-flip" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}