import { Dash } from "../components/article";
import { DocumentTitle } from "../components/base/document-title";

const Page404 = () => {
  return (
    <>
      <DocumentTitle title="404" description="Petr Hurtak's personal website and blog" />

      <h1>
        404 <Dash /> Page not found
      </h1>
    </>
  );
};

export default Page404;
