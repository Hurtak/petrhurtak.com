import dayjs from "dayjs";

import { Link } from "../components/article";
import { DocumentTitle } from "../components/base/document-title";
import { routes } from "../config";

const Debug = () => (
  <>
    <DocumentTitle title="Debug" description="Petr Hurtak's personal website and blog" />

    <h1>Debug info</h1>

    <ul>
      <li>build time (ISO): {dayjs.utc(__BUILD_TIME__).toISOString()}</li>
      <li>build time (local): {dayjs.utc(__BUILD_TIME__).toDate().toLocaleString()}</li>
      <li>
        build commit hash: <Link href={routes.articleGitHubCommitHash(__COMMIT_HASH__)}>{__COMMIT_HASH__}</Link>
      </li>
    </ul>
  </>
);

export default Debug;
