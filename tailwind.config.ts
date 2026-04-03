import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px"
      }
    },
    extend: {
      colors: {
        border: "#d7dde7",
        input: "#d7dde7",
        ring: "#3f7cff",
        background: "#f5f7fb",
        foreground: "#0f1c33",
        primary: {
          DEFAULT: "#163b73",
          foreground: "#ffffff"
        },
        secondary: {
          DEFAULT: "#273140",
          foreground: "#ffffff"
        },
        accent: {
          DEFAULT: "#7cc7ff",
          foreground: "#10233f"
        },
        muted: {
          DEFAULT: "#e9eef6",
          foreground: "#536178"
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#0f1c33"
        }
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem"
      },
      boxShadow: {
        soft: "0 24px 80px rgba(15, 28, 51, 0.08)",
        card: "0 14px 40px rgba(22, 59, 115, 0.08)"
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top left, rgba(124, 199, 255, 0.35), transparent 40%), radial-gradient(circle at top right, rgba(22, 59, 115, 0.25), transparent 30%), linear-gradient(135deg, #f7fbff 0%, #eef4fb 40%, #f5f7fb 100%)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-space)", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
};

export default config;
