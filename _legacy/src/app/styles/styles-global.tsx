import React from "react";
import css from "@emotion/css/macro";
import { Global } from "@emotion/core";
import { normalizeCss } from "../../generated/raw-files";

export const GlobalStyles = () => (
  <>
    <Global
      styles={{
        body: {
          margin: 0
        }
      }}
    />
    <Global styles={css(normalizeCss)} />
  </>
);
