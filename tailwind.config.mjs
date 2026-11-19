const config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "#020B18",
          soft: "#061426",
          card: "#081B30",
        },
        brand: {
          DEFAULT: "#0A84FF",
          light: "#1688FF",
          strong: "#007BFF",
        },
        muted: "#A8B7C8",
        border: {
          DEFAULT: "rgba(255,255,255,0.10)",
        },
      },
      fontFamily: {
        sans: ["Arial", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        glow: "0 0 60px -15px rgba(10, 132, 255, 0.45)",
        card: "0 4px 24px -8px rgba(0,0,0,0.4)",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(circle at 50% 0%, rgba(10,132,255,0.18), transparent 60%)",
        "hero-gradient":
          "linear-gradient(180deg, #020B18 0%, #061426 60%, #020B18 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
