import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, RefreshCw } from 'lucide-react';
// Fixed: Standardized import casing for Button.tsx
import Button from '../ui/Button.tsx';
import { AuthCard } from './index.ts';
import { ViewState } from '../../types.ts';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient } from '../../lib/supabase/client.ts';

interface EmailVerificationProps {
  onNavigate: (view: ViewState) => void;
}

function VerificationContent({ onNavigate }: EmailVerificationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const supabase = createClient();
  const hasToken = searchParams?.has('token');
  const [status, setStatus] = useState<'pending' | 'success' | 'error' | 'loading'>(hasToken ? 'loading' : 'pending');
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    const verify = async () => {
      const token = searchParams?.get('token');
      if (token) {
        // Real verification logic would go here via Supabase or API
        setStatus('loading');
        setTimeout(() => setStatus('success'), 2000);
      }
    };
    verify();
  }, [searchParams]);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleResend = async () => {
    if (cooldown > 0) return;
    setCooldown(60);
    const email = searchParams?.get('email');
    if (email) {
      await supabase.auth.resend({
        type: 'signup',
        email: email,
      });
    }
  };

  return (
    <AuthCard
      title={status === 'success' ? "تم التحقق!" : status === 'loading' ? "جاري التحقق..." : "تأكيد الحساب"}
      description={status === 'success' ? "أهلاً بك في KWQ8" : "تحقق من بريدك الإلكتروني للمتابعة"}
      onLogoClick={() => router.push('/')}
    >
      <div className="text-center py-6">
        {status === 'loading' && (
          <div className="space-y-4">
            <RefreshCw className="h-16 w-16 text-brand-violet animate-spin mx-auto" />
            <p className="font-bold text-slate-500">جاري تفعيل حسابك...</p>
          </div>
        )}
        {status === 'pending' && (
          <div className="space-y-6">
            <Mail className="h-16 w-16 text-brand-violet mx-auto" />
            <p className="text-slate-600 font-bold leading-relaxed">
              لقد أرسلنا رابط التفعيل إلى بريدك الإلكتروني. يرجى الضغط عليه للمتابعة.
            </p>
            <Button 
              variant="outline" 
              fullWidth 
              onClick={handleResend}
              disabled={cooldown > 0}
            >
              {cooldown > 0 ? `أعد المحاولة بعد ${cooldown} ثانية` : "إعادة إرسال الرابط"}
            </Button>
          </div>
        )}
        {status === 'success' && (
          <div className="space-y-6">
            <CheckCircle className="h-16 w-16 text-brand-lime mx-auto" />
            <p className="text-slate-600 font-bold">تم تفعيل حسابك بنجاح. يمكنك الآن البدء ببناء موقعك.</p>
            <Button variant="gradient" fullWidth onClick={() => router.push('/dashboard')}>الذهاب للوحة التحكم</Button>
          </div>
        )}
      </div>
    </AuthCard>
  );
}

const EmailVerification: React.FC<EmailVerificationProps> = (props) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-secondary p-4 md:p-8" dir="rtl">
      <Suspense fallback={<div className="font-black">جاري التحميل...</div>}>
        <VerificationContent {...props} />
      </Suspense>
    </div>
  );
};

export default EmailVerification;