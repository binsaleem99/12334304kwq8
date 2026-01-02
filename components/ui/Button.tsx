import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  // Base: Bold font, border-[3px] black, rounded-xl (loveable feel)
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-bold border-[3px] border-black transition-all duration-150 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";
  
  const variants = {
    // Primary: Violet + Hard Shadow
    primary: "bg-violet-500 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-violet-600",
    
    // Secondary: White + Hard Shadow
    secondary: "bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-100",
    
    // Accent: Pink + Hard Shadow (Loveable pop)
    accent: "bg-pink-400 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-pink-500",
    
    // Ghost: No shadow initially, simple hover
    ghost: "bg-transparent border-transparent text-slate-700 hover:bg-slate-100 hover:border-black shadow-none",
    
    // Outline: Just border, no shadow initially
    outline: "bg-transparent text-black border-black hover:bg-slate-50",
    
    // Deprecated gradient mapping
    gradient: "bg-orange-400 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-orange-500", 
  };

  const sizes = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-6 py-3",
    lg: "text-lg px-8 py-4",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <motion.button
      whileHover={{ scale: 1.0 }} 
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;