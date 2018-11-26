import { css } from "glamor";

export const gridRaw = size => size * 8;
export const grid = size => `${gridRaw(size)}px`;

export const size = size => `${size}px`;

export async function initGlobalStyles() {
  css.global("body", {
    margin: 0
  });

  // node_modules/highlight.js/styles/xcode.css
  css.insert(
    `
    .hljs {
      display: block;
      overflow-x: auto;
      padding: 0.5em;
      background: #fff;
      color: black;
    }

    .hljs-comment,
    .hljs-quote {
      color: #006a00;
    }

    .hljs-keyword,
    .hljs-selector-tag,
    .hljs-literal {
      color: #aa0d91;
    }

    .hljs-name {
      color: #008;
    }

    .hljs-variable,
    .hljs-template-variable {
      color: #660;
    }

    .hljs-string {
      color: #c41a16;
    }

    .hljs-regexp,
    .hljs-link {
      color: #080;
    }

    .hljs-title,
    .hljs-tag,
    .hljs-symbol,
    .hljs-bullet,
    .hljs-number,
    .hljs-meta {
      color: #1c00cf;
    }

    .hljs-section,
    .hljs-class .hljs-title,
    .hljs-type,
    .hljs-attr,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-params {
      color: #5c2699;
    }

    .hljs-attribute,
    .hljs-subst {
      color: #000;
    }

    .hljs-formula {
      background-color: #eee;
      font-style: italic;
    }

    .hljs-addition {
      background-color: #baeeba;
    }

    .hljs-deletion {
      background-color: #ffc8bd;
    }

    .hljs-selector-id,
    .hljs-selector-class {
      color: #9b703f;
    }

    .hljs-doctag,
    .hljs-strong {
      font-weight: bold;
    }

    .hljs-emphasis {
      font-style: italic;
    }
  `.replace(/\s+/g, "")
  );
}

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
  fontWeight: "normal"
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
    fontFamily: fontSharedProperties.fontFamilyCode,
    fontSize: size(16),
    lineHeight: 1.45
  },

  codeInline: {
    ...fontSharedProperties,
    fontFamily: fontSharedProperties.fontFamilyCode
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
