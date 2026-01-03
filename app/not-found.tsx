import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white text-center">
      <h1 className="text-[120px] md:text-[200px] leading-none font-black text-gradient select-none">
        404
      </h1>
      <h2 className="text-3xl md:text-4xl font-black text-black mt-4 font-heading">
        الصفحة غير موجودة
      </h2>
      <p className="text-content-secondary mt-4 max-w-md font-bold text-lg leading-relaxed">
        عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى رابط آخر.
      </p>
      <Link 
        href="/" 
        className="mt-8 btn-brutal bg-brand-violet text-white px-8 py-4 font-black text-xl"
      >
        العودة للرئيسية
      </Link>
    </div>
  );
}