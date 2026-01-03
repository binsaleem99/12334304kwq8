"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { 
  Brain, Layout, Rocket, Settings, CreditCard, 
  MessageSquare, Globe, Palette 
} from "lucide-react";
import { GradientText } from "../ui/index.ts";

const features = [
  {
    icon: Brain,
    title: "بناء بالذكاء الاصطناعي",
    description: "اكتب ما تريد بالعربية والذكاء الاصطناعي يبني لك موقعك كاملاً",
    color: "bg-brand-violet",
  },
  {
    icon: Layout,
    title: "قوالب عربية جاهزة",
    description: "قوالب مصممة خصيصًا للسوق الخليجي وتدعم اللغة العربية بالكامل",
    color: "bg-brand-pink",
  },
  {
    icon: Rocket,
    title: "نشر بنقرة واحدة",
    description: "انشر موقعك مباشرة على الإنترنت مع نطاق فرعي مجاني",
    color: "bg-brand-orange",
  },
  {
    icon: Settings,
    title: "لوحة تحكم تلقائية",
    description: "لوحة إدارة جاهزة لكل مشروع تبنيه لإدارة المحتوى بسهولة",
    color: "bg-brand-cyan",
  },
  {
    icon: CreditCard,
    title: "دفع إلكتروني خليجي",
    description: "تكامل مع بوابات الدفع المحلية مثل KNET وبطاقات الائتمان",
    color: "bg-brand-lime",
  },
  {
    icon: MessageSquare,
    title: "واتساب مدمج",
    description: "زر واتساب تفاعلي لتواصل عملائك معك مباشرة",
    color: "bg-brand-gold",
  },
  {
    icon: Globe,
    title: "متجاوب مع الجوال",
    description: "كل موقع تبنيه يعمل بشكل مثالي على الجوال والتابلت",
    color: "bg-brand-violet",
  },
  {
    icon: Palette,
    title: "تحرير مرئي",
    description: "عدّل موقعك بالسحب والإفلات أو بالأوامر النصية",
    color: "bg-brand-pink",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Features() {
  return (
    <section id="features" className="py-24 bg-surface-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-brand-violet font-bold mb-4"
          >
            المميزات
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            كل ما تحتاجه لبناء
            <br />
            <GradientText>موقع احترافي</GradientText>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-content-secondary text-lg max-w-2xl mx-auto"
          >
            من الفكرة إلى النشر، بدون أي خبرة تقنية
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="h-full bg-white border-3 border-black shadow-brutal p-6 transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none">
                {/* Icon */}
                <div className={`inline-flex p-3 ${feature.color} text-white border-3 border-black mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                {/* Content */}
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-content-secondary">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Features;