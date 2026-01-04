"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowRight, Monitor, Tablet, Smartphone, 
  RefreshCw, Edit, Rocket, Share2
} from "lucide-react";
// Fixed: Standardized casing for Button.tsx import
import Button from "../../../../../components/ui/Button.tsx";
import { cn } from "../../../../../lib/utils/cn.ts";

type DeviceType = "desktop" | "tablet" | "mobile";

const deviceSizes = {
  desktop: { width: "100%", label: "سطح المكتب" },
  tablet: { width: "768px", label: "تابلت" },
  mobile: { width: "375px", label: "جوال" },
};

/**
 * PreviewPage component allows users to view their AI-generated website
 * across multiple device viewports.
 */
export default function PreviewPage() {
  const params = useParams();
  const projectId = params?.id as string;
  
  const [device, setDevice] = React.useState<DeviceType>("desktop");
  const [key, setKey] = React.useState(0);

  const handleRefresh = () => setKey(k => k + 1);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col -m-6 bg-surface-secondary" dir="rtl">
      {/* Preview Navigation Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b-3 border-black z-30">
        <div className="flex items-center gap-4">
          <Link href={`/dashboard/projects/${projectId}/builder`}>
            <Button variant="ghost" size="sm">
              <ArrowRight className="h-4 w-4 ml-2" />
              العودة للمحرر
            </Button>
          </Link>
          <div className="h-6 w-[2px] bg-black/10" />
          <h1 className="font-black">معاينة: صالون الجمال</h1>
        </div>

        {/* Central Controls */}
        <div className="flex items-center border-3 border-black rounded-lg overflow-hidden bg-white">
          {(Object.keys(deviceSizes) as DeviceType[]).map((d) => (
            <button
              key={d}
              onClick={() => setDevice(d)}
              className={cn(
                "p-2.5 transition-all",
                device === d ? "bg-brand-violet text-white" : "hover:bg-surface-secondary text-content-primary"
              )}
              title={deviceSizes[d].label}
            >
              {d === "desktop" && <Monitor className="h-5 w-5" />}
              {d === "tablet" && <Tablet className="h-5 w-5 border-x-2 border-transparent" />}
              {d === "mobile" && <Smartphone className="h-5 w-5" />}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 ml-2" />
            تحديث
          </Button>
          
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4 ml-2" />
            مشاركة
          </Button>

          <Link href={`/dashboard/projects/${projectId}/builder`}>
            <Button variant="secondary" size="sm">
              <Edit className="h-4 w-4 ml-2" />
              تعديل
            </Button>
          </Link>

          <Button variant="gradient" size="sm">
            <Rocket className="h-4 w-4 ml-2" />
            نشر الآن
          </Button>
        </div>
      </header>

      {/* Interactive Preview Area */}
      <div className="flex-1 overflow-auto p-8 flex justify-center items-start bg-surface-secondary relative">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ 
            backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
            backgroundSize: '24px 24px' 
        }} />

        <div
          key={key}
          className={cn(
            "bg-white border-3 border-black shadow-brutal-lg transition-all duration-500 rounded-2xl overflow-hidden min-h-[600px]",
            device === "desktop" ? "w-full" : device === "tablet" ? "w-[768px]" : "w-[375px]"
          )}
        >
          {/* Mock Website Preview Content */}
          <div className="p-0 font-arabic">
            <div className="bg-surface-dark text-white p-12 text-center relative overflow-hidden border-b-3 border-black">
              <div className="absolute inset-0 bg-brand-violet/20" />
              <div className="relative z-10">
                <h1 className="text-4xl md:text-5xl font-black mb-4">صالون الجمال الفاخر</h1>
                <p className="text-lg opacity-80 max-w-xl mx-auto font-bold">
                  تجربة تجميل استثنائية في قلب الكويت. نهتم بكل تفاصيل جمالك باستخدام أحدث التقنيات.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                  <Button variant="gradient" size="lg">حجز موعد</Button>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">خدماتنا</Button>
                </div>
              </div>
            </div>
            
            <div className="p-8 md:p-16 max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="group relative overflow-hidden rounded-xl border-3 border-black aspect-video shadow-brutal-sm hover:shadow-brutal transition-all">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/40 to-brand-violet/40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <span className="bg-white px-4 py-2 border-2 border-black font-black text-sm">معرض الصور {i}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-black mb-8 border-r-8 border-brand-violet pr-4">قائمة الخدمات</h2>
                <div className="grid gap-4">
                  {[
                    { name: "قص وتصفيف الشعر", price: "15 د.ك", desc: "قص شعر احترافي مع سشوار وماسك مغذي" },
                    { name: "صبغة شعر كاملة", price: "45 د.ك", desc: "أجود أنواع الصبغات العالمية المناسبة لشعرك" },
                  ].map((service, i) => (
                    <div key={i} className="p-6 border-3 border-black rounded-xl hover:translate-x-[-4px] transition-transform">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-black text-xl">{service.name}</h4>
                          <p className="text-content-secondary font-bold mt-1">{service.desc}</p>
                        </div>
                        <span className="font-black text-brand-violet text-lg">{service.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}