import React from "react";
import PropTypes from "prop-types";
import glamorous from "glamorous";
import stripIndent from "strip-indent";
import { highlight } from "highlight.js";
import * as s from "../common/styles.js";

//
// Texts
//

// .Article-content em {
//   font-style: italic;
// }

// .Article-content mark {
//   background-color: var(--color-yellow);
// }

// .Article-content s {
//   text-decoration: line-through;
// }

export class Paragraph extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    return <ParagraphStyled>{this.props.children}</ParagraphStyled>;
  }
}

const ParagraphStyled = glamorous.p({
  ...s.fonts.paragraph,
  marginTop: s.dimensions.paragraphSpacing
});

export class Bold extends React.Component {
  static propTypes = {
    children: PropTypes.string.isRequired
  };

  render() {
    return <BoldStyled>{this.props.children}</BoldStyled>;
  }
}

const BoldStyled = glamorous.strong({
  fontWeight: "bold"
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

// const SmallComponent = glamorous.small({
//   ...s.fonts.paragraphSmall,
//   marginTop: s.dimensions.paragraphSpacing,
//   color: s.colors.grayDark
// });

//
// Lists
//

export class List extends React.Component {
  static propTypes = {
    // TODO: children only prop type of li
    children: PropTypes.node.isRequired,
    numbered: PropTypes.bool
  };

  render() {
    const ListStyled = this.props.numbered
      ? ListOrderedStyled
      : ListUnorderedStyled;

    // TODO: consider using contect api when the new one comes out
    const children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, { numbered: this.props.numbered })
    );

    return <ListStyled>{children}</ListStyled>;
  }
}

export class ListItem extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    numbered: PropTypes.bool
  };

  render() {
    return (
      <ListItemStyled numbered={this.props.numbered}>
        {this.props.children}
      </ListItemStyled>
    );
  }
}

const listSharedStyles = {
  // TODO: why is there size and not grid?
  margin: `${s.dimensions.paragraphSpacing} 0 0 1em`,
  padding: 0
};

const listIndentSize = s.gridRaw(2);

const ListUnorderedStyled = glamorous.ul({
  ...listSharedStyles,
  position: "relative",
  marginLeft: s.size(listIndentSize)
});

const ListOrderedStyled = glamorous.ol({
  ...listSharedStyles
});

