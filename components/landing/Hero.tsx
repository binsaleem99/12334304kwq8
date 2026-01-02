import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { Play, Star, Sparkles, Zap, MapPin } from 'lucide-react';
import { ViewState } from '../../types';

interface HeroProps {
  onNavigate: (view: ViewState) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const transition = {
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut" as const,
    times: [0, 0.25, 0.35, 0.4, 0.9, 1]
  };

  return (
    <section className="relative pt-24 pb-12 md:pt-48 md:pb-20 overflow-hidden bg-white">
      {/* Geometric Decor */}
      <div className="absolute top-40 left-10 w-12 h-12 bg-yellow-300 border-2 border-black rounded-full shadow-neo hidden lg:block animate-bounce" />
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-pink-300 border-2 border-black rotate-12 shadow-neo hidden lg:block" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-right"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-yellow-100 border-2 border-black shadow-neo-sm mb-6 md:mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
              <span className="text-xs md:text-sm font-bold text-black uppercase tracking-tight">الإصدار التجريبي متاح الآن</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 text-black font-heading">
              ابنِ موقعك <br />
              <span className="text-violet-600 bg-violet-50 px-2 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(124,58,237,1)] inline-block transform -rotate-1 mt-2">بالذكاء الاصطناعي</span>
            </h1>

            <p className="text-base md:text-xl text-slate-800 font-medium mb-8 md:mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed space-y-2">
              <span>اكتب ما تريد بالعربية... وشاهد موقعك يُبنى أمامك في دقائق.</span>
              <span className="flex items-center justify-center lg:justify-start gap-2 text-slate-500 text-sm md:text-base">
                <Zap size={18} className="text-yellow-500 fill-yellow-500" />
                تقنية تفهم لغتك وثقافتك المحلية.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full sm:w-auto text-lg group shadow-neo"
                onClick={() => onNavigate('signup')}
              >
                 <span className="relative z-10">ابدأ بـ 1 د.ك فقط →</span>
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full sm:w-auto shadow-neo"
              >
                <Play className="w-5 h-5 ml-2 fill-black" />
                شاهد العرض
              </Button>
            </div>

            <div className="mt-8 md:mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 text-xs md:text-sm font-bold text-black">
              <div className="flex items-center gap-2 bg-white border-2 border-black px-3 py-1 rounded-lg shadow-neo-sm">
                <MapPin size={16} className="text-red-500" />
                <span>صُنع في الكويت</span>
              </div>
              <div className="flex items-center gap-2 bg-white border-2 border-black px-3 py-1 rounded-lg shadow-neo-sm">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span>4.9/5 تقييم العملاء</span>
              </div>
            </div>
          </motion.div>

          {/* Visual Content (Mockup) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-xl mx-auto"
          >
            <div className="relative rounded-2xl bg-white border-[3px] md:border-4 border-black shadow-neo-lg p-2 md:p-3 aspect-[4/3] overflow-hidden flex flex-col">
              {/* Browser UI */}
              <div className="flex items-center gap-2 mb-3 bg-slate-100 p-1.5 rounded-lg border-2 border-black shrink-0">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400 border border-black/10"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-black/10"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 border border-black/10"></div>
                </div>
                <div className="flex-1 bg-white h-6 rounded-md border-2 border-black mx-2 flex items-center px-2">
                    <div className="w-20 h-1.5 rounded-full bg-slate-100"></div>
                </div>
              </div>
              
              <div className="flex-1 bg-slate-50 border-2 border-black rounded-xl relative overflow-hidden flex flex-col md:flex-row">
                 <div className="hidden md:flex w-12 bg-white border-l-2 border-black flex-col items-center py-4 gap-3 shrink-0">
                    {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded border border-black bg-slate-50"></div>)}
                 </div>

                 <div className="flex-1 relative p-4 flex flex-col gap-4 overflow-hidden">
                    <motion.div animate={{ opacity: [0, 0, 1, 1, 0] }} transition={transition} className="absolute inset-0 bg-yellow-50 z-0" />
                    
                    <div className="flex justify-between items-center relative z-10">
                        <div className="w-8 h-8 rounded border-2 border-black bg-black" />
                        <div className="flex gap-1.5">
                            <div className="h-1.5 w-8 rounded-full bg-slate-300" />
                            <div className="h-1.5 w-8 rounded-full bg-slate-300" />
                        </div>
                    </div>

                    <div className="flex flex-col items-center text-center mt-2 gap-3 relative z-10">
                        <div className="space-y-1.5 w-full flex flex-col items-center">
                            <motion.div animate={{ width: ["40%", "40%", "80%", "80%", "40%"] }} transition={transition} className="h-3 bg-slate-800 rounded" />
                            <div className="h-2 bg-slate-300 rounded w-1/3" />
                        </div>
                        <motion.div animate={{ backgroundColor: ["#f1f5f9", "#f1f5f9", "#f9a8d4", "#f9a8d4", "#f1f5f9"] }} transition={transition} className="w-full h-16 bg-slate-100 rounded-lg border-2 border-black shadow-neo-sm flex items-center justify-center">
                             <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                        </motion.div>
                        <div className="h-8 w-24 bg-violet-600 rounded-lg shadow-neo-sm" />
                    </div>

                    <motion.div 
                        animate={{ opacity: [0, 1, 1, 0, 0], y: [10, 0, 0, 5, 10] }}
                        transition={transition}
                        className="absolute bottom-3 right-3 bg-white p-2 rounded-lg border-2 border-black shadow-neo-sm z-20 flex items-center gap-2 max-w-[150px]"
                    >
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span className="text-[9px] font-black text-black">طلب تعديل ذكي!</span>
                    </motion.div>
                 </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-2 md:-top-8 md:-right-6 bg-yellow-300 px-3 py-1.5 md:p-3 rounded-xl border-2 border-black shadow-neo-sm md:shadow-neo rotate-3 z-30"
            >
                <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-black fill-black" />
                    <span className="text-[10px] md:text-xs font-black text-black">تعديل فوري</span>
                </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;