import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
// Fixed: Standardized casing for Button.tsx import
import Button from '../ui/Button.tsx';
import Input from '../ui/input.tsx';
import { AuthCard } from './index.ts';
import { ViewState } from '../../types.ts';

interface ForgotPasswordProps {
  onNavigate: (view: ViewState) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

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
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-secondary p-4 md:p-8" dir="rtl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
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
                  لم تستلم الرسالة؟ تحقق من مجلد الرسائل غير المرغوب فيها (Spam) أو انتظر بضع دقائق.
                </p>
              </div>
              <Button
                variant="outline"
                fullWidth
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail("");
                }}
              >
                إعادة المحاولة ببريد مختلف
              </Button>
            </div>
          </AuthCard>

          <div className="text-center mt-8">
            <button
              onClick={() => onNavigate('login')}
              className="text-sm font-black text-content-muted hover:text-content-primary inline-flex items-center gap-2 transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 rtl-flip rotate-180 transition-transform group-hover:-translate-x-1" />
              العودة لتسجيل الدخول
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-secondary p-4 md:p-8" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <AuthCard
          title="نسيت كلمة المرور؟"
          description="أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين"
          footer={
            <p className="text-content-secondary">
              تذكرت كلمة المرور؟{" "}
              <button 
                onClick={() => onNavigate('login')} 
                className="text-brand-violet font-black hover:underline"
              >
                سجّل دخولك الآن
              </button>
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
              dir="ltr"
              className="text-left"
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

        <div className="text-center mt-8">
          <button
            onClick={() => onNavigate('login')}
            className="text-sm font-black text-content-muted hover:text-content-primary inline-flex items-center gap-2 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 rtl-flip rotate-180 transition-transform group-hover:-translate-x-1" />
            العودة لتسجيل الدخول
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordForm;