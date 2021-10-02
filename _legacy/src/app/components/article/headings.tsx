import React from "react";
import styled from "@emotion/styled/macro";
import * as s from "../../styles/styles";

const removeSpacingAfterHeading = {
  "& + *": {
    // TODO: some cleaner way to do this?
    // idea: have article wrapper iterate over children and if 2 children are
    //       of type heading, add to the second one noTopSpacing prop
    marginTop: "0 !important",
  },
};

export const H1 = ({ children }: { children: string }) => <Heading1Styled>{children}</Heading1Styled>;

const Heading1Styled = styled.h2(
  s.fonts.headingMedium,
  {
    margin: `${s.size(56)} 0 ${s.size(12)} 0`,
    color: s.colors.grayDark,
    [s.breakpoints.medium]: {
      margin: `${s.size(44)} 0 ${s.size(10)} 0`,
    },
    [s.breakpoints.small]: {
      margin: `${s.size(34)} 0 ${s.size(8)} 0`,
    },
  },
  removeSpacingAfterHeading
);

export const H2 = ({ children }: { children: string }) => <Heading2Styled>{children}</Heading2Styled>;

const Heading2Styled = styled.h3(
  s.fonts.headingSmall,
  {
    margin: `${s.size(32)} 0 ${s.size(10)} 0`,
    color: s.colors.grayDark,
    [s.breakpoints.medium]: {
      margin: `${s.size(26)} 0 ${s.size(8)} 0`,
    },
    [s.breakpoints.small]: {
      margin: `${s.size(18)} 0 ${s.size(6)} 0`,
    },
  },
  removeSpacingAfterHeading
);
