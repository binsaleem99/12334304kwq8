"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Crown, Building } from "lucide-react";
// Fixed: Standardized casing for Button.tsx import
import Button from "../ui/Button.tsx";
import Badge from "../ui/badge.tsx";
import { GradientText } from "../ui/index.ts";
import { cn } from "../../lib/utils/cn.ts";

const packages = [
  {
    id: "starter",
    name: "المبتدئة",
    icon: Sparkles,
    credits: 100,
    price: 5,
    bonus: 0,
    totalCredits: 100,
    color: "bg-surface-secondary",
    borderColor: "border-black",
    features: [
      "100 رصيد",
      "بناء بالذكاء الاصطناعي",
      "قوالب أساسية",
      "نطاق فرعي مجاني",
      "دعم بالبريد",
    ],
    popular: false,
  },
  {
    id: "popular",
    name: "الشائعة",
    icon: Zap,
    credits: 500,
    price: 20,
    bonus: 10,
    totalCredits: 550,
    color: "bg-brand-violet",
    textColor: "text-white",
    borderColor: "border-black",
    features: [
      "550 رصيد (+10% مجاناً)",
      "كل مميزات المبتدئة",
      "جميع القوالب",
      "تحرير مرئي",
      "دعم أولوية",
    ],
    popular: true,
  },
  {
    id: "power",
    name: "القوية",
    icon: Crown,
    credits: 1000,
    price: 35,
    bonus: 20,
    totalCredits: 1200,
    color: "bg-surface-secondary",
    borderColor: "border-black",
    features: [
      "1,200 رصيد (+20% مجاناً)",
      "كل مميزات الشائعة",
      "مكونات متقدمة",
      "نظام الولاء",
      "دعم واتساب",
    ],
    popular: false,
  },
  {
    id: "enterprise",
    name: "المؤسسات",
    icon: Building,
    credits: 5000,
    price: 150,
    bonus: 40,
    totalCredits: 7000,
    color: "bg-surface-dark",
    textColor: "text-white",
    borderColor: "border-black",
    features: [
      "7,000 رصيد (+40% مجاناً)",
      "كل مميزات القوية",
      "مشاريع غير محدودة",
      "دعم مخصص",
      "تدريب الفريق",
    ],
    popular: false,
  },
];

export function Pricing() {
  const router = useRouter();

  const handlePurchase = (id: string) => {
    router.push(`/signup?package=${id}`);
  };

  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-brand-violet font-bold mb-4"
          >
            💰 باقات الرصيد
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            اشترِ رصيد.
            <br />
            <GradientText>ابنِ ما تشاء.</GradientText>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-content-secondary text-lg max-w-2xl mx-auto"
          >
            ادفع فقط مقابل ما تستخدمه. بدون اشتراكات شهرية.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-brand-lime border-3 border-black shadow-brutal"
          >
            <span className="text-2xl">🎁</span>
            <span className="font-bold">أول عملية شراء: +20% رصيد إضافي مجاناً!</span>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative flex flex-col",
                pkg.popular && "lg:-mt-4 lg:mb-4"
              )}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge variant="gradient" size="lg">
                    ⭐ الأكثر شيوعاً
                  </Badge>
                </div>
              )}

              <div
                className={cn(
                  "flex-1 flex flex-col border-3 shadow-brutal p-6 rounded-2xl",
                  pkg.color,
                  pkg.borderColor,
                  pkg.textColor,
                  pkg.popular && "shadow-brutal-lg"
                )}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn(
                    "p-2 border-3 border-black rounded-xl",
                    pkg.popular ? "bg-white text-brand-violet" : "bg-brand-violet text-white"
                  )}>
                    <pkg.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold">{pkg.name}</h3>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{pkg.price}</span>
                    <span className="text-lg">د.ك</span>
                  </div>
                  <p className={cn(
                    "text-sm mt-1",
                    pkg.textColor ? "opacity-80" : "text-content-secondary"
                  )}>
                    {pkg.totalCredits.toLocaleString()} رصيد
                    {pkg.bonus > 0 && ` (+${pkg.bonus}% مجاناً)`}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6 flex-1">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className={cn(
                        "h-5 w-5 flex-shrink-0",
                        pkg.popular ? "text-brand-lime" : "text-brand-violet"
                      )} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant={pkg.popular ? "secondary" : "default"}
                  size="lg"
                  className="w-full mt-auto"
                  onClick={() => handlePurchase(pkg.id)}
                >
                  اشترِ الآن
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Credit Expiry Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-content-muted mt-8 font-bold"
        >
          * الرصيد صالح لمدة 90 يوماً من تاريخ الشراء
        </motion.p>
      </div>
    </section>
  );
}

export default Pricing;