/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0f5f2',
          100: '#dce8e1',
          200: '#bcd3c4',
          300: '#95b9a2',
          400: '#6d9c7f',
          500: '#4f8162',
          600: '#3c674e',
          700: '#31523f',
          800: '#284234',
          900: '#1b2d23',
          950: '#0e1a14',
        },
        sage: {
          50: '#f4f7f5',
          100: '#e5ece7',
          200: '#cedcd2',
          300: '#abc5b4',
          400: '#83a791',
          500: '#648d73',
          600: '#4e705a',
          700: '#3f5a49',
          800: '#34493c',
          900: '#2c3c32',
          950: '#17211b',
        },
        warm: {
          50: '#fcfbf9',
          100: '#f8f6f0',
          200: '#f1ede2',
          300: '#e6dfce',
          400: '#d5c8b2',
          500: '#c2b095',
          600: '#ad997e',
          700: '#8f7b64',
          800: '#756453',
          900: '#5f5244',
          950: '#332b24',
        },
        charcoal: {
          DEFAULT: '#1c211f',
          50: '#f6f7f6',
          100: '#e2e5e3',
          200: '#c5cac6',
          300: '#9ea6a0',
          400: '#77807a',
          500: '#5c655f',
          600: '#474f4a',
          700: '#3a403c',
          800: '#2f3431',
          900: '#1c211f',
          950: '#101312',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      }
    },
  },
  plugins: [],
}
