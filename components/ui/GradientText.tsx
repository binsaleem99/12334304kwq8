import React from "react";
import { cn } from "../../lib/utils/cn.ts";

interface GradientTextProps {
  children?: React.ReactNode;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

/**
 * Component for rendering text with a brand gradient effect.
 */
export function GradientText({ 
  children, 
  className, 
  as: Component = "span" 
}: GradientTextProps) {
  return (
    <Component
      className={cn(
        "bg-gradient-to-r from-brand-violet via-brand-pink to-brand-orange",
        "bg-clip-text text-transparent inline-block font-black",
        className
      )}
    >
      {children}
    </Component>
  );
}

export default GradientText;
