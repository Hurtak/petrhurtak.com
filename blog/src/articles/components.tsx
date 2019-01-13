import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
// TODO: is this duplicate code with or own metadata.description strip indent function?
import stripIndent from "strip-indent";

// Only include used languages in the bundle
// https://github.com/isagalaev/highlight.js/issues/1257
// TODO: make the register language with dynamic imports so we do not have
//       to register languages manually and so only needed languages are
//       downloaded?
import highlight from "highlight.js/lib/highlight.js";

import highlightJavaScript from "highlight.js/lib/languages/javascript";
import highlightMakefile from "highlight.js/lib/languages/makefile";
import highlightElm from "highlight.js/lib/languages/elm";
import highlightJson from "highlight.js/lib/languages/json";
import highlightYaml from "highlight.js/lib/languages/yaml";
import highlightCss from "highlight.js/lib/languages/css";
import highlightXml from "highlight.js/lib/languages/xml"; // HTML
import highlightBash from "highlight.js/lib/languages/bash";
// import highlightShell from "highlight.js/lib/languages/shell";
// import highlightHttp from "highlight.js/lib/languages/http";
// import highlightPython from "highlight.js/lib/languages/python";
// import highlightSql from "highlight.js/lib/languages/sql";
// import highlightDiff from "highlight.js/lib/languages/diff";
// import highlightMarkdown from "highlight.js/lib/languages/markdown";

import * as s from "../app/common/styles";

highlight.registerLanguage("javascript", highlightJavaScript);
highlight.registerLanguage("makefile", highlightMakefile);
highlight.registerLanguage("elm", highlightElm);
highlight.registerLanguage("json", highlightJson);
highlight.registerLanguage("yaml", highlightYaml);
highlight.registerLanguage("css", highlightCss);
highlight.registerLanguage("xml", highlightXml);
highlight.registerLanguage("bash", highlightBash);

//
// Texts
//

// .Article-content mark {
//   background-color: var(--color-yellow);
// }

// .Article-content s {
//   text-decoration: line-through;
// }

export class P extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    return <ParagraphStyled>{this.props.children}</ParagraphStyled>;
  }
}

const classNameParagraph = "article-paragraph";

const ParagraphStyled = styled.p(
  // TODO: TEST THIS
  { className: classNameParagraph },
  {
    ...s.fonts.paragraph,
    marginTop: s.dimensions.paragraphSpacing
  }
);

export class Bold extends React.Component {
  static propTypes = {
    children: PropTypes.string.isRequired
  };

  render() {
    return <BoldStyled>{this.props.children}</BoldStyled>;
  }
}

const BoldStyled = styled.strong({
  fontWeight: "bold"
});

export class Italic extends React.Component {
  static propTypes = {
    children: PropTypes.string.isRequired
  };

  render() {
    return <ItalicStyled>{this.props.children}</ItalicStyled>;
  }
}

const ItalicStyled = styled.em({
  fontStyle: "italic"
});

export class Q extends React.Component {
  static propTypes = {
    children: PropTypes.string.isRequired
  };

  render() {
    return <QuotationsStyles>{this.props.children}</QuotationsStyles>;
  }
}

const QuotationsStyles = styled.q({
  // https://practicaltypography.com/straight-and-curly-quotes.html
  quotes: `"“" "”"`
});

// TODO: probably not used?
// export class Small extends React.Component {
//   static propTypes = {
//     children: PropTypes.string.isRequired
//   };

//   render() {
//     return <SmallComponent>{this.props.children}</SmallComponent>;
//   }
// }

// const SmallComponent = styled.small({
//   ...s.fonts.paragraphSmall,
//   marginTop: s.dimensions.paragraphSpacing,
//   color: s.colors.grayDark
// });

//
// Link
//

export const Link = (props: { children: string; href?: string }) => (
  <LinkStyled href={props.href || props.children}>{props.children}</LinkStyled>
);

const LinkStyled = styled.a({
  color: s.colors.blueDark,
  transition: `0.2s border ease-in-out`,
  ":visited": {
    color: s.colors.blueDark
  }
});

//
// Lists
//

export const List = ({
  numbered = false,
  children
}: {
  // TODO: children only prop type of li
  numbered?: boolean;
  children: React.ReactNode;
}) => {
  const ListStyled = numbered ? ListOrderedStyled : ListUnorderedStyled;

  // TODO: consider using contect api when the new one comes out
  const childrenNumbered = React.Children.map(children, (child: any) =>
    React.cloneElement(child, { numbered: numbered })
  );

  return <ListStyled>{childrenNumbered}</ListStyled>;
};

export const Li = ({
  numbered = false,
  children
}: {
  children: React.ReactNode;
  numbered?: boolean;
}) => <ListItemStyled numbered={numbered}>{children}</ListItemStyled>;

const listSharedStyles = {
  // TODO: why is there size and not grid?
  margin: `${s.dimensions.paragraphSpacing} 0 0 1em`,
  padding: 0
};

