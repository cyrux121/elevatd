import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Dark industrial surfaces
        "ink-0": "#06070a",
        "ink-1": "#0c0d11",
        "ink-2": "#141519",
        "ink-3": "#1d1f25",
        "ink-4": "#2a2d35",
        "ink-5": "#3a3e48",
        // Foreground / text
        "fg-0": "#f6f7f9",
        "fg-1": "#c8cbd1",
        "fg-2": "#8a8f99",
        "fg-3": "#5d626b",
        // Accent — blue default
        accent: {
          DEFAULT: "#3a8dff",
          hover:   "#1f74ee",
          soft:    "rgba(58,141,255,0.16)",
          glow:    "rgba(58,141,255,0.55)",
          fg:      "#06080d",
        },
        // Stock indicator colours
        stock: {
          ok:  "#4ade80",
          low: "#facc15",
          out: "#ef4444",
        },
      },
      fontFamily: {
        sans:    ["var(--font-archivo)",       "system-ui", "sans-serif"],
        display: ["var(--font-archivo-black)", "var(--font-archivo)", "system-ui", "sans-serif"],
        mono:    ["var(--font-jetbrains)",     "ui-monospace", "monospace"],
      },
      maxWidth: {
        container: "1440px",
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
        lg: "10px",
      },
      animation: {
        marquee:    "marquee 30s linear infinite",
        "fade-up":  "fade-up 0.25s ease-out both",
        "slide-in": "slide-in 0.25s ease both",
        "toast-in": "toast-in 0.25s ease both",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { transform: "translateX(100%)" },
          to:   { transform: "translateX(0)" },
        },
        "toast-in": {
          from: { opacity: "0", transform: "translate(-50%, 20px)" },
          to:   { opacity: "1", transform: "translate(-50%, 0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
