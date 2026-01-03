"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Star, Quote, Users, Globe, Zap, Award } from "lucide-react";
import { GradientText } from "../ui/index.ts";

const testimonials = [
  {
    name: "أحمد الصباح",
    role: "صاحب صالون",
    location: "الكويت",
    content: "بنيت موقع الصالون في أقل من ساعة! العملاء الآن يحجزون مواعيدهم أونلاين وبكل سهولة. وفر علي مبالغ طائلة كنت سأدفعها لشركات البرمجة.",
    rating: 5,
    avatarColor: "bg-brand-violet",
  },
  {
    name: "فاطمة العلي",
    role: "صاحبة مطعم",
    location: "السعودية",
    content: "أسهل أداة استخدمتها على الإطلاق. كتبت ما أريد باللغة العربية وخرج الموقع بالضبط كما تخيلته! الميزة الأهم هي التكامل مع واتساب.",
    rating: 5,
    avatarColor: "bg-brand-pink",
  },
  {
    name: "محمد الراشد",
    role: "مصمم مستقل",
    location: "الإمارات",
    content: "أستخدم KWQ8 لبناء مواقع عملائي بسرعة مذهلة. جودة الكود وسرعة التصفح ممتازة، وخدمة العملاء دائماً متواجدة للمساعدة.",
    rating: 5,
    avatarColor: "bg-brand-orange",
  },
];

const stats = [
  { value: "5,000+", label: "موقع تم إنشاؤه", icon: Globe, color: "text-brand-violet" },
  { value: "50+", label: "قالب خليجي", icon: Zap, color: "text-brand-pink" },
  { value: "99%", label: "رضا العملاء", icon: Award, color: "text-brand-orange" },
  { value: "24/7", label: "دعم فني", icon: Users, color: "text-brand-cyan" },
];

export function SocialProof() {
  return (
    <section id="social-proof" className="py-24 bg-surface-secondary relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-violet/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-pink/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-black mb-4 leading-tight"
          >
            ماذا يقول
            <br />
            <GradientText>عملاؤنا في الخليج</GradientText>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-content-secondary text-lg font-bold max-w-2xl mx-auto"
          >
            انضم إلى آلاف رواد الأعمال الذين وثقوا بـ KWQ8 لبناء حضورهم الرقمي
          </motion.p>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 bg-white border-3 border-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200"
            >
              <stat.icon className={`h-8 w-8 mx-auto mb-4 ${stat.color}`} />
              <div className="text-3xl md:text-4xl font-black text-black mb-1">
                {stat.value}
              </div>
              <div className="text-content-secondary font-bold text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border-3 border-black shadow-brutal p-8 flex flex-col relative group"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 right-8 bg-brand-violet text-white p-2 border-2 border-black shadow-brutal-sm">
                <Quote className="h-4 w-4" />
              </div>

              {/* Content */}
              <p className="text-lg font-bold text-content-primary mb-8 leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="mt-auto">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-brand-gold text-brand-gold"
                    />
                  ))}
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 ${testimonial.avatarColor} rounded-full border-3 border-black flex items-center justify-center text-white font-black text-xl shadow-brutal-sm group-hover:rotate-6 transition-transform`}>
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-black text-black">{testimonial.name}</div>
                    <div className="text-sm font-bold text-content-secondary">
                      {testimonial.role} • {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GCC Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 pt-10 border-t-3 border-black/10 text-center"
        >
          <p className="text-content-secondary font-black mb-8 uppercase tracking-widest text-sm">أداة البناء المفضلة في دول مجلس التعاون</p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {[
              { flag: "🇰🇼", name: "الكويت" },
              { flag: "🇸🇦", name: "السعودية" },
              { flag: "🇦🇪", name: "الإمارات" },
              { flag: "🇶🇦", name: "قطر" },
              { flag: "🇧🇭", name: "البحرين" },
              { flag: "🇴🇲", name: "عُمان" },
            ].map((country) => (
              <div key={country.name} className="flex flex-col items-center gap-2 group cursor-default">
                <span className="text-5xl md:text-6xl filter grayscale hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110" title={country.name}>
                  {country.flag}
                </span>
                <span className="text-xs font-bold text-slate-400 group-hover:text-black transition-colors">{country.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default SocialProof;