const ListItemStyled = glamorous.li(
  {
    ...s.fonts.paragraph
  },
  props => {
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

// .Article-content p + ul,
// .Article-content li > ul,
// .Article-content li > ol,
// .Article-content li > pre,
// .Article-content li > p {
//   margin-top: 0;
// }

//
// Headings
//

export class Heading1 extends React.Component {
  static propTypes = {
    children: PropTypes.string.isRequired
  };

  render() {
    return <Heading1Styled>{this.props.children}</Heading1Styled>;
  }
}

const Heading1Styled = glamorous.h2({
  ...s.fonts.headingMedium,
  padding: `${s.size(56)} 0 ${s.size(12)} 0`,
  color: s.colors.grayDark,
  [s.breakpoints.medium]: {
    padding: `${s.size(44)} 0 ${s.size(10)} 0`
  },
  [s.breakpoints.small]: {
    padding: `${s.size(34)} 0 ${s.size(8)} 0`
  }
});

export class Heading2 extends React.Component {
  static propTypes = {
    children: PropTypes.string.isRequired
  };

  render() {
    return <Heading2Styled>{this.props.children}</Heading2Styled>;
  }
}

const Heading2Styled = glamorous.h3({
  ...s.fonts.headingSmall,
  padding: `${s.size(32)} 0 ${s.size(10)} 0`,
  color: s.colors.grayDark,
  [s.breakpoints.medium]: {
    padding: `${s.size(26)} 0 ${s.size(8)} 0`
  },
  [s.breakpoints.small]: {
    padding: `${s.size(18)} 0 ${s.size(6)} 0`
  }
});

//
// Code
//

export class Code extends React.Component {
  // TODO: make this component dynamic so we do not import whole highlight.js

  static propTypes = {
    children: PropTypes.string.isRequired,
    multiline: PropTypes.bool,
    language: PropTypes.string
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.children !== this.props.children) return true;
    if (nextProps.language !== this.props.language) return true;

    return false;
  }

  render() {
    const code = (() => {
      let res = this.props.children;
      res = stripIndent(res);
      res = res.trim();
      return res;
    })();

    const codeComponent = this.props.language ? (
      <CodeStyled
        dangerouslySetInnerHTML={{
          __html: highlight(this.props.language, code).value
        }}
        multiline={this.props.multiline}
      />
    ) : (
      <CodeStyled multiline={this.props.multiline}>{code}</CodeStyled>
    );

    if (this.props.multiline) {
      return <PreStyled>{codeComponent}</PreStyled>;
    } else {
      return codeComponent;
    }
  }
}

const PreStyled = glamorous.pre({
  display: "block",
  margin: `${s.dimensions.paragraphSpacing} 0 0 0`
});

const CodeStyled = glamorous.code(
  {
    ...s.fonts.code,
    backgroundColor: s.colors.grayLighter,
    border: `${s.size(1)} solid ${s.colors.grayLight}`,
    borderRadius: s.dimensions.borderRadius,
    boxDecorationBreak: "clone", // inline code snippets can be spread across 2 rows
    WebkitOverflowScrolling: "touch",
    "&.language-diagram": {
      lineHeight: 1
    }
  },
  props => {
    if (props.multiline) {
      return {
        display: "block",
        padding: s.grid(1),
        overflow: "auto"
      };
    } else {
      return {
        display: "inline",
        padding: `${s.size(1)} ${s.size(2)}`
      };
    }
  }
);

//
// Table
//

export class Table extends React.Component {
  static propTypes = {
    // TODO: children only table rows
    heading: PropTypes.node,
    children: PropTypes.node.isRequired
  };

  constructor() {
    super();
  }

  render() {
    const heading = (() => {
      const headingProp = this.props.heading;
      if (!headingProp) return null;

      const headingRow = React.Children.map(this.props.heading, child =>
        React.cloneElement(child, { heading: true })
      );

      return headingRow;
    })();

    return (
      <TableStyled>
        {heading && <thead>{heading}</thead>}
        <tbody>{this.props.children}</tbody>
      </TableStyled>
    );
  }
}

const TableStyled = glamorous.table({
  margin: `${s.dimensions.paragraphSpacing} 0 0 0`,
  // font-size: var(--font-size-paragraph-small),
  // line-height: var(--font-line-height-paragraph),
  borderCollapse: "collapse"
});

// .Article-content table tbody {
//   font-family: var(--font-family-paragraph);
// }

export class TableRow extends React.Component {
  static propTypes = {
    // TODO: child oly TableCell
    children: PropTypes.node.isRequired,
    heading: PropTypes.bool
  };

  render() {
    const cells = React.Children.map(this.props.children, child =>
      React.cloneElement(child, { heading: this.props.heading })
    );

    return <tr>{cells}</tr>;
  }
}

export class TableCell extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    heading: PropTypes.bool
  };

  render() {
    const Component = this.props.heading
      ? TableCellHeadingStyled
      : TableCellStyled;

    return <Component>{this.props.children}</Component>;
  }
}

const tableCellSharedStyles = {
  ...s.fonts.paragraphSmall,
  border: `${s.size(1)} solid ${s.colors.grayLight}`,
  padding: "0.4em 0.8em"
};

const TableCellStyled = glamorous.td({
  ...tableCellSharedStyles
});

const TableCellHeadingStyled = glamorous.th({
  ...tableCellSharedStyles,
  ...s.fonts.headingTable,
  fontWeight: "bold",
  textAlign: "center"
});

// .Article-content table th,
// .Article-content table td {
//   border: 1px solid var(--color-gray-light);
//   padding: 0.4em 0.8em;
// }

/*







// header

.Article-header {
  display: flex;
  flex-direction: column;
}

.Article-title {
  margin: 1.2em 0 0 0;
  font-size: var(--font-size-title);
  line-height: var(--font-line-height-title);
  font-family: var(--font-family-heading);
  font-weight: normal;
  color: var(--color-gray-dark);
}

.Article-datetime {
  margin-top: 0.2em;
  font-size: var(--font-size-paragraph);
  line-height: var(--font-line-height-paragraph);
  font-family: var(--font-family-paragraph);
  font-style: italic;
}

// content

.Article-content {
  margin-top: 2.8rem;
}

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

// links

.Article-content a {
  color: var(--color-blue-dark);
  transition: 0.2s border ease-in-out;
}

.Article-content a:visited {
  color: var(--color-blue-dark);
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

// videos

.Article-content video {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

// spacing between paragraphs and headings

.Article-content > * {
  margin: var(--paragraph-spacing) 0 0 0;
}

.Article-content > *:first-child {
  margin-top: 0;
  padding-top: 0;
}

.Article-content h2 + *:not(h2):not(h3),
.Article-content h3 + *:not(h2):not(h3) {
  // remove margin after heading, since headins has margin bottom
  margin-top: 0;
}


 */
