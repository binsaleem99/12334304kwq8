import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تسجيل الدخول",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-secondary p-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 -z-10">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Gradient Blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-violet/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-pink/10 rounded-full blur-3xl" />
      </div>

      {/* Decorative Elements (Neo-Brutalist Shapes) */}
      <div className="absolute top-10 right-10 w-16 h-16 border-3 border-black bg-brand-lime rotate-12 hidden lg:block" />
      <div className="absolute bottom-10 left-10 w-12 h-12 border-3 border-black bg-brand-cyan -rotate-12 hidden lg:block" />
      <div className="absolute top-1/3 left-20 w-8 h-8 border-3 border-black bg-brand-gold rotate-45 hidden lg:block" />

      {/* Content */}
      <div className="w-full max-w-md relative z-10">
        {children}
      </div>
    </div>
  );
}
