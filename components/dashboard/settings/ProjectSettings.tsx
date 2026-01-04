import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Search, Globe, BarChart3, Database, AlertTriangle, Save, Upload, X, Check, Globe as GlobeIcon, AlertCircle, ArrowLeft, Trash2, Plug, MessageCircle, Facebook, Lock, Code, Copy, ExternalLink } from 'lucide-react';
// Fixed: Standardized casing for Button.tsx
import Button from '../../ui/Button.tsx';
import { ViewState } from '../../../types';

interface ProjectSettingsProps {
  onNavigate: (view: ViewState) => void;
}

type SettingsTab = 'general' | 'seo' | 'domain' | 'api' | 'analytics' | 'backup' | 'danger';

const ProjectSettings: React.FC<ProjectSettingsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  
  // General State
  const [projectName, setProjectName] = useState('موقع المطعم البحري');
  const [description, setDescription] = useState('موقع لمطعم بحري كويتي يعرض قائمة الطعام مع حجز الطاولات');
  const [language, setLanguage] = useState('ar');
  const [timezone, setTimezone] = useState('Asia/Kuwait');
  // Initializing with a placeholder image simulating an existing favicon
  const [favicon, setFavicon] = useState<string | null>('https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=64&h=64&fit=crop&q=80');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // SEO State
  const [seoTitle, setSeoTitle] = useState('مطعم البحر الأزرق | أفضل مأكولات بحرية في الكويت');
  const [metaDesc, setMetaDesc] = useState('استمتع بأشهى المأكولات البحرية الطازجة في مطعم البحر الأزرق. احجز طاولتك الآن واستمتع بأجواء بحرية فريدة في قلب الكويت.');

  // Domain State
  const [customDomain, setCustomDomain] = useState('');
  const [domainSearch, setDomainSearch] = useState('');

  // API State
  const [whatsappNumber, setWhatsappNumber] = useState('9876 5432');
  const [welcomeMessage, setWelcomeMessage] = useState('مرحباً! كيف يمكننا مساعدتك؟');
  const [gaId, setGaId] = useState('G-XXXXXXXXXX');
  const [pixelId, setPixelId] = useState('123456789012345');
  const [headCode, setHeadCode] = useState('');
  const [bodyCode, setBodyCode] = useState('');

  const menuItems: { id: SettingsTab; label: string; icon: any; danger?: boolean }[] = [
    { id: 'general', label: 'عام', icon: Settings },
    { id: 'seo', label: 'السيو (SEO)', icon: Search },
    { id: 'domain', label: 'الدومين', icon: Globe },
    { id: 'api', label: 'الربط (API)', icon: Plug },
    { id: 'analytics', label: 'التحليلات', icon: BarChart3 },
    { id: 'backup', label: 'النسخ الاحتياطي', icon: Database },
    { id: 'danger', label: 'منطقة الخطر', icon: AlertTriangle, danger: true },
  ];

  const handleDeleteProject = () => {
    if (deleteConfirmation === projectName) {
        // Handle deletion logic
        setIsDeleteModalOpen(false);
        onNavigate('dashboard-projects');
    }
  };

  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFavicon(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteFavicon = () => {
      setFavicon(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[80vh]">
        {/* SIDEBAR TABS */}
        <div className="w-full lg:w-64 shrink-0">
            <div className="bg-white border-[3px] border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_#000]">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 font-bold text-sm transition-colors border-b-2 border-slate-100 last:border-b-0 ${
                            activeTab === item.id 
                            ? item.danger ? 'bg-red-50 text-red-600 border-r-[4px] border-r-red-500' : 'bg-violet-50 text-[#7C3AED] border-r-[4px] border-r-[#7C3AED]'
                            : item.danger ? 'text-red-500 hover:bg-red-50' : 'text-slate-600 hover:bg-slate-50 hover:text-black'
                        }`}
                    >
                        <item.icon size={18} />
                        {item.label}
                    </button>
                ))}
            </div>
            
            <button 
                onClick={() => onNavigate('dashboard-projects')}
                className="mt-6 flex items-center gap-2 text-slate-500 font-bold hover:text-black transition-colors"
            >
                <ArrowLeft size={16} /> العودة للمشاريع
            </button>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1">
            <AnimatePresence mode='wait'>
                {/* GENERAL SETTINGS */}
                {activeTab === 'general' && (
                    <motion.div 
                        key="general"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <Settings className="text-[#7C3AED]" size={24} />
                            <h2 className="text-2xl font-black text-black">الإعدادات العامة</h2>
                        </div>

                        <div className="bg-white border-[3px] border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_#000]">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-black mb-2">اسم المشروع</label>
                                    <input 
                                        type="text" 
                                        value={projectName}
                                        onChange={(e) => setProjectName(e.target.value)}
                                        className="w-full bg-slate-50 border-[3px] border-slate-200 rounded-lg px-4 py-3 font-bold text-black focus:border-black focus:outline-none transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-black mb-2">وصف المشروع</label>
                                    <textarea 
                                        rows={3}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full bg-slate-50 border-[3px] border-slate-200 rounded-lg px-4 py-3 font-bold text-black focus:border-black focus:outline-none transition-colors resize-none"
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-black mb-2">أيقونة الموقع (Favicon)</label>
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-slate-100 rounded-lg border-[3px] border-black flex items-center justify-center text-3xl shadow-sm overflow-hidden">
                                            {favicon ? (
                                                <img src={favicon} alt="Favicon" className="w-full h-full object-cover" />
                                            ) : (
                                                '🐟'
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <input 
                                                type="file" 
                                                ref={fileInputRef} 
                                                className="hidden" 
                                                accept="image/png, image/jpeg, image/x-icon"
                                                onChange={handleFaviconChange}
                                            />
                                            <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()}>تغيير</Button>
                                            <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:border-red-500 hover:bg-red-50" onClick={handleDeleteFavicon}>حذف</Button>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2 font-bold">PNG أو ICO، 32x32 بكسل</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-black mb-2">اللغة الافتراضية</label>
                                        <select 
                                            value={language} 
                                            onChange={(e) => setLanguage(e.target.value)}
                                            className="w-full bg-slate-50 border-[3px] border-slate-200 rounded-lg px-4 py-3 font-bold text-black focus:border-black focus:outline-none transition-colors"
                                        >
                                            <option value="ar">العربية</option>
                                            <option value="en">English</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-black mb-2">المنطقة الزمنية</label>
                                        <select 
                                            value={timezone} 
                                            onChange={(e) => setTimezone(e.target.value)}
                                            className="w-full bg-slate-50 border-[3px] border-slate-200 rounded-lg px-4 py-3 font-bold text-black focus:border-black focus:outline-none transition-colors"
                                        >
                                            <option value="Asia/Kuwait">الكويت (GMT+3)</option>
                                            <option value="Asia/Riyadh">السعودية (GMT+3)</option>
                                            <option value="Asia/Dubai">الإمارات (GMT+4)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button variant="default" onClick={() => {}}>
                                <Save size={18} className="ml-2" /> حفظ التغييرات
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* SEO SETTINGS */}
                {activeTab === 'seo' && (
                    <motion.div 
                        key="seo"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <Search className="text-[#7C3AED]" size={24} />
                            <h2 className="text-2xl font-black text-black">إعدادات محركات البحث (SEO)</h2>
                        </div>

                        <div className="bg-white border-[3px] border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_#000]">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-black mb-2">عنوان الصفحة (Title)</label>
                                    <input 
                                        type="text" 
                                        value={seoTitle}
                                        onChange={(e) => setSeoTitle(e.target.value)}
                                        className="w-full bg-slate-50 border-[3px] border-slate-200 rounded-lg px-4 py-3 font-bold text-black focus:border-black focus:outline-none transition-colors"
                                    />
                                    <div className="flex justify-end mt-1">
                                        <span className={`text-xs font-bold ${seoTitle.length > 60 ? 'text-red-500' : 'text-green-600'}`}>
                                            [{seoTitle.length}/60 حرف] {seoTitle.length <= 60 ? '✓ جيد' : '⚠️ طويل'}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-black mb-2">الوصف (Meta Description)</label>
                                    <textarea 
                                        rows={3}
                                        value={metaDesc}
                                        onChange={(e) => setMetaDesc(e.target.value)}
                                        className="w-full bg-slate-50 border-[3px] border-slate-200 rounded-lg px-4 py-3 font-bold text-black focus:border-black focus:outline-none transition-colors resize-none"
                                    ></textarea>
                                    <div className="flex justify-end mt-1">
                                        <span className={`text-xs font-bold ${metaDesc.length > 160 ? 'text-red-500' : 'text-green-600'}`}>
                                            [{metaDesc.length}/160 حرف] {metaDesc.length <= 160 ? '✓ ممتاز' : '⚠️ طويل'}
                                        </span>
                                    </div>
                                </div>

                                <div className="border-t-2 border-slate-100 pt-6">
                                    <label className="block text-sm font-bold text-black mb-4">معاينة في Google:</label>
                                    <div className="bg-white border border-slate-200 rounded-lg p-4 max-w-2xl font-sans" dir="ltr">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs overflow-hidden">
                                                {favicon ? <img src={favicon} className="w-full h-full object-cover" alt="Favicon" /> : '🐟'}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs text-slate-800 font-medium">مطعم البحر الأزرق</span>
                                                <span className="text-xs text-slate-500">www.blue-sea-restaurant.kw</span>
                                            </div>
                                        </div>
                                        <h3 className="text-[#1a0dab] text-xl hover:underline cursor-pointer truncate">{seoTitle}</h3>
                                        <p className="text-sm text-[#4d5156] line-clamp-2">{metaDesc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button variant="default" onClick={() => {}}>
                                <Save size={18} className="ml-2" /> حفظ التغييرات
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* DANGER ZONE */}
                {activeTab === 'danger' && (
                    <motion.div 
                        key="danger"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <AlertTriangle className="text-red-600" size={24} />
                            <h2 className="text-2xl font-black text-red-600">منطقة الخطر</h2>
                        </div>

                        <div className="bg-[#FEF2F2] border-[3px] border-[#EF4444] rounded-xl p-6 shadow-[4px_4px_0px_0px_#EF4444]">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-2 border-red-200">
                                <div>
                                    <h3 className="font-black text-black">إلغاء النشر</h3>
                                    <p className="text-sm text-red-800/70 font-medium">سيتم إيقاف الموقع وإزالته من الإنترنت مؤقتاً</p>
                                </div>
                                <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                                    إيقاف الموقع
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </div>
  );
};

export default ProjectSettings;