import React, { useState } from 'react';
import { Search, Filter, Download, Users, CheckCircle, DollarSign, ExternalLink, MoreVertical, Link as LinkIcon, CheckCircle2, Wallet } from 'lucide-react';
import ReferralDetailModal from './ReferralDetailModal';

const AdminReferrals: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedReferrer, setSelectedReferrer] = useState<any>(null);

  // Mock Data
  const referrers = [
    { id: '1', name: 'محمد أحمد', email: 'mohammed@example.com', code: 'MOH123', referrals: 45, activeReferrals: 32, earnings: '456 د.ك', status: 'active' },
    { id: '2', name: 'سارة علي', email: 'sarah@example.com', code: 'SAR456', referrals: 23, activeReferrals: 18, earnings: '234 د.ك', status: 'active' },
    { id: '3', name: 'خالد محمد', email: 'khaled@example.com', code: 'KHA789', referrals: 12, activeReferrals: 5, earnings: '78 د.ك', status: 'pending' },
    { id: '4', name: 'Tech Blog KW', email: 'contact@techkw.com', code: 'TECHKW', referrals: 156, activeReferrals: 110, earnings: '1,560 د.ك', status: 'active' },
    { id: '5', name: 'فهد العنزي', email: 'fahad@example.com', code: 'FAH999', referrals: 2, activeReferrals: 0, earnings: '0 د.ك', status: 'inactive' },
  ];

  const filteredReferrers = referrers.filter(ref => 
    (filterStatus === 'all' || ref.status === filterStatus) &&
    (ref.name.includes(searchQuery) || ref.code.includes(searchQuery))
  );

  return (
    <div className="space-y-8" dir="rtl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                ━━━━━━━━━━━━━━ إدارة الإحالات
            </h1>
            <p className="text-[#A0A0A0] text-sm">تابع وأدر شركاء النجاح والعمولات.</p>
        </div>
        
        <div className="flex gap-3">
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="بحث..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-[#1A1A1A] border border-[#333] text-white pr-10 pl-4 py-2 rounded focus:outline-none focus:border-[#7C3AED] transition-colors text-sm w-64"
                />
                <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666]" />
            </div>
            
            <div className="flex bg-[#1A1A1A] border border-[#333] rounded overflow-hidden">
                <button onClick={() => setFilterStatus('all')} className={`px-3 py-2 text-xs font-bold transition-colors ${filterStatus === 'all' ? 'bg-[#333] text-white' : 'text-[#666] hover:text-white'}`}>الكل</button>
                <button onClick={() => setFilterStatus('active')} className={`px-3 py-2 text-xs font-bold transition-colors ${filterStatus === 'active' ? 'bg-[#333] text-white' : 'text-[#666] hover:text-white'}`}>نشط</button>
                <button onClick={() => setFilterStatus('pending')} className={`px-3 py-2 text-xs font-bold transition-colors ${filterStatus === 'pending' ? 'bg-[#333] text-white' : 'text-[#666] hover:text-white'}`}>معلق</button>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#333] text-white rounded hover:bg-[#2A2A2A] transition-colors text-xs font-bold">
                <Download size={14} /> تصدير
            </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#1A1A1A] p-6 rounded-xl border border-[#333]">
        <div className="flex items-center gap-4 border-l border-[#333] pl-6">
            <div className="w-12 h-12 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6]">
                <LinkIcon size={24} />
            </div>
            <div>
                <div className="text-3xl font-black text-white">234</div>
                <div className="text-xs font-bold text-[#888]">إجمالي الإحالات</div>
            </div>
        </div>
        <div className="flex items-center gap-4 border-l border-[#333] pl-6">
            <div className="w-12 h-12 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E]">
                <CheckCircle2 size={24} />
            </div>
            <div>
                <div className="text-3xl font-black text-white">156</div>
                <div className="text-xs font-bold text-[#888]">إحالات ناجحة</div>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#FACC15]/10 border border-[#FACC15]/30 flex items-center justify-center text-[#FACC15]">
                <Wallet size={24} />
            </div>
            <div>
                <div className="text-3xl font-black text-white">1,234 د.ك</div>
                <div className="text-xs font-bold text-[#888]">عمولات مدفوعة</div>
            </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0A0A0A] border border-[#333] rounded-lg overflow-hidden">
        <table className="w-full text-right border-collapse">
            <thead>
                <tr className="bg-[#1A1A1A] text-[#888] text-xs uppercase border-b border-[#333]">
                    <th className="p-4">المُحيل</th>
                    <th className="p-4">رمز الإحالة</th>
                    <th className="p-4">الإحالات</th>
                    <th className="p-4">الأرباح</th>
                    <th className="p-4">الحالة</th>
                    <th className="p-4"></th>
                </tr>
            </thead>
            <tbody>
                {filteredReferrers.map((referrer) => (
                    <tr 
                        key={referrer.id} 
                        className="border-b border-[#222] hover:bg-[#161616] transition-colors cursor-pointer group"
                        onClick={() => setSelectedReferrer(referrer)}
                    >
                        <td className="p-4">
                            <div className="font-bold text-white text-sm">{referrer.name}</div>
                            <div className="text-[#666] text-xs">{referrer.email}</div>
                        </td>
                        <td className="p-4">
                            <span className="font-mono bg-[#333] px-2 py-1 rounded text-[#CCC] text-xs border border-[#555]">{referrer.code}</span>
                        </td>
                        <td className="p-4">
                            <div className="text-white font-bold">{referrer.referrals}</div>
                            <div className="text-[#666] text-xs">({referrer.activeReferrals} نشط)</div>
                        </td>
                        <td className="p-4 text-[#FACC15] font-bold">{referrer.earnings}</td>
                        <td className="p-4">
                            {referrer.status === 'active' ? (
                                <span className="bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30 px-2 py-1 rounded text-xs font-bold">نشط</span>
                            ) : (
                                <span className="bg-[#FACC15]/10 text-[#FACC15] border border-[#FACC15]/30 px-2 py-1 rounded text-xs font-bold">معلق</span>
                            )}
                        </td>
                        <td className="p-4 text-left">
                            <button className="p-2 text-[#666] hover:text-white hover:bg-[#333] rounded transition-colors">
                                <ExternalLink size={16} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

      {selectedReferrer && (
          <ReferralDetailModal 
            referrer={selectedReferrer} 
            onClose={() => setSelectedReferrer(null)} 
          />
      )}

    </div>
  );
};

export default AdminReferrals;