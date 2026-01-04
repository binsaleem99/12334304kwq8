"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
// Fixed: Standardized casing for Button.tsx import
import Button from "../../../components/ui/Button.tsx";
import Input from "../../../components/ui/input.tsx";
import { AuthCard } from "../../../components/auth/index.ts";
import { createClient } from "../../../lib/supabase/client.ts";

export default function ForgotPasswordPage() {
  const supabase = createClient();
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

    setIsLoading(true);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (resetError) {
      setError(resetError.message);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
    </motion.div>
  );
}