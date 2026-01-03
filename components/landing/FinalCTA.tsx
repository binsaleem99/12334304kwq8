"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Rocket, ArrowLeft, ShieldCheck, Heart, Zap } from "lucide-react";
import { Button, GradientText } from "../ui/index.ts";
import { ViewState } from "../../types.ts";

interface FinalCTAProps {
  onNavigate: (view: ViewState) => void;
}

/**
 * Final CTA section for the landing page with high-conversion Neo-Brutalist styling.
 */
export const FinalCTA: React.FC<FinalCTAProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-violet/10 via-brand-pink/5 to-brand-orange/10" />
      
      {/* Neo-Brutalist Decorative Elements */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 right-10 w-24 h-24 border-4 border-black bg-brand-lime hidden md:block" 
      />
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-10 left-10 w-16 h-16 border-4 border-black bg-brand-cyan -rotate-12 hidden md:block shadow-brutal-sm" 
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-1/2 left-1/4 w-12 h-12 border-4 border-black bg-brand-gold rotate-45 hidden lg:block" 
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Visual Anchor */}
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="inline-flex p-6 bg-brand-violet text-white border-4 border-black shadow-brutal mb-10 rounded-2xl cursor-default"
          >
            <Rocket className="h-12 w-12" />
          </motion.div>

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl font-black text-black mb-8 leading-tight font-heading">
            جاهز لبناء
            <br />
            <GradientText>موقعك الآن؟</GradientText>
          </h2>

          {/* Description */}
          <p className="text-lg md:text-2xl text-content-secondary mb-12 max-w-2xl mx-auto font-bold leading-relaxed">
            انضم لمئات الأعمال في الخليج الذين يستخدمون KWQ8 لبناء حضورهم الرقمي.
            ابدأ اليوم وشاهد الفرق في دقائق.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              variant="gradient" 
              size="xl" 
              className="w-full sm:w-auto px-10 h-16 text-xl shadow-brutal-lg"
              onClick={() => onNavigate('signup')}
            >
              <span>ابدأ الآن مجاناً</span>
              <ArrowLeft className="h-6 w-6 ms-3 rtl-flip" />
            </Button>
            <Button 
              variant="secondary" 
              size="xl" 
              className="w-full sm:w-auto px-10 h-16 text-xl"
              onClick={() => onNavigate('contact')}
            >
              تواصل معنا
            </Button>
          </div>

          {/* Multi-Trust Indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div className="flex items-center gap-2 text-content-primary font-black text-sm group">
              <div className="bg-brand-lime p-1 border-2 border-black rounded-lg shadow-brutal-sm group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
                <ShieldCheck size={18} />
              </div>
              <span>بدون بطاقة ائتمان</span>
            </div>
            <div className="flex items-center gap-2 text-content-primary font-black text-sm group">
              <div className="bg-brand-pink p-1 border-2 border-black rounded-lg shadow-brutal-sm group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
                <Heart size={18} />
              </div>
              <span>دعم فني عربي 24/7</span>
            </div>
            <div className="flex items-center gap-2 text-content-primary font-black text-sm group">
              <div className="bg-brand-gold p-1 border-2 border-black rounded-lg shadow-brutal-sm group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
                <Zap size={18} />
              </div>
              <span>إلغاء في أي وقت</span>
            </div>
          </div>

          {/* Social Proof Teaser */}
          <div className="mt-12 opacity-40 hover:opacity-60 transition-opacity">
            <p className="text-xs font-black uppercase tracking-widest text-slate-500">تم بناء أكثر من 5,000 موقع بنجاح 🇰🇼 🇸🇦 🇦🇪</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;