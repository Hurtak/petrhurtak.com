import React from "react";
import Helmet from "react-helmet";
import Link from "../../components/link";
import routes from "../../config/routes";

const HiddenIndex = () => (
  <>
    <Helmet>
      <title>Hello</title>
    </Helmet>

    <ul>
      <li>
        <li>
          <Link to={routes.buildInformation}>Build information</Link>
        </li>
        <li>
          <Link to={routes.allArticles}>Articles</Link>
        </li>
      </li>
    </ul>
  </>
);
export default HiddenIndex;
