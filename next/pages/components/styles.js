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

const breakpoints = {
  medium: `@media (max-width: ${size(600)})`,
  small: `@media (max-width: ${size(450)})`
};

const fontSharedProperties = {
  margin: 0,
  fontWeight: "normal"
};

const fontSharedValues = {
  fontFamilyHeading: "Arial, sans-serif",
  fontFamilyDefault: "Georgia, serif"
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
    ...fontSharedProperties,
    fontFamily: fontSharedValues.fontFamilyDefault,
    fontSize: size(16),
    lineHeight: 1.6,
    [breakpoints.medium]: {
      fontSize: size(8)
    },
    [breakpoints.small]: {
      fontSize: size(8)
    }
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
