import { GetStaticPropsResult } from "next";

import { Link } from "../components/article";
import { DocumentTitle } from "../components/base/document-title";
import { routes } from "../config";
import { date } from "../lib/date";
import { getServerConfig, ServerConfig } from "../server-config";

type Props = {
  buildInfo: ServerConfig["buildInfo"];
};

export const getStaticProps = (): GetStaticPropsResult<Props> => {
  const serverConfig = getServerConfig();

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
      <li>
        build commit hash:{" "}
        <Link href={routes.articleGitHubCommitHash(buildInfo.commitHash)}>{buildInfo.commitHash}</Link>
      </li>
    </ul>
  </>
);

export default Debug;
