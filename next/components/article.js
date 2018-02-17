import React from "react";
import PropTypes from "prop-types";
import glamorous from "glamorous";
import stripIndent from "strip-indent";
import { highlight } from "highlight.js";
import * as s from "../common/styles.js";

//
// Article wrapper
//

export class ArticleWrapper extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    return <WrapperStyled>{this.props.children}</WrapperStyled>;
  }
}

const WrapperStyled = glamorous.div({
  "> *:first-child": {
    marginTop: 0
  }
});

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

const classNameParagraph = "article-paragraph";

const ParagraphStyled = glamorous.p(classNameParagraph, {
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
// Link
//

export class Link extends React.Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired
  };

  render() {
    return (
      <LinkStyled href={this.props.children}>{this.props.children}</LinkStyled>
    );
  }
}

const LinkStyled = glamorous.a({
  color: s.colors.blueDark,
  transition: `0.2s border ease-in-out`,
  ":visited": {
    color: s.colors.blueDark
  }
});

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
  marginLeft: s.size(listIndentSize),
  [`.${classNameParagraph} + &`]: {
    marginTop: 0
  }
});

const ListOrderedStyled = glamorous.ol({
  ...listSharedStyles
});

const ListItemStyled = glamorous.li(
  {
    ...s.fonts.paragraph,
    "> *": {
      marginTop: 0
    }
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

//
// Headings
//

const removeSpacingAfterHeading = {
  "& + *": {
    // TODO: some easy and clean way to do this?
    marginTop: "0 !important"
  }
};

export class Heading1 extends React.Component {
  static propTypes = {
    children: PropTypes.string.isRequired
  };

  render() {
    return <Heading1Styled>{this.props.children}</Heading1Styled>;
  }
}

const Heading1Styled = glamorous.h2(
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

export class Heading2 extends React.Component {
  static propTypes = {
    children: PropTypes.string.isRequired
  };

  render() {
    return <Heading2Styled>{this.props.children}</Heading2Styled>;
  }
}

const Heading2Styled = glamorous.h3(
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
        ...s.fonts.codeMultiline,
        display: "block",
        padding: s.grid(1),
        overflow: "auto"
      };
    } else {
      return {
        ...s.fonts.codeInline,
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
  borderCollapse: "collapse"
});

export class TableRow extends React.Component {
  static propTypes = {
    // TODO: child oly TableCell

    // Children are not required because we might have empty filler cells.
    children: PropTypes.node,
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
  padding: s.grid(1)
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

// videos

.Article-content video {
  display: block;
  margin-left: auto;
  margin-right: auto;
}


 */
