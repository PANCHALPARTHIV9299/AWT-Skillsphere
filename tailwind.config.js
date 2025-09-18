import colors from 'tailwindcss/colors'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: colors.zinc, // re-alias zinc as gray
      },
    },
  },
  plugins: [],
}
