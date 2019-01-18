import React from "react";
import Title from "../../components/layout/title";
import buildInformation from "../../../generated/build-info";

const { buildTime, buildTimestamp, buildGitCommitHash } = buildInformation;

const BuildInformation = () => (
  <>
    <Title>Build information</Title>

    <ul>
      <li>{`build time: ${buildTime}`}</li>
      <li>{`build time timestamp: ${buildTimestamp}`}</li>
      <li>{`build git commit: ${buildGitCommitHash}`}</li>
    </ul>
  </>
);
export default BuildInformation;
