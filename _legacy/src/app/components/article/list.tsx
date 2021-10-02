import React from "react";
import styled from "@emotion/styled/macro";
import * as s from "../../styles/styles";

export const List = ({ numbered = false, children }: { numbered?: boolean; children: React.ReactNode }) => {
  const ListStyled = numbered ? ListOrderedStyled : ListUnorderedStyled;

  const childrenNumbered = React.Children.map(children, (child) =>
    React.cloneElement(child as React.ReactElement<any>, { numbered: numbered })
  );

  return <ListStyled>{childrenNumbered}</ListStyled>;
};

export const Li = ({ numbered = false, children }: { children: React.ReactNode; numbered?: boolean }) => (
  <ListItemStyled numbered={numbered}>{children}</ListItemStyled>
);

const listSharedStyles = {
  // TODO: why is there size and not grid?
  margin: `${s.dimensions.paragraphSpacing} 0 0 1em`,
  padding: 0,
};

const listIndentSize = s.gridRaw(2);

const ListUnorderedStyled = styled.ul({
  ...listSharedStyles,
  position: "relative",
  marginLeft: s.size(listIndentSize),
  // TODO
  // [`.${classNameParagraph} + &`]: {
  //   marginTop: 0
  // }
});

const ListOrderedStyled = styled.ol({
  ...listSharedStyles,
});

const ListItemStyled = styled.li(
  {
    ...s.fonts.paragraph,
    // TODO
    "> *": {
      marginTop: 0,
    },
  },
  (props: { numbered: boolean }) => {
    if (props.numbered) {
      return {
        listStyleType: "decimal",
      };
    } else {
      return {
        listStyleType: "none",
        "::before": {
          content: `"–"`,
          display: "block",
          position: "absolute",
          left: s.size(-listIndentSize),
        },
      };
    }
  }
);
