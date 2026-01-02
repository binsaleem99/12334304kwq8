import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, DollarSign, Mail, Shield, Save, Upload, Clock, Smartphone, Database, Globe, Key, AlertTriangle, Check, Server, FileCode } from 'lucide-react';

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'عام', icon: Settings },
    { id: 'pricing', label: 'باقات الرصيد', icon: DollarSign },
    { id: 'email', label: 'البريد', icon: Mail },
    { id: 'integrations', label: 'التكاملات', icon: Server },
    { id: 'security', label: 'الأمان', icon: Shield },
  ];

  return (
    <div className="space-y-8" dir="rtl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">إعدادات النظام</h1>
        <p className="text-[#A0A0A0] text-sm">تكوين المنصة والأسعار والأمان.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
        {/* Tabs Sidebar */}
        <div className="w-full lg:w-64 shrink-0">
            <div className="bg-[#1A1A1A] border border-[#333] rounded-xl overflow-hidden flex lg:flex-col overflow-x-auto scrollbar-hide lg:overflow-visible">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 lg:w-full flex items-center gap-3 px-4 py-3 font-bold text-sm transition-colors whitespace-nowrap ${
                            activeTab === tab.id 
                            ? 'bg-[#7C3AED]/10 text-[#7C3AED] border-b-2 lg:border-b-0 lg:border-r-[4px] border-[#7C3AED]'
                            : 'text-[#A0A0A0] hover:bg-[#222] hover:text-white border-b-2 lg:border-b-0 lg:border-r-[4px] border-transparent'
                        }`}
                    >
                        <tab.icon size={18} />
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
            <AnimatePresence mode='wait'>
                
                {/* GENERAL TAB */}
                {activeTab === 'general' && (
                    <motion.div 
                        key="general"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6 space-y-6"
                    >
                        <div className="flex items-center gap-2 mb-4 border-b border-[#333] pb-4">
                            <Settings className="text-[#7C3AED]" size={20} />
                            <h2 className="text-lg font-bold text-white">إعدادات عامة</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-[#A0A0A0] mb-2">اسم المنصة</label>
                                <input type="text" defaultValue="KWQ8" className="w-full bg-[#0A0A0A] border border-[#333] rounded p-3 text-white focus:outline-none focus:border-[#7C3AED]" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-[#A0A0A0] mb-2">البريد الرسمي</label>
                                <input type="email" defaultValue="support@kwq8.com" className="w-full bg-[#0A0A0A] border border-[#333] rounded p-3 text-white focus:outline-none focus:border-[#7C3AED]" dir="ltr" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-[#A0A0A0] mb-2">رقم الواتساب للدعم</label>
                                <div className="flex gap-2" dir="ltr">
                                    <span className="bg-[#333] border border-[#333] rounded p-3 text-[#A0A0A0] font-bold text-sm">+965</span>
                                    <input type="text" defaultValue="98765432" className="flex-1 bg-[#0A0A0A] border border-[#333] rounded p-3 text-white focus:outline-none focus:border-[#7C3AED]" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-[#A0A0A0] mb-2">شعار الموقع</label>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#0A0A0A] border border-[#333] rounded flex items-center justify-center font-black text-white">Q8</div>
                                    <button className="text-xs bg-[#333] hover:bg-[#444] text-white px-3 py-2 rounded flex items-center gap-2 transition-colors">
                                        <Upload size={14} /> تحميل صورة
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-[#333] pt-6">
                            <label className="block text-xs font-bold text-[#A0A0A0] mb-4">ساعات العمل</label>
                            <div className="flex gap-4 items-center">
                                <div className="flex items-center gap-2">
                                    <span className="text-[#666] text-sm">من</span>
                                    <input type="time" defaultValue="09:00" className="bg-[#0A0A0A] border border-[#333] rounded p-2 text-white focus:outline-none focus:border-[#7C3AED]" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[#666] text-sm">إلى</span>
                                    <input type="time" defaultValue="18:00" className="bg-[#0A0A0A] border border-[#333] rounded p-2 text-white focus:outline-none focus:border-[#7C3AED]" />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button className="flex items-center gap-2 px-6 py-2 bg-[#7C3AED] text-white font-bold rounded hover:bg-[#6D28D9] transition-colors">
                                <Save size={18} /> حفظ التغييرات
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* PRICING TAB (CREDIT PACKAGES) */}
                {activeTab === 'pricing' && (
                    <motion.div 
                        key="pricing"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6 space-y-6"
                    >
                        <div className="flex items-center gap-2 mb-4 border-b border-[#333] pb-4">
                            <DollarSign className="text-[#7C3AED]" size={20} />
                            <h2 className="text-lg font-bold text-white">إعدادات باقات الرصيد</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { name: 'Starter', price: 5, credits: 100, bonus: 0 },
                                { name: 'Popular', price: 20, credits: 500, bonus: 20 },
                                { name: 'Power', price: 35, credits: 1000, bonus: 30 },
                                { name: 'Enterprise', price: 150, credits: 5000, bonus: 40 }
                            ].map((pkg) => (
                                <div key={pkg.name} className="bg-[#0A0A0A] border border-[#333] rounded-lg p-4 relative group hover:border-[#555] transition-colors">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-bold text-white text-lg uppercase">{pkg.name} PACK</h3>
                                        <div className="w-3 h-3 rounded-full bg-[#22C55E]"></div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div>
                                            <label className="block text-[10px] font-bold text-[#666] mb-1">Credits</label>
                                            <input type="number" defaultValue={pkg.credits} className="w-full bg-[#1A1A1A] border border-[#333] rounded p-2 text-white text-sm focus:border-[#7C3AED] focus:outline-none font-mono" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-[#666] mb-1">Price (KWD)</label>
                                            <input type="number" defaultValue={pkg.price} className="w-full bg-[#1A1A1A] border border-[#333] rounded p-2 text-white text-sm focus:border-[#7C3AED] focus:outline-none font-mono" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-[#666] mb-1">Bonus %</label>
                                            <input type="number" defaultValue={pkg.bonus} className="w-full bg-[#1A1A1A] border border-[#333] rounded p-2 text-white text-sm focus:border-[#7C3AED] focus:outline-none font-mono" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-[#333] pt-6 bg-[#222]/30 p-4 rounded-lg">
                            <h3 className="font-bold text-white mb-4 text-sm flex items-center gap-2">
                                <Settings size={16} className="text-[#FACC15]" /> إعدادات النظام العامة
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-[#A0A0A0] mb-2">First Purchase Bonus (%)</label>
                                    <input type="number" defaultValue="20" className="w-full bg-[#0A0A0A] border border-[#333] rounded p-2 text-white font-mono focus:border-[#7C3AED] focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#A0A0A0] mb-2">Credit Expiry (Days)</label>
                                    <input type="number" defaultValue="90" className="w-full bg-[#0A0A0A] border border-[#333] rounded p-2 text-white font-mono focus:border-[#7C3AED] focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#A0A0A0] mb-2">Base Credit Value (USD)</label>
                                    <input type="number" defaultValue="0.05" className="w-full bg-[#0A0A0A] border border-[#333] rounded p-2 text-white font-mono focus:border-[#7C3AED] focus:outline-none" />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button className="flex items-center gap-2 px-6 py-2 bg-[#7C3AED] text-white font-bold rounded hover:bg-[#6D28D9] transition-colors">
                                <Save size={18} /> حفظ التغييرات
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* OTHER TABS (Same as before) */}
                {/* EMAIL TAB */}
                {activeTab === 'email' && (
                    <motion.div 
                        key="email"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6 space-y-6"
                    >
                        <div className="flex items-center gap-2 mb-4 border-b border-[#333] pb-4">
                            <Mail className="text-[#7C3AED]" size={20} />
                            <h2 className="text-lg font-bold text-white">إعدادات البريد (SMTP)</h2>
                        </div>

                        <div className="bg-[#0A0A0A] border border-[#333] rounded-lg p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-[#A0A0A0] mb-2">SMTP Host</label>
                                    <input type="text" defaultValue="smtp.sendgrid.net" className="w-full bg-[#1A1A1A] border border-[#333] rounded p-3 text-white focus:outline-none focus:border-[#7C3AED] font-mono text-sm" dir="ltr" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#A0A0A0] mb-2">SMTP Port</label>
                                    <input type="text" defaultValue="587" className="w-full bg-[#1A1A1A] border border-[#333] rounded p-3 text-white focus:outline-none focus:border-[#7C3AED] font-mono text-sm" dir="ltr" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#A0A0A0] mb-2">Username</label>
                                    <input type="text" defaultValue="apikey" className="w-full bg-[#1A1A1A] border border-[#333] rounded p-3 text-white focus:outline-none focus:border-[#7C3AED] font-mono text-sm" dir="ltr" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#A0A0A0] mb-2">Password</label>
                                    <input type="password" defaultValue="••••••••••••••" className="w-full bg-[#1A1A1A] border border-[#333] rounded p-3 text-white focus:outline-none focus:border-[#7C3AED] font-mono text-sm" dir="ltr" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#A0A0A0] mb-2">قوالب البريد الإلكتروني</label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-[#0A0A0A] border border-[#333] rounded p-4 cursor-pointer hover:border-[#7C3AED] transition-colors">
                                    <div className="font-bold text-white mb-1">الترحيب</div>
                                    <div className="text-xs text-[#666]">welcome_email.html</div>
                                </div>
                                <div className="bg-[#0A0A0A] border border-[#333] rounded p-4 cursor-pointer hover:border-[#7C3AED] transition-colors">
                                    <div className="font-bold text-white mb-1">إعادة تعيين كلمة المرور</div>
                                    <div className="text-xs text-[#666]">reset_password.html</div>
                                </div>
                                <div className="bg-[#0A0A0A] border border-[#333] rounded p-4 cursor-pointer hover:border-[#7C3AED] transition-colors">
                                    <div className="font-bold text-white mb-1">تأكيد الاشتراك</div>
                                    <div className="text-xs text-[#666]">subscription_confirmed.html</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button className="flex items-center gap-2 px-6 py-2 bg-[#7C3AED] text-white font-bold rounded hover:bg-[#6D28D9] transition-colors">
                                <Save size={18} /> حفظ التغييرات
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* SECURITY TAB */}
                {activeTab === 'security' && (
                    <motion.div 
                        key="security"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6 space-y-6"
                    >
                        <div className="flex items-center gap-2 mb-4 border-b border-[#333] pb-4">
                            <Shield className="text-[#7C3AED]" size={20} />
                            <h2 className="text-lg font-bold text-white">إعدادات الأمان</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between bg-[#0A0A0A] p-4 rounded border border-[#333]">
                                <div>
                                    <div className="font-bold text-white mb-1">الحد الأقصى لمحاولات الدخول</div>
                                    <div className="text-xs text-[#666]">عدد المحاولات الفاشلة قبل الحظر المؤقت</div>
                                </div>
                                <input type="number" defaultValue="5" className="w-20 bg-[#1A1A1A] border border-[#333] rounded p-2 text-white font-mono text-center focus:border-[#7C3AED] focus:outline-none" />
                            </div>

                            <div className="flex items-center justify-between bg-[#0A0A0A] p-4 rounded border border-[#333]">
                                <div>
                                    <div className="font-bold text-white mb-1">مدة الحظر المؤقت</div>
                                    <div className="text-xs text-[#666]">بالدقائق</div>
                                </div>
                                <input type="number" defaultValue="30" className="w-20 bg-[#1A1A1A] border border-[#333] rounded p-2 text-white font-mono text-center focus:border-[#7C3AED] focus:outline-none" />
                            </div>

                            <div className="flex items-center justify-between bg-[#0A0A0A] p-4 rounded border border-[#333]">
                                <div>
                                    <div className="font-bold text-white mb-1">تفعيل المصادقة الثنائية (2FA) للمشرفين</div>
                                    <div className="text-xs text-[#666]">إجباري لجميع حسابات الأدمن</div>
                                </div>
                                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                                    <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 right-6 checked:bg-[#7C3AED] transition-all" defaultChecked/>
                                    <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-[#333] cursor-pointer"></label>
                                </div>
                            </div>

                            <div className="flex items-center justify-between bg-[#0A0A0A] p-4 rounded border border-[#333]">
                                <div>
                                    <div className="font-bold text-white mb-1">الحد الأقصى للجلسات المتزامنة</div>
                                    <div className="text-xs text-[#666]">للحساب الواحد</div>
                                </div>
                                <input type="number" defaultValue="3" className="w-20 bg-[#1A1A1A] border border-[#333] rounded p-2 text-white font-mono text-center focus:border-[#7C3AED] focus:outline-none" />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button className="flex items-center gap-2 px-6 py-2 bg-[#7C3AED] text-white font-bold rounded hover:bg-[#6D28D9] transition-colors">
                                <Save size={18} /> حفظ التغييرات
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* INTEGRATIONS TAB */}
                {activeTab === 'integrations' && (
                    <motion.div 
                        key="integrations"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6 space-y-6"
                    >
                        <div className="flex items-center gap-2 mb-4 border-b border-[#333] pb-4">
                            <Server className="text-[#7C3AED]" size={20} />
                            <h2 className="text-lg font-bold text-white">التكاملات و API</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-[#0A0A0A] border border-[#333] rounded-lg p-6">
                                <h3 className="font-bold text-white mb-4">بوابات الدفع</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-[#A0A0A0] mb-2">Tap Payments Secret Key</label>
                                        <input type="password" defaultValue="sk_test_Xj9..." className="w-full bg-[#1A1A1A] border border-[#333] rounded p-3 text-white focus:outline-none focus:border-[#7C3AED] font-mono text-sm" dir="ltr" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#A0A0A0] mb-2">MyFatoorah API Key</label>
                                        <input type="password" defaultValue="rLtt6SQ..." className="w-full bg-[#1A1A1A] border border-[#333] rounded p-3 text-white focus:outline-none focus:border-[#7C3AED] font-mono text-sm" dir="ltr" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#0A0A0A] border border-[#333] rounded-lg p-6">
                                <h3 className="font-bold text-white mb-4">Google AI</h3>
                                <div>
                                    <label className="block text-xs font-bold text-[#A0A0A0] mb-2">Gemini API Key</label>
                                    <input type="password" defaultValue="AIzaSy..." className="w-full bg-[#1A1A1A] border border-[#333] rounded p-3 text-white focus:outline-none focus:border-[#7C3AED] font-mono text-sm" dir="ltr" />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button className="flex items-center gap-2 px-6 py-2 bg-[#7C3AED] text-white font-bold rounded hover:bg-[#6D28D9] transition-colors">
                                <Save size={18} /> حفظ التغييرات
                            </button>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;