/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      "2xs": "0.625rem", //10px
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      md: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.4rem", // 22px
      "2xl": "1.5rem", // 24px
      "3xl": "1.625rem", // 26px
      "4xl": "2.125rem", // 34px
      "5xl": "3rem", // 48px
      "6xl": "4rem", // 64px
    },
    container: {
      center: true,
      screens: {
        "2xl": "480px",
      },
    },
    extend: {
      colors: {
        primaryBlue: "#4119f4",
        primaryBlueLight: "#6A47F8",
        secondaryBlue: "#DFD8FE",
        secondaryBlueLight: "#F2EEFF",
        primaryBlack: "#040231",
        primaryBlackDark: "#02011B",
        primaryBlackLight: "#2E2A5D",
        primaryBlueLightV2: "#CABDFC",
        primaryBlueDarkPrimary: "#2C11A7",
        primaryDarkBlueLight: "#D0BCFF",
        secondaryBlackLight: "#1B1C36",
        secondaryBackground: "#ECEBFF",
        bodyColor: "#F6F4FF",
        primaryPink: "#ef058b",
        primaryWhite: "#FFFFFF",
        primaryGrey: "#666666",
        darkTextSecondary: "#CCC",
        primaryBackground: "#F9F9FF",
        specializationBg: "#f3f5ff",
        denimBlue3: "rgba(56, 73, 159, 0.03)",
        subTitle: "#666666",
        error: "#DC3545",
        success: "#28A745",
        darkBorder: "#2D2E48",
        subText: "#54587E",
        link: "#4119f4",
        primary: "#2190FF",
      }
    },
  },

  plugins: [require("tailwindcss-animate")],

}