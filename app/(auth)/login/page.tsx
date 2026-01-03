"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Chrome } from "lucide-react";
// Standardized: Using relative paths to resolve casing and alias conflicts
import Button from "../../../components/ui/button.tsx";
import Input from "../../../components/ui/input.tsx";
import { 
  AuthCard, 
  GoogleAuthButton, 
  AuthDivider 
} from "../../../components/auth/index.ts";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = "البريد الإلكتروني مطلوب";
    else if (!/^\S+@\S+$/.test(formData.email)) newErrors.email = "بريد إلكتروني غير صالح";
    
    if (!formData.password) newErrors.password = "كلمة المرور مطلوبة";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    window.location.hash = "#dashboard";
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    // In a real app, this would use Supabase: 
    // await supabase.auth.signInWithOAuth({ provider: 'google' })
    
    console.log("Redirecting to Google OAuth flow...");
    
    // Simulating redirect logic
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    setIsGoogleLoading(false);
    window.location.hash = "#dashboard";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <AuthCard
        title="تسجيل الدخول"
        description="مرحباً بعودتك! سجّل دخولك للمتابعة"
        onLogoClick={() => router.push("/")}
        footer={
          <p className="text-content-secondary">
            ليس لديك حساب؟{" "}
            <Link href="/signup" className="text-brand-violet font-black hover:underline">
              أنشئ حساباً جديداً
            </Link>
          </p>
        }
      >
        {/* Google Login Trigger */}
        <GoogleAuthButton 
          mode="login" 
          isLoading={isGoogleLoading} 
          onClick={handleGoogleLogin} 
        />

        <AuthDivider />

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            label="البريد الإلكتروني"
            placeholder="name@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            leftIcon={<Mail className="h-5 w-5" />}
            disabled={isLoading || isGoogleLoading}
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
              disabled={isLoading || isGoogleLoading}
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

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                className="w-5 h-5 border-3 border-black rounded-lg accent-brand-violet transition-all"
              />
              <span className="text-sm font-bold group-hover:text-brand-violet">تذكرني</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm font-bold text-brand-violet hover:underline"
            >
              نسيت كلمة المرور؟
            </Link>
          </div>

          <Button
            type="submit"
            variant="gradient"
            size="xl"
            fullWidth
            isLoading={isLoading}
            disabled={isGoogleLoading}
            className="text-xl shadow-brutal mt-4 py-8"
          >
            تسجيل الدخول
            <ArrowLeft className="h-6 w-6 ms-2 rtl-flip" />
          </Button>
        </form>
      </AuthCard>

      <div className="text-center mt-8">
        <Link
          href="/"
          className="text-sm font-black text-content-muted hover:text-content-primary inline-flex items-center gap-2 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 rtl-flip rotate-180 transition-transform group-hover:-translate-x-1" />
          العودة للرئيسية
        </Link>
      </div>
    </motion.div>
  );
}