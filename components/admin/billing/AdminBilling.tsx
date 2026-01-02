import React, { useState } from 'react';
import { Search, Download, DollarSign, TrendingUp, Gift, AlertTriangle, Check, X as XIcon, FileText, Apple, CreditCard } from 'lucide-react';
import InvoiceModal from './InvoiceModal';

const AdminBilling: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  // Stats
  const stats = [
    { label: '💰 This Month', value: '8,450 KWD', change: '+24%', trend: 'up', icon: DollarSign, color: 'text-[#22C55E]' },
    { label: '📈 Growth', value: '+24%', change: 'vs last mo', trend: 'up', icon: TrendingUp, color: 'text-[#3B82F6]' },
    { label: '🎁 Credits Sold', value: '45,230', change: 'Total', trend: 'up', icon: Gift, color: 'text-[#7C3AED]' },
    { label: '⚠️ Expiring', value: '12,340', change: 'Next 7 days', trend: 'down', icon: AlertTriangle, color: 'text-[#EF4444]' },
  ];

  // Transactions
  const transactions = [
    { id: '#12345', user: 'أحمد محمد', email: 'ahmed@email.com', package: 'Popular', credits: 720, amount: '20.000 KWD', provider: 'Apple', date: 'Today', status: 'paid' },
    { id: '#12344', user: 'Sara Ali', email: 'sara@email.com', package: 'Power', credits: 1300, amount: '35.000 KWD', provider: 'Tap', date: 'Today', status: 'paid' },
    { id: '#12343', user: 'Mohammed K.', email: 'm.k@email.com', package: 'Starter', credits: 120, amount: '5.000 KWD', provider: 'Tap', date: 'Yesterday', status: 'paid' },
    { id: '#12342', user: 'Fatima H.', email: 'fatima@email.com', package: 'Enterprise', credits: 7000, amount: '150.000 KWD', provider: 'Apple', date: '2 days ago', status: 'paid' },
    { id: '#12341', user: 'Khaled J.', email: 'khaled@email.com', package: 'Popular', credits: 720, amount: '20.000 KWD', provider: 'Tap', date: '3 days ago', status: 'failed' },
  ];

  const filteredTransactions = transactions.filter(t => 
    (filterStatus === 'all' || t.status === filterStatus) &&
    (t.user.includes(searchQuery) || t.id.includes(searchQuery))
  );

  return (
    <div className="space-y-8 min-h-[calc(100vh-100px)]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-white mb-1">Credit Purchases</h1>
            <p className="text-[#A0A0A0] text-sm">Monitor credit sales and expiry.</p>
        </div>
        <div className="flex flex-wrap gap-3">
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Search purchases..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-[#1A1A1A] border border-[#333333] text-white pl-10 pr-4 py-2 rounded focus:outline-none focus:border-[#7C3AED] transition-colors w-64"
                />
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]" />
            </div>
            
            <div className="flex bg-[#1A1A1A] border border-[#333333] rounded overflow-hidden">
                <button onClick={() => setFilterStatus('all')} className={`px-3 py-2 text-xs font-bold transition-colors ${filterStatus === 'all' ? 'bg-[#333] text-white' : 'text-[#666] hover:text-white'}`}>All</button>
                <button onClick={() => setFilterStatus('paid')} className={`px-3 py-2 text-xs font-bold transition-colors ${filterStatus === 'paid' ? 'bg-[#333] text-white' : 'text-[#666] hover:text-white'}`}>Paid</button>
                <button onClick={() => setFilterStatus('failed')} className={`px-3 py-2 text-xs font-bold transition-colors ${filterStatus === 'failed' ? 'bg-[#333] text-white' : 'text-[#666] hover:text-white'}`}>Failed</button>
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#333] text-white font-bold rounded hover:bg-[#333] transition-colors">
                <Download size={18} /> Export CSV
            </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
            <div key={idx} className="bg-[#1A1A1A] border border-[#333333] p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[#A0A0A0] text-xs font-bold uppercase">{stat.label}</span>
                    <stat.icon size={16} className={stat.color} />
                </div>
                <div className="text-2xl font-mono font-bold text-white mb-1">{stat.value}</div>
                <div className={`text-xs font-bold ${stat.trend === 'up' ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                    {stat.change}
                </div>
            </div>
        ))}
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#1A1A1A] border border-[#333] rounded-lg p-6">
              <h3 className="text-white font-bold mb-6">Credits Purchased vs Used</h3>
              <div className="h-64 relative flex items-end justify-between gap-2 pt-10">
                  {/* Mock Chart Lines */}
                  <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                        <polyline 
                            fill="none" 
                            stroke="#7C3AED" 
                            strokeWidth="3" 
                            points="0,200 50,180 100,120 150,140 200,80 250,90 300,40 350,60 400,20 450,50 500,10" 
                        />
                        <polyline 
                            fill="none" 
                            stroke="#666" 
                            strokeWidth="2" 
                            strokeDasharray="5,5"
                            points="0,220 50,200 100,180 150,160 200,140 250,130 300,100 350,110 400,90 450,100 500,80" 
                        />
                  </svg>
                  <div className="absolute top-0 right-0 flex gap-4 text-xs">
                      <span className="text-[#7C3AED] font-bold">Purchased</span>
                      <span className="text-[#666] font-bold">Consumed</span>
                  </div>
              </div>
          </div>
          <div className="bg-[#1A1A1A] border border-[#333] rounded-lg p-6">
              <h3 className="text-white font-bold mb-6">Package Distribution</h3>
              <div className="flex flex-col items-center justify-center h-48 mb-4 relative">
                   <div 
                        className="w-40 h-40 rounded-full relative"
                        style={{ background: 'conic-gradient(#7C3AED 0% 55%, #F97316 55% 80%, #666 80% 95%, #FACC15 95% 100%)' }}
                    ></div>
              </div>
              <div className="space-y-2 text-xs text-[#A0A0A0]">
                  <div className="flex justify-between">
                      <span className="flex items-center gap-2"><span className="w-2 h-2 bg-[#7C3AED] rounded-full"></span> Popular (55%)</span>
                      <span className="text-white font-bold">450 sales</span>
                  </div>
                  <div className="flex justify-between">
                      <span className="flex items-center gap-2"><span className="w-2 h-2 bg-[#F97316] rounded-full"></span> Power (25%)</span>
                      <span className="text-white font-bold">205 sales</span>
                  </div>
                  <div className="flex justify-between">
                      <span className="flex items-center gap-2"><span className="w-2 h-2 bg-[#666] rounded-full"></span> Starter (15%)</span>
                      <span className="text-white font-bold">120 sales</span>
                  </div>
                  <div className="flex justify-between">
                      <span className="flex items-center gap-2"><span className="w-2 h-2 bg-[#FACC15] rounded-full"></span> Enterprise (5%)</span>
                      <span className="text-white font-bold">40 sales</span>
                  </div>
              </div>
          </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
                <thead>
                    <tr className="border-b border-[#333333] bg-[#0A0A0A]">
                        <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">ID</th>
                        <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">User</th>
                        <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Package</th>
                        <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Credits</th>
                        <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Amount</th>
                        <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Provider</th>
                        <th className="p-4 text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTransactions.map((tx) => (
                        <tr 
                            key={tx.id} 
                            onClick={() => setSelectedInvoice(tx)}
                            className="border-b border-[#333333] hover:bg-[#2A2A2A] transition-colors cursor-pointer group"
                        >
                            <td className="p-4 font-mono text-[#7C3AED] font-bold">
                                {tx.id}
                            </td>
                            <td className="p-4">
                                <div className="font-bold text-white">{tx.user}</div>
                                <div className="text-xs text-[#666]">{tx.email}</div>
                            </td>
                            <td className="p-4 text-white font-bold">{tx.package}</td>
                            <td className="p-4 font-mono text-[#FACC15]">{tx.credits}</td>
                            <td className="p-4 text-white">{tx.amount}</td>
                            <td className="p-4">
                                {tx.provider === 'Apple' ? (
                                    <span className="flex items-center gap-1 text-white"><Apple size={14} /> Apple</span>
                                ) : (
                                    <span className="flex items-center gap-1 text-[#3B82F6]"><CreditCard size={14} /> Tap</span>
                                )}
                            </td>
                            <td className="p-4 text-[#666]">{tx.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      <InvoiceModal invoice={selectedInvoice} onClose={() => setSelectedInvoice(null)} />

    </div>
  );
};

export default AdminBilling;