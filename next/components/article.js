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

// .Article-content h3 {
//   margin: 0;
//   padding: var(--font-padding-headline-small);
//   font-size: var(--font-size-headline-small);
//   line-height: var(--font-line-height-headline-small);
//   font-family: var(--font-family-heading);
//   font-weight: normal;
//   color: var(--color-gray-dark);
// }

//
// Special
//

export class Code extends React.Component {
  // TODO: make this component dynamic so we do not import whole highlight.js

  static propTypes = {
    children: PropTypes.string.isRequired,
    language: PropTypes.string
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.children !== this.props.children) return true;
    if (nextProps.language !== this.props.language) return true;

    return false;
  }

  render() {
    let code = this.props.children;
    code = stripIndent(code);
    code = code.trim();
    code = highlight(this.props.language, code).value;

    return (
      <pre>
        <code dangerouslySetInnerHTML={{ __html: code }} />
      </pre>
    );
  }
}

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

// code

.Article-content pre {
  margin: var(--paragraph-spacing) 0 0 0;
}

.Article-content code {
  padding: 0.1em 0.2em;
  font-size: var(--font-size-code);
  line-height: var(--font-line-height-code);
  font-family: var(--font-family-code);
  background-color: var(--color-gray-lighter);
  border: 1px solid var(--color-gray-light);
  border-radius: var(--border-radius);

  // TODO: remove once we no longer need it in chrome for development
  -webkit-box-decoration-break: clone;

  // inline code snippets can be spread across 2 rows
  box-decoration-break: clone;
  -webkit-overflow-scrolling: touch;
}

.Article-content pre > code {
  display: block;
  overflow: auto;
  padding: 0.5em;
}

.Article-content code.language-diagram {
  line-height: 1;
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

// table

.Article-content table {
  margin: var(--paragraph-spacing) 0 0 0;
  font-size: var(--font-size-paragraph-small);
  line-height: var(--font-line-height-paragraph);
  border-collapse: collapse;
}

.Article-content table thead {
  font-weight: bold;
  font-family: var(--font-family-heading);
}

.Article-content table tbody {
  font-family: var(--font-family-paragraph);
}

.Article-content table th,
.Article-content table td {
  border: 1px solid var(--color-gray-light);
  padding: 0.4em 0.8em;
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
