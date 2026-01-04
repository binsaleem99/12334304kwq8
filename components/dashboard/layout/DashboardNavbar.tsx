import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ChevronDown, User, Settings, CreditCard, HelpCircle, LogOut, Bell, Menu } from 'lucide-react';
import { ViewState } from '../../../types';
import NotificationsDropdown from '../notifications/NotificationsDropdown';
import { createClient } from '../../../lib/supabase/client.ts';
import { useRouter } from 'next/navigation';

interface DashboardNavbarProps {
  onNavigate: (view: ViewState) => void;
  onMobileMenuToggle?: () => void;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ 
  onNavigate, 
  onMobileMenuToggle
}) => {
  const router = useRouter();
  const supabase = createClient();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [userData, setUserData] = useState<{ name: string; email: string; tier: string; credits: number } | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, tier, credits')
          .eq('id', user.id)
          .single();

        setUserData({
          name: profile?.full_name || user.email?.split('@')[0] || 'User',
          email: user.email || '',
          tier: profile?.tier || 'free',
          credits: profile?.credits || 0
        });
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const isEnterprise = userData?.tier === 'enterprise';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-[3px] border-black h-16">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-6">
            <button 
                className="md:hidden p-2 border-2 border-black rounded-lg bg-slate-50 shadow-neo-sm active:shadow-none"
                onClick={onMobileMenuToggle}
            >
                <Menu size={20} strokeWidth={3} />
            </button>

            <div 
                onClick={() => onNavigate('dashboard')}
                className="cursor-pointer flex items-center gap-2 group select-none"
            >
                <div className="bg-[#7C3AED] text-white w-9 h-9 md:w-10 md:h-10 flex items-center justify-center font-black text-lg md:text-xl border-[3px] border-black shadow-neo-sm group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none transition-all">
                    Q8
                </div>
            </div>

            <button 
                onClick={() => onNavigate('dashboard-new-project')}
                className="hidden sm:flex items-center gap-2 bg-[#7C3AED] text-white px-3 py-1.5 rounded-lg border-[3px] border-black font-bold text-sm shadow-neo-sm hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-none transition-all"
            >
                <Plus size={16} strokeWidth={3} />
                <span className="hidden lg:inline">مشروع جديد</span>
            </button>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2 bg-[#F5F5F5] px-2 md:px-3 py-1.5 rounded-lg border-[3px] border-black shadow-neo-sm">
                <span className="text-[#7C3AED] font-black text-sm md:text-base">
                  {isEnterprise ? '∞' : (userData?.credits ?? 0)}
                </span>
                <span className="text-[10px] md:text-xs font-bold text-black">رصيد</span>
            </div>

            <div className="relative">
                <button 
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className={`p-1.5 md:p-2 rounded-lg border-[3px] transition-all relative ${isNotificationsOpen ? 'bg-slate-100 border-black' : 'border-transparent hover:border-black'}`}
                >
                    <Bell size={18} className="md:w-5 md:h-5 text-black" />
                    <span className="absolute top-1 right-1 md:top-1.5 md:right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <AnimatePresence>
                    {isNotificationsOpen && <NotificationsDropdown onClose={() => setIsNotificationsOpen(false)} />}
                </AnimatePresence>
            </div>

            <div className="relative">
                <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 hover:bg-slate-50 p-0.5 md:p-1 md:pr-3 rounded-lg border-[3px] border-transparent hover:border-black transition-all"
                >
                    <span className="font-bold text-sm hidden md:block text-black">
                      {isEnterprise ? 'الرئيس التنفيذي' : (userData?.name || 'تحميل...')}
                    </span>
                    <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center border-2 border-black shrink-0 ${isEnterprise ? 'bg-orange-500' : 'bg-black'}`}>
                        <span className="font-black text-xs">
                          {isEnterprise ? 'CEO' : (userData?.name?.substring(0, 1).toUpperCase() || '?')}
                        </span>
                    </div>
                    <ChevronDown size={14} className="text-black hidden sm:block" />
                </button>

                <AnimatePresence>
                    {isUserMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute left-0 top-full mt-2 w-64 bg-white border-[3px] border-black rounded-xl shadow-neo-lg overflow-hidden z-50"
                        >
                            <div className="p-4 border-b-[3px] border-black bg-yellow-50">
                                <div className="font-black text-black truncate">
                                  {isEnterprise ? 'الرئيس التنفيذي' : (userData?.name)}
                                </div>
                                <div className="text-xs font-bold text-slate-600 truncate">{userData?.email}</div>
                            </div>
                            
                            <div className="p-2 space-y-1">
                                <button onClick={() => { onNavigate('dashboard-account'); setIsUserMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg font-bold text-black hover:bg-violet-100 transition-all text-right">
                                    <User size={18} /> حسابي
                                </button>
                                <button onClick={() => { onNavigate('dashboard-billing'); setIsUserMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg font-bold text-black hover:bg-violet-100 transition-all text-right">
                                    <CreditCard size={18} /> متجر الرصيد
                                </button>
                            </div>

                            <div className="border-t-[3px] border-black p-2">
                                <button 
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg font-bold text-red-600 hover:bg-red-50 transition-all text-right"
                                >
                                    <LogOut size={18} /> تسجيل الخروج
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;