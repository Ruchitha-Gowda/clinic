module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",   // for Next.js App Router inside src/app
    "./src/pages/**/*.{js,ts,jsx,tsx}", // for older Pages Router if used
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
