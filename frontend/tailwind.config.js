const colors = require("tailwindcss/colors")

module.exports = {
  content: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}", "./src/layouts/**/*.{ts,tsx}"],
  theme: {
    colors: {
      black: '#2b2d42',
      white: '#edf2f4'
    },
    extend: {
      colors: {
        darkcolor: '#2b2d42',
        marfil: '#edf2f4'
      },
      rotate: {
        '270': '270deg'
      },
      gridTemplateRows: {
        // Simple 8 row grid
        '8': 'repeat(8, minmax(0, 1fr))',
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        xs: "1rem",
        sm: "2rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
  plugins: [
  ],
}