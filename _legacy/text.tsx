import styled from "@emotion/styled/macro";
import React from "react";

import * as s from "../../styles/styles";

export const P = ({ children }: { children: string }) => <ParagraphStyled>{children}</ParagraphStyled>;

// TODO
// const classNameParagraph = "article-paragraph";

const ParagraphStyled = styled.p(
  {
    ...s.fonts.paragraph,
    marginTop: s.dimensions.paragraphSpacing,
  }
  // TODO:
  // { className: classNameParagraph },
);

// TODO: Use our link component??
export const Link = (props: { children: string; href?: string }) => (
  <LinkStyled href={props.href || props.children}>{props.children}</LinkStyled>
);

const LinkStyled = styled.a({
  color: s.colors.blueDark,
  transition: `0.2s border ease-in-out`,
  ":visited": {
    color: s.colors.blueDark,
  },
});