const listIndentSize = s.gridRaw(2);

const ListUnorderedStyled = styled.ul({
  ...listSharedStyles,
  position: "relative",
  marginLeft: s.size(listIndentSize),
  [`.${classNameParagraph} + &`]: {
    marginTop: 0
  }
});

const ListOrderedStyled = styled.ol({
  ...listSharedStyles
});

const ListItemStyled = styled.li(
  {
    ...s.fonts.paragraph,
    "> *": {
      marginTop: 0
    }
  },
  (props: { numbered: boolean }) => {
    if (props.numbered) {
      return {
        listStyleType: "decimal"
      };
    } else {
      return {
        listStyleType: "none",
        "::before": {
          content: `"–"`,
          display: "block",
          position: "absolute",
          left: s.size(-listIndentSize)
        }
      };
    }
  }
);

//
// Headings
//

const removeSpacingAfterHeading = {
  "& + *": {
    // TODO: some easy and clean way to do this?
    marginTop: "0 !important"
  }
};

export class H1 extends React.Component {
  static propTypes = {
    children: PropTypes.string.isRequired
  };

  render() {
    return <Heading1Styled>{this.props.children}</Heading1Styled>;
  }
}

const Heading1Styled = styled.h2(
  s.fonts.headingMedium,
  {
    margin: `${s.size(56)} 0 ${s.size(12)} 0`,
    color: s.colors.grayDark,
    [s.breakpoints.medium]: {
      margin: `${s.size(44)} 0 ${s.size(10)} 0`
    },
    [s.breakpoints.small]: {
      margin: `${s.size(34)} 0 ${s.size(8)} 0`
    }
  },
  removeSpacingAfterHeading
);

export class H2 extends React.Component {
  static propTypes = {
    children: PropTypes.string.isRequired
  };

  render() {
    return <Heading2Styled>{this.props.children}</Heading2Styled>;
  }
}

const Heading2Styled = styled.h3(
  s.fonts.headingSmall,
  {
    margin: `${s.size(32)} 0 ${s.size(10)} 0`,
    color: s.colors.grayDark,
    [s.breakpoints.medium]: {
      margin: `${s.size(26)} 0 ${s.size(8)} 0`
    },
    [s.breakpoints.small]: {
      margin: `${s.size(18)} 0 ${s.size(6)} 0`
    }
  },
  removeSpacingAfterHeading
);

//
// Code
//

function formatMultilineCode(input: string): string {
  let inputLines = stripIndent(input).split("\n");

  const start = (() => {
    for (let i = 0; i < inputLines.length; i++) {
      if (inputLines[i].trim() !== "") return i;
    }
    return 0;
  })();

  const end = (() => {
    for (let i = inputLines.length - 1; i >= 0; i--) {
      if (inputLines[i].trim() !== "") return i;
    }
    return inputLines.length - 1;
  })();

  inputLines = inputLines.slice(start, end + 1);

  return inputLines.join("\n");
}

export const Code = ({
  children,
  multiline = false,
  language
}: {
  children: string;
  multiline?: boolean;
  language?: string;
}) => {
  const code = formatMultilineCode(children);

  const codeComponent = language ? (
    <CodeStyled
      dangerouslySetInnerHTML={{
        __html: highlight.highlight(language, code).value
      }}
      multiline={multiline}
    />
  ) : (
    <CodeStyled multiline={multiline}>{code}</CodeStyled>
  );

  if (multiline) {
    return <PreStyled>{codeComponent}</PreStyled>;
  } else {
    return codeComponent;
  }
};

export const Diagram = (props: { children: string }) => {
  const code = formatMultilineCode(props.children);

  return (
    <PreStyled>
      <CodeStyled diagram>{code}</CodeStyled>
    </PreStyled>
  );
};

const PreStyled = styled.pre({
  display: "block",
  margin: `${s.dimensions.paragraphSpacing} 0 0 0`
});

const CodeStyled = styled.code(
  {
    backgroundColor: s.colors.grayLighter,
    border: s.borders.default,
    borderRadius: s.dimensions.borderRadius,
    boxDecorationBreak: "clone", // inline code snippets can be spread across 2 rows
    WebkitOverflowScrolling: "touch"
  },
  ({
    multiline = false,
    diagram = false
  }: {
    multiline?: boolean;
    diagram?: boolean;
  }) => {
    const innerPadding = s.grid(1);
    let styles = {};

    if (multiline || diagram) {
      styles = {
        ...styles,
        ...s.fonts.codeMultiline,
        display: "block",
        padding: innerPadding,
        overflow: "auto"
      };
    } else {
      styles = {
        ...styles,
        ...s.fonts.codeInline,
        display: "inline",
        padding: `${s.size(1)} ${s.size(2)}`
      };
    }

    if (diagram) {
      styles = {
        ...styles,
        padding: `calc(1em + ${innerPadding})`,
        // At 0.9 box drawing characters are properly connected
        // https://en.wikipedia.org/wiki/Box-drawing_character
        lineHeight: 0.9
      };
    }

    return styles;
  }
);

