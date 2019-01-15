import React from "react";
import styled from "@emotion/styled/macro";
import * as s from "../../common/styles";

export const P = ({ children }: { children: string }) => (
  <ParagraphStyled>{children}</ParagraphStyled>
);

// TODO
// const classNameParagraph = "article-paragraph";

const ParagraphStyled = styled.p(
  {
    ...s.fonts.paragraph,
    marginTop: s.dimensions.paragraphSpacing
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
    color: s.colors.blueDark
  }
});

export const Bold = ({ children }: { children: string }) => (
  <BoldStyled>{children}</BoldStyled>
);

const BoldStyled = styled.strong({
  fontWeight: "bold"
});

export const Italic = ({ children }: { children: string }) => (
  <ItalicStyled>{children}</ItalicStyled>
);

const ItalicStyled = styled.em({
  fontStyle: "italic"
});

export const Quote = ({ children }: { children: string }) => (
  <QuotationsStyles>{children}</QuotationsStyles>
);

const QuotationsStyles = styled.q({
  // https://practicaltypography.com/straight-and-curly-quotes.html
  quotes: `"“" "”"`
});
