"use client";

import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
/* Fixed: Standardized import casing to lowercase to resolve conflict with Button.tsx facade */
import Button from '../ui/button.tsx';
import { NAV_ITEMS } from '../../constants/navigation.ts';
import { Menu, X, User } from 'lucide-react';
import { ViewState } from '../../types.ts';

interface NavbarProps {
  onNavigate: (view: ViewState) => void;
}

/**
 * Navbar component for the landing page.
 */
export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('landing');
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b-[3px] border-black ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <a 
          href="#" 
          onClick={handleLogoClick}
          className="flex items-center gap-2 group select-none"
        >
          <div className="bg-black text-white px-3 py-1 transform -rotate-2 font-black text-2xl border-[3px] border-black shadow-neo group-hover:rotate-0 transition-all">
            KWQ8
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-black font-bold text-lg border-b-[3px] border-transparent hover:border-violet-500 transition-all"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button 
            variant="secondary" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => onNavigate('login')}
          >
            <User size={18} />
            دخول الأعضاء
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => onNavigate('signup')}
          >
            ابدأ الآن
          </Button>
        </div>

        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="p-2 border-[3px] border-black rounded-lg bg-white shadow-neo active:translate-x-[2px]"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t-[3px] border-black overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-black font-black text-xl py-2"
                >
                  {item.label}
                </a>
              ))}
              <div className="h-px bg-black/10 my-2"></div>
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={() => { onNavigate('login'); setIsMobileMenuOpen(false); }}
              >
                دخول الأعضاء
              </Button>
              <Button 
                variant="default" 
                size="lg" 
                onClick={() => { onNavigate('signup'); setIsMobileMenuOpen(false); }}
              >
                ابدأ الآن
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
