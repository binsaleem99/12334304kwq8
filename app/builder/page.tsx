"use client";

import React from 'react';
import AIBuilder from '../../components/builder/AIBuilder.tsx';
import { useRouter } from 'next/navigation';

export default function BuilderPage() {
  const router = useRouter();

  const handleNavigate = (view: string) => {
    if (view === 'dashboard') {
      router.push('/dashboard');
    }
  };

  return <AIBuilder onNavigate={handleNavigate} />;
}