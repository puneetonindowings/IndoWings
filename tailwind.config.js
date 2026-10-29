/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'iw-orange': '#f58220',
        'iw-deep': '#05070a',
        'iw-border': 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        heading: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['monospace'],
        main: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  corePlugins: {
    // Disable Preflight to ensure 100% zero interference with existing 11,000+ lines of custom CSS
    preflight: false,
  },
  plugins: [],
};
