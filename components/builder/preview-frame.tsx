"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Monitor, Tablet, Smartphone, RefreshCw, ExternalLink } from "lucide-react";
import { cn } from "../../lib/utils/cn.ts";

interface PreviewFrameProps {
  url?: string;
  isLoading?: boolean;
}

type DeviceType = "desktop" | "tablet" | "mobile";

const deviceSizes = {
  desktop: "w-full",
  tablet: "w-[768px]",
  mobile: "w-[375px]",
};

export function PreviewFrame({ url, isLoading }: PreviewFrameProps) {
  const [device, setDevice] = React.useState<DeviceType>("desktop");
  const [key, setKey] = React.useState(0);

  const handleRefresh = () => setKey((k) => k + 1);

  return (
    <div className="h-full flex flex-col bg-surface-secondary">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b-3 border-black">
        {/* Device Toggles */}
        <div className="flex items-center border-3 border-black rounded-lg overflow-hidden">
          <button
            onClick={() => setDevice("desktop")}
            className={cn(
              "p-2 transition-colors",
              device === "desktop" ? "bg-brand-violet text-white" : "hover:bg-surface-secondary"
            )}
            title="سطح المكتب"
          >
            <Monitor className="h-4 w-4" />
          </button>
          <button
            onClick={() => setDevice("tablet")}
            className={cn(
              "p-2 border-x-3 border-black transition-colors",
              device === "tablet" ? "bg-brand-violet text-white" : "hover:bg-surface-secondary"
            )}
            title="تابلت"
          >
            <Tablet className="h-4 w-4" />
          </button>
          <button
            onClick={() => setDevice("mobile")}
            className={cn(
              "p-2 transition-colors",
              device === "mobile" ? "bg-brand-violet text-white" : "hover:bg-surface-secondary"
            )}
            title="جوال"
          >
            <Smartphone className="h-4 w-4" />
          </button>
        </div>

        {/* URL Bar */}
        <div className="flex-1 mx-4">
          <div className="bg-surface-secondary border-2 border-black px-3 py-1 text-sm text-content-muted text-center truncate rounded-md">
            {url || "preview.kwq8.com"}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="p-2 hover:bg-surface-secondary border-3 border-transparent hover:border-black transition-all rounded-lg"
            title="تحديث"
          >
            <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
          </button>
          <button
            className="p-2 hover:bg-surface-secondary border-3 border-transparent hover:border-black transition-all rounded-lg"
            title="فتح في نافذة جديدة"
          >
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto p-4 flex justify-center">
        <motion.div
          key={device}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            "bg-white border-3 border-black shadow-brutal h-full transition-all rounded-[1rem] overflow-hidden",
            deviceSizes[device]
          )}
        >
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-brand-violet" />
                <p className="text-content-secondary font-bold">جارٍ بناء الموقع...</p>
              </div>
            </div>
          ) : url ? (
            <iframe
              key={key}
              src={url}
              className="w-full h-full border-0"
              title="معاينة الموقع"
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-surface-secondary border-3 border-black mx-auto mb-4 flex items-center justify-center rounded-xl">
                  <Monitor className="h-8 w-8 text-content-muted" />
                </div>
                <h3 className="font-black mb-2 text-xl">ابدأ البناء</h3>
                <p className="text-content-secondary font-bold">
                  اكتب ما تريد وشاهد الموقع يُبنى هنا
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}