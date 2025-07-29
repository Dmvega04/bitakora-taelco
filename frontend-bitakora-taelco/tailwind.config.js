// tailwind.config.js (formato CommonJS, no ESM)

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // incluye .ts/.tsx por si acaso
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
