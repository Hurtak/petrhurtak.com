import dayjs from "dayjs";
import { GetStaticPropsResult } from "next";

import { Link } from "../src/components/article";
import { DocumentTitle } from "../src/components/base/document-title";
import { getServerRuntimeConfig, routes, ServerRuntimeConfig } from "../src/config";

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
      <li>build time: {dayjs.utc(buildInfo.time).toISOString()}</li>
      <li>build time: {dayjs.utc(buildInfo.time).toDate().toLocaleString()}</li>
      <li>
        build commit hash:{" "}
        <Link href={routes.articleGitHubCommitHash(buildInfo.commitHash)} newTab>
          {buildInfo.commitHash}
        </Link>
      </li>
    </ul>
  </>
);

export default Debug;
