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
        "naai-secondary": "#1b1b27",
        "naai-pos-100": "#e9edf7",
        "naai-pos-200": "#dee2e6",
        "naai-pos-300": "#f1f1f1",
        "naai-pos-400": "#ced4da",
        "naai-pos-500": "#f8f9fa",
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fill, minmax(8rem, 1fr))",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes:{
        "pop-right":{
          "0%": {transform: "translateX(-100%)"},
          "100%": {transform: "translateX(0%)"},
        },
        "pop-left":{
          "0%": {transform: "translateX(0%)"},
          "100%": {transform: "translateX(-100%)"},
        },
        "pop-out":{
          "0%": {opacity: "1"},
          "100%": {opacity: "0"},
        },
        "pop-in":{
          "0%": {opacity: "0"},
          "100%": {opacity: "1"},
        },
      },
      animation:{
        "pop-right" : "pop-right 0.5s ease-in-out forwards",
        "pop-left": "pop-left 0.5s ease-in-out forwards",
        "pop-out": "pop-out 0.5s ease-in-out forwards",
        "pop-in": "pop-in 0.2s ease-in-out forwards",
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
