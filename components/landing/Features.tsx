import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, LayoutTemplate, Zap, CreditCard, MessageCircle, BarChart3, Sparkles } from 'lucide-react';

const FeatureCard = ({ title, description, icon: Icon, accent, size = 'md', children }: any) => {
  const accentColors: any = {
    violet: 'bg-violet-200',
    pink: 'bg-pink-200',
    orange: 'bg-orange-200',
    cyan: 'bg-cyan-200',
    green: 'bg-green-200',
    yellow: 'bg-yellow-200',
  };

  const colSpan = size === 'lg' ? 'md:col-span-2' : size === 'md' ? 'md:col-span-1' : 'col-span-1';
  const rowSpan = size === 'lg' ? 'md:row-span-2' : '';

  return (
    <motion.div
      variants={{
        rest: { y: 0, x: 0, boxShadow: "4px 4px 0px 0px #000" },
        hover: { y: 2, x: 2, boxShadow: "0px 0px 0px 0px #000", transition: { type: "tween", duration: 0.1 } }
      }}
      initial="rest"
      whileHover="hover"
      className={`${colSpan} ${rowSpan} bg-white rounded-2xl p-6 md:p-8 border-2 border-black transition-all group relative overflow-hidden`}
    >
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 border-2 border-black shadow-[2px_2px_0px_0px_#000] ${accentColors[accent]}`}>
        <Icon className="w-7 h-7 text-black stroke-[2.5px]" />
      </div>
      <h3 className="text-2xl font-black text-black mb-3">{title}</h3>
      <p className="text-slate-700 font-medium mb-6 leading-relaxed">{description}</p>
      {children}
    </motion.div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-lg bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000] text-black text-sm font-bold mb-6">
            <Sparkles size={16} fill="currentColor" className="text-yellow-400" />
            القدرات
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-black mb-6 font-heading">
            كل ما تحتاجه <br/>
            <span className="relative inline-block mt-2">
                <span className="absolute inset-0 bg-yellow-300 transform rotate-1 rounded-lg -z-10 border-2 border-black"></span>
                <span className="relative z-10 px-2">لبناء موقعك</span>
            </span>
          </h2>
          <p className="text-xl text-slate-800 font-medium max-w-2xl mx-auto">أدوات قوية بواجهة بسيطة، صُممت خصيصاً للمنطقة.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Large Card */}
          <FeatureCard
            title="بناء بالمحادثة"
            description="اكتب ما تريد بالعربية والذكاء الاصطناعي يفهمك ويبني لك."
            icon={MessageSquare}
            accent="violet"
            size="lg"
          >
            <div className="bg-slate-50 rounded-xl p-4 mt-auto border-2 border-black relative overflow-hidden">
                <div className="flex flex-col gap-3">
                    <div className="self-end bg-black text-white px-4 py-3 rounded-xl rounded-tr-none text-sm font-bold border-2 border-black max-w-[80%]">
                        أريد متجراً للعطور الشرقية بتصميم فخم
                    </div>
                    <div className="self-start bg-white border-2 border-black text-black px-4 py-3 rounded-xl rounded-tl-none text-sm font-bold max-w-[80%] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                        <span className="flex gap-1">
                            <span className="w-2 h-2 bg-black rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-black rounded-full animate-bounce delay-75"></span>
                            <span className="w-2 h-2 bg-black rounded-full animate-bounce delay-150"></span>
                        </span>
                    </div>
                </div>
            </div>
          </FeatureCard>

          {/* Medium Cards */}
          <FeatureCard
            title="قوالب خليجية"
            description="+15 قالب مصمم للسوق العربي والذوق المحلي."
            icon={LayoutTemplate}
            accent="pink"
            size="md"
          >
             <div className="flex items-center justify-center gap-2 mt-4 opacity-100 transition-opacity">
                <div className="w-16 h-20 bg-pink-100 border-2 border-black rounded rotate-[-6deg]"></div>
                <div className="w-16 h-20 bg-white border-2 border-black rounded z-10 -mt-2 shadow-[2px_2px_0px_0px_#000]"></div>
                <div className="w-16 h-20 bg-pink-100 border-2 border-black rounded rotate-[6deg]"></div>
             </div>
          </FeatureCard>

          <FeatureCard
            title="نشر فوري"
            description="من الفكرة للإنترنت في دقائق مع استضافة سريعة."
            icon={Zap}
            accent="orange"
            size="md"
          >
             <div className="mt-6">
                 <div className="w-full bg-white border-2 border-black rounded-full h-4 mb-2 overflow-hidden p-0.5">
                     <div className="bg-orange-400 h-full rounded-full w-[80%] border-r-2 border-black"></div>
                 </div>
                 <div className="text-right text-xs text-black font-black">تم النشر! ✓</div>
             </div>
          </FeatureCard>

          {/* Small Cards */}
          <FeatureCard
            title="دفع خليجي"
            description="KNET • Visa • Mastercard"
            icon={CreditCard}
            accent="cyan"
            size="md"
          />

          <FeatureCard
            title="دعم واتساب"
            description="تواصل مباشر مع عملائك عبر الواتساب."
            icon={MessageCircle}
            accent="green"
            size="md"
          />

          <FeatureCard
            title="لوحة تحكم ذكية"
            description="تحكم كامل في موقعك ومبيعاتك."
            icon={BarChart3}
            accent="yellow"
            size="md"
          />
        </div>
        
        <div className="text-center mt-16">
            <a href="#features-all" className="inline-block px-8 py-4 bg-white text-black font-black text-lg border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all rounded-xl">
                استكشف كل الميزات ←
            </a>
        </div>
      </div>
    </section>
  );
};

export default Features;