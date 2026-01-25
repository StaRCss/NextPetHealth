import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "media", // or "media" depending on your setup

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "light-gradient-bg": "var(--light-gradient-bg)",

      },
      backgroundImage: {
              "light-gradient": "linear-gradient(to bottom, #c2b0f0 0%, #e6e1f7 30%, #f4f4f4 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
