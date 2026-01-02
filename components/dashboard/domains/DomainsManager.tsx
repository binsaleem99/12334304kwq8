import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Search, Check, X, Settings, RefreshCw, Copy, ExternalLink, ShieldCheck, Plus, AlertCircle, Link as LinkIcon, BookOpen } from 'lucide-react';
import { ViewState } from '../../../types';
import Button from '../../ui/Button';

interface DomainsManagerProps {
  onNavigate: (view: ViewState) => void;
}

const DomainsManager: React.FC<DomainsManagerProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [externalDomain, setExternalDomain] = useState('');
  const [showDNS, setShowDNS] = useState(false);

  // Mock Data
  const myDomains = [
    {
      id: '1',
      name: 'blue-sea-restaurant.kwq8.com',
      type: 'subdomain',
      project: 'موقع المطعم البحري',
      ssl: true,
      expiry: null,
    },
    {
      id: '2',
      name: 'luxe-perfumes.com',
      type: 'custom',
      project: 'متجر العطور الفاخرة',
      ssl: true,
      expiry: '15 أغسطس 2026',
    },
  ];

  const handleSearch = () => {
    if (!searchQuery) return;
    setIsSearching(true);
    // Simulate API search
    setTimeout(() => {
        setIsSearching(false);
        setSearchResults([
            { name: `${searchQuery}.kw`, available: true, price: '$12/سنة', freeWithPlan: true },
            { name: `${searchQuery}.com`, available: false, price: '', freeWithPlan: false },
            { name: `${searchQuery}.net`, available: true, price: '$9/سنة', freeWithPlan: true },
            { name: `${searchQuery}.io`, available: true, price: '$35/سنة', markupPrice: '$42', freeWithPlan: false },
        ]);
    }, 1000);
  };

  const handleConnectExternal = () => {
      if(externalDomain) setShowDNS(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add toast notification here
  };

  return (
    <div className="space-y-12 min-h-[80vh]">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-black mb-1">إدارة الدومينات 🌐</h1>
        <p className="text-slate-600 font-bold">إدارة نطاقاتك الحالية أو شراء نطاق جديد</p>
      </div>

      {/* 1. My Domains Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-black mb-4">دوميناتي</h2>
        
        {myDomains.map((domain) => (
            <div key={domain.id} className="bg-white border-[3px] border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_#000] flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden group">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <Globe size={24} className="text-[#7C3AED]" />
                        <h3 className="text-xl font-black text-black" dir="ltr">{domain.name}</h3>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded border border-black ${domain.type === 'subdomain' ? 'bg-yellow-300' : 'bg-violet-200'}`}>
                            {domain.type === 'subdomain' ? 'مجاني - KWQ8' : 'خاص'}
                        </span>
                    </div>
                    
                    <div className="space-y-1 text-sm font-medium text-slate-600">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-black"></span>
                            <span>متصل بـ: <span className="font-bold text-black">{domain.project}</span></span>
                        </div>
                        {domain.ssl && (
                            <div className="flex items-center gap-2 text-green-700 font-bold">
                                <ShieldCheck size={14} /> SSL: 🔒 آمن
                            </div>
                        )}
                        {domain.expiry && (
                            <div className="flex items-center gap-2 text-orange-700 font-bold">
                                <AlertCircle size={14} /> ينتهي: {domain.expiry} (8 أشهر)
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                    {domain.type === 'custom' && (
                        <Button variant="secondary" size="sm" className="h-10">
                            <RefreshCw size={16} className="ml-2" /> تجديد
                        </Button>
                    )}
                    <Button variant="outline" size="sm" className="h-10 border-black hover:bg-slate-50">
                        <Settings size={16} className="ml-2" /> إعدادات
                    </Button>
                </div>
            </div>
        ))}
      </div>

      {/* 2. Buy New Domain Section */}
      <div className="border-t-[3px] border-black/10 pt-8">
        <h2 className="text-xl font-black text-black mb-6">شراء دومين جديد</h2>
        
        <div className="bg-slate-50 border-[3px] border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_#000]">
            <div className="flex gap-3 mb-8">
                <div className="flex-1 relative">
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="البحث عن دومين..." 
                        className="w-full pl-4 pr-10 py-3 rounded-xl border-[3px] border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all font-bold text-lg"
                        dir="ltr"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
                <Button onClick={handleSearch} disabled={isSearching} className="w-32">
                    {isSearching ? 'جاري البحث...' : 'بحث'}
                </Button>
            </div>

            <AnimatePresence>
                {searchResults.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                    >
                        <h3 className="font-black text-black mb-4">نتائج البحث:</h3>
                        {searchResults.map((result, idx) => (
                            <div key={idx} className={`flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl border-2 transition-all ${
                                result.available 
                                ? 'bg-white border-green-200 hover:border-black hover:shadow-md' 
                                : 'bg-slate-100 border-slate-200 opacity-70'
                            }`}>
                                <div className="flex items-center gap-4 w-full sm:w-auto mb-3 sm:mb-0">
                                    <span className={`text-lg font-black ${result.available ? 'text-black' : 'text-slate-500 line-through'}`} dir="ltr">
                                        {result.name}
                                    </span>
                                    {result.available ? (
                                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded flex items-center gap-1 border border-green-200">
                                            <Check size={12} strokeWidth={3} /> متاح
                                        </span>
                                    ) : (
                                        <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded flex items-center gap-1 border border-red-200">
                                            <X size={12} strokeWidth={3} /> غير متاح
                                        </span>
                                    )}
                                </div>

                                {result.available && (
                                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                        <div className="text-right">
                                            {result.freeWithPlan ? (
                                                <div className="flex flex-col items-end">
                                                    <span className="text-sm font-bold text-slate-500 line-through">{result.price}</span>
                                                    <span className="text-xs font-black bg-yellow-300 px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_0px_#000]">
                                                        ◆ مجاني مع باقتك!
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-end">
                                                    <span className="text-lg font-black text-black">{result.markupPrice || result.price}</span>
                                                    {result.markupPrice && <span className="text-xs text-slate-500 font-bold">بعد الرسوم</span>}
                                                </div>
                                            )}
                                        </div>
                                        <Button size="sm" className="h-10 px-6">شراء</Button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            
            <div className="mt-6 flex items-center gap-2 text-sm font-bold text-violet-700 bg-violet-50 p-3 rounded-lg border border-violet-200 inline-block">
                <Check size={16} /> دومينات تحت $15 مجانية مع باقتك السنوية!
            </div>
        </div>
      </div>

      {/* 3. Connect External Domain Section */}
      <div className="border-t-[3px] border-black/10 pt-8">
        <h2 className="text-xl font-black text-black mb-6">ربط دومين خارجي</h2>
        
        <div className="bg-white border-[3px] border-black rounded-xl p-6 md:p-8 shadow-[4px_4px_0px_0px_#000]">
            <div className="mb-6">
                <p className="text-slate-600 font-bold mb-4">لديك دومين من مزود آخر (مثل GoDaddy أو Namecheap)؟ يمكنك ربطه بموقعك بسهولة.</p>
                <div className="flex gap-3 max-w-xl">
                    <input 
                        type="text" 
                        value={externalDomain}
                        onChange={(e) => setExternalDomain(e.target.value)}
                        placeholder="www.yourdomain.com" 
                        className="flex-1 px-4 py-3 rounded-xl border-[3px] border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all font-bold text-left"
                        dir="ltr"
                    />
                    <Button onClick={handleConnectExternal}>التحقق والربط</Button>
                </div>
            </div>

            <AnimatePresence>
                {showDNS && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="border-t-2 border-slate-100 pt-6 mt-6"
                    >
                        <h3 className="font-black text-black mb-4">إعدادات DNS المطلوبة:</h3>
                        <p className="text-sm text-slate-500 font-bold mb-4">قم بإضافة السجلات التالية في لوحة تحكم الدومين الخاص بك:</p>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[500px]">
                                <thead>
                                    <tr className="border-b-2 border-black bg-slate-50">
                                        <th className="p-3 font-black text-black">Type</th>
                                        <th className="p-3 font-black text-black">Name</th>
                                        <th className="p-3 font-black text-black">Value</th>
                                        <th className="p-3 font-black text-black w-20"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-slate-200">
                                        <td className="p-3 font-bold font-mono">CNAME</td>
                                        <td className="p-3 font-bold font-mono">www</td>
                                        <td className="p-3 font-bold font-mono text-[#7C3AED]">proxy.kwq8.com</td>
                                        <td className="p-3 text-right">
                                            <button onClick={() => copyToClipboard('proxy.kwq8.com')} className="text-slate-400 hover:text-black" title="نسخ"><Copy size={16} /></button>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-slate-200">
                                        <td className="p-3 font-bold font-mono">A</td>
                                        <td className="p-3 font-bold font-mono">@</td>
                                        <td className="p-3 font-bold font-mono text-[#7C3AED]">76.76.21.21</td>
                                        <td className="p-3 text-right">
                                            <button onClick={() => copyToClipboard('76.76.21.21')} className="text-slate-400 hover:text-black" title="نسخ"><Copy size={16} /></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-6">
                            <Button variant="secondary" size="sm" className="flex items-center gap-2">
                                <BookOpen size={16} /> دليل ربط الدومين الكامل
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>

    </div>
  );
};

export default DomainsManager;