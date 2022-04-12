module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
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
    },
  },
  plugins: [],
};
