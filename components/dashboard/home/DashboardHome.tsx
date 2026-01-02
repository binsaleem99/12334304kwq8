import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, MoreVertical, Smartphone, Monitor, Layout, Calendar, Folder } from 'lucide-react';
import { ViewState } from '../../../types';
import Button from '../../ui/Button';

interface DashboardHomeProps {
  onNavigate: (view: ViewState) => void;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const projects = [
    { 
      id: '1', 
      name: 'KWQ8 Store', 
      type: 'Mobile', 
      thumbnail: 'bg-violet-100', 
      updated: 'منذ 18 ساعة',
      icon: Smartphone 
    },
    { 
      id: '2', 
      name: 'VibeCode', 
      type: 'Web', 
      thumbnail: 'bg-zinc-800', 
      updated: 'منذ يوم',
      icon: Monitor 
    },
    { 
      id: '3', 
      name: 'Restaurant App', 
      type: 'Mobile', 
      thumbnail: 'bg-orange-100', 
      updated: 'منذ يومين',
      icon: Smartphone 
    },
    { 
      id: '4', 
      name: 'Portfolio Site', 
      type: 'Web', 
      thumbnail: 'bg-pink-100', 
      updated: 'منذ 3 أيام',
      icon: Layout 
    },
    { 
      id: '5', 
      name: 'Event Booking', 
      type: 'Web', 
      thumbnail: 'bg-green-100', 
      updated: 'منذ أسبوع',
      icon: Calendar 
    },
  ];

  const filteredProjects = projects.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-8 min-h-[80vh]">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
            <div>
                <h1 className="text-4xl font-black text-black mb-2 flex items-center gap-3">
                    مكتبة التطبيقات <Folder className="text-[#7C3AED]" />
                </h1>
                <p className="text-slate-500 font-bold">إدارة جميع تطبيقاتك ومواقعك في مكان واحد</p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
                 <Button 
                    onClick={() => onNavigate('dashboard-new-project')} 
                    className="flex items-center gap-2 bg-black text-white border-black hover:bg-slate-800 shadow-[4px_4px_0px_0px_#000] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all w-full md:w-auto justify-center"
                >
                    <Plus size={20} strokeWidth={3} />
                    <span>إنشاء جديد</span>
                </Button>
            </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
            <input 
                type="text" 
                placeholder="بحث في المكتبة..."
                className="w-full bg-white border-[3px] border-black rounded-xl px-4 py-3.5 pl-12 font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] focus:-translate-y-1 transition-all placeholder:text-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={22} strokeWidth={2.5} />
        </div>

        {/* Projects Grid - Roomy Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {/* Create New Card (Always First) */}
             <motion.button
                whileHover={{ y: -4, boxShadow: "6px 6px 0px 0px #000" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('dashboard-new-project')}
                className="bg-slate-50 border-[3px] border-black border-dashed rounded-2xl flex flex-col items-center justify-center gap-4 min-h-[280px] hover:bg-white hover:border-solid transition-all group"
            >
                <div className="w-16 h-16 rounded-full bg-white border-[3px] border-black flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <Plus size={32} className="text-black" strokeWidth={3} />
                </div>
                <span className="font-black text-slate-500 group-hover:text-black text-lg">إنشاء تطبيق جديد</span>
            </motion.button>

            {/* Project Cards */}
            {filteredProjects.map(project => (
                <motion.div 
                    key={project.id}
                    whileHover={{ y: -8, boxShadow: "8px 8px 0px 0px #000" }}
                    className="bg-white border-[3px] border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_#000] transition-all cursor-pointer group flex flex-col"
                    onClick={() => onNavigate('builder')}
                >
                    {/* Thumbnail Area */}
                    <div className={`aspect-[4/3] ${project.thumbnail} border-b-[3px] border-black relative flex items-center justify-center overflow-hidden`}>
                        {/* Mock UI Element in thumbnail */}
                        <div className="w-1/2 h-2/3 bg-white border-2 border-black rounded-lg shadow-sm opacity-50 group-hover:scale-105 transition-transform flex items-center justify-center">
                             <project.icon size={32} className="text-slate-300" />
                        </div>
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                            <span className="bg-black text-white px-4 py-2 rounded-lg font-bold text-sm">تعديل</span>
                        </div>
                    </div>
                    
                    {/* Info Area */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-black text-xl text-black leading-tight group-hover:underline decoration-2 underline-offset-2">{project.name}</h3>
                                <button className="text-slate-400 hover:text-black p-1 -mt-1 -ml-2 rounded hover:bg-slate-100 transition-colors">
                                    <MoreVertical size={20} />
                                </button>
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded border border-black ${
                                    project.type === 'Mobile' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                                }`}>
                                    {project.type}
                                </span>
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs font-bold text-slate-400 pt-4 border-t-2 border-slate-100 mt-auto">
                            <span>آخر تحديث: {project.updated}</span>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    </div>
  );
};

export default DashboardHome;