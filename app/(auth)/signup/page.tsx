"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User, ArrowLeft, Gift } from "lucide-react";
// Standardized: Using relative paths to resolve casing and alias conflicts
import Button from "../../../components/ui/button.tsx";
import Input from "../../../components/ui/input.tsx";
import { 
  AuthCard, 
  GoogleAuthButton, 
  AuthDivider,
  PhoneInput,
  PasswordStrength,
} from "../../../components/auth/index.ts";

/**
 * SignupPage component with enhanced Google OAuth signup support.
 */
export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "الاسم الكامل مطلوب";
    if (!formData.email.trim()) newErrors.email = "البريد الإلكتروني مطلوب";
    else if (!/^\S+@\S+$/.test(formData.email)) newErrors.email = "بريد إلكتروني غير صالح";
    
    if (!formData.password) newErrors.password = "كلمة المرور مطلوبة";
    else if (formData.password.length < 8) newErrors.password = "يجب أن تكون كلمة المرور 8 أحرف على الأقل";
    
    if (!formData.acceptTerms) newErrors.acceptTerms = "يجب الموافقة على الشروط والأحكام للمتابعة";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Simulate API registration
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    window.location.hash = "#verify-email";
  };

  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true);
    // In a real app: await supabase.auth.signInWithOAuth({ provider: 'google' })
    
    console.log("Initiating Google Signup redirect...");
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsGoogleLoading(false);
    window.location.hash = "#dashboard";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="mb-8 p-4 bg-brand-lime border-3 border-black shadow-brutal text-center rotate-1"
      >
        <div className="flex items-center justify-center gap-3 text-black">
          <Gift className="h-6 w-6" />
          <span className="font-black text-lg">هدية ترحيبية: +20% رصيد إضافي مجاناً! 🎁</span>
        </div>
      </motion.div>

      <AuthCard
        title="إنشاء حساب جديد"
        description="انضم لأكثر من 5,000 رائد أعمال يستخدمون KWQ8"
        onLogoClick={() => router.push("/")}
        footer={
          <p className="text-content-secondary">
            لديك حساب بالفعل؟{" "}
            <Link href="/login" className="text-brand-violet font-black hover:underline">
              سجّل دخولك الآن
            </Link>
          </p>
        }
      >
        {/* Google Signup Button */}
        <GoogleAuthButton 
          mode="signup" 
          isLoading={isGoogleLoading} 
          onClick={handleGoogleSignup} 
        />

        <AuthDivider />

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="text"
            label="الاسم الكامل"
            placeholder="مثال: أحمد الصباح"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            error={errors.fullName}
            leftIcon={<User className="h-5 w-5" />}
            disabled={isLoading || isGoogleLoading}
            autoComplete="name"
          />

          <Input
            type="email"
            label="البريد الإلكتروني"
            placeholder="name@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            leftIcon={<Mail className="h-5 w-5" />}
            disabled={isLoading || isGoogleLoading}
            autoComplete="email"
          />

          <PhoneInput
            value={formData.phone}
            onChange={(phone) => setFormData({ ...formData, phone })}
            error={errors.phone}
            disabled={isLoading || isGoogleLoading}
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

          <div className="space-y-2">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-1">
                <input
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                  className="w-5 h-5 border-3 border-black rounded-lg accent-brand-violet transition-all cursor-pointer"
                />
              </div>
              <span className="text-sm font-bold text-content-secondary leading-relaxed">
                أوافق على{" "}
                <Link href="/terms" className="text-brand-violet hover:underline">
                  شروط الاستخدام
                </Link>
                {" "}و{" "}
                <Link href="/privacy" className="text-brand-violet hover:underline">
                  سياسة الخصوصية
                </Link>
              </span>
            </label>
            {errors.acceptTerms && (
              <p className="ms-8 text-xs text-red-500 font-bold animate-in fade-in slide-in-from-top-1">
                {errors.acceptTerms}
              </p>
            )}
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
            إنشاء حسابي مجاناً
            <ArrowLeft className="h-6 w-6 ms-3 rtl-flip" />
          </Button>
        </form>

        <div className="mt-8 pt-8 border-t-3 border-black/5 flex flex-wrap items-center justify-center gap-6 text-xs font-black text-content-muted">
          <div className="flex items-center gap-1.5 hover:text-green-600 transition-colors">
            <span className="text-lg">🔒</span> بياناتك مشفرة
          </div>
          <div className="flex items-center gap-1.5 hover:text-brand-violet transition-colors">
            <span className="text-lg">🇰🇼</span> صُنع في الكويت
          </div>
          <div className="flex items-center gap-1.5 hover:text-brand-pink transition-colors">
            <span className="text-lg">💳</span> لا تطلب بطاقة ائتمان
          </div>
        </div>
      </AuthCard>

      <div className="text-center mt-10 mb-20">
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