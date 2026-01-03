"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, Rocket, CheckCircle, Globe, Coins,
  ExternalLink, Copy, Share2, Loader2
} from "lucide-react";
import { Button, Badge, GradientText } from "../../../../../components/ui/index.ts";
import { cn } from "../../../../../lib/utils/cn.ts";
import { ViewState } from "../../../../../types.ts";

interface PublishPageProps {
  projectId?: string;
  onNavigate: (view: ViewState) => void;
}

type PublishStatus = "ready" | "publishing" | "success" | "error";

export default function PublishPage({ projectId = "1", onNavigate }: PublishPageProps) {
  const [status, setStatus] = React.useState<PublishStatus>("ready");
  const [credits, setCredits] = React.useState(245);
  const [copied, setCopied] = React.useState(false);

  const publishCost = 10; // First publish
  const siteUrl = "https://beauty-salon.kwq8.com";

  const handlePublish = async () => {
    if (credits < publishCost) return;

    setStatus("publishing");
    
    // Simulate publishing delay
    await new Promise((r) => setTimeout(r, 3000));
    
    setCredits((prev) => prev - publishCost);
    setStatus("success");
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(siteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto" dir="rtl">
      {/* Header */}
      <div className="mb-8 text-right">
        <Button variant="ghost" size="sm" className="mb-4" onClick={() => onNavigate('builder')}>
          <ArrowRight className="h-4 w-4 ml-2" />
          العودة للمحرر
        </Button>
        <h1 className="text-3xl font-black mb-2">
          نشر <GradientText>موقعك</GradientText>
        </h1>
        <p className="text-content-secondary font-bold">
          جهّز موقعك للعالم!
        </p>
      </div>

      {/* Ready State */}
      {status === "ready" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Cost Info */}
          <div className="bg-white border-3 border-black shadow-brutal p-6 rounded-2xl">
            <h2 className="font-black text-xl mb-6">تكلفة النشر</h2>
            <div className="flex items-center justify-between mb-4">
              <span className="text-content-secondary font-bold">النشر الأول</span>
              <div className="flex items-center gap-2">
                <Coins className="h-6 w-6 text-brand-gold" />
                <span className="font-black text-2xl">{publishCost}</span>
                <span className="text-content-muted font-bold">رصيد</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t-2 border-slate-100">
              <span className="text-content-secondary font-bold">رصيدك الحالي</span>
              <Badge variant={credits >= publishCost ? "success" : "danger"} size="lg">
                {credits} رصيد
              </Badge>
            </div>
          </div>

          {/* Site Info */}
          <div className="bg-white border-3 border-black shadow-brutal p-6 rounded-2xl">
            <h2 className="font-black text-xl mb-6">معلومات الموقع</h2>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <span className="text-content-secondary font-bold">الرابط المبدئي</span>
                <code className="bg-surface-secondary px-3 py-1 border-2 border-black text-sm font-mono font-bold rounded" dir="ltr">
                  {siteUrl}
                </code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-content-secondary font-bold">شهادة الأمان SSL</span>
                <Badge variant="success">مؤمّن ✓</Badge>
              </div>
            </div>
          </div>

          {/* Publish Button */}
          <Button
            variant="gradient"
            size="xl"
            className="w-full h-16 text-xl shadow-brutal-lg"
            onClick={handlePublish}
            disabled={credits < publishCost}
          >
            <Rocket className="h-6 w-6 ml-3" />
            نشر الموقع الآن
          </Button>

          {credits < publishCost && (
            <p className="text-center text-red-500 font-bold">
              رصيدك غير كافٍ.{" "}
              <button onClick={() => onNavigate('dashboard-billing')} className="underline font-black">
                اشحن الآن
              </button>
            </p>
          )}
        </motion.div>
      )}

      {/* Publishing State */}
      {status === "publishing" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-white border-3 border-black shadow-brutal rounded-3xl"
        >
          <div className="inline-flex p-6 bg-brand-violet text-white border-3 border-black shadow-brutal mb-8 rounded-2xl">
            <Loader2 className="h-16 w-16 animate-spin" />
          </div>
          <h2 className="text-3xl font-black mb-4">جارٍ النشر...</h2>
          <p className="text-content-secondary font-bold text-lg mb-10">
            انتظر قليلاً، نقوم ببناء ونشر موقعك على السحابة
          </p>
          <div className="mt-8 max-w-sm mx-auto px-8">
            <div className="h-4 bg-surface-secondary border-3 border-black overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-brand-violet"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3 }}
              />
            </div>
            <p className="mt-3 text-xs font-black text-slate-400 uppercase tracking-widest">تحسين الصور وضغط الملفات...</p>
          </div>
        </motion.div>
      )}

      {/* Success State */}
      {status === "success" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="inline-flex p-6 bg-brand-lime border-3 border-black shadow-brutal mb-8 rounded-full">
            <CheckCircle className="h-16 w-16 text-black" />
          </div>
          <h2 className="text-4xl font-black mb-4">🎉 تم النشر بنجاح!</h2>
          <p className="text-content-secondary font-bold text-xl mb-12">
            موقعك الآن متاح للعالم ليشاهده الجميع.
          </p>

          {/* Site URL Display */}
          <div className="bg-white border-3 border-black shadow-brutal p-8 mb-10 rounded-3xl">
            <p className="text-sm text-content-muted mb-4 font-black uppercase tracking-widest">رابط موقعك الجديد</p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <code className="flex-1 w-full bg-slate-50 px-4 py-4 border-2 border-black text-xl font-mono font-bold text-brand-violet rounded-xl" dir="ltr">
                {siteUrl}
              </code>
              <Button 
                variant="secondary" 
                size="lg" 
                className="h-14 px-6 shrink-0"
                onClick={handleCopyUrl}
              >
                {copied ? <CheckCircle className="h-6 w-6" /> : <Copy className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={siteUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button variant="gradient" size="xl" className="w-full h-16 text-xl shadow-brutal-lg">
                <ExternalLink className="h-6 w-6 ml-3" />
                زيارة الموقع
              </Button>
            </a>
            <Button variant="secondary" size="xl" className="flex-1 h-16 text-xl">
              <Share2 className="h-6 w-6 ml-3" />
              مشاركة الموقع
            </Button>
          </div>

          <div className="mt-12">
            <Button variant="ghost" onClick={() => onNavigate('dashboard-projects')} className="font-black">
              العودة لقائمة المشاريع
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
