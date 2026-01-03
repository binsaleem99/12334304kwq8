"use client";

import React from 'react';
import EmailVerification from '../../../components/auth/EmailVerification.tsx';
import { useRouter } from 'next/navigation';

export default function VerifyEmailPage() {
  const router = useRouter();

  const handleNavigate = (view: string) => {
    if (view === 'landing') {
      router.push('/');
    } else if (view === 'login') {
      router.push('/login');
    }
  };

  return <EmailVerification onNavigate={handleNavigate} />;
}