import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "naai-primary": "#9e183b",
        "naai-secondary": "#2b2f34",
        "naai-pos-100": "#e9edf7",
        "naai-pos-200": "#d7e1fc",
        "naai-pos-300": "#bfcfea",
        "naai-pos-400": "#b9cbe5",
        "naai-pos-500": "#dee2ff",
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fill, minmax(8rem, 1fr))",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
