"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
// Fixed: Standardized casing for Button.tsx import
import Button from "../../../components/ui/Button.tsx";
import Input from "../../../components/ui/input.tsx";
import { AuthCard, GoogleAuthButton, AuthDivider } from "../../../components/auth/index.ts";
import { createClient } from "../../../lib/supabase/client.ts";
import { useToast } from "../../../components/ui/toast.tsx";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToast } = useToast();
  const supabase = createClient();
  
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      addToast({
        type: "error",
        title: "خطأ في تسجيل الدخول",
        description: error.message,
      });
      setIsLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <AuthCard
        title="تسجيل الدخول"
        description="مرحباً بعودتك! سجّل دخولك للمتابعة"
        footer={
          <p className="text-content-secondary">
            ليس لديك حساب؟{" "}
            <Link href="/signup" className="text-brand-violet font-black hover:underline">
              أنشئ حساباً جديداً
            </Link>
          </p>
        }
      >
        <GoogleAuthButton mode="login" isLoading={isLoading} onClick={handleGoogleLogin} />
        <AuthDivider />
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            label="البريد الإلكتروني"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            leftIcon={<Mail className="h-5 w-5" />}
            disabled={isLoading}
            autoComplete="email"
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              label="كلمة المرور"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
              leftIcon={<Lock className="h-5 w-5" />}
              disabled={isLoading}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-4 top-[42px] text-content-muted hover:text-content-primary transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <div className="flex items-center justify-end">
            <Link href="/forgot-password">
              <span className="text-sm font-bold text-brand-violet hover:underline">
                نسيت كلمة المرور؟
              </span>
            </Link>
          </div>
          <Button type="submit" variant="gradient" size="xl" fullWidth isLoading={isLoading}>
            دخول
            <ArrowLeft className="h-6 w-6 ms-2 rtl-flip" />
          </Button>
        </form>
      </AuthCard>
    </motion.div>
  );
}