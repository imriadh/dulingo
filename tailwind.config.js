/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./screens/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: "#6C4EF5",
        deepPurple: "#5B3BF6",
        blue: "#4D8BFF",
        green: "#21C16B",
        semantic: {
          success: "#21C16B",
          warning: "#FFC800",
          streak: "#FF8A00",
          error: "#FF4D4F",
          info: "#4D8BFF",
        },
        neutral: {
          textPrimary: "#0D132B",
          textSecondary: "#6B7280",
          border: "#E5E7EB",
          surface: "#F6F7FB",
          background: "#FFFFFF",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "system-ui"],
      },
      fontSize: {
        h1: ["32px", { lineHeight: "38px" }],
        h2: ["24px", { lineHeight: "30px" }],
        h3: ["20px", { lineHeight: "26px" }],
        h4: ["16px", { lineHeight: "22px" }],
        "body-lg": ["16px", { lineHeight: "26px" }],
        "body-md": ["14px", { lineHeight: "22px" }],
        "body-sm": ["13px", { lineHeight: "20px" }],
        caption: ["11px", { lineHeight: "16px" }],
      },
      borderRadius: {
        card: "14px",
      },
      boxShadow: {
        soft: "0 6px 20px rgba(13,19,43,0.06)",
      },
    },
  },
  plugins: [require("nativewind/tailwind/plugin")],
};
