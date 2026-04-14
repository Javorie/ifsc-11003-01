/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          900: '#020617',
          800: '#0f172a',
          700: '#1e293b'
        }
      }
    }
  },
  plugins: []
};
