/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        dark: {
          bg: '#1e1e1e',
          panel: '#252526',
          border: '#3e3e42',
          hover: '#2a2d2e',
        }
      },
      fontFamily: {
        mono: ['Fira Code', 'Monaco', 'Cascadia Code', 'Consolas', 'monospace'],
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
