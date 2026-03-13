import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        gold: {
          200: '#f5e199',
          300: '#e8cc67',
          400: '#dbbe4a',
          500: '#D4AF37',
          600: '#AA8C2C',
          700: '#836b21',
        },
        deepBlue: {
          800: '#0D2035',
          900: '#0A192F',
          950: '#030912',
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)',
        'glass-lg': '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.10)',
      },
    },
  },
  plugins: [],
}
export default config;
