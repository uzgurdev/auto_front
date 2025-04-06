/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Primary colors
        primary: "#e3000f", // Main red accent color
        "primary-dark": "#c8000d", // Darker red for hover states

        // Text colors
        "text-primary": "#1a1a18", // Near black for headings and important text
        "text-secondary": "#333333", // Dark gray for body text
        "text-muted": "#8a8989", // Medium gray for less important text
        "text-light": "#c8c8c8", // Light gray for footer text
        "text-extra-light": "#CFCFCF",
        "text-orange": "#FFA803",

        // Background colors
        "bg-primary": "#ffffff", // White background
        "bg-secondary": "#f5f5f5", // Light gray background
        "bg-tertiary": "#f2f2f2", // Slightly darker light gray
        "bg-dark": "#1a1a18", // Dark background (footer)

        // Border colors
        "border-light": "#f0f0f0", // Very light gray for borders
        "border-medium": "#d9d9d9", // Medium gray for input borders
        "border-dark": "#333333", // Dark gray for footer borders

        // Status colors
        success: "#48bc4e", // Green for success indicators
        warning: "#ffa803", // Amber/orange for stars/ratings
        info: "#345eff", // Blue for information/options
      },
      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "4px",
        md: "6px",
        lg: "8px",
      },
      fontSize: {
        "2xs": "10px", // Extra small text
        xs: "12px", // Small text
        sm: "14px", // Body text
        base: "16px", // Default
        lg: "18px", // Subheadings
        xl: "20px", // Small headings
        "2xl": "24px", // Medium headings
        "3xl": "30px", // Large headings
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
        DEFAULT: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
      dropShadow: {
        none: "0 0 0 rgba(0,0,0,0)",
      },
      fontFamily: {
        Poppins: ["Poppins-woff2", "sans-serif"],
      },
    },
  },
  plugins: [],
};
