module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "auto-fit-280": "repeat(auto-fit, 280px)",
        "auto-fit-200": "repeat(auto-fit, 200px)",
      },
      colors: {
        pcol: "var(--primary-col)",
        plcol: "var(--primary-light-col)",
        scol: "var(--secondary-col)",
        slcol: "var(--secondary-light-col)",
        dcol: "var(--dark-col)",
        gacol: "var(--gray-col)",
        lcol: "var(--light-col)",
        rcol: "var(--red-col)",
        rlcol: "var(--red-light-col)",
        gecol: "var(--green-col)",
        gelcol: "var(--green-light-col)",
        bcol: "var(--black-col)",
        wcol: "var(--white-col)",
      },
      screens: {
        xs: "480px",
        md: "768px",
      },
    },
  },
  plugins: [],
};
