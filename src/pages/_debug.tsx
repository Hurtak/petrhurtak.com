import { GetStaticPropsResult } from "next";

import { Link } from "../components/article";
import { DocumentTitle } from "../components/base/document-title";
import { getServerRuntimeConfig, routes, ServerRuntimeConfig } from "../config";
import { date } from "../lib/date";

type Props = {
  buildInfo: ServerRuntimeConfig["buildInfo"];
};

export const getStaticProps = (): GetStaticPropsResult<Props> => {
  const serverConfig = getServerRuntimeConfig();

  return {
    props: {
      buildInfo: serverConfig.buildInfo,
    },
  };
};

const Debug = ({ buildInfo }: Props) => (
  <>
    <DocumentTitle title="Debug" />

    <h1>Debug info</h1>

    <ul>
      <li>build time: {date.utc(buildInfo.time).toISOString()}</li>
      <li>build time: {date.utc(buildInfo.time).toDate().toLocaleString()}</li>
      <li>
        build commit hash:{" "}
        <Link href={routes.articleGitHubCommitHash(buildInfo.commitHash)}>{buildInfo.commitHash}</Link>
      </li>
    </ul>
  </>
);

export default Debug;
