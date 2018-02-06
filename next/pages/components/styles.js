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
  white: "#fff",

  grayLighter: "#f5f5f5",
  grayLight: "#dddddd",
  grayStandard: "#cccccc",
  grayDark: "#333333",

  yellow: "#ffff00",

  blueMain: "#69d2e7",
  blueDark: "#000fff",

  linkBorder: "rgba(0, 0, 0, 0.3)"
};

export const dimensions = {
  borderRadius: size(3)
};

// TOOD: rename
const f = {
  fontFamilyHeading: "Arial, sans-serif",
  fontFamilyDefault: "Georgia, serif"
};

export const fonts = {
  paragraphSmall: {
    fontFamily: f.fontFamilyDefault,
    fontSize: size(20),
    lineHeight: 1.6
  },
  headingSmall: {
    fontFamily: f.fontFamilyHeading,
    fontSize: size(25),
    lineHeight: 1.3
  }
};

// /*
//  * z-indexes
//  */
// --z-index-snippet-content-visible: 20;
// --z-index-snippet-content: 10;
