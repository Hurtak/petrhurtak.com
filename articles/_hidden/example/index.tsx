import React from "react";

import { H1, P } from "../../../src/components";
import { ArticleMetadata } from "../../types";

export const metadata: ArticleMetadata = {
  // Update!
  title: "Example article",
  // Update!
  description: `
    Example article description.
  `,
  // Update!
  datePublication: "2018-09-10 16:40:00",
};

export const article = () => (
  <>
    <H1>Article Title</H1>
    <P>Article text</P>
  </>
);
