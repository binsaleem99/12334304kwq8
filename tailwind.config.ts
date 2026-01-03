import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors (Neo-Brutalist)
        brand: {
          violet: "#7C3AED",
          pink: "#EC4899",
          orange: "#F97316",
          cyan: "#06B6D4",
          lime: "#84CC16",
          gold: "#FBBF24",
        },
        // Backgrounds
        surface: {
          primary: "#FFFFFF",
          secondary: "#F8FAFC",
          dark: "#0F172A",
          darker: "#020617",
        },
        // Text
        content: {
          primary: "#1E293B",
          secondary: "#475569",
          muted: "#94A3B8",
          inverse: "#F8FAFC",
        },
        // Borders (Neo-Brutalist)
        border: {
          DEFAULT: "#000000",
          light: "#E2E8F0",
          dark: "#334155",
        },
      },
      fontFamily: {
        arabic: ["Tajawal", "sans-serif"],
        heading: ["Plus Jakarta Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        // Neo-Brutalist hard shadows
        brutal: "4px 4px 0px 0px #000000",
        "brutal-sm": "2px 2px 0px 0px #000000",
        "brutal-lg": "6px 6px 0px 0px #000000",
        "brutal-violet": "4px 4px 0px 0px #7C3AED",
        "brutal-pink": "4px 4px 0px 0px #EC4899",
      },
      borderWidth: {
        3: "3px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;