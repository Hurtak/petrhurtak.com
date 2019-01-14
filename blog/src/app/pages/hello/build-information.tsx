import React from "react";
import Helmet from "react-helmet";
import buildInformation from "../../../generated/build-info";

const { buildTime, buildTimestamp, buildGitCommitHash } = buildInformation;

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
