import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Search, Globe, BarChart3, Database, AlertTriangle, Save, Upload, X, Check, Globe as GlobeIcon, AlertCircle, ArrowLeft, Trash2, Plug, MessageCircle, Facebook, Lock, Code, Copy, ExternalLink } from 'lucide-react';
import Button from '../../ui/Button';
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
                            <Button variant="primary">
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
                                                {favicon ? <img src={favicon} className="w-full h-full object-cover" /> : '🐟'}
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

                                <div className="border-t-2 border-slate-100 pt-6">
                                    <label className="block text-sm font-bold text-black mb-4">صورة المشاركة (Open Graph)</label>
                                    <div className="flex flex-col md:flex-row gap-6 items-start">
                                        <div className="w-full md:w-64 aspect-[1.91/1] bg-slate-100 border-[3px] border-dashed border-slate-300 rounded-xl flex items-center justify-center text-slate-400">
                                            <Upload size={32} />
                                        </div>
                                        <div>
                                            <Button variant="secondary" size="sm">تغيير الصورة</Button>
                                            <p className="text-xs text-slate-500 mt-2 font-bold max-w-xs">تظهر هذه الصورة عند مشاركة رابط موقعك على وسائل التواصل الاجتماعي (واتساب، تويتر، فيسبوك).</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button variant="primary">
                                <Save size={18} className="ml-2" /> حفظ التغييرات
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* DOMAIN SETTINGS */}
                {activeTab === 'domain' && (
                    <motion.div 
                        key="domain"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <Globe className="text-[#7C3AED]" size={24} />
                            <h2 className="text-2xl font-black text-black">إعدادات الدومين</h2>
                        </div>

                        <div className="bg-white border-[3px] border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_#000]">
                            <div className="space-y-8">
                                
                                {/* Current Domain */}
                                <div>
                                    <h3 className="font-bold text-black mb-4">الدومين الحالي</h3>
                                    <div className="bg-slate-50 border-[3px] border-slate-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <GlobeIcon className="text-slate-400" />
                                            <div>
                                                <div className="font-black text-lg text-black" dir="ltr">blue-sea-restaurant.kwq8.com</div>
                                                <div className="flex items-center gap-1 text-xs font-bold text-green-600 mt-1">
                                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                    متصل ✓
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-yellow-300 text-black text-xs font-black px-2 py-1 rounded border border-black self-start md:self-center">مشمول</div>
                                    </div>
                                </div>

                                <div className="border-t-2 border-slate-100"></div>

                                {/* Custom Domain */}
                                <div>
                                    <h3 className="font-bold text-black mb-4">◆ ربط دومين خاص</h3>
                                    <div className="flex gap-2">
                                        <input 
                                            type="text" 
                                            value={customDomain}
                                            onChange={(e) => setCustomDomain(e.target.value)}
                                            placeholder="www.your-domain.com"
                                            className="flex-1 bg-white border-[3px] border-black rounded-xl px-4 py-3 font-bold text-black focus:shadow-[4px_4px_0px_0px_#000] focus:outline-none transition-all"
                                            dir="ltr"
                                        />
                                    </div>
                                    <Button variant="secondary" fullWidth className="mt-3">التحقق من الإعدادات</Button>
                                </div>

                                <div className="relative flex items-center py-2">
                                    <div className="flex-grow border-t-2 border-slate-200"></div>
                                    <span className="flex-shrink-0 mx-4 text-slate-400 font-bold text-sm">أو</span>
                                    <div className="flex-grow border-t-2 border-slate-200"></div>
                                </div>

                                {/* Buy Domain */}
                                <div>
                                    <h3 className="font-bold text-black mb-4">◆ شراء دومين جديد</h3>
                                    <div className="flex gap-2 mb-4">
                                        <input 
                                            type="text" 
                                            value={domainSearch}
                                            onChange={(e) => setDomainSearch(e.target.value)}
                                            placeholder="البحث عن دومين..."
                                            className="flex-1 bg-slate-50 border-[3px] border-slate-200 rounded-xl px-4 py-3 font-bold text-black focus:border-black focus:outline-none transition-colors"
                                        />
                                        <Button variant="primary">بحث</Button>
                                    </div>

                                    {/* Mock Results */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between p-3 border-2 border-slate-100 rounded-lg hover:border-black transition-colors">
                                            <div className="font-bold text-black flex items-center gap-2">
                                                bluesea.kw <span className="text-green-600 text-xs bg-green-100 px-1.5 py-0.5 rounded">متاح ✓</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm font-bold">12 USD/سنة</span>
                                                <Button size="sm" variant="outline" className="h-8 text-xs">شراء</Button>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between p-3 border-2 border-slate-100 rounded-lg hover:border-black transition-colors">
                                            <div className="font-bold text-black flex items-center gap-2">
                                                bluesea.co <span className="text-green-600 text-xs bg-green-100 px-1.5 py-0.5 rounded">متاح ✓</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm font-bold">15 USD/سنة</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-black bg-yellow-300 px-1 rounded border border-black">مشمول</span>
                                                    <Button size="sm" variant="primary" className="h-8 text-xs">شراء</Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between p-3 border-2 border-slate-100 rounded-lg opacity-60">
                                            <div className="font-bold text-slate-500 flex items-center gap-2 line-through">
                                                bluesea.com <span className="text-red-500 text-xs no-underline font-normal">غير متاح ✗</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm font-bold">—</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-violet-600 font-bold mt-4">◆ دومينات تحت $15 مشمولة مع باقتك!</p>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                )}

                {/* API INTEGRATIONS */}
                {activeTab === 'api' && (
                    <motion.div 
                        key="api"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <Plug className="text-[#7C3AED]" size={24} />
                            <h2 className="text-2xl font-black text-black">الربط والتكاملات</h2>
                        </div>

                        <div className="space-y-6">
                            {/* WhatsApp */}
                            <div className="bg-white border-[3px] border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_#000]">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-green-100 rounded-xl border-2 border-black flex items-center justify-center text-green-600">
                                            <MessageCircle size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-xl text-black">WhatsApp Business</h3>
                                            <p className="text-sm font-bold text-slate-500">أضف زر واتساب تفاعلي لموقعك</p>
                                        </div>
                                    </div>
                                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full border-2 border-green-600 font-black text-xs">✓ مفعّل</div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-black mb-2">رقم الواتساب</label>
                                        <div className="flex gap-2" dir="ltr">
                                            <div className="bg-slate-50 border-[3px] border-slate-200 rounded-lg px-3 py-2 font-bold text-black flex items-center gap-2 w-32 justify-center">
                                                <span>🇰🇼</span> <span>+965</span>
                                            </div>
                                            <input 
                                                type="text" 
                                                value={whatsappNumber}
                                                onChange={(e) => setWhatsappNumber(e.target.value)}
                                                className="flex-1 bg-slate-50 border-[3px] border-slate-200 rounded-lg px-4 py-2 font-bold text-black focus:border-black focus:outline-none transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-black mb-2">رسالة الترحيب (اختيارية)</label>
                                        <input 
                                            type="text" 
                                            value={welcomeMessage}
                                            onChange={(e) => setWelcomeMessage(e.target.value)}
                                            className="w-full bg-slate-50 border-[3px] border-slate-200 rounded-lg px-4 py-2 font-bold text-black focus:border-black focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <Button variant="primary" size="sm">حفظ</Button>
                                </div>
                            </div>

                            {/* Analytics Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Google Analytics */}
                                <div className="bg-white border-[3px] border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_#000]">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-orange-100 rounded-lg border-2 border-black flex items-center justify-center text-orange-600">
                                            <BarChart3 size={20} />
                                        </div>
                                        <h3 className="font-black text-lg text-black">Google Analytics</h3>
                                    </div>
                                    <p className="text-xs font-bold text-slate-500 mb-4">تتبع زوار موقعك بدقة</p>
                                    <div className="mb-4">
                                        <label className="block text-xs font-bold text-black mb-1">معرف القياس (Measurement ID)</label>
                                        <input 
                                            type="text" 
                                            value={gaId}
                                            onChange={(e) => setGaId(e.target.value)}
                                            className="w-full bg-slate-50 border-[3px] border-slate-200 rounded-lg px-3 py-2 font-bold text-black focus:border-black focus:outline-none transition-colors text-sm"
                                            dir="ltr"
                                        />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <a href="#" className="text-xs font-bold text-[#7C3AED] hover:underline flex items-center gap-1">
                                            <ExternalLink size={12} /> كيفية الحصول عليه
                                        </a>
                                        <Button variant="secondary" size="sm">حفظ</Button>
                                    </div>
                                </div>

                                {/* Facebook Pixel */}
                                <div className="bg-white border-[3px] border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_#000]">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg border-2 border-black flex items-center justify-center text-blue-600">
                                            <Facebook size={20} />
                                        </div>
                                        <h3 className="font-black text-lg text-black">Facebook Pixel</h3>
                                    </div>
                                    <p className="text-xs font-bold text-slate-500 mb-4">تتبع الإعلانات وتحسين الاستهداف</p>
                                    <div className="mb-4">
                                        <label className="block text-xs font-bold text-black mb-1">Pixel ID</label>
                                        <input 
                                            type="text" 
                                            value={pixelId}
                                            onChange={(e) => setPixelId(e.target.value)}
                                            className="w-full bg-slate-50 border-[3px] border-slate-200 rounded-lg px-3 py-2 font-bold text-black focus:border-black focus:outline-none transition-colors text-sm"
                                            dir="ltr"
                                        />
                                    </div>
                                    <div className="flex justify-end items-center">
                                        <Button variant="secondary" size="sm">حفظ</Button>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Integration (Locked) */}
                            <div className="relative overflow-hidden bg-slate-100 border-[3px] border-slate-300 rounded-xl p-6 opacity-90 group">
                                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded border-2 border-white text-xs font-black z-10 flex items-center gap-1 shadow-md">
                                    <Lock size={12} /> Premium
                                </div>
                                <div className="filter blur-[2px] select-none pointer-events-none transition-all duration-300 group-hover:blur-[1px]">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-slate-200 rounded-xl border-2 border-slate-400 flex items-center justify-center text-slate-500">
                                            <Settings size={24} />
                                        </div>
                                        <h3 className="font-black text-xl text-slate-700">UPayments (بوابة الدفع)</h3>
                                    </div>
                                    <p className="text-sm font-bold text-slate-500 mb-6">قبول المدفوعات من عملائك عبر KNET و Visa</p>
                                    <div className="h-10 bg-slate-200 rounded-lg w-full mb-4"></div>
                                    <div className="h-10 bg-slate-200 rounded-lg w-2/3"></div>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center z-20 bg-slate-100/30">
                                    <Button className="bg-yellow-400 text-black border-black hover:bg-yellow-500 shadow-[4px_4px_0px_0px_#000]">
                                        ترقية لـ Premium
                                    </Button>
                                </div>
                            </div>

                            {/* Custom Code */}
                            <div className="bg-white border-[3px] border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_#000]">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-violet-100 rounded-lg border-2 border-black flex items-center justify-center text-violet-600">
                                            <Code size={20} />
                                        </div>
                                        <h3 className="font-black text-xl text-black">إضافة كود مخصص</h3>
                                    </div>
                                    <span className="bg-violet-100 text-violet-700 border-2 border-violet-500 px-2 py-0.5 rounded text-xs font-black">Pro+</span>
                                </div>
                                
                                <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-3 mb-6 text-sm font-bold text-yellow-800 flex items-center gap-2">
                                    <AlertTriangle size={16} /> كن حذراً! الأكواد الخاطئة قد تعطل موقعك
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="font-mono text-xs font-bold mb-1 block text-slate-600" dir="ltr">&lt;head&gt;</label>
                                        <textarea 
                                            value={headCode}
                                            onChange={(e) => setHeadCode(e.target.value)}
                                            className="w-full bg-[#1e1e1e] text-white font-mono text-sm p-4 rounded-lg h-32 dir-ltr border-2 border-black focus:outline-none focus:border-[#7C3AED]" 
                                            placeholder="<!-- Add tracking codes here -->"
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="font-mono text-xs font-bold mb-1 block text-slate-600" dir="ltr">End of &lt;body&gt;</label>
                                        <textarea 
                                            value={bodyCode}
                                            onChange={(e) => setBodyCode(e.target.value)}
                                            className="w-full bg-[#1e1e1e] text-white font-mono text-sm p-4 rounded-lg h-32 dir-ltr border-2 border-black focus:outline-none focus:border-[#7C3AED]" 
                                            placeholder="<!-- Add chat widgets here -->"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <Button variant="primary">حفظ</Button>
                                </div>
                            </div>
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
                            <p className="font-bold text-red-900 mb-6 flex items-center gap-2">
                                <AlertCircle size={18} /> الإجراءات في هذا القسم لا يمكن التراجع عنها
                            </p>

                            <div className="space-y-6">
                                {/* Unpublish */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-2 border-red-200">
                                    <div>
                                        <h3 className="font-black text-black">إلغاء النشر</h3>
                                        <p className="text-sm text-red-800/70 font-medium">سيتم إيقاف الموقع وإزالته من الإنترنت مؤقتاً</p>
                                    </div>
                                    <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">إلغاء النشر</Button>
                                </div>

                                {/* Transfer */}
                                <div className="pb-6 border-b-2 border-red-200">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                        <div>
                                            <h3 className="font-black text-black">نقل الملكية</h3>
                                            <p className="text-sm text-red-800/70 font-medium">نقل المشروع لحساب آخر</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <input 
                                            type="email" 
                                            placeholder="البريد الإلكتروني للمالك الجديد"
                                            className="flex-1 bg-white border-[3px] border-red-200 rounded-lg px-4 py-2 font-bold text-black focus:border-red-500 focus:outline-none transition-colors"
                                        />
                                        <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">نقل</Button>
                                    </div>
                                </div>

                                {/* Delete */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <h3 className="font-black text-black">حذف المشروع نهائياً</h3>
                                        <p className="text-sm text-red-800/70 font-medium">سيتم حذف جميع البيانات والملفات بشكل دائم</p>
                                    </div>
                                    <button 
                                        onClick={() => setIsDeleteModalOpen(true)}
                                        className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold border-[3px] border-black shadow-[4px_4px_0px_0px_#000] hover:bg-red-700 transition-all flex items-center gap-2"
                                    >
                                        <Trash2 size={18} /> حذف المشروع
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* DELETE MODAL */}
        <AnimatePresence>
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsDeleteModalOpen(false)}
                    ></motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-white border-[3px] border-red-600 rounded-2xl p-8 max-w-md w-full shadow-[8px_8px_0px_0px_#EF4444]"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-2xl font-black text-red-600 flex items-center gap-2">
                                <AlertTriangle size={28} strokeWidth={2.5} /> تأكيد الحذف
                            </h3>
                            <button onClick={() => setIsDeleteModalOpen(false)} className="text-slate-400 hover:text-black">
                                <X size={24} />
                            </button>
                        </div>

                        <p className="font-bold text-black mb-4">
                            هل أنت متأكد من حذف "<span className="text-red-600">{projectName}</span>"؟
                        </p>

                        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6 text-sm text-red-800 font-medium space-y-2">
                            <p>هذا الإجراء لا يمكن التراجع عنه وسيحذف:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>جميع الصفحات والمحتوى</li>
                                <li>جميع الصور والملفات</li>
                                <li>إعدادات الدومين</li>
                                <li>سجل التعديلات</li>
                            </ul>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-bold text-slate-600 mb-2">اكتب اسم المشروع للتأكيد:</label>
                            <input 
                                type="text" 
                                value={deleteConfirmation}
                                onChange={(e) => setDeleteConfirmation(e.target.value)}
                                className="w-full bg-white border-[3px] border-slate-300 rounded-lg px-4 py-3 font-bold text-black focus:border-red-600 focus:outline-none transition-colors"
                                placeholder={projectName}
                            />
                        </div>

                        <div className="flex gap-4">
                            <Button variant="secondary" fullWidth onClick={() => setIsDeleteModalOpen(false)}>إلغاء</Button>
                            <button 
                                onClick={handleDeleteProject}
                                disabled={deleteConfirmation !== projectName}
                                className="flex-1 bg-red-600 text-white font-bold rounded-xl border-[3px] border-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 transition-all shadow-[2px_2px_0px_0px_#000] active:translate-y-[1px] active:shadow-none"
                            >
                                🗑️ حذف نهائياً
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    </div>
  );
};

export default ProjectSettings;