import React from "react";
import Helmet from "react-helmet";
import { capitalize } from "../common/text-formatting";
import { config } from "../config/site-config";

export const HelmetTitle = ({ children }: { children: string }) => (
  <Helmet>
    <title>
      {children} &ndash; {capitalize(config.siteUrlShort)}
    </title>
  </Helmet>
);
