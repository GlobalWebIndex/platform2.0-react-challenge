/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  variants: {
    visibility: ["group-hover"],
  },
  theme: {
    extend: {
      keyframes: {
        overlayShow: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
      },
      contentShow: {
        from: {
          opacity: 0,
          transform: "translate(-50%, -48%) scale(0.96)",
        },
        to: {
          opacity: 1,
          transform: "translate(-50%, -50%) scale(1)",
        },
      },
    },
  },
  plugins: [require("windy-radix-palette")],
};
