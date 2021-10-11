const gridSize = 8;

export const gridNumber = (size: number) => size * gridSize;
export const gridCss = (grid: number) => sizeCss(gridNumber(grid));
export const sizeCss = (px: number) => `${px}px`; // Size might have underlying unit changed (eg to rem) in the future
export const pxCss = (px: number) => `${px}px`; // Force output px

export const colors = {
  white: "white",
  black: "black",

  grayDark: "#dadada",
  gray: "#f3f3f3",

  blue: "blue",
};
