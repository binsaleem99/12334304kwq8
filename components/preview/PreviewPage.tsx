import React, { useState, useRef, useEffect } from 'react';
import { X, Smartphone, Tablet, Monitor, ArrowRight, GripVertical } from 'lucide-react';
import { ViewState } from '../../types';
import MockWebsite from '../website/MockWebsite';
import { motion, AnimatePresence } from 'framer-motion';

interface PreviewPageProps {
  onNavigate: (view: ViewState) => void;
  projectName?: string;
}

type DeviceType = 'mobile' | 'tablet' | 'desktop';

/**
 * PreviewPage provides an interactive environment to test site responsiveness.
 */
// Refactored from React.FC to standard function to resolve children requirement errors
export default function PreviewPage({ onNavigate, projectName = "موقع المطعم البحري" }: PreviewPageProps) {
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [width, setWidth] = useState(1440); // Initial width for desktop
  const [isDragging, setIsDragging] = useState(false);
  
  // Refs for drag calculation
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleDeviceChange = (newDevice: DeviceType) => {
    setDevice(newDevice);
    switch (newDevice) {
        case 'mobile':
            setWidth(375);
            break;
        case 'tablet':
            setWidth(768);
            break;
        case 'desktop':
            setWidth(1440);
            break;
    }
  };

  // Drag to Resize Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !containerRef.current) return;
        
        // Find the center of the screen
        const screenCenter = window.innerWidth / 2;
        // Calculate distance from center to mouse pointer
        const distanceFromCenter = Math.abs(e.clientX - screenCenter);
        // New width is twice that distance (to keep it centered)
        const newWidth = Math.max(320, Math.min(1920, distanceFromCenter * 2));
        
        setWidth(Math.round(newWidth));
        setDevice('desktop'); // Switch to custom/desktop mode when resizing manually
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    if (isDragging) {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'ew-resize';
        document.body.style.userSelect = 'none';
    } else {
        document.body.style.cursor = 'default';
        document.body.style.userSelect = 'auto';
    }

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="h-screen flex flex-col bg-[#111] overflow-hidden font-sans" dir="rtl">
      
      {/* 1. PREVIEW BAR (Fixed Top) */}
      <div className="h-14 bg-[#0A0A0A] border-b border-white/10 flex items-center justify-between px-4 shrink-0 z-50">
        
        {/* Right: Actions */}
        <div className="flex items-center gap-4">
             <button 
                onClick={() => onNavigate('builder')}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-red-500 hover:text-white transition-colors"
                title="إغلاق"
             >
                <X size={18} />
             </button>
             <div className="h-6 w-[1px] bg-white/10"></div>
             <span className="font-bold text-white text-sm">{projectName}</span>
        </div>

        {/* Center: Device Toggles */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center bg-[#1A1A1A] p-1 rounded-lg border border-white/10">
            <button 
                onClick={() => handleDeviceChange('mobile')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    device === 'mobile' 
                    ? 'bg-[#7C3AED] text-white shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
            >
                <Smartphone size={16} /> <span>375</span>
            </button>
            <button 
                onClick={() => handleDeviceChange('tablet')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    device === 'tablet' 
                    ? 'bg-[#7C3AED] text-white shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
            >
                <Tablet size={16} /> <span>768</span>
            </button>
             <button 
                onClick={() => handleDeviceChange('desktop')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    device === 'desktop' 
                    ? 'bg-[#7C3AED] text-white shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
            >
                <Monitor size={16} /> <span>{width > 1200 ? 'Full' : width}</span>
            </button>
        </div>

        {/* Left: Publish Actions */}
        <div className="flex items-center gap-3">
             <button 
                onClick={() => onNavigate('builder')}
                className="text-slate-400 hover:text-white text-sm font-bold transition-colors"
             >
                ← العودة للتعديل
             </button>
             <button className="flex items-center gap-2 px-4 py-1.5 bg-[#7C3AED] text-white rounded-lg font-bold text-sm hover:bg-[#6D28D9] transition-all shadow-[0px_0px_10px_rgba(124,58,237,0.4)]">
                نشر <ArrowRight size={16} />
             </button>
        </div>
      </div>

      {/* 2. MAIN CANVAS AREA */}
      <div 
        className="flex-1 bg-[#1a1a1a] relative overflow-hidden flex flex-col items-center justify-center p-8"
        ref={containerRef}
      >
        {/* Checkered Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ 
            backgroundImage: `
                linear-gradient(45deg, #ccc 25%, transparent 25%), 
                linear-gradient(-45deg, #ccc 25%, transparent 25%), 
                linear-gradient(45deg, transparent 75%, #ccc 75%), 
                linear-gradient(-45deg, transparent 75%, #ccc 75%)`,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px' 
        }}></div>
        
        {/* Device Frame Wrapper */}
        <motion.div
            layout
            initial={false}
            animate={{ 
                width: width,
                height: device === 'mobile' ? '750px' : device === 'tablet' ? '1024px' : '90%',
            }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            className={`relative bg-white transition-all shadow-2xl flex flex-col shrink-0 ${
                device === 'mobile' 
                ? 'rounded-[40px] border-[12px] border-[#0A0A0A]' 
                : device === 'tablet'
                ? 'rounded-[24px] border-[12px] border-[#0A0A0A]'
                : 'rounded-[12px] border-[4px] border-[#2A2A2A]'
            }`}
            style={{ 
                maxWidth: '100%',
                maxHeight: '95%'
            }}
        >
            {/* Mobile/Tablet Notch/Camera Simulation */}
            {(device === 'mobile' || device === 'tablet') && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-[#0A0A0A] rounded-b-xl z-20"></div>
            )}
            
            {/* Desktop Traffic Lights */}
            {device === 'desktop' && (
                <div className="h-8 bg-[#f0f0f0] border-b border-gray-300 flex items-center px-4 gap-2 shrink-0 rounded-t-lg">
                     <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10"></div>
                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10"></div>
                        <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10"></div>
                    </div>
                    <div className="flex-1 text-center">
                        <div className="bg-white border border-gray-200 rounded text-xs text-gray-500 py-0.5 px-2 inline-block w-64 truncate">
                            https://preview.kwq8.com/project-id
                        </div>
                    </div>
                </div>
            )}

            {/* Content IFrame/Container */}
            <div className={`flex-1 bg-white overflow-hidden relative ${
                (device === 'mobile' || device === 'tablet') ? 'rounded-[28px]' : 'rounded-b-lg'
            }`}>
                 <div className="h-full w-full overflow-y-auto scrollbar-hide">
                    {/* Reuse the mock content */}
                    <MockWebsite />
                 </div>
            </div>

            {/* Resize Handles (Only for Desktop Mode) */}
            {device === 'desktop' && (
                <>
                    <div 
                        className="absolute top-1/2 -right-6 -translate-y-1/2 w-4 h-16 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center cursor-ew-resize transition-colors"
                        onMouseDown={() => setIsDragging(true)}
                    >
                        <GripVertical size={12} className="text-white/50" />
                    </div>
                    <div 
                        className="absolute top-1/2 -left-6 -translate-y-1/2 w-4 h-16 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center cursor-ew-resize transition-colors"
                        onMouseDown={() => setIsDragging(true)}
                    >
                        <GripVertical size={12} className="text-white/50" />
                    </div>
                </>
            )}

            {/* Width Indicator (While Dragging) */}
            <AnimatePresence>
                {isDragging && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-[#7C3AED] text-white px-3 py-1 rounded font-bold text-xs"
                    >
                        {width}px
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
      </div>
    </div>
  );
}