//
// Table
//

export const Table = (props: {
  // TODO: children only table rows
  heading?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const heading = (() => {
    const headingProp = props.heading;
    if (!headingProp) return null;

    const headingRow = React.Children.map(props.heading, (child: any) =>
      React.cloneElement(child, { heading: true })
    );

    return headingRow;
  })();

  return (
    <TableStyled>
      {heading && <thead>{heading}</thead>}
      <tbody>{props.children}</tbody>
    </TableStyled>
  );
};

const TableStyled = styled.table({
  margin: `${s.dimensions.paragraphSpacing} 0 0 0`,
  borderCollapse: "collapse"
});

export const Tr = ({
  heading = false,
  children
}: {
  // TODO: child oly TableCell

  // Children are not required because we might have empty filler cells.
  heading?: boolean;
  children: React.ReactNode;
}) => {
  const cells = React.Children.map(children, (child: any) =>
    React.cloneElement(child, { heading })
  );

  return <tr>{cells}</tr>;
};

export const Tc = ({
  heading = false,
  noWrap = false,
  children
}: {
  heading?: boolean;
  noWrap?: boolean;
  children?: React.ReactNode;
}) => {
  const Component = heading ? TableCellHeadingStyled : (TableCellStyled as any);

  return <Component noWrap={noWrap}>{children}</Component>;
};

const tableCellSharedStyles = {
  ...s.fonts.paragraphSmall,
  border: `${s.size(1)} solid ${s.colors.grayLight}`,
  padding: s.grid(1)
};

const tableCellSharedProps = (props: { noWrap: boolean }) => {
  if (props.noWrap) {
    return {
      whiteSpace: "nowrap"
    };
  }
};

const TableCellStyled = styled.td(
  {
    ...tableCellSharedStyles
  },
  tableCellSharedProps as any
);

const TableCellHeadingStyled = styled.th(
  {
    ...tableCellSharedStyles,
    ...s.fonts.headingTable,
    fontWeight: "bold",
    textAlign: "center"
  },
  tableCellSharedProps as any
);

//
// Video
//

export const Video = (props: {
  width: number;
  height: number;
  src: string;
}) => {
  const ratio = props.width / props.height;

  return (
    <VideoWrapperStyled
      style={{
        maxHeight: props.height + "px",
        maxWidth: props.width + "px"
      }}
    >
      <VideoWrapperInnerStyled style={{ paddingBottom: 100 / ratio + "%" }}>
        <VideoStyled
          width={props.width}
          height={props.height}
          controls
          autoPlay
          loop
        >
          <source src={props.src} type="video/mp4" />
        </VideoStyled>
      </VideoWrapperInnerStyled>
    </VideoWrapperStyled>
  );
};

const VideoWrapperStyled = styled.div({
  marginTop: s.dimensions.paragraphSpacing,
  marginLeft: "auto",
  marginRight: "auto",
  border: s.borders.default,
  background: s.colors.grayLighter,
  borderRadius: s.dimensions.borderRadius,
  overflow: "hidden"
});

const VideoWrapperInnerStyled = styled.div({
  width: "100%",
  height: 0
});

const VideoStyled = styled.video({
  display: "block",
  maxWidth: "100%",
  height: "auto"
});

/*






// comments

.Article-comments {
}

.Article-comments-heading {
  margin: 0;
  padding: var(--font-padding-headline);
  font-size: var(--font-size-headline);
  line-height: var(--font-line-height-headline);
  font-family: var(--font-family-heading);
  font-weight: normal;
  color: var(--color-gray-dark);
}

// images

.Article-content img {
  display: block;
  margin: var(--paragraph-spacing) 0 0 0;
}

.Article-content figure {
  margin: var(--paragraph-spacing) 0 0 0;
  font-family: var(--font-family-paragraph);
  font-size: var(--font-size-paragraph);
  line-height: var(--font-line-height-paragraph);
}

.Article-content figure figcaption {
  font-size: var(--font-size-paragraph-small);
  font-family: var(--font-family-paragraph);
  line-height: var(--font-line-height-paragraph-small);
}

// videos

.Article-content video {
  max-width: 100%;
  height: auto;
}

// quotes

.Article-content blockquote {
  margin: var(--paragraph-spacing) 0 0 0;
  padding-left: 1em;
  padding-right: 1em;
  border-left: 0.6rem solid var(--color-gray-lighter);
  font-family: var(--font-family-paragraph);
  font-size: var(--font-size-paragraph);
  line-height: var(--font-line-height-paragraph);
}

.Article-content blockquote p {
  margin: 0;
}

.Article-content blockquote footer {
  margin-top: 0.4em;
}

 */
