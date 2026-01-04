"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User, ArrowLeft } from "lucide-react";
// Fixed: Standardized casing for Button.tsx
import Button from "../../../components/ui/Button.tsx";
import Input from "../../../components/ui/input.tsx";
import { AuthCard, GoogleAuthButton, AuthDivider, PhoneInput, PasswordStrength } from "../../../components/auth/index.ts";
import { createClient } from "../../../lib/supabase/client.ts";
import { useToast } from "../../../components/ui/toast.tsx";

export default function SignupPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const supabase = createClient();

  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
          phone: formData.phone,
        },
      },
    });

    if (error) {
      addToast({
        type: "error",
        title: "خطأ في إنشاء الحساب",
        description: error.message,
      });
      setIsLoading(false);
      return;
    }

    if (data.user && data.session) {
      router.push("/dashboard");
    } else {
      router.push("/verify-email");
    }
  };

  const handleGoogleSignup = async () => {
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
        title="إنشاء حساب جديد"
        description="انضم لأكثر من 5,000 رائد أعمال يستخدمون KWQ8"
        footer={
          <p className="text-content-secondary">
            لديك حساب بالفعل؟{" "}
            <Link href="/login" className="text-brand-violet font-black hover:underline">
              سجّل دخولك الآن
            </Link>
          </p>
        }
      >
        <GoogleAuthButton mode="signup" isLoading={isLoading} onClick={handleGoogleSignup} />
        <AuthDivider />
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="الاسم الكامل"
            placeholder="أحمد الصباح"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            leftIcon={<User className="h-5 w-5" />}
            disabled={isLoading}
          />
          <Input
            type="email"
            label="البريد الإلكتروني"
            placeholder="name@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            leftIcon={<Mail className="h-5 w-5" />}
            disabled={isLoading}
          />
          <PhoneInput
            value={formData.phone}
            onChange={(phone) => setFormData({ ...formData, phone })}
            disabled={isLoading}
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              label="كلمة المرور"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              leftIcon={<Lock className="h-5 w-5" />}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-4 top-[42px] text-content-muted hover:text-content-primary transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <PasswordStrength password={formData.password} />
          <Button type="submit" variant="gradient" size="xl" fullWidth isLoading={isLoading} className="mt-4">
            إنشاء حسابي مجاناً
            <ArrowLeft className="h-6 w-6 ms-3 rtl-flip" />
          </Button>
        </form>
      </AuthCard>
    </motion.div>
  );
}