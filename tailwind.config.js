module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        tourism: {
          primary: "#2BC5CB",
          secondary: "#027276",
          accent: "#73F15C",
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
