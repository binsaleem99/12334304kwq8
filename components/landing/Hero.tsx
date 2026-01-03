"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
// Standardized casing for button import
import Button from '../ui/button.tsx';
import { Play, Star, MapPin, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-24 pb-12 md:pt-48 md:pb-20 overflow-hidden bg-white">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center lg:text-right"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-yellow-100 border-2 border-black shadow-neo-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
              <span className="text-xs md:text-sm font-bold text-black">الإصدار التجريبي متاح الآن</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 text-black font-heading">
              ابنِ موقعك <br />
              <span className="text-violet-600 bg-violet-50 px-2 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(124,58,237,1)] inline-block transform -rotate-1">بالذكاء الاصطناعي</span>
            </h1>

            <p className="text-base md:text-xl text-slate-800 font-medium mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              اكتب ما تريد بالعربية... وشاهد موقعك يُبنى أمامك in دقائق. تقنية تفهم لغتك وثقافتك المحلية.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link href="/auth/signup" className="w-full sm:w-auto">
                <Button variant="gradient" size="lg" className="w-full shadow-neo">
                  ابدأ بـ 1 د.ك فقط →
                </Button>
              </Link>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto shadow-neo">
                <Play className="w-5 h-5 ml-2 fill-black" />
                شاهد العرض
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 font-bold text-black">
              <div className="flex items-center gap-2 bg-white border-2 border-black px-3 py-1 rounded-lg shadow-neo-sm">
                <MapPin size={16} />
                <span>صُنع في الكويت</span>
              </div>
              <div className="flex items-center gap-2 bg-white border-2 border-black px-3 py-1 rounded-lg shadow-neo-sm">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span>4.9/5 تقييم العملاء</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative w-full max-w-xl mx-auto"
          >
             <div className="relative rounded-2xl bg-white border-[4px] border-black shadow-neo-lg p-3 aspect-[4/3] overflow-hidden">
                <div className="flex items-center gap-2 mb-3 bg-slate-100 p-2 rounded-lg border-2 border-black">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400 border border-black/10"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-black/10"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400 border border-black/10"></div>
                  </div>
                </div>
                <div className="h-full bg-slate-50 border-2 border-black rounded-xl p-4 flex flex-col gap-4">
                  <div className="w-1/3 h-4 bg-slate-200 rounded"></div>
                  <div className="w-full h-32 bg-violet-100 rounded-lg border-2 border-black"></div>
                  <div className="space-y-2">
                    <div className="w-full h-3 bg-slate-200 rounded"></div>
                    <div className="w-5/6 h-3 bg-slate-200 rounded"></div>
                  </div>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;