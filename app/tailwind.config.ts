import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // SpectrTrading custom colors
        obsidian: "#050508",
        "deep-gray": "#0A0A0F",
        "cyan-glow": "#00FFFF",
        "cyan-dark": "#0080FF",
        mist: "#F3F4F6",
        ash: "#9CA3AF",
        // shadcn/ui system
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        display: ["Instrument Serif", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "hero": ["96px", { lineHeight: "1.0", letterSpacing: "-0.02em" }],
        "section": ["64px", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
        "subsection": ["36px", { lineHeight: "1.2" }],
        "body-lg": ["20px", { lineHeight: "1.6" }],
        "mono-tag": ["11px", { lineHeight: "1.4", letterSpacing: "0.05em" }],
      },
      spacing: {
        "section": "160px",
        "content": "80px",
        "grid-gap": "24px",
      },
      maxWidth: {
        "content": "1280px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "drift-1": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(60px, -40px)" },
        },
        "drift-2": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-50px, 60px)" },
        },
        "drift-3": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(40px, 50px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "drift-1": "drift-1 25s ease-in-out infinite",
        "drift-2": "drift-2 30s ease-in-out infinite",
        "drift-3": "drift-3 20s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
