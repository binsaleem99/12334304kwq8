import React from "react";
import { Tajawal, Plus_Jakarta_Sans } from "next/font/google";
import { ToastProvider } from "../components/ui/toast.tsx";
import NetworkStatus from "../components/ui/NetworkStatus.tsx";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-arabic",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata = {
  title: {
    default: "KWQ8 - ابنِ موقعك بالذكاء الاصطناعي",
    template: "%s | KWQ8",
  },
  description: "أداة بناء المواقع الأولى للعرب. اكتب ما تريد بالعربية وشاهد موقعك يُبنى أمامك في دقائق.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="ar" 
      dir="rtl" 
      className={`${tajawal.variable} ${plusJakarta.variable}`}
    >
      <body className="min-h-screen bg-surface-primary font-arabic antialiased overflow-x-hidden">
        <ToastProvider>
          <NetworkStatus />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}