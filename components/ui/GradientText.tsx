import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
}

const GradientText: React.FC<GradientTextProps> = ({ children, className = '', as: Component = 'span' }) => {
  return (
    <Component className={`relative inline-block ${className}`}>
      <span className="relative z-10 text-black">{children}</span>
      <span className="absolute bottom-1 left-0 w-full h-3 bg-violet-400/50 -rotate-1 z-0 rounded-sm"></span>
    </Component>
  );
};

export default GradientText;