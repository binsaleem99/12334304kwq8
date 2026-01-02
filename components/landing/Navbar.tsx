import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Button from '../ui/Button';
import { NAV_ITEMS } from '../../constants';
import { ViewState } from '../../types';
import { Menu, X, User } from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const handleNavLink = (e: React.MouseEvent, href: string) => {
    if (href === '#blog') {
        e.preventDefault();
        onNavigate('blog');
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b-[3px] border-black ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="cursor-pointer flex items-center gap-2 group select-none"
          onClick={() => onNavigate('landing')}
        >
          <div className="bg-black text-white px-3 py-1 transform -rotate-2 font-black text-2xl border-[3px] border-black shadow-[4px_4px_0px_0px_#000] group-hover:rotate-0 group-hover:scale-105 transition-all duration-200">
            KWQ8
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavLink(e, item.href)}
              className="text-black font-bold text-lg border-b-[3px] border-transparent hover:border-violet-500 transition-all hover:-translate-y-1"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="secondary" size="sm" onClick={() => onNavigate('login')} className="flex items-center gap-2">
            <User size={18} />
            دخول الأعضاء
          </Button>
          <Button variant="primary" size="sm" onClick={() => onNavigate('signup')}>
            ابدأ الآن
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="p-2 border-[3px] border-black rounded-lg bg-white shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all hover:bg-slate-50"
          >
            {isMobileMenuOpen ? <X className="text-black" strokeWidth={3} /> : <Menu className="text-black" strokeWidth={3} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white border-b-[3px] border-black absolute w-full left-0 top-full shadow-[0px_4px_0px_0px_rgba(0,0,0,0.1)]"
        >
          <div className="flex flex-col p-6 gap-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-black font-black text-xl py-3 border-b-[3px] border-slate-100 hover:border-black hover:pl-2 transition-all"
                onClick={(e) => {
                    handleNavLink(e, item.href);
                    setIsMobileMenuOpen(false);
                }}
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col gap-4 mt-4 pt-4 border-t-[3px] border-black border-dashed">
                <Button variant="secondary" fullWidth onClick={() => { onNavigate('login'); setIsMobileMenuOpen(false); }}>
                دخول الأعضاء
                </Button>
                <Button variant="primary" fullWidth onClick={() => { onNavigate('signup'); setIsMobileMenuOpen(false); }}>
                ابدأ الآن
                </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;