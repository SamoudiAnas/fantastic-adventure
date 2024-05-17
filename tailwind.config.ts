import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    extend: {
      boxShadow: {
        main: "rgba(100, 100, 111, 0.2) 0px 3px 8px 0px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
