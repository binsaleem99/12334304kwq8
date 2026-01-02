import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { ViewState } from '../../types';

interface FinalCTAProps {
  onNavigate: (view: ViewState) => void;
}

const FinalCTA: React.FC<FinalCTAProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-violet-600 border-4 border-black px-6 py-20 text-center shadow-[12px_12px_0px_0px_#000]">
            {/* Decor Patterns */}
            <div className="absolute top-10 left-10 text-6xl opacity-20 rotate-12">⚡</div>
            <div className="absolute bottom-10 right-10 text-6xl opacity-20 -rotate-12">🚀</div>
            
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-10"
            >
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 font-heading drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                    جاهز تبني شيء رائع؟
                </h2>
                <p className="text-xl text-white font-bold mb-10 max-w-2xl mx-auto leading-relaxed">
                    خذ الخطوة الأولى — نحن معك في كل خطوة. لا تحتاج خبرة تقنية، فقط فكرتك.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <button
                        onClick={() => onNavigate('signup')}
                        className="bg-yellow-400 text-black border-2 border-black px-8 py-4 rounded-xl font-black text-lg shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
                    >
                        🎨 جرّب بـ 1 د.ك فقط
                    </button>
                    <button className="px-8 py-4 rounded-xl font-bold text-white border-2 border-white hover:bg-white hover:text-black transition-colors">
                        💬 عندك سؤال؟
                    </button>
                </div>

                <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-white font-bold">
                    <span className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded border border-white/20">✓ دفع آمن بـ 1 د.ك</span>
                    <span className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded border border-white/20">✓ جاهز في 5 دقائق</span>
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;