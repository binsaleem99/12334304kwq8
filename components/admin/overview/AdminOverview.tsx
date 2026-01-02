import React from 'react';
import { Users, Folder, Globe, DollarSign, TrendingUp, TrendingDown, ArrowUpRight, RefreshCw, MoreHorizontal } from 'lucide-react';

const AdminOverview: React.FC = () => {
  const metrics = [
    { label: 'Total Users', value: '1,247', change: '+23 this week', trend: 'up', icon: Users, color: 'text-[#3B82F6]' },
    { label: 'Active Projects', value: '3,891', change: '+156 this month', trend: 'up', icon: Folder, color: 'text-[#FACC15]' },
    { label: 'Monthly Revenue', value: '12,450 KD', change: '+18% vs last mo', trend: 'up', icon: DollarSign, color: 'text-[#22C55E]' },
    { label: 'Published Sites', value: '892', change: '-2 this week', trend: 'down', icon: Globe, color: 'text-[#7C3AED]' },
  ];

  const activities = [
    { user: 'محمد أحمد', action: 'subscribed to Pro', time: '5m ago', type: 'success' },
    { user: 'سارة علي', action: 'created a new project', time: '12m ago', type: 'neutral' },
    { user: 'مطعم البحر', action: 'published site', time: '25m ago', type: 'info' },
    { user: 'user@email.com', action: 'payment failed', time: '1h ago', type: 'error' },
    { user: 'System', action: 'New Template Added: Salon', time: '2h ago', type: 'neutral' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold text-white mb-1">Admin Dashboard</h1>
            <p className="text-[#A0A0A0] text-sm">Welcome back, Super Admin</p>
        </div>
        <div className="flex items-center gap-4">
            <span className="text-xs text-[#666666]">Last updated: Just now</span>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] border border-[#333333] text-white text-xs font-bold rounded hover:bg-[#2A2A2A] transition-colors">
                <RefreshCw size={14} /> Refresh
            </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => (
            <div key={idx} className="bg-[#1A1A1A] border border-[#333333] p-5 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                    <div className="text-[#A0A0A0] text-xs font-bold uppercase tracking-wider">{metric.label}</div>
                    <metric.icon size={20} className={metric.color} />
                </div>
                <div className="text-3xl font-mono font-bold text-white mb-2">{metric.value}</div>
                <div className={`text-xs font-bold flex items-center gap-1 ${metric.trend === 'up' ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                    {metric.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {metric.change}
                </div>
            </div>
        ))}
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Revenue Chart (CSS-only approximation) */}
        <div className="lg:col-span-2 bg-[#1A1A1A] border border-[#333333] rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-white">Revenue Overview</h3>
                <select className="bg-[#0A0A0A] border border-[#333333] text-xs text-white px-2 py-1 rounded focus:outline-none">
                    <option>Last 30 Days</option>
                    <option>Last 90 Days</option>
                </select>
            </div>
            
            {/* Chart Area */}
            <div className="h-64 relative flex items-end justify-between gap-2 pt-10">
                {/* Y-Axis Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    {[100, 75, 50, 25, 0].map(val => (
                        <div key={val} className="w-full h-px bg-[#333333] relative">
                            <span className="absolute -left-8 -top-2 text-[10px] text-[#666666]">{val}%</span>
                        </div>
                    ))}
                </div>

                {/* SVG Chart Line */}
                <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path 
                        d="M0,200 Q50,150 100,180 T200,120 T300,140 T400,80 T500,100 T600,40 T700,60 T800,20 L800,256 L0,256 Z" 
                        fill="url(#gradient)" 
                    />
                    <path 
                        d="M0,200 Q50,150 100,180 T200,120 T300,140 T400,80 T500,100 T600,40 T700,60 T800,20" 
                        fill="none" 
                        stroke="#7C3AED" 
                        strokeWidth="3" 
                    />
                </svg>
            </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-white">Recent Activity</h3>
                <button className="text-xs text-[#7C3AED] hover:underline">View All</button>
            </div>
            
            <div className="space-y-6 relative">
                <div className="absolute left-[11px] top-2 bottom-2 w-px bg-[#333333]"></div>
                
                {activities.map((item, idx) => (
                    <div key={idx} className="flex gap-4 relative">
                        <div className={`w-6 h-6 rounded-full border-2 border-[#1A1A1A] shrink-0 z-10 ${
                            item.type === 'success' ? 'bg-[#22C55E]' :
                            item.type === 'error' ? 'bg-[#EF4444]' :
                            item.type === 'info' ? 'bg-[#3B82F6]' : 'bg-[#666666]'
                        }`}></div>
                        <div>
                            <div className="text-sm text-white">
                                <span className="font-bold">{item.user}</span> <span className="text-[#A0A0A0]">{item.action}</span>
                            </div>
                            <div className="text-xs text-[#666666] mt-1">{item.time}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button className="bg-[#1A1A1A] border border-[#333333] hover:border-[#7C3AED] p-4 rounded-lg text-left group transition-all">
            <div className="text-[#7C3AED] mb-2 group-hover:scale-110 transition-transform origin-left">+</div>
            <div className="font-bold text-white text-sm">Add New User</div>
        </button>
        <button className="bg-[#1A1A1A] border border-[#333333] hover:border-[#7C3AED] p-4 rounded-lg text-left group transition-all">
            <div className="text-[#7C3AED] mb-2 group-hover:scale-110 transition-transform origin-left">+</div>
            <div className="font-bold text-white text-sm">Create Template</div>
        </button>
        <button className="bg-[#1A1A1A] border border-[#333333] hover:border-[#7C3AED] p-4 rounded-lg text-left group transition-all">
            <div className="text-[#7C3AED] mb-2 group-hover:scale-110 transition-transform origin-left">📊</div>
            <div className="font-bold text-white text-sm">Financial Report</div>
        </button>
        <button className="bg-[#1A1A1A] border border-[#333333] hover:border-[#7C3AED] p-4 rounded-lg text-left group transition-all">
            <div className="text-[#7C3AED] mb-2 group-hover:scale-110 transition-transform origin-left">🔧</div>
            <div className="font-bold text-white text-sm">System Health</div>
        </button>
      </div>
    </div>
  );
};

export default AdminOverview;