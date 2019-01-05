export const gridRaw = (size: number): number => size * 8;
export const grid = (size: number): string => `${gridRaw(size)}px`;

export const size = (size: number): string => `${size}px`;

export const colors = {
  black: "#000",
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
  borderRadius: size(3),
  paragraphSpacing: size(30)
};

export const borders = {
  default: `${size(1)} solid ${colors.grayLight}`
};

export const breakpoints = {
  // Shared
  medium: `@media (max-width: ${size(600)})`,
  small: `@media (max-width: ${size(450)})`,

  // Component specific
  menu: `@media (max-width: ${size(360)})`
};

const fontSharedProperties = {
  margin: 0,
  color: colors.black,
  fontWeight: 400
};

const fontSharedValues = {
  fontFamilyHeading: "Arial, sans-serif",
  fontFamilyDefault: "Georgia, serif",
  fontFamilyCode: "monospace"
};

const fontParagraphSmallSizes = {
  fontSize: size(16),
  [breakpoints.medium]: {
    fontSize: size(13)
  },
  [breakpoints.small]: {
    fontSize: size(13)
  }
};

const fontParagraphSmall = {
  ...fontSharedProperties,
  ...fontParagraphSmallSizes,
  fontFamily: fontSharedValues.fontFamilyDefault,
  lineHeight: 1.6
};

export const fonts = {
  // Size modificators
  heading: {
    ...fontSharedProperties,
    fontFamily: fontSharedValues.fontFamilyHeading,
    fontSize: size(52),
    lineHeight: 1.1,
    [breakpoints.medium]: {
      fontSize: size(42)
    },
    [breakpoints.small]: {
      fontSize: size(26)
    }
  },

  headingMedium: {
    ...fontSharedProperties,
    fontFamily: fontSharedValues.fontFamilyHeading,
    fontSize: size(33),
    lineHeight: 1.2,
    [breakpoints.medium]: {
      fontSize: size(26)
    },
    [breakpoints.small]: {
      fontSize: size(22)
    }
  },

  headingSmall: {
    ...fontSharedProperties,
    fontFamily: fontSharedValues.fontFamilyHeading,
    fontSize: size(25),
    lineHeight: 1.3,
    [breakpoints.medium]: {
      fontSize: size(20)
    },
    [breakpoints.small]: {
      fontSize: size(16)
    }
  },

  paragraph: {
    ...fontSharedProperties,
    fontFamily: fontSharedValues.fontFamilyDefault,
    fontSize: size(20),
    lineHeight: 1.6,
    [breakpoints.medium]: {
      fontSize: size(16)
    },
    [breakpoints.small]: {
      fontSize: size(16)
    }
  },

  paragraphSmall: {
    ...fontParagraphSmall
  },

  headingTable: {
    ...fontParagraphSmall,
    fontFamily: fontSharedValues.fontFamilyHeading,
    lineHeight: 1.2
  },

  codeMultiline: {
    ...fontSharedProperties,
    ...fontParagraphSmallSizes,
    fontFamily: fontSharedValues.fontFamilyCode,
    fontSize: size(16),
    lineHeight: 1.45
  },

  codeInline: {
    ...fontSharedProperties,
    fontFamily: fontSharedValues.fontFamilyCode
    // font-size and line-height are inherited.
  },

  // Type modificators
  link: {
    textDecoration: "none",
    color: colors.blueMain,
    ":hover": {
      textDecoration: "underline"
    }
  }
};

// /*
//  * z-indexes
//  */
// --z-index-snippet-content-visible: 20;
// --z-index-snippet-content: 10;
