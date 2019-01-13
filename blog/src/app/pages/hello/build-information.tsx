import React from "react";
import Helmet from "react-helmet";
import {
  buildTime,
  buildTimestamp,
  buildGitCommitHash
} from "../../macros/build-info";

const BuildInformation = () => (
  <>
    <Helmet>
      <title>Build information</title>
    </Helmet>

    <ul>
      <li>{`build time: ${buildTime}`}</li>
      <li>{`build time timestamp: ${buildTimestamp}`}</li>
      <li>{`build git commit: ${buildGitCommitHash}`}</li>
    </ul>
  </>
);
export default BuildInformation;
