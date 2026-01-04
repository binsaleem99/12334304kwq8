"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
// Standardized: Using lowercase button.tsx to resolve casing conflicts
import Button from "../../../components/ui/button.tsx";
import Input from "../../../components/ui/input.tsx";
import { AuthCard } from "../../../components/auth/index.ts";

/**
 * ForgotPasswordPage component providing password recovery functionality.
 * Features a split state for request and confirmation, adhering to the 
 * Neo-Brutalist brand identity.
 */
export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email) {
      setError("البريد الإلكتروني مطلوب");
      return;
    }

    if (!/^\S+@\S+$/.test(email)) {
      setError("يرجى إدخال بريد إلكتروني صحيح");
      return;
    }

    setIsLoading(true);

    // Simulation of Backend password reset request
    console.log("Password reset request for:", email);
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  // Success view after submission
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <AuthCard
          title="تم إرسال الرابط"
          description="تحقق من بريدك الإلكتروني"
        >
          <div className="text-center py-8">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, delay: 0.2 }}
              className="inline-flex p-5 bg-brand-lime border-3 border-black shadow-brutal mb-8"
            >
              <CheckCircle className="h-12 w-12 text-black" strokeWidth={2.5} />
            </motion.div>
            <p className="text-content-secondary font-bold text-lg mb-6 leading-relaxed">
              أرسلنا رابط إعادة تعيين كلمة المرور إلى:
              <br />
              <strong className="text-content-primary font-black text-xl">{email}</strong>
            </p>
            <div className="bg-surface-secondary border-2 border-black/10 rounded-xl p-4 mb-8">
              <p className="text-sm text-content-muted font-bold">
                لم تستلم الرسالة? تحقق من مجلد الرسائل غير المرغوب فيها (Spam) أو انتظر بضع دقائق.
              </p>
            </div>
            <Button
              variant="outline"
              fullWidth
              onClick={() => {
                setIsSubmitted(false);
                setEmail("");
              }}
              className="h-12"
            >
              إعادة المحاولة ببريد مختلف
            </Button>
          </div>
        </AuthCard>

        <div className="text-center mt-8">
          <Link
            href="/login"
            className="text-sm font-black text-content-muted hover:text-content-primary inline-flex items-center gap-2 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 rtl-flip rotate-180 transition-transform group-hover:-translate-x-1" />
            العودة لتسجيل الدخول
          </Link>
        </div>
      </motion.div>
    );
  }

  // Initial request view
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <AuthCard
        title="نسيت كلمة المرور؟"
        description="أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين"
        footer={
          <p className="text-content-secondary">
            تذكرت كلمة المرور؟{" "}
            <Link href="/login" className="text-brand-violet font-black hover:underline">
              سجّل دخولك الآن
            </Link>
          </p>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Address Input */}
          <Input
            type="email"
            label="البريد الإلكتروني"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
            leftIcon={<Mail className="h-5 w-5" />}
            disabled={isLoading}
            autoComplete="email"
          />

          {/* Action Button */}
          <Button
            type="submit"
            variant="gradient"
            size="xl"
            fullWidth
            isLoading={isLoading}
            className="text-xl shadow-brutal mt-4"
          >
            إرسال رابط إعادة التعيين
            <ArrowLeft className="h-6 w-6 ms-3 rtl-flip" />
          </Button>
        </form>
      </AuthCard>

      {/* Primary Navigation Redirect */}
      <div className="text-center mt-8">
        <Link
          href="/login"
          className="text-sm font-black text-content-muted hover:text-content-primary inline-flex items-center gap-2 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 rtl-flip rotate-180 transition-transform group-hover:-translate-x-1" />
          العودة لتسجيل الدخول
        </Link>
      </div>
    </motion.div>
  );
}