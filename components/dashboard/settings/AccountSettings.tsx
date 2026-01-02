import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Shield, Bell, Smartphone, Camera, Check, Trash2, Mail, Save, Eye, EyeOff, Lock, AlertTriangle, Monitor, Laptop, LogOut, Globe } from 'lucide-react';
import { ViewState } from '../../../types';
import Button from '../../ui/Button';

interface AccountSettingsProps {
  onNavigate: (view: ViewState) => void;
}

type Tab = 'profile' | 'security' | 'notifications' | 'sessions';

const AccountSettings: React.FC<AccountSettingsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  
  // Profile State
  const [name, setName] = useState('محمد أحمد الصباح');
  const [email, setEmail] = useState('mohammed@example.com');
  const [phone, setPhone] = useState('9876 5432');
  const [country, setCountry] = useState('KW');

  // Security State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  // Notifications State
  const [notifications, setNotifications] = useState({
    projects: true,
    billing: true,
    tips: true,
    offers: false
  });

  const tabs = [
    { id: 'profile', label: 'الملف الشخصي', icon: User },
    { id: 'security', label: 'الأمان', icon: Shield },
    { id: 'notifications', label: 'الإشعارات', icon: Bell },
    { id: 'sessions', label: 'الجلسات', icon: Smartphone },
  ];

  const getPasswordStrength = (pass: string) => {
    let s = 0;
    if (pass.length >= 8) s++;
    if (/[A-Z]/.test(pass)) s++;
    if (/[0-9]/.test(pass)) s++;
    return s;
  };
  const strength = getPasswordStrength(newPassword);

  const Toggle = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => (
    <button
        onClick={onChange}
        className={`w-14 h-7 rounded-full border-[3px] border-black relative transition-colors ${checked ? 'bg-[#7C3AED]' : 'bg-slate-200'}`}
    >
        <motion.div
            initial={false}
            animate={{ x: checked ? 28 : 2 }}
            className="absolute top-1 w-4 h-4 bg-white rounded-full border-2 border-black"
        />
    </button>
  );

  return (
    <div className="space-y-8 min-h-[80vh]">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-black mb-1">إعدادات الحساب</h1>
        <p className="text-slate-600 font-bold">إدارة ملفك الشخصي وتفضيلات الأمان</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b-2 border-slate-100 pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-bold transition-all relative top-[2px] ${
              activeTab === tab.id
                ? 'bg-white text-black border-[3px] border-b-white border-black z-10'
                : 'bg-slate-50 text-slate-500 hover:text-black border-b-[3px] border-transparent'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white border-[3px] border-black rounded-xl rounded-tl-none p-6 md:p-8 shadow-[6px_6px_0px_0px_#000]">
        <AnimatePresence mode='wait'>
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-2 mb-4">
                 <h2 className="text-2xl font-black text-black">━━━━━━━━━━━━━━ الملف الشخصي</h2>
              </div>

              {/* Avatar Section */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                 <div className="shrink-0">
                    <label className="block text-sm font-bold text-black mb-2">الصورة الشخصية</label>
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-slate-100 rounded-2xl border-[3px] border-black flex items-center justify-center text-4xl shadow-[4px_4px_0px_0px_#000]">
                            <User size={48} className="text-slate-400" />
                        </div>
                        <div className="flex flex-col gap-2">
                             <Button size="sm" variant="secondary" className="border-2 border-black">
                                <Camera size={16} className="ml-2" /> تغيير الصورة
                             </Button>
                             <button className="text-red-500 font-bold text-sm flex items-center gap-1 hover:text-red-700">
                                <Trash2 size={14} /> حذف
                             </button>
                             <span className="text-xs font-bold text-slate-400 mt-1">PNG, JPG حتى 2MB</span>
                        </div>
                    </div>
                 </div>
              </div>

              <div className="h-px bg-slate-100 w-full"></div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-black mb-2">الاسم الكامل</label>
                    <div className="relative">
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-slate-50 border-[3px] border-slate-200 rounded-xl px-4 py-3 font-bold text-black focus:border-black focus:outline-none transition-colors"
                        />
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    </div>
                 </div>

                 <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-black mb-2">البريد الإلكتروني</label>
                    <div className="relative">
                        <input 
                            type="email" 
                            value={email}
                            readOnly
                            className="w-full bg-slate-100 border-[3px] border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-500 cursor-not-allowed"
                            dir="ltr"
                        />
                         <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-green-600 font-bold text-xs bg-green-100 px-2 py-0.5 rounded border border-green-200">
                            <Check size={12} /> مؤكد
                         </div>
                         <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    </div>
                 </div>

                 <div>
                    <label className="block text-sm font-bold text-black mb-2">رقم الهاتف</label>
                    <div className="flex gap-2" dir="ltr">
                        <div className="bg-slate-50 border-[3px] border-slate-200 rounded-xl px-3 py-3 font-bold text-black flex items-center gap-2">
                            <span>KW</span> <span>+965</span>
                        </div>
                        <input 
                            type="text" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="flex-1 bg-slate-50 border-[3px] border-slate-200 rounded-xl px-4 py-3 font-bold text-black focus:border-black focus:outline-none transition-colors"
                        />
                    </div>
                 </div>

                 <div>
                    <label className="block text-sm font-bold text-black mb-2">الدولة</label>
                    <select 
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-slate-50 border-[3px] border-slate-200 rounded-xl px-4 py-3 font-bold text-black focus:border-black focus:outline-none transition-colors"
                    >
                        <option value="KW">الكويت</option>
                        <option value="SA">السعودية</option>
                        <option value="AE">الإمارات</option>
                        <option value="QA">قطر</option>
                        <option value="BH">البحرين</option>
                        <option value="OM">عمان</option>
                    </select>
                 </div>
              </div>

              <div className="flex justify-end pt-4">
                 <Button variant="primary" size="lg">
                    <Save className="ml-2" size={18} /> حفظ التغييرات
                 </Button>
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
              className="space-y-8"
            >
              <div className="flex items-center gap-2 mb-4">
                 <h2 className="text-2xl font-black text-black">━━━━━━━━━━━━━━ الأمان</h2>
              </div>

              <div className="space-y-6">
                 <div>
                    <h3 className="font-black text-black text-lg mb-4 flex items-center gap-2">
                        <Lock size={20} /> تغيير كلمة السر
                    </h3>
                    
                    <div className="space-y-4 max-w-2xl">
                        <div>
                            <label className="block text-sm font-bold text-black mb-2">كلمة السر الحالية</label>
                            <div className="relative">
                                <input 
                                    type={showCurrentPassword ? "text" : "password"} 
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full bg-slate-50 border-[3px] border-slate-200 rounded-xl px-4 py-3 font-bold text-black focus:border-black focus:outline-none transition-colors"
                                    placeholder="●●●●●●●●"
                                    dir="ltr"
                                />
                                <button 
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black"
                                >
                                    {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-black mb-2">كلمة السر الجديدة</label>
                            <div className="relative">
                                <input 
                                    type={showNewPassword ? "text" : "password"} 
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full bg-slate-50 border-[3px] border-slate-200 rounded-xl px-4 py-3 font-bold text-black focus:border-black focus:outline-none transition-colors"
                                    placeholder="●●●●●●●●"
                                    dir="ltr"
                                />
                                <button 
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black"
                                >
                                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            <div className="flex gap-1 h-1.5 mt-2 rounded-full overflow-hidden">
                                <div className={`flex-1 transition-colors ${strength >= 1 ? 'bg-red-500' : 'bg-slate-200'}`}></div>
                                <div className={`flex-1 transition-colors ${strength >= 2 ? 'bg-yellow-400' : 'bg-slate-200'}`}></div>
                                <div className={`flex-1 transition-colors ${strength >= 3 ? 'bg-green-500' : 'bg-slate-200'}`}></div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-black mb-2">تأكيد كلمة السر الجديدة</label>
                            <div className="relative">
                                <input 
                                    type={showConfirmNewPassword ? "text" : "password"} 
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    className="w-full bg-slate-50 border-[3px] border-slate-200 rounded-xl px-4 py-3 font-bold text-black focus:border-black focus:outline-none transition-colors"
                                    placeholder="●●●●●●●●"
                                    dir="ltr"
                                />
                                <button 
                                    onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black"
                                >
                                    {showConfirmNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="pt-2">
                             <Button variant="primary">
                                تغيير كلمة السر
                             </Button>
                        </div>
                    </div>
                 </div>

                 <div className="border-t-[3px] border-black border-dashed opacity-20 my-8"></div>

                 <div>
                    <h3 className="font-black text-black text-lg mb-4 flex items-center gap-2">
                        <Smartphone size={20} /> المصادقة الثنائية (2FA)
                    </h3>
                    
                    <div className="bg-white border-[3px] border-slate-200 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-12 h-12 bg-yellow-100 rounded-xl border-2 border-black flex items-center justify-center shrink-0 text-yellow-600">
                             <AlertTriangle size={24} />
                        </div>
                        <div className="flex-1">
                             <div className="flex items-center gap-2 mb-2">
                                <span className="font-black text-black text-lg">غير مفعّلة</span>
                             </div>
                             <p className="text-slate-600 font-medium mb-4">
                                أضف طبقة حماية إضافية لحسابك. عند تسجيل الدخول، سنطلب منك رمزاً خاصاً من تطبيق المصادقة.
                             </p>
                             <Button variant="outline" className="text-black border-black hover:bg-slate-50">
                                تفعيل المصادقة الثنائية
                             </Button>
                        </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <motion.div
                key="notifications"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-8"
            >
                <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-2xl font-black text-black">━━━━━━━━━━━━━━ الإشعارات</h2>
                </div>

                <div className="space-y-6 max-w-2xl">
                    <div className="bg-slate-50 border-[3px] border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_#000]">
                         <h3 className="font-black text-black text-lg mb-6 flex items-center gap-2">
                            <Mail size={20} /> إشعارات البريد الإلكتروني
                        </h3>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between pb-4 border-b-2 border-slate-200">
                                <div>
                                    <div className="font-bold text-black mb-1">تحديثات المشاريع</div>
                                    <div className="text-xs text-slate-500 font-bold">عند نشر أو تحديث مشروع أو انتهاء معالجته</div>
                                </div>
                                <Toggle checked={notifications.projects} onChange={() => setNotifications({...notifications, projects: !notifications.projects})} />
                            </div>

                            <div className="flex items-center justify-between pb-4 border-b-2 border-slate-200">
                                <div>
                                    <div className="font-bold text-black mb-1">تنبيهات الفوترة</div>
                                    <div className="text-xs text-slate-500 font-bold">إيصالات الدفع وتذكيرات تجديد الاشتراك</div>
                                </div>
                                <Toggle checked={notifications.billing} onChange={() => setNotifications({...notifications, billing: !notifications.billing})} />
                            </div>

                            <div className="flex items-center justify-between pb-4 border-b-2 border-slate-200">
                                <div>
                                    <div className="font-bold text-black mb-1">نصائح وتحديثات المنتج</div>
                                    <div className="text-xs text-slate-500 font-bold">ميزات جديدة ونصائح للاستفادة القصوى من المنصة</div>
                                </div>
                                <Toggle checked={notifications.tips} onChange={() => setNotifications({...notifications, tips: !notifications.tips})} />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-bold text-black mb-1">العروض والتخفيضات</div>
                                    <div className="text-xs text-slate-500 font-bold">عروض حصرية وخصومات خاصة للمشتركين</div>
                                </div>
                                <Toggle checked={notifications.offers} onChange={() => setNotifications({...notifications, offers: !notifications.offers})} />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-2">
                        <Button variant="primary">
                            <Save size={18} className="ml-2" /> حفظ التفضيلات
                        </Button>
                    </div>
                </div>
            </motion.div>
          )}

          {/* SESSIONS TAB */}
          {activeTab === 'sessions' && (
            <motion.div
                key="sessions"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-8"
            >
                <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-2xl font-black text-black">━━━━━━━━━━━━━━ الجلسات النشطة</h2>
                </div>

                <div className="space-y-6">
                    {/* Current Session */}
                    <div>
                        <h3 className="text-lg font-black text-black mb-4">الجلسة الحالية</h3>
                        <div className="bg-white border-[3px] border-green-500 rounded-xl p-6 shadow-[4px_4px_0px_0px_#22C55E] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-100 border-2 border-black rounded-xl flex items-center justify-center text-green-700">
                                    <Monitor size={24} />
                                </div>
                                <div>
                                    <div className="font-black text-black text-lg flex items-center gap-2">
                                        Chrome على MacOS 
                                        <span className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full border border-black shadow-sm">نشطة الآن</span>
                                    </div>
                                    <div className="text-slate-600 font-bold text-sm mt-1 flex flex-col sm:flex-row gap-1 sm:gap-3">
                                        <span className="flex items-center gap-1"><Globe size={12} /> الكويت، الكويت</span>
                                        <span className="hidden sm:inline">•</span>
                                        <span>IP: 82.194.xxx.xxx</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-sm font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded border border-slate-200 self-start md:self-center">
                                آخر نشاط: الآن
                            </div>
                        </div>
                    </div>

                    <div className="border-t-[3px] border-black border-dashed opacity-20"></div>

                    {/* Other Sessions */}
                    <div>
                        <h3 className="text-lg font-black text-black mb-4">جلسات أخرى</h3>
                        <div className="space-y-4">
                            
                            <div className="bg-white border-[3px] border-slate-200 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group hover:border-black transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-100 border-2 border-black rounded-xl flex items-center justify-center text-slate-600">
                                        <Smartphone size={24} />
                                    </div>
                                    <div>
                                        <div className="font-black text-black text-lg">
                                            Safari على iPhone
                                        </div>
                                        <div className="text-slate-600 font-bold text-sm mt-1 flex flex-col sm:flex-row gap-1 sm:gap-3">
                                            <span className="flex items-center gap-1"><Globe size={12} /> الكويت، الكويت</span>
                                            <span className="hidden sm:inline">•</span>
                                            <span>آخر نشاط: منذ 3 ساعات</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="text-red-500 font-bold text-sm border-2 border-transparent hover:border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all self-end md:self-center">
                                    إنهاء الجلسة
                                </button>
                            </div>

                            <div className="bg-white border-[3px] border-slate-200 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group hover:border-black transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-100 border-2 border-black rounded-xl flex items-center justify-center text-slate-600">
                                        <Laptop size={24} />
                                    </div>
                                    <div>
                                        <div className="font-black text-black text-lg">
                                            Firefox على Windows
                                        </div>
                                        <div className="text-slate-600 font-bold text-sm mt-1 flex flex-col sm:flex-row gap-1 sm:gap-3">
                                            <span className="flex items-center gap-1"><Globe size={12} /> دبي، الإمارات</span>
                                            <span className="hidden sm:inline">•</span>
                                            <span>آخر نشاط: منذ يومين</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="text-red-500 font-bold text-sm border-2 border-transparent hover:border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all self-end md:self-center">
                                    إنهاء الجلسة
                                </button>
                            </div>

                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold border-[3px] border-black shadow-[4px_4px_0px_0px_#000] hover:bg-red-700 transition-all flex items-center gap-2">
                             <LogOut size={18} /> إنهاء جميع الجلسات الأخرى
                        </button>
                    </div>
                </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default AccountSettings;