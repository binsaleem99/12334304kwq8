import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check, Palette } from 'lucide-react';

interface ColorPickerPanelProps {
  onClose: () => void;
  onChange: (color: string) => void;
}

const ColorPickerPanel: React.FC<ColorPickerPanelProps> = ({ onClose, onChange }) => {
  const [customHex, setCustomHex] = useState('#FFFFFF');

  const palettes = [
    { name: 'Neo Pop', colors: ['#7C3AED', '#FACC15', '#22C55E', '#EF4444', '#000000'] },
    { name: 'Oceanic', colors: ['#0F172A', '#334155', '#475569', '#94A3B8', '#E2E8F0'] },
    { name: 'Sunset', colors: ['#FFF7ED', '#FFEDD5', '#FDBA74', '#FB923C', '#EA580C'] },
    { name: 'Forest', colors: ['#F0FDF4', '#BBF7D0', '#86EFAC', '#4ADE80', '#16A34A'] },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute top-16 left-4 z-50 w-72 bg-white border-[3px] border-black rounded-xl shadow-[8px_8px_0px_0px_#000] overflow-hidden"
    >
      <div className="flex items-center justify-between p-3 border-b-2 border-slate-100 bg-slate-50">
        <h3 className="font-black text-sm flex items-center gap-2">
          <Palette size={16} /> ألوان الموقع
        </h3>
        <button onClick={onClose} className="hover:bg-slate-200 rounded p-1 transition-colors">
          <X size={16} />
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Preset Palettes */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-500 uppercase">لوحات جاهزة</label>
          <div className="space-y-2">
            {palettes.map((palette) => (
              <div 
                key={palette.name} 
                className="flex items-center gap-2 p-1 hover:bg-slate-50 rounded cursor-pointer border border-transparent hover:border-slate-200"
                onClick={() => onChange(palette.colors[0])}
              >
                <div className="flex rounded-lg overflow-hidden border border-slate-200 shadow-sm flex-1">
                  {palette.colors.map((c) => (
                    <div key={c} className="h-6 w-full" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Hex */}
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">لون مخصص</label>
          <div className="flex gap-2">
            <div className="w-10 h-10 rounded border-2 border-black shadow-sm" style={{ backgroundColor: customHex }}></div>
            <input 
              type="text" 
              value={customHex}
              onChange={(e) => { setCustomHex(e.target.value); onChange(e.target.value); }}
              className="flex-1 border-2 border-slate-200 rounded px-3 font-mono text-sm font-bold focus:border-black focus:outline-none uppercase"
              placeholder="#000000"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ColorPickerPanel;