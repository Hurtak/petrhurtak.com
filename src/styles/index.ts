const gridSize = 8;

export const gridNumber = (size: number) => size * gridSize;
export const gridCss = (size: number) => `${gridNumber(size)}px`;

export const colors = {
  white: "white",
  black: "black",
  blue: "blue",
};
