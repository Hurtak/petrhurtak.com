export const grid = size => `${size * 8}px`;
export const size = size => `${size}px`;

export const globals = [
  {
    selector: "body",
    definitions: {
      margin: 0
    }
  }
];

export const colors = {
  grayLighter: "#f5f5f5",
  grayLight: "#dddddd",
  grayStandard: "#cccccc",
  grayDark: "#333333",

  yellow: "#ffff00",

  blueMain: "#69d2e7",
  blueDark: "#000fff",

  linkBorder: "rgba(0, 0, 0, 0.3)"
};

const contentWidth = 700;
const contentSpacing = 16;

export const dimensions = {
  contentWidth: `${contentWidth}px`,
  borderRadius: "3px",

  /* TODO: move into mixin once they are avaliable - same code used in header.css & page.css */
  contentSpacing: `${contentSpacing}px`,
  contentMaxWidth: `${contentWidth + 2 * contentSpacing}px`
};

export const fonts = {
  paragraphSmall: {
    fontFamily: "Georgia, serif",
    fontSize: grid(2),
    lineHeight: 1.6
  }
};

// /*
//  * z-indexes
//  */
// --z-index-snippet-content-visible: 20;
// --z-index-snippet-content: 10;
