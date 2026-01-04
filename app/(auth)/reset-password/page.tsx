"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";
// Fixed: Standardized casing for Button.tsx import
import Button from "../../../components/ui/Button.tsx";
import Input from "../../../components/ui/input.tsx";
import { AuthCard, PasswordStrength } from "../../../components/auth/index.ts";
import { createClient } from "../../../lib/supabase/client.ts";

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "كلمتا المرور غير متطابقتين" });
      return;
    }

    if (formData.password.length < 12) {
      setErrors({ password: "يجب أن تكون كلمة المرور 12 حرفاً على الأقل للأمان" });
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: formData.password,
    });

    if (error) {
      setErrors({ password: error.message });
      setIsLoading(false);
      return;
    }
    
    setIsLoading(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto"
      >
        <AuthCard
          title="تم تغيير كلمة المرور"
          description="تم تحديث حسابك بنجاح. يمكنك الآن تسجيل الدخول."
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
            <Link href="/login" className="block w-full">
              <Button variant="gradient" size="xl" fullWidth className="text-xl shadow-brutal">
                تسجيل الدخول الآن
                <ArrowLeft className="h-6 w-6 ms-3 rtl-flip" />
              </Button>
            </Link>
          </div>
        </AuthCard>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <AuthCard
        title="تعيين كلمة المرور"
        description="يرجى إدخال كلمة مرور جديدة قوية لحسابك"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              label="كلمة المرور الجديدة"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
              leftIcon={<Lock className="h-5 w-5" />}
              disabled={isLoading}
              autoComplete="new-password"
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

          <Input
            type="password"
            label="تأكيد كلمة المرور"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            error={errors.confirmPassword}
            leftIcon={<Lock className="h-5 w-5" />}
            disabled={isLoading}
            autoComplete="new-password"
          />

          <Button
            type="submit"
            variant="gradient"
            size="xl"
            fullWidth
            isLoading={isLoading}
            className="text-xl shadow-brutal mt-4"
          >
            حفظ كلمة المرور
            <ArrowLeft className="h-6 w-6 ms-3 rtl-flip" />
          </Button>
        </form>
      </AuthCard>
    </motion.div>
  );
}