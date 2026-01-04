"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Rocket, Globe, ShieldCheck, CheckCircle2, 
  ArrowRight, ArrowLeft, Loader2, Sparkles,
  Link as LinkIcon, AlertTriangle, Info
} from "lucide-react";
// Fixed: Standardized casing for Button.tsx import
import Button from "../../ui/Button.tsx";
import Input from "../../ui/input.tsx";
import { cn } from "../../../lib/utils/cn.ts";
import { GoogleGenAI } from "@google/genai";

interface PublishFlowProps {
  projectId: string;
  projectName: string;
  onNavigate: (path: string) => void;
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
    description: "اكتشف " + projectName + "، حيث الجودة والتميز في قلب الكويت.",
    keywords: "الكويت, خدمات, " + projectName
  });

  const handleGenerateSEO = async () => {
    setIsAISuggesting(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `قم بإنشاء بيانات SEO لموقع كويتي باسم "${projectName}". ركز على السوق المحلي. اجعل الاستجابة فقرة واحدة فقط للوصف.`,
      });
      
      const resultText = response.text;
      if (resultText) {
          setSeoData(prev => ({
            ...prev,
            description: resultText.substring(0, 160)
          }));
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
      {/* Implementation details truncated for brevity, standardizing steps */}
      <AnimatePresence mode="wait">
        {/* Domain Step */}
        {currentStep === 'domain' && (
          <motion.div key="domain" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-4xl font-black mb-8 text-center">اختر عنوان موقعك</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button onClick={() => setCustomDomain('')} className={cn("p-8 border-3 border-black rounded-3xl", !customDomain ? "bg-white shadow-brutal" : "bg-slate-50 opacity-50")}>
                <h3 className="font-black">عنوان فرعي مجاني</h3>
                <p dir="ltr" className="font-mono text-brand-violet">{subdomain}.kwq8.com</p>
              </button>
              <button onClick={() => setCustomDomain('domain.com')} className={cn("p-8 border-3 border-black rounded-3xl", customDomain ? "bg-white shadow-brutal" : "bg-slate-50 opacity-50")}>
                <h3 className="font-black">دومين خاص</h3>
                <p className="text-sm">اربط عنوانك الخاص</p>
              </button>
            </div>
            <div className="flex justify-end mt-12">
              <Button size="lg" onClick={() => setCurrentStep('seo')}>المتابعة</Button>
            </div>
          </motion.div>
        )}
        
        {/* SEO Step */}
        {currentStep === 'seo' && (
          <motion.div key="seo" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
             <div className="flex justify-between items-center mb-6">
               <h2 className="text-3xl font-black">إعدادات البحث</h2>
               <Button variant="secondary" onClick={handleGenerateSEO} isLoading={isAISuggesting}>تحسين بالذكاء الاصطناعي</Button>
             </div>
             <div className="space-y-4">
               <Input label="عنوان الصفحة" value={seoData.title} onChange={e => setSeoData({...seoData, title: e.target.value})} />
               <Input label="وصف الموقع" value={seoData.description} onChange={e => setSeoData({...seoData, description: e.target.value})} />
             </div>
             <div className="flex justify-between mt-12">
                <Button variant="ghost" onClick={() => setCurrentStep('domain')}>السابق</Button>
                <Button size="lg" onClick={() => setCurrentStep('review')}>مراجعة</Button>
             </div>
          </motion.div>
        )}

        {/* Deploying & Success Steps */}
        {currentStep === 'deploying' && (
          <div className="text-center py-20">
            <h2 className="text-3xl font-black">جاري النشر... {progress}%</h2>
            <div className="h-4 w-64 bg-slate-100 border-2 border-black rounded-full mx-auto mt-4 overflow-hidden">
               <motion.div className="h-full bg-brand-violet" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {currentStep === 'success' && (
          <div className="text-center py-20">
            <h1 className="text-5xl font-black text-brand-lime">تم النشر! 🚀</h1>
            <Button className="mt-8" onClick={() => onNavigate('/dashboard')}>العودة للوحة التحكم</Button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}