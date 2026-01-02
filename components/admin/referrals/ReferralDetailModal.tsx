import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, User, DollarSign, Users, Clock, CheckCircle, Wallet, Settings, Ban, Save, Download } from 'lucide-react';

interface ReferralDetailModalProps {
  referrer: any;
  onClose: () => void;
}

const ReferralDetailModal: React.FC<ReferralDetailModalProps> = ({ referrer, onClose }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'payouts' | 'settings'>('users');

  if (!referrer) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" dir="rtl">
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        />
        <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-[#111] border border-[#333] rounded-xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#333] bg-[#0A0A0A]">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#7C3AED] flex items-center justify-center text-white text-xl font-bold border-2 border-white/10">
                        {referrer.name.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                            {referrer.name}
                            <span className="bg-[#333] text-[#A0A0A0] text-xs px-2 py-0.5 rounded font-mono border border-[#555]">
                                {referrer.code}
                            </span>
                        </h2>
                        <div className="flex items-center gap-3 text-sm text-[#888]">
                            <span>{referrer.email}</span>
                            <span className="w-1 h-1 bg-[#555] rounded-full"></span>
                            <span className={referrer.status === 'active' ? 'text-green-500' : 'text-yellow-500'}>
                                {referrer.status === 'active' ? '🟢 نشط' : '🟡 معلق'}
                            </span>
                        </div>
                    </div>
                </div>
                <button onClick={onClose} className="text-[#666] hover:text-white transition-colors">
                    <X size={24} />
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4 p-6 border-b border-[#333] bg-[#161616]">
                <div className="bg-[#0A0A0A] p-4 rounded-lg border border-[#333]">
                    <div className="text-[#888] text-xs font-bold mb-1">إجمالي الإحالات</div>
                    <div className="text-2xl font-black text-white flex items-center gap-2">
                        <Users size={20} className="text-[#3B82F6]" /> {referrer.referrals}
                    </div>
                </div>
                <div className="bg-[#0A0A0A] p-4 rounded-lg border border-[#333]">
                    <div className="text-[#888] text-xs font-bold mb-1">الإحالات النشطة</div>
                    <div className="text-2xl font-black text-white flex items-center gap-2">
                        <CheckCircle size={20} className="text-[#22C55E]" /> {referrer.activeReferrals}
                    </div>
                </div>
                <div className="bg-[#0A0A0A] p-4 rounded-lg border border-[#333]">
                    <div className="text-[#888] text-xs font-bold mb-1">الأرباح الكلية</div>
                    <div className="text-2xl font-black text-white flex items-center gap-2">
                        <DollarSign size={20} className="text-[#FACC15]" /> {referrer.earnings}
                    </div>
                </div>
                <div className="bg-[#0A0A0A] p-4 rounded-lg border border-[#333]">
                    <div className="text-[#888] text-xs font-bold mb-1">رصيد معلق</div>
                    <div className="text-2xl font-black text-white flex items-center gap-2">
                        <Wallet size={20} className="text-[#F97316]" /> 45.000 د.ك
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#333] bg-[#0A0A0A]">
                <button 
                    onClick={() => setActiveTab('users')}
                    className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'users' ? 'text-[#7C3AED] border-[#7C3AED]' : 'text-[#888] border-transparent hover:text-white'}`}
                >
                    <Users size={16} /> المستخدمين المحالين
                </button>
                <button 
                    onClick={() => setActiveTab('payouts')}
                    className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'payouts' ? 'text-[#7C3AED] border-[#7C3AED]' : 'text-[#888] border-transparent hover:text-white'}`}
                >
                    <Wallet size={16} /> سجل الدفعات
                </button>
                <button 
                    onClick={() => setActiveTab('settings')}
                    className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'settings' ? 'text-[#7C3AED] border-[#7C3AED]' : 'text-[#888] border-transparent hover:text-white'}`}
                >
                    <Settings size={16} /> الإعدادات
                </button>
            </div>

            {/* Content Area */}
            <div className="p-6 overflow-y-auto flex-1 bg-[#111]">
                
                {activeTab === 'users' && (
                    <table className="w-full text-right border-collapse text-sm">
                        <thead>
                            <tr className="text-[#666] border-b border-[#333]">
                                <th className="p-3 font-bold">المستخدم</th>
                                <th className="p-3 font-bold">تاريخ التسجيل</th>
                                <th className="p-3 font-bold">الباقة</th>
                                <th className="p-3 font-bold">حالة الاشتراك</th>
                                <th className="p-3 font-bold">العمولة</th>
                            </tr>
                        </thead>
                        <tbody className="text-[#CCC]">
                            {[1,2,3,4,5].map(i => (
                                <tr key={i} className="border-b border-[#222] hover:bg-[#1A1A1A]">
                                    <td className="p-3 font-bold text-white">user_{i}@example.com</td>
                                    <td className="p-3 font-mono text-[#888]">2025-01-0{i}</td>
                                    <td className="p-3"><span className="bg-[#333] px-2 py-0.5 rounded text-xs">Pro</span></td>
                                    <td className="p-3"><span className="text-green-500 text-xs">● نشط</span></td>
                                    <td className="p-3 font-bold text-[#FACC15]">3.800 د.ك</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {activeTab === 'payouts' && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-white font-bold">طلبات السحب السابقة</h3>
                            <button className="text-[#7C3AED] text-sm font-bold flex items-center gap-1 hover:underline">
                                <Download size={14} /> تصدير CSV
                            </button>
                        </div>
                        <table className="w-full text-right border-collapse text-sm">
                            <thead>
                                <tr className="text-[#666] border-b border-[#333]">
                                    <th className="p-3 font-bold">رقم العملية</th>
                                    <th className="p-3 font-bold">التاريخ</th>
                                    <th className="p-3 font-bold">المبلغ</th>
                                    <th className="p-3 font-bold">طريقة التحويل</th>
                                    <th className="p-3 font-bold">الحالة</th>
                                </tr>
                            </thead>
                            <tbody className="text-[#CCC]">
                                <tr className="border-b border-[#222]">
                                    <td className="p-3 font-mono">TX_98765</td>
                                    <td className="p-3 font-mono">2024-12-30</td>
                                    <td className="p-3 font-bold text-white">150.000 د.ك</td>
                                    <td className="p-3">Bank Transfer</td>
                                    <td className="p-3"><span className="bg-green-900/30 text-green-500 px-2 py-1 rounded text-xs border border-green-900">تم التحويل</span></td>
                                </tr>
                                <tr className="border-b border-[#222]">
                                    <td className="p-3 font-mono">TX_98712</td>
                                    <td className="p-3 font-mono">2024-11-28</td>
                                    <td className="p-3 font-bold text-white">84.000 د.ك</td>
                                    <td className="p-3">PayPal</td>
                                    <td className="p-3"><span className="bg-green-900/30 text-green-500 px-2 py-1 rounded text-xs border border-green-900">تم التحويل</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="space-y-6">
                        <div className="bg-[#1A1A1A] p-4 rounded-lg border border-[#333]">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2"><DollarSign size={18} /> نسبة العمولة</h3>
                            <div className="flex items-center gap-4">
                                <input type="number" className="bg-[#0A0A0A] border border-[#333] text-white p-2 rounded w-32 font-bold" defaultValue="10" />
                                <span className="text-[#888] font-bold">%</span>
                                <p className="text-[#666] text-sm">النسبة الافتراضية هي 10%. تغييرها سيؤثر على الاشتراكات الجديدة فقط.</p>
                            </div>
                        </div>

                        <div className="bg-[#1A1A1A] p-4 rounded-lg border border-[#333]">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Settings size={18} /> خصم خاص للمستخدمين</h3>
                            <div className="flex items-center gap-4">
                                <input type="checkbox" className="w-5 h-5 accent-[#7C3AED]" defaultChecked />
                                <span className="text-[#CCC]">تفعيل خصم 20% لأول شهر للمستخدمين المسجلين عبر هذا الكود</span>
                            </div>
                        </div>

                        <div className="bg-[#1A1A1A] p-4 rounded-lg border border-[#EF4444]/30">
                            <h3 className="text-[#EF4444] font-bold mb-4 flex items-center gap-2"><Ban size={18} /> منطقة الخطر</h3>
                            <div className="flex justify-between items-center">
                                <p className="text-[#CCC] text-sm">إيقاف هذا المُحيل مؤقتاً. لن يتم احتساب إحالات جديدة.</p>
                                <button className="bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444] px-4 py-2 rounded hover:bg-[#EF4444]/20 transition-colors font-bold text-sm">
                                    إيقاف الحساب
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[#333] bg-[#0A0A0A] flex justify-between">
                {activeTab === 'settings' ? (
                    <button className="flex items-center gap-2 px-6 py-2 bg-[#7C3AED] text-white font-bold rounded hover:bg-[#6D28D9] transition-colors mr-auto">
                        <Save size={18} /> حفظ التغييرات
                    </button>
                ) : (
                    <div className="flex items-center gap-4 mr-auto">
                        <div className="text-right">
                            <div className="text-xs text-[#888]">رصيد مستحق للدفع</div>
                            <div className="text-lg font-bold text-white">45.000 د.ك</div>
                        </div>
                        <button className="px-6 py-2 bg-[#22C55E] text-black font-bold rounded hover:bg-[#16A34A] transition-colors shadow-[0_0_15px_rgba(34,197,94,0.4)]">
                            صرف العمولة
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    </div>
  );
};

export default ReferralDetailModal;