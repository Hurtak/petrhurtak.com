import React from "react";
import styled from "@emotion/styled/macro";
import { Code, List } from "react-content-loader";
import { Spacer } from "../../components/spacer";
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

export const Comments = styled.section({
  marginTop: s.grid(3)
});

export const CommentsTitle = styled.h2({
  ...s.fonts.headingMedium,
  margin: `${s.grid(7)} 0 ${s.grid(2)} 0`
});
