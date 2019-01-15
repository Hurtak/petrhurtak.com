import React from "react";
import styled from "@emotion/styled/macro";
import * as s from "../common/styles";

const NotFound = () => {
  return (
    <>
      <Heading>Page not found</Heading>
      <Text>Sorry</Text>
    </>
  );
};
export default NotFound;

const Heading = styled.h1({
  ...s.fonts.heading
});

const Text = styled.p({
  ...s.fonts.paragraph,
  paddingTop: s.grid(1)
});
