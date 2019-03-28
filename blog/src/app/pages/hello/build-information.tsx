import React from "react";
import { HelmetTitle } from "../../components/helmet-title";
import { buildInformation } from "../../../generated/build-information";

const { buildTime, buildTimestamp, buildGitCommitHash } = buildInformation;

export const BuildInformation = () => (
  <>
    <HelmetTitle>Build information</HelmetTitle>

    <ul>
      <li>{`build time: ${buildTime}`}</li>
      <li>{`build time timestamp: ${buildTimestamp}`}</li>
      <li>{`build git commit: ${buildGitCommitHash}`}</li>
    </ul>
  </>
);
