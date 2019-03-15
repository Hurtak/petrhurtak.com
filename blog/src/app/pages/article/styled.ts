import styled from "@emotion/styled/macro";
import * as s from "../../styles/styles";

export const Loading = () => {
  return null;
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
