import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, User, Mail, Phone, MapPin, Calendar, Clock, CreditCard, Shield, ExternalLink, FileText, Activity, Save, Key, LogIn, Ban, Trash2, Edit2, Check, Download } from 'lucide-react';

interface UserDetailModalProps {
  user: any;
  onClose: () => void;
}

type Tab = 'profile' | 'projects' | 'billing' | 'activity' | 'notes';

const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, onClose }) => {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [note, setNote] = useState('');

  // Mock Data
  const projects = [
    { id: '1', name: 'موقع المطعم البحري', status: 'published', url: 'blue-sea.kwq8.com' },
    { id: '2', name: 'صفحة البورتفوليو', status: 'draft', url: 'portfolio.kwq8.com' },
    { id: '3', name: 'متجر الملابس', status: 'published', url: 'fashion-store.com' },
  ];

  const invoices = [
    { id: 'INV-001', date: '2025-12-15', amount: '38.000 KD', status: 'paid', plan: 'Pro Monthly' },
    { id: 'INV-002', date: '2025-11-15', amount: '38.000 KD', status: 'paid', plan: 'Pro Monthly' },
  ];

  const activityLog = [
    { time: '2025-12-29 10:23', action: 'تسجيل دخول من Safari, Kuwait', icon: LogIn },
    { time: '2025-12-28 15:45', action: 'إنشاء مشروع: متجر الملابس', icon: FileText },
    { time: '2025-12-27 09:12', action: 'نشر موقع: موقع المطعم البحري', icon: ExternalLink },
    { time: '2025-12-15 00:00', action: 'اشتراك في باقة Pro', icon: CreditCard },
  ];

  const notes = [
    { id: 1, author: 'Admin Sarah', text: 'تم التواصل مع العميل بخصوص الدومين.', date: '2025-12-20' }
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 lg:p-8">
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        ></motion.div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-[#1A1A1A] border border-[#333333] rounded-xl w-full max-w-5xl h-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
        >
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-[#333333] bg-[#0A0A0A]">
                <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white ${user.avatar || 'bg-[#7C3AED]'}`}>
                        {user.name.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            {user.name}
                            <span className={`text-xs px-2 py-0.5 rounded border ${
                                user.status === 'active' ? 'bg-[#22C55E]/20 text-[#22C55E] border-[#22C55E]/50' : 
                                user.status === 'suspended' ? 'bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/50' :
                                'bg-[#666666]/20 text-[#A0A0A0] border-[#666666]/50'
                            }`}>
                                {user.status.toUpperCase()}
                            </span>
                        </h2>
                        <div className="flex items-center gap-4 text-[#A0A0A0] text-sm mt-1 font-mono">
                            <span className="flex items-center gap-1"><Mail size={14} /> {user.email}</span>
                            <span className="flex items-center gap-1"><Phone size={14} /> +965 1234 5678</span>
                        </div>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 text-[#A0A0A0] hover:text-white hover:bg-[#333333] rounded-lg transition-colors">
                    <X size={24} />
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#333333] bg-[#1A1A1A]">
                {[
                    { id: 'profile', label: 'الملف الشخصي', icon: User },
                    { id: 'projects', label: 'المشاريع', icon: FileText },
                    { id: 'billing', label: 'الفواتير', icon: CreditCard },
                    { id: 'activity', label: 'النشاط', icon: Activity },
                    { id: 'notes', label: 'الملاحظات', icon: Edit2 },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as Tab)}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-colors ${
                            activeTab === tab.id 
                            ? 'text-[#7C3AED] border-[#7C3AED] bg-[#7C3AED]/5' 
                            : 'text-[#A0A0A0] border-transparent hover:text-white hover:bg-[#222]'
                        }`}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-[#111]">
                
                {/* PROFILE TAB */}
                {activeTab === 'profile' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Info Card */}
                        <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-6">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <User size={20} className="text-[#7C3AED]" /> معلومات الحساب
                            </h3>
                            <div className="space-y-4">
                                <div className="group relative">
                                    <label className="text-xs text-[#666666] font-bold uppercase mb-1 block">الاسم</label>
                                    <div className="text-white font-bold flex justify-between items-center bg-[#0A0A0A] p-3 rounded border border-[#333] group-hover:border-[#555]">
                                        {user.name}
                                        <button className="text-[#666666] hover:text-[#7C3AED]"><Edit2 size={14} /></button>
                                    </div>
                                </div>
                                <div className="group relative">
                                    <label className="text-xs text-[#666666] font-bold uppercase mb-1 block">البريد الإلكتروني</label>
                                    <div className="text-white font-bold flex justify-between items-center bg-[#0A0A0A] p-3 rounded border border-[#333] group-hover:border-[#555]">
                                        {user.email}
                                        <button className="text-[#666666] hover:text-[#7C3AED]"><Edit2 size={14} /></button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-[#666666] font-bold uppercase mb-1 block">الدولة</label>
                                        <div className="text-white font-bold flex items-center gap-2 bg-[#0A0A0A] p-3 rounded border border-[#333]">
                                            <span>🇰🇼</span> الكويت
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-[#666666] font-bold uppercase mb-1 block">تاريخ التسجيل</label>
                                        <div className="text-white font-bold bg-[#0A0A0A] p-3 rounded border border-[#333]">
                                            {user.joined}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Subscription Card */}
                        <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-6">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <CreditCard size={20} className="text-[#FACC15]" /> الاشتراك الحالي
                            </h3>
                            
                            <div className="bg-[#0A0A0A] p-4 rounded border border-[#333] mb-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="text-2xl font-black text-[#7C3AED] mb-1">⭐ Pro</div>
                                        <div className="text-[#A0A0A0] text-sm">38 د.ك / شهرياً</div>
                                    </div>
                                    <span className="bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/50 px-2 py-1 rounded text-xs font-bold">
                                        نشط
                                    </span>
                                </div>
                                <div className="text-sm text-[#A0A0A0] flex justify-between items-center">
                                    <span>التجديد القادم:</span>
                                    <span className="text-white font-bold">15 يناير 2026</span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="flex justify-between text-xs font-bold text-[#A0A0A0] mb-2">
                                    <span>رصيد الاستخدام</span>
                                    <span>150/200</span>
                                </div>
                                <div className="w-full h-2 bg-[#333] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#7C3AED] w-[75%]"></div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button className="flex-1 py-2 bg-[#333] hover:bg-[#444] text-white text-sm font-bold rounded transition-colors border border-[#555]">
                                    تغيير الباقة
                                </button>
                                <button className="flex-1 py-2 bg-transparent hover:bg-red-900/20 text-[#EF4444] text-sm font-bold rounded transition-colors border border-[#EF4444]/30 hover:border-[#EF4444]">
                                    إلغاء الاشتراك
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* PROJECTS TAB */}
                {activeTab === 'projects' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white mb-4">المشاريع ({projects.length})</h3>
                        {projects.map(project => (
                            <div key={project.id} className="bg-[#1A1A1A] border border-[#333333] p-4 rounded-lg flex items-center justify-between group hover:border-[#555] transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#222] rounded flex items-center justify-center text-[#666]">
                                        <FileText size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-lg">{project.name}</h4>
                                        <a href={`https://${project.url}`} target="_blank" rel="noreferrer" className="text-sm text-[#7C3AED] hover:underline flex items-center gap-1">
                                            {project.url} <ExternalLink size={12} />
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`px-3 py-1 rounded text-xs font-bold border ${
                                        project.status === 'published' ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30' : 'bg-[#333] text-[#A0A0A0] border-[#555]'
                                    }`}>
                                        {project.status === 'published' ? 'منشور' : 'مسودة'}
                                    </span>
                                    <button className="px-4 py-2 bg-[#333] hover:bg-[#7C3AED] text-white text-sm font-bold rounded transition-colors flex items-center gap-2">
                                        <LogIn size={14} /> دخول كـ
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* BILLING TAB */}
                {activeTab === 'billing' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white mb-4">سجل الفواتير</h3>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[#666] text-xs uppercase border-b border-[#333]">
                                    <th className="py-3 px-2 font-bold">رقم الفاتورة</th>
                                    <th className="py-3 px-2 font-bold">التاريخ</th>
                                    <th className="py-3 px-2 font-bold">الباقة</th>
                                    <th className="py-3 px-2 font-bold">المبلغ</th>
                                    <th className="py-3 px-2 font-bold">الحالة</th>
                                    <th className="py-3 px-2 font-bold text-right">تحميل</th>
                                </tr>
                            </thead>
                            <tbody className="text-white text-sm">
                                {invoices.map(inv => (
                                    <tr key={inv.id} className="border-b border-[#333] hover:bg-[#222]">
                                        <td className="py-4 px-2 font-mono text-[#A0A0A0]">{inv.id}</td>
                                        <td className="py-4 px-2">{inv.date}</td>
                                        <td className="py-4 px-2">{inv.plan}</td>
                                        <td className="py-4 px-2 font-bold">{inv.amount}</td>
                                        <td className="py-4 px-2">
                                            <span className="text-[#22C55E] bg-[#22C55E]/10 px-2 py-1 rounded text-xs font-bold border border-[#22C55E]/30">
                                                مدفوع
                                            </span>
                                        </td>
                                        <td className="py-4 px-2 text-right">
                                            <button className="text-[#A0A0A0] hover:text-white"><Download size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* ACTIVITY TAB */}
                {activeTab === 'activity' && (
                    <div className="space-y-6 relative pl-4">
                        <div className="absolute left-[27px] top-0 bottom-0 w-px bg-[#333]"></div>
                        {activityLog.map((log, idx) => (
                            <div key={idx} className="flex items-start gap-4 relative">
                                <div className="w-6 h-6 rounded-full bg-[#1A1A1A] border-2 border-[#555] flex items-center justify-center z-10 shrink-0 mt-1 text-[#A0A0A0]">
                                    <log.icon size={12} />
                                </div>
                                <div className="bg-[#1A1A1A] border border-[#333] rounded-lg p-3 w-full">
                                    <div className="text-sm font-bold text-white">{log.action}</div>
                                    <div className="text-xs text-[#666] font-mono mt-1">{log.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* NOTES TAB */}
                {activeTab === 'notes' && (
                    <div className="flex flex-col h-full">
                        <div className="flex-1 space-y-4 mb-4">
                            {notes.map(note => (
                                <div key={note.id} className="bg-[#222] border border-[#333] p-4 rounded-lg">
                                    <p className="text-white text-sm mb-2">{note.text}</p>
                                    <div className="flex justify-between text-xs text-[#666]">
                                        <span>{note.author}</span>
                                        <span>{note.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-[#1A1A1A] p-4 border border-[#333] rounded-lg mt-auto">
                            <textarea 
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="w-full bg-[#0A0A0A] border border-[#333] rounded p-3 text-white text-sm focus:outline-none focus:border-[#7C3AED] resize-none h-24 mb-3"
                                placeholder="أضف ملاحظة إدارية..."
                            ></textarea>
                            <div className="flex justify-end">
                                <button 
                                    className="px-4 py-2 bg-[#7C3AED] text-white text-sm font-bold rounded hover:bg-[#6D28D9] transition-colors flex items-center gap-2"
                                    disabled={!note.trim()}
                                >
                                    <Save size={16} /> حفظ الملاحظة
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-[#333333] bg-[#0A0A0A] flex justify-between items-center">
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-[#333] hover:bg-[#444] text-white text-sm font-bold rounded flex items-center gap-2 transition-colors border border-[#555]">
                        <Key size={16} /> إعادة تعيين كلمة السر
                    </button>
                    <button className="px-4 py-2 bg-[#333] hover:bg-[#444] text-white text-sm font-bold rounded flex items-center gap-2 transition-colors border border-[#555]">
                        <LogIn size={16} /> دخول كـ
                    </button>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-[#FACC15]/10 hover:bg-[#FACC15]/20 text-[#FACC15] text-sm font-bold rounded flex items-center gap-2 transition-colors border border-[#FACC15]/30">
                        <Ban size={16} /> إيقاف الحساب
                    </button>
                    <button className="px-4 py-2 bg-[#EF4444]/10 hover:bg-[#EF4444]/20 text-[#EF4444] text-sm font-bold rounded flex items-center gap-2 transition-colors border border-[#EF4444]/30">
                        <Trash2 size={16} /> حذف نهائي
                    </button>
                </div>
            </div>
        </motion.div>
    </div>
  );
};

export default UserDetailModal;