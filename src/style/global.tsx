import * as stylex from "@stylexjs/stylex";

const global = stylex.create({
  base: {
    fontSize: 16,
    lineHeight: 1.5,
    color: "rgb(60,60,60)",
  },
  highlighted: {
    color: "rebeccapurple",
  },
});

export default global;
