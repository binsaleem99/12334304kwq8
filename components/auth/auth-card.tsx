"use client";

import * as React from "react";
import Link from "next/link";
// Fixed: Standardized casing for GradientText.tsx import
import GradientText from "../ui/GradientText.tsx";

interface AuthCardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  onLogoClick?: () => void;
}

/**
 * AuthCard component for wrapping authentication forms.
 */
export const AuthCard: React.FC<AuthCardProps> = ({ title, description, children, footer, onLogoClick }) => {
  return (
    <div className="w-full">
      {/* Logo */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-block group" onClick={(e) => { if (onLogoClick) { e.preventDefault(); onLogoClick(); } }}>
          <span className="text-3xl font-black transition-transform group-hover:-rotate-2 inline-block">
            <GradientText>KWQ8</GradientText>
          </span>
        </Link>
      </div>

      {/* Card */}
      <div className="bg-white border-3 border-black shadow-brutal-lg rounded-[2rem] overflow-hidden">
        {/* Header */}
        <div className="p-8 border-b-3 border-black text-center bg-surface-secondary/50">
          <h1 className="text-3xl font-black text-content-primary">{title}</h1>
          {description && (
            <p className="text-content-secondary mt-2 font-bold">{description}</p>
          )}
        </div>

        {/* Content */}
        <div className="p-8">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-6 border-t-3 border-black bg-surface-secondary text-center font-bold">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}