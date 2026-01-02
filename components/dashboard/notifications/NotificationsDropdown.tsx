import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Check, Info, AlertTriangle, X } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
}

interface NotificationsDropdownProps {
  onClose: () => void;
}

const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({ onClose }) => {
  const notifications: Notification[] = [
    { id: '1', title: 'تم نشر موقعك بنجاح', message: 'موقع المطعم البحري أصبح متاحاً الآن للزوار.', time: 'منذ دقيقتين', type: 'success', read: false },
    { id: '2', title: 'تنبيه الرصيد', message: 'تبقي لديك 20 نقطة رصيد فقط.', time: 'منذ ساعة', type: 'warning', read: false },
    { id: '3', title: 'تحديث جديد', message: 'تم إضافة قوالب جديدة للمتاجر الإلكترونية.', time: 'منذ يوم', type: 'info', read: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute top-12 left-0 w-80 md:w-96 bg-white border-[3px] border-black rounded-xl shadow-[8px_8px_0px_0px_#000] overflow-hidden z-50"
    >
      <div className="flex items-center justify-between p-4 border-b-2 border-slate-100 bg-slate-50">
        <h3 className="font-black text-sm flex items-center gap-2">
          <Bell size={16} className="text-[#7C3AED]" /> الإشعارات
        </h3>
        <div className="flex gap-2">
            <button className="text-xs font-bold text-[#7C3AED] hover:underline">تحديد الكل كمقروء</button>
        </div>
      </div>

      <div className="max-h-[300px] overflow-y-auto">
        {notifications.length > 0 ? (
            notifications.map((notif) => (
                <div key={notif.id} className={`p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors relative ${notif.read ? 'opacity-60' : 'bg-violet-50/50'}`}>
                    {!notif.read && <div className="absolute top-4 right-4 w-2 h-2 bg-[#7C3AED] rounded-full"></div>}
                    <div className="flex gap-3">
                        <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0 ${
                            notif.type === 'success' ? 'bg-green-100 border-green-500 text-green-600' :
                            notif.type === 'warning' ? 'bg-yellow-100 border-yellow-500 text-yellow-600' :
                            'bg-blue-100 border-blue-500 text-blue-600'
                        }`}>
                            {notif.type === 'success' ? <Check size={14} strokeWidth={3} /> : 
                             notif.type === 'warning' ? <AlertTriangle size={14} strokeWidth={3} /> : 
                             <Info size={14} strokeWidth={3} />}
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-black mb-1">{notif.title}</h4>
                            <p className="text-xs text-slate-600 font-medium mb-2 leading-relaxed">{notif.message}</p>
                            <span className="text-[10px] font-bold text-slate-400">{notif.time}</span>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <div className="p-8 text-center text-slate-500 font-bold text-sm">
                لا توجد إشعارات جديدة
            </div>
        )}
      </div>
      
      <div className="p-2 border-t-2 border-slate-100 bg-slate-50 text-center">
        <button className="text-xs font-bold text-black hover:text-[#7C3AED]">عرض كل الإشعارات</button>
      </div>
    </motion.div>
  );
};

export default NotificationsDropdown;