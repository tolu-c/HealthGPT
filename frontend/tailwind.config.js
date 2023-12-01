/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontSize: {
      // body
      "body-lg": [
        "1.125rem",
        {
          lineHeight: "1.5rem",
          letterSpacing: "0.5px",
          fontWeight: "400",
        },
      ],
      "body-md": [
        "0.875rem",
        {
          lineHeight: "1.25rem",
          letterSpacing: "0.25px",
          fontWeight: "400",
        },
      ],
      "body-sm": [
        "0.75rem",
        {
          lineHeight: "1rem",
          letterSpacing: "0.4px",
          fontWeight: "400",
        },
      ],
      // label
      "label-lg": [
        "0.875rem",
        {
          lineHeight: "1.25rem",
          letterSpacing: "0.1px",
          fontWeight: "500",
        },
      ],
      "label-md": [
        "0.75rem",
        {
          lineHeight: "1rem",
          letterSpacing: "0.5px",
          fontWeight: "500",
        },
      ],
      "label-sm": [
        "0.6875rem",
        {
          lineHeight: "1rem",
          letterSpacing: "0.px",
          fontWeight: "500",
        },
      ],
      // title
      "title-lg": [
        "1.375rem",
        {
          lineHeight: "1.75rem",
          // letterSpacing: "0.5px",
          fontWeight: "500",
        },
      ],
      "title-md": [
        "1rem",
        {
          lineHeight: "1.5rem",
          letterSpacing: "0.15px",
          fontWeight: "500",
        },
      ],
      "title-sm": [
        "0.875rem",
        {
          lineHeight: "1.25rem",
          letterSpacing: "0.1px",
          fontWeight: "500",
        },
      ],
      // headline
      "head-lg": [
        "2rem",
        {
          lineHeight: "2.5rem",
          // letterSpacing: "0.5px",
          fontWeight: "400",
        },
      ],
      "head-md": [
        "1.75rem",
        {
          lineHeight: "2.25rem",
          // letterSpacing: "0.25px",
          fontWeight: "400",
        },
      ],
      "head-sm": [
        "1.5rem",
        {
          lineHeight: "2rem",
          // letterSpacing: "0.4px",
          fontWeight: "400",
        },
      ],
      // display
      "display-lg": [
        "3.5625rem",
        {
          lineHeight: "4rem",
          fontWeight: "500",
        },
      ],
      "display-md": [
        "2.8125rem",
        {
          lineHeight: "3.25rem",
          fontWeight: "400",
        },
      ],
      "display-sm": [
        "2.25rem",
        {
          lineHeight: "2.75rem",
          fontWeight: "400",
        },
      ],
    },
    extend: {
      fontFamily: {
        lato: ["Lato", "sans serif"],
      },
      backgroundImage: {
        iconButton: "linear-gradient(145deg, #000E89 33.13%, #001AFF 88.61%)",
        home: "url('assets/images/homepage-lg.png')",
      },
      colors: {
        brand: {
          main: "#000E89",
          100: "#192594",
          300: "#313C9F",
          400: "#4A54AA",
          500: "#626AB4",
          600: "#7A81BE",
          700: "#9398CA",
          800: "#ACB0D5",
          900: "#C4C7DF",
        },
        black: {
          main: "#0C0C0C",
          100: "#232323",
          200: "#2D2D2D",
          300: "#3C3C3C",
          400: "#626262",
          500: "#848484",
          600: "#C7C7C7",
        },
        white: {
          main: "#fff",
          100: "#FDFDFD",
          200: "#FAFAFA",
          300: "#F6F6F6",
          400: "#EFEFEF",
          500: "#E4E4E4",
        },
        extra: {
          error: "#FA1111",
        },
        suggestion: "rgba(0, 0, 0, 0.03)",
        darkSuggestion: "rgba(255, 255, 255, 0.03)",
        comingSonn: "rgba(0, 255, 26, 0.10)",
      },
      boxShadow: {
        hoverFilled:
          "0px 1px 2px 0px rgba(0, 0, 0, 0.30), 0px 1px 3px 0px rgba(0, 0, 0, 0.15)",
        hoverOutline: "0px 1px 2px 0px rgba(0, 0, 0, 0.30)",
        pressedFilled:
          "0px -4px 4px 0px rgba(0, 0, 0, 0.15) inset, 0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        pressedOutline:
          "0px 1px 2px 0px rgba(0, 0, 0, 0.30), 0px 4px 4px 2px rgba(0, 0, 0, 0.05) inset",
        nav: "0px 2px 4px 0px rgba(0, 0, 0, 0.08)",
        sidebar: "0px 1px 4px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
