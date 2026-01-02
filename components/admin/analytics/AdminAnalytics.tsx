import React, { useState } from 'react';
import { Users, Folder, Globe, DollarSign, TrendingUp, TrendingDown, Calendar, ArrowDown } from 'lucide-react';

const AdminAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');

  // Key Metrics Data
  const metrics = [
    { label: 'New Users', value: '156', change: '+12%', trend: 'up', icon: Users, color: 'text-[#3B82F6]', bg: 'bg-[#3B82F6]/10', border: 'border-[#3B82F6]/30' },
    { label: 'New Projects', value: '423', change: '+8%', trend: 'up', icon: Folder, color: 'text-[#FACC15]', bg: 'bg-[#FACC15]/10', border: 'border-[#FACC15]/30' },
    { label: 'Published Sites', value: '89', change: '+15%', trend: 'up', icon: Globe, color: 'text-[#22C55E]', bg: 'bg-[#22C55E]/10', border: 'border-[#22C55E]/30' },
    { label: 'Total Revenue', value: '12,450 KD', change: '+18%', trend: 'up', icon: DollarSign, color: 'text-[#7C3AED]', bg: 'bg-[#7C3AED]/10', border: 'border-[#7C3AED]/30' },
  ];

  // Simple SVG Line Chart Component
  const LineChart = () => (
    <div className="h-64 w-full relative">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-[#666]">
            <span>100</span><span>75</span><span>50</span><span>25</span><span>0</span>
        </div>
        {/* Chart */}
        <svg className="absolute inset-0 h-full w-full pl-6" preserveAspectRatio="none">
            <polyline 
                fill="none" 
                stroke="#7C3AED" 
                strokeWidth="3" 
                points="0,200 50,180 100,120 150,140 200,80 250,90 300,40 350,60 400,20 450,50 500,10" 
            />
            {/* Dots */}
            {[
                [0,200], [50,180], [100,120], [150,140], [200,80], 
                [250,90], [300,40], [350,60], [400,20], [450,50], [500,10]
            ].map(([x,y], i) => (
                <circle key={i} cx={x} cy={y} r="4" fill="#0A0A0A" stroke="#7C3AED" strokeWidth="2" />
            ))}
        </svg>
        {/* X Axis */}
        <div className="absolute bottom-0 left-6 right-0 flex justify-between text-[10px] text-[#666] pt-2">
            <span>1 Dec</span><span>5 Dec</span><span>10 Dec</span><span>15 Dec</span><span>20 Dec</span><span>25 Dec</span><span>30 Dec</span>
        </div>
    </div>
  );

  // Simple SVG Area Chart Component
  const AreaChart = () => (
    <div className="h-64 w-full relative">
        <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-[#666]">
            <span>5k</span><span>3.75k</span><span>2.5k</span><span>1.25k</span><span>0</span>
        </div>
        <svg className="absolute inset-0 h-full w-full pl-6" preserveAspectRatio="none">
            <defs>
                <linearGradient id="purpleGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                </linearGradient>
            </defs>
            {/* Dashed Previous Period */}
            <polyline 
                fill="none" 
                stroke="#444" 
                strokeWidth="2" 
                strokeDasharray="5,5"
                points="0,180 100,160 200,140 300,150 400,120 500,130" 
            />
            {/* Current Period Area */}
            <path 
                d="M0,150 L100,120 L200,90 L300,100 L400,50 L500,20 V256 H0 Z" 
                fill="url(#purpleGradient)" 
            />
            <polyline 
                fill="none" 
                stroke="#7C3AED" 
                strokeWidth="3" 
                points="0,150 100,120 200,90 300,100 400,50 500,20" 
            />
        </svg>
    </div>
  );

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-white mb-1">Analytics & Stats</h1>
            <p className="text-[#A0A0A0] text-sm">Platform performance overview.</p>
        </div>
        
        <div className="flex bg-[#1A1A1A] border border-[#333333] rounded overflow-hidden">
            {['Today', 'Week', 'Month', '3 Months', 'Year'].map((range) => (
                <button 
                    key={range}
                    onClick={() => setTimeRange(range.toLowerCase())}
                    className={`px-3 py-2 text-xs font-bold transition-colors ${timeRange === range.toLowerCase() ? 'bg-[#333] text-white' : 'text-[#666] hover:text-white'}`}
                >
                    {range}
                </button>
            ))}
            <button className="px-3 py-2 border-l border-[#333333] text-[#A0A0A0] hover:text-white text-xs">
                <Calendar size={14} />
            </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => (
            <div key={idx} className={`p-4 rounded-lg border ${metric.bg} ${metric.border}`}>
                <div className="flex justify-between items-start mb-2">
                    <span className={`text-xs font-bold ${metric.color}`}>{metric.label}</span>
                    <metric.icon size={16} className={metric.color} />
                </div>
                <div className="text-2xl font-mono font-bold text-white mb-1">{metric.value}</div>
                <div className={`text-xs font-bold flex items-center gap-1 ${metric.trend === 'up' ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                    {metric.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {metric.change}
                </div>
            </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-white">User Growth</h3>
                <div className="text-xs text-[#666]">Daily Signups</div>
            </div>
            <LineChart />
        </div>

        {/* Revenue */}
        <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-white">Revenue</h3>
                <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1 text-[#7C3AED]"><span className="w-2 h-2 rounded-full bg-[#7C3AED]"></span> Current</span>
                    <span className="flex items-center gap-1 text-[#666]"><span className="w-2 h-2 rounded-full bg-[#666]"></span> Previous</span>
                </div>
            </div>
            <AreaChart />
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Subscription Distribution (Donut) */}
        <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-6 flex flex-col">
            <h3 className="font-bold text-white mb-6">Subscriptions</h3>
            <div className="flex-1 flex items-center justify-center relative mb-6">
                {/* CSS Conic Gradient Donut */}
                <div 
                    className="w-48 h-48 rounded-full relative"
                    style={{ background: 'conic-gradient(#333 0% 45%, #7C3AED 45% 80%, #F97316 80% 95%, #FACC15 95% 100%)' }}
                >
                    <div className="absolute inset-4 bg-[#1A1A1A] rounded-full flex items-center justify-center flex-col">
                        <span className="text-3xl font-black text-white">3,891</span>
                        <span className="text-xs text-[#A0A0A0]">Total Active</span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs font-bold">
                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#333] rounded"></span> Basic (45%)</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#7C3AED] rounded"></span> Pro (35%)</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#F97316] rounded"></span> Premium (15%)</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#FACC15] rounded"></span> Enterprise (5%)</div>
            </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-6">
            <h3 className="font-bold text-white mb-6">Top Countries</h3>
            <div className="space-y-4">
                {[
                    { country: 'Kuwait', flag: '🇰🇼', percent: 65, color: 'bg-[#7C3AED]' },
                    { country: 'Saudi Arabia', flag: '🇸🇦', percent: 20, color: 'bg-[#22C55E]' },
                    { country: 'UAE', flag: '🇦🇪', percent: 8, color: 'bg-[#F97316]' },
                    { country: 'Qatar', flag: '🇶🇦', percent: 4, color: 'bg-[#A855F7]' },
                    { country: 'Others', flag: '🌍', percent: 3, color: 'bg-[#666666]' },
                ].map((item) => (
                    <div key={item.country}>
                        <div className="flex justify-between text-xs font-bold text-white mb-1">
                            <span className="flex items-center gap-2">{item.flag} {item.country}</span>
                            <span>{item.percent}%</span>
                        </div>
                        <div className="w-full h-2 bg-[#333] rounded-full overflow-hidden">
                            <div className={`h-full ${item.color}`} style={{ width: `${item.percent}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Funnel Analysis */}
        <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-6">
            <h3 className="font-bold text-white mb-6">Conversion Funnel</h3>
            <div className="space-y-6 relative">
                <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-[#333] -z-10"></div>
                
                {[
                    { label: 'Website Visits', value: '10,000', percent: '100%', color: 'bg-[#666]' },
                    { label: 'Sign Ups', value: '2,500', percent: '25%', color: 'bg-[#3B82F6]' },
                    { label: 'Started Trial', value: '1,200', percent: '12%', color: 'bg-[#FACC15]' },
                    { label: 'Paid Subscription', value: '450', percent: '4.5%', color: 'bg-[#22C55E]' },
                ].map((step, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#1A1A1A] border-2 border-[#333] flex items-center justify-center text-xs font-bold text-[#666]">
                            {idx + 1}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between text-xs font-bold text-white mb-1">
                                <span>{step.label}</span>
                                <span className="text-[#A0A0A0]">{step.value}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 h-3 bg-[#333] rounded overflow-hidden">
                                    <div className={`h-full ${step.color}`} style={{ width: parseFloat(step.percent) > 100 ? '100%' : step.percent }}></div>
                                </div>
                                <span className="text-[10px] font-mono text-[#A0A0A0] w-8 text-right">{step.percent}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-[#333] flex justify-between items-center text-xs">
                <span className="text-[#666]">Overall Conversion Rate</span>
                <span className="text-[#22C55E] font-bold text-lg">4.5%</span>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AdminAnalytics;