"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";
// Standardized: Using lowercase button.tsx to resolve casing conflicts
import Button from "../../../components/ui/button.tsx";
import Input from "../../../components/ui/input.tsx";
import { AuthCard, PasswordStrength } from "../../../components/auth/index.ts";

/**
 * ResetPasswordPage component allowing users to set a new password after recovery.
 * Features validation for matching passwords and dynamic strength visualization.
 */
export default function ResetPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const newErrors: Record<string, string> = {};
    if (!formData.password) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (formData.password.length < 8) {
      newErrors.password = "يجب أن تكون كلمة المرور 8 أحرف على الأقل";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "كلمتا المرور غير متطابقتين";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    // Simulate API call for password reset
    console.log("Resetting password for account...");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsSuccess(true);
  };

  // Render success message after password reset
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
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
            
            <p className="text-content-secondary font-bold text-lg mb-8 leading-relaxed">
              لقد قمت بتغيير كلمة المرور الخاصة بك بنجاح!
            </p>

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
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <AuthCard
        title="تعيين كلمة المرور"
        description="يرجى إدخال كلمة مرور جديدة قوية لحسابك"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password Field */}
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
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Real-time Strength Indicator */}
          <PasswordStrength password={formData.password} />

          {/* Confirm Password Field */}
          <div className="relative pt-2">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              label="تأكيد كلمة المرور"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              error={errors.confirmPassword}
              leftIcon={<Lock className="h-5 w-5" />}
              disabled={isLoading}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute left-4 top-[42px] text-content-muted hover:text-content-primary transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Submit Action */}
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

      {/* Navigation Redirect */}
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