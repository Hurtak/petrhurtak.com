import React from "react";
import Helmet from "react-helmet";
import { capitalize } from "../../common/text-formatting";
import config from "../../config/site-config";

const Title = ({ children }: { children: string }) => (
  <Helmet>
    <title>
      {children} &ndash; {capitalize(config.siteUrlShort)}
    </title>
  </Helmet>
);
export default Title;
