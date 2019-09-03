import React from "react";
import styled from "@emotion/styled/macro";
import { Code, List } from "react-content-loader";
import { Spacer } from "../../components/spacer";
import { Link } from "../../components/link";
import * as s from "../../styles/styles";

const LoadingBlockCode = () => <Code width={500} height={70} />;
const LoadingBlockList = () => <List width={500} height={90} />;

export const Loading = () => {
  return (
    <>
      <Spacer spacing={5}>
        <LoadingBlockList />
        <LoadingBlockCode />
        <LoadingBlockList />
        <LoadingBlockList />
      </Spacer>
    </>
  );
};

export const Header = styled.div({
  display: "flex",
  flexDirection: "column"
});

export const ArticleTitle = styled.h1({
  ...s.fonts.heading,
  color: s.colors.grayDark
});

export const Time = styled.time({
  ...s.fonts.paragraph,
  fontStyle: "italic"
});

export const Content = styled.div({
  marginTop: s.grid(3)
});

export const Footer = styled.section({
  marginTop: s.grid(3)
});

export const FooterLink = styled(Link)({
  ...s.fonts.paragraph,
  color: s.colors.blueDark,
  marginLeft: s.grid(1),

  ":first-of-type": {
    marginLeft: 0
  }
});
