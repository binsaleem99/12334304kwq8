"use client";

import * as React from "react";
import { cn } from "../../lib/utils/cn.ts";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

const countryCodes = [
  { code: "+965", country: "🇰🇼", name: "الكويت" },
  { code: "+966", country: "🇸🇦", name: "السعودية" },
  { code: "+971", country: "🇦🇪", name: "الإمارات" },
  { code: "+974", country: "🇶🇦", name: "قطر" },
  { code: "+973", country: "🇧🇭", name: "البحرين" },
  { code: "+968", country: "🇴🇲", name: "عُمان" },
];

export function PhoneInput({ value, onChange, error, disabled }: PhoneInputProps) {
  const [selectedCode, setSelectedCode] = React.useState(countryCodes[0]);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    onChange(`${selectedCode.code}${phoneNumber}`);
  }, [selectedCode, phoneNumber, onChange]);

  return (
    <div className="w-full">
      <label className="block text-sm font-bold text-content-primary mb-2">
        رقم الهاتف
      </label>
      <div className="flex gap-2">
        {/* Country Code Selector */}
        <div className="relative">
          <button
            type="button"
            disabled={disabled}
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "flex items-center gap-2 px-3 py-3 border-3 border-black bg-white",
              "focus:outline-none focus:shadow-brutal-violet focus:border-brand-violet",
              "transition-all duration-150 min-w-[100px]",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <span className="text-lg">{selectedCode.country}</span>
            <span className="text-sm font-mono font-bold">{selectedCode.code}</span>
          </button>

          {/* Dropdown */}
          {isOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
              <div className="absolute top-full right-0 mt-1 w-48 bg-white border-3 border-black shadow-brutal z-50 overflow-hidden">
                {countryCodes.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => {
                      setSelectedCode(country);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 text-right font-bold",
                      "hover:bg-surface-secondary transition-colors",
                      selectedCode.code === country.code && "bg-brand-violet/10 text-brand-violet"
                    )}
                  >
                    <span className="text-lg">{country.country}</span>
                    <span className="flex-1">{country.name}</span>
                    <span className="text-sm font-mono text-content-muted">
                      {country.code}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Phone Number Input */}
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
          placeholder="12345678"
          disabled={disabled}
          className={cn(
            "flex-1 border-3 border-black bg-white px-4 py-3",
            "placeholder:text-content-muted font-mono font-bold",
            "focus:outline-none focus:shadow-brutal-violet focus:border-brand-violet",
            "transition-all duration-150",
            error && "border-red-500",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500 font-bold">{error}</p>}
    </div>
  );
}
