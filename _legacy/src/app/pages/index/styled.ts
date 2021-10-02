import styled from "@emotion/styled/macro";
import { Link } from "../../components/link";
import * as s from "../../styles/styles";

export const Heading = styled.h1({
  ...s.fonts.heading,
  marginBottom: s.grid(3),
});

export const ArticleStyled = styled.article({});

export const ArticleTitle = styled.h2({
  margin: 0,
});

export const ArticleTitleLink = styled(Link)({
  ...s.fonts.headingMedium,
  ...s.fonts.link,
});

export const ArticleDate = styled.time({
  ...s.fonts.paragraphSmall,
});

export const ArticleDescription = styled.p({
  ...s.fonts.paragraph,
  marginTop: s.grid(2),
});
