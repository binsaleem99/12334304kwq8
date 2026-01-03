"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Rocket, Globe, ShieldCheck, CheckCircle2, 
  ArrowRight, ArrowLeft, Loader2, Sparkles,
  Link as LinkIcon, AlertTriangle, Search, Info
} from "lucide-react";
// Fix: Standardized import casing to lowercase
import Button from "../../ui/button.tsx";
import Input from "../../ui/input.tsx";
import { cn } from "../../../lib/utils/cn.ts";
import { GoogleGenAI } from "@google/genai";

interface PublishFlowProps {
  projectId: string;
  projectName: string;
  onNavigate: (view: any) => void;
}

type Step = 'domain' | 'seo' | 'review' | 'deploying' | 'success';

export default function PublishFlow({ projectId, projectName, onNavigate }: PublishFlowProps) {
  const [currentStep, setCurrentStep] = React.useState<Step>('domain');
  const [subdomain, setSubdomain] = React.useState(projectName.toLowerCase().replace(/ /g, '-'));
  const [customDomain, setCustomDomain] = React.useState('');
  const [isAISuggesting, setIsAISuggesting] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const [seoData, setSeoData] = React.useState({
    title: projectName + " | أفضل الخدمات في الكويت",
    description: "اكتشف " + projectName + "، حيث الجودة والتميز في قلب الكويت. نوفر لكم أفضل تجربة ممكنة.",
    keywords: "الكويت, خدمات, " + projectName
  });

  const handleGenerateSEO = async () => {
    setIsAISuggesting(true);
    // Standard initialization using process.env.API_KEY as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      // Basic Text Task uses gemini-3-flash-preview
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `قم بإنشاء بيانات SEO (عنوان، وصف، كلمات مفتاحية) لموقع كويتي باسم "${projectName}". ركز على الكلمات البحثية المحلية في الخليج. اجعل الاستجابة بصيغة نصية مباشرة.`,
      });
      
      // Extraction of text content
      const resultText = response.text || "";
      if (resultText) {
          setSeoData({
            title: projectName + " - الرواد في خدماتنا بالكويت",
            description: resultText.substring(0, 160) || "انضم إلينا واستمتع بأرقى الخدمات المصممة خصيصاً لذوقك الكويتي الرفيع.",
            keywords: "الكويت, " + projectName + ", خدمات كويتية"
          });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAISuggesting(false);
    }
  };

  const startDeployment = () => {
    setCurrentStep('deploying');
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setCurrentStep('success'), 800);
          return 100;
        }
        return prev + 2;
      });
    }, 60);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6" dir="rtl">
      {/* Stepper Header */}
      {currentStep !== 'success' && currentStep !== 'deploying' && (
        <div className="flex items-center justify-center gap-4 mb-12">
          {['domain', 'seo', 'review'].map((s, idx) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center gap-2">
                <div className={cn(
                  "w-12 h-12 rounded-2xl border-3 border-black flex items-center justify-center font-black transition-all",
                  currentStep === s ? "bg-brand-violet text-white shadow-brutal translate-x-[2px] translate-y-[2px]" : 
                  (idx < ['domain', 'seo', 'review'].indexOf(currentStep) ? "bg-brand-lime text-black" : "bg-white text-slate-300")
                )}>
                  {idx < ['domain', 'seo', 'review'].indexOf(currentStep) ? <CheckCircle2 size={24} /> : idx + 1}
                </div>
                <span className={cn("text-xs font-black uppercase tracking-widest", currentStep === s ? "text-black" : "text-slate-400")}>
                  {s === 'domain' ? 'العنوان' : s === 'seo' ? 'السيو' : 'المراجعة'}
                </span>
              </div>
              {idx < 2 && <div className="w-16 h-1 bg-slate-100 rounded-full mb-6" />}
            </React.Fragment>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* Step: Domain */}
        {currentStep === 'domain' && (
          <motion.div
            key="domain"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <div className="inline-block p-4 bg-violet-100 border-3 border-black shadow-brutal rounded-3xl mb-6">
                <Globe size={48} className="text-brand-violet" />
              </div>
              <h1 className="text-4xl font-black mb-2">اختر عنوان موقعك</h1>
              <p className="text-lg text-content-secondary font-bold">أين سيجدك العملاء على الويب؟</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button 
                onClick={() => setCustomDomain('')}
                className={cn(
                  "p-8 border-3 border-black text-right rounded-3xl transition-all relative",
                  !customDomain ? "bg-white shadow-brutal translate-x-[2px] translate-y-[2px]" : "bg-slate-50 opacity-60 hover:opacity-100"
                )}
              >
                <h3 className="text-xl font-black mb-2">عنوان فرعي مجاني</h3>
                <div className="flex items-center gap-2 font-mono text-brand-violet font-bold mb-4" dir="ltr">
                  <span>{subdomain || 'your-site'}</span>.kwq8.com
                </div>
                {!customDomain && (
                  <Input 
                    placeholder="اكتب العنوان المفضل..."
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value)}
                    className="mt-2"
                  />
                )}
              </button>

              <button 
                onClick={() => setCustomDomain('example.com')}
                className={cn(
                  "p-8 border-3 border-black text-right rounded-3xl transition-all relative",
                  customDomain ? "bg-white shadow-brutal translate-x-[2px] translate-y-[2px]" : "bg-slate-50 opacity-60 hover:opacity-100"
                )}
              >
                <div className="absolute top-4 left-4 bg-brand-lime text-black px-2 py-0.5 rounded border border-black font-black text-[10px]">
                  احترافي
                </div>
                <h3 className="text-xl font-black mb-2">دومين خاص</h3>
                <p className="text-sm font-bold text-slate-500 mb-4">اربط دومين تملكه (مثل .com أو .kw)</p>
                {customDomain && (
                  <Input 
                    placeholder="www.example.com"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    className="mt-2"
                    dir="ltr"
                  />
                )}
              </button>
            </div>

            <div className="flex justify-end pt-8">
              <Button size="lg" className="px-12 h-14 text-lg" onClick={() => setCurrentStep('seo')}>
                المتابعة للإعدادات
                <ArrowLeft className="h-6 w-6 ms-3 rtl-flip" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step: SEO */}
        {currentStep === 'seo' && (
          <motion.div
            key="seo"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-black">إعدادات محركات البحث</h2>
                <p className="text-slate-500 font-bold">ساعد Google في العثور على موقعك.</p>
              </div>
              <Button 
                variant="secondary" 
                onClick={handleGenerateSEO}
                isLoading={isAISuggesting}
                className="gap-2"
              >
                <Sparkles size={18} className="text-brand-violet" />
                تحسين بالذكاء الاصطناعي
              </Button>
            </div>

            <div className="bg-white border-3 border-black shadow-brutal p-8 rounded-3xl space-y-6">
              <Input 
                label="عنوان الصفحة (SEO Title)"
                value={seoData.title}
                onChange={(e) => setSeoData({...seoData, title: e.target.value})}
                hint="يظهر في نتائج البحث وفي علامة تبويب المتصفح."
              />
              <div className="space-y-2">
                <label className="block text-sm font-black text-content-primary">الوصف (Meta Description)</label>
                <textarea 
                  className="w-full border-3 border-black bg-white px-4 py-3 rounded-xl focus:outline-none focus:border-brand-violet min-h-[120px] font-bold"
                  value={seoData.description}
                  onChange={(e) => setSeoData({...seoData, description: e.target.value})}
                />
                <p className="text-xs text-content-muted font-bold">يفضل أن يكون بين 150-160 حرفاً.</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-8">
              <Button variant="ghost" onClick={() => setCurrentStep('domain')}>
                <ArrowRight className="h-5 w-5 ml-2 rtl-flip" />
                السابق
              </Button>
              <Button size="lg" className="px-12 h-14 text-lg" onClick={() => setCurrentStep('review')}>
                مراجعة نهائية
                <ArrowLeft className="h-6 w-6 ms-3 rtl-flip" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step: Review */}
        {currentStep === 'review' && (
          <motion.div
            key="review"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black">جاهز للانطلاق؟</h2>
              <p className="text-slate-500 font-bold mt-2">راجع بياناتك للمرة الأخيرة قبل النشر.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border-3 border-black shadow-brutal p-6 rounded-2xl">
                <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                  <Info size={20} className="text-brand-violet" /> ملخص النشر
                </h3>
                <div className="space-y-4 text-sm font-bold">
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">اسم الموقع:</span>
                    <span className="text-black">{projectName}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">العنوان:</span>
                    <span className="text-brand-violet" dir="ltr">{customDomain || subdomain + ".kwq8.com"}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-500">الحالة:</span>
                    <span className="bg-yellow-100 text-yellow-700 px-2 rounded text-[10px]">جاهز للنشر</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 text-white border-3 border-black shadow-brutal p-6 rounded-2xl">
                <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                  <ShieldCheck size={20} className="text-brand-lime" /> الأمان والسرعة
                </h3>
                <ul className="space-y-3 text-sm opacity-80">
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-lime" /> شهادة SSL مجانية</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-lime" /> استضافة سحابية عالية السرعة</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-lime" /> متجاوب مع جميع أحجام الشاشات</li>
                </ul>
              </div>
            </div>

            <div className="bg-brand-lime/10 border-3 border-black p-6 rounded-2xl flex items-start gap-4">
              <AlertTriangle className="text-brand-violet shrink-0" />
              <p className="text-sm font-bold text-slate-700 leading-relaxed">
                بالنقر على زر النشر، سيتم خصم <span className="font-black text-black">10 نقاط رصيد</span> من حسابك. يمكنك دائماً التحديث لاحقاً بتكلفة أقل.
              </p>
            </div>

            <div className="flex justify-between items-center pt-8">
              <Button variant="ghost" onClick={() => setCurrentStep('seo')}>
                <ArrowRight className="h-5 w-5 ml-2 rtl-flip" />
                السابق
              </Button>
              <Button variant="gradient" size="xl" className="px-16 h-16 text-xl shadow-brutal-lg" onClick={startDeployment}>
                <Rocket className="h-6 w-6 ms-3" />
                انشر الموقع الآن!
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step: Deploying */}
        {currentStep === 'deploying' && (
          <motion.div
            key="deploying"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="relative w-48 h-48 mb-12">
              <div className="absolute inset-0 border-[10px] border-slate-100 rounded-full" />
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="96" cy="96" r="86"
                  fill="none" stroke="#7C3AED"
                  strokeWidth="10" strokeDasharray="540"
                  strokeDashoffset={540 - (540 * progress) / 100}
                  className="transition-all duration-300"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black">{progress}%</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">جاري النشر</span>
              </div>
            </div>

            <h2 className="text-2xl font-black mb-4">يتم الآن تجهيز موقعك...</h2>
            <div className="flex flex-col items-center gap-2 text-slate-500 font-bold">
              {progress < 30 && <p className="animate-pulse">تحميل الملفات إلى السحابة...</p>}
              {progress >= 30 && progress < 70 && <p className="animate-pulse">إعداد قاعدة البيانات والنظام...</p>}
              {progress >= 70 && <p className="animate-pulse">تفعيل شهادة الأمان SSL...</p>}
            </div>
          </motion.div>
        )}

        {/* Step: Success */}
        {currentStep === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-brand-lime rounded-full border-4 border-black flex items-center justify-center mx-auto mb-8 shadow-brutal-lg animate-bounce">
              <Rocket size={48} className="text-black" />
            </div>
            <h1 className="text-5xl font-black mb-4">تم النشر بنجاح! 🎉</h1>
            <p className="text-xl text-slate-600 font-bold mb-12">موقعك الآن متاح لجميع العالم ليشاهدوه.</p>

            <div className="bg-white border-3 border-black shadow-brutal p-8 rounded-3xl max-w-xl mx-auto mb-12">
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">رابط موقعك الجديد</p>
              <div className="flex items-center gap-4 bg-slate-50 border-2 border-black/5 p-4 rounded-xl">
                <div className="p-2 bg-white border-2 border-black rounded-lg">
                  <LinkIcon size={20} className="text-brand-violet" />
                </div>
                <span className="flex-1 text-xl font-black text-brand-violet truncate" dir="ltr">
                  {customDomain || subdomain + ".kwq8.com"}
                </span>
                <Button variant="outline" size="sm" onClick={() => window.open(`https://${customDomain || subdomain + ".kwq8.com"}`, '_blank')}>
                  زيارة
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-10" onClick={() => onNavigate('dashboard')}>
                العودة للوحة التحكم
              </Button>
              <Button variant="secondary" size="lg" className="px-10" onClick={() => window.location.reload()}>
                نشر موقع آخر
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}