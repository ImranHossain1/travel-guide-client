module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        tourism: {
          primary: "#FF8C00",
          secondary: "#DAA520",
          accent: "#3A4256",
          neutral: "#3d4451",
          "base-100": "#ffffff",
          'half': '50%',
        },
      },
      "dark",
      "cupcake",
    ],
  },
  plugins: [require("daisyui")],
}
