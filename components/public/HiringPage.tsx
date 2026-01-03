import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Zap, Heart, Globe, ArrowRight, Code, Palette, Search, Briefcase, MapPin, Clock, Coffee, Monitor, Pizza, Sofa } from 'lucide-react';
import { ViewState } from '../../types';
// Standardized casing for button import
import Button from '../ui/button.tsx';

interface HiringPageProps {
  onNavigate: (view: ViewState) => void;
}

const HiringPage: React.FC<HiringPageProps> = ({ onNavigate }) => {
  const jobs = [
    {
      id: '1',
      title: 'مهندس ذكاء اصطناعي (AI Engineer)',
      department: 'التقنية',
      type: 'دوام كامل',
      location: 'عن بعد / الكويت',
      icon: Code,
      accent: 'bg-violet-100 text-violet-700'
    },
    {
      id: '2',
      title: 'مصمم واجهات وتجربة مستخدم (UI/UX)',
      department: 'التصميم',
      type: 'دوام كامل',
      location: 'الكويت',
      icon: Palette,
      accent: 'bg-pink-100 text-pink-700'
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="text-center mb-20">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-black text-black mb-8"
                >
                    انضم إلى <span className="text-[#7C3AED]">فريقنا</span>
                </motion.h1>
                <p className="text-xl text-slate-600 font-bold max-w-2xl mx-auto">
                    نحن نبحث عن المبدعين والشغوفين الذين يرغبون في تغيير شكل الويب في العالم العربي.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {jobs.map((job) => (
                    <div key={job.id} className="bg-white border-[3px] border-black rounded-3xl p-8 shadow-neo-sm hover:shadow-neo transition-all group">
                        <div className={`w-12 h-12 rounded-xl ${job.accent} border-2 border-black flex items-center justify-center mb-6`}>
                            <job.icon size={24} />
                        </div>
                        <h3 className="text-2xl font-black text-black mb-4">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm font-bold text-slate-500 mb-8">
                            <span className="flex items-center gap-1"><Briefcase size={16} /> {job.department}</span>
                            <span className="flex items-center gap-1"><Clock size={16} /> {job.type}</span>
                            <span className="flex items-center gap-1"><MapPin size={16} /> {job.location}</span>
                        </div>
                        <Button variant="default" className="w-full">قدم الآن</Button>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default HiringPage;