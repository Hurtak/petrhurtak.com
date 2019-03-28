import styled from "@emotion/styled/macro";
import * as s from "../../../styles/styles";

export const Heading = styled.h1({
  ...s.fonts.heading
});

export const Text = styled.p({
  ...s.fonts.paragraph,
  paddingTop: s.grid(1)
});
