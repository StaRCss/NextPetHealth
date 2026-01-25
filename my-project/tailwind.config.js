const flowbite = require("flowbite-react/tailwind");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundImage:{
        "light-gradient": "linear-gradient(to bottom, #c2b0f0 0%, #e6e1f7 30%, #f4f4f4 100%)",
            "dark-gradient": "linear-gradient(to bottom, #18181b 0%, #09090b 100%)",

      },
      fontFamily: {
        chewy: ["var(--font-chewy)"],
        geist: ["var(--font-geist)"],
      },
      colors: {
        cardBg: {
          light: colors.purple[50],
          dark: colors.zinc[800],
        },
        pageBg: {
          light: colors.white,
          dark: colors.zinc[900],
        },
        text: {
          light: colors.zinc[900],
          dark: colors.purple[100],
        },
      },
    },
  },
  plugins: [flowbite.plugin()],
};
