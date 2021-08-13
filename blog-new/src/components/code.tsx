import Refractor from "react-refractor";
import bash from "refractor/lang/bash";
import docker from "refractor/lang/docker";
import javascript from "refractor/lang/javascript";
import jsx from "refractor/lang/jsx";
import tsx from "refractor/lang/tsx";
import typescript from "refractor/lang/typescript";
import stripIndent from "strip-indent";

Refractor.registerLanguage(bash);
Refractor.registerLanguage(docker);
Refractor.registerLanguage(javascript);
Refractor.registerLanguage(jsx);
Refractor.registerLanguage(tsx);
Refractor.registerLanguage(typescript);

type LanguageType = "js" | "jsx" | "ts" | "tsx" | "docker" | "bash";

export const Code = ({
  language,
  multiline = false,
  children,
}: {
  language?: LanguageType;
  multiline?: boolean;
  children: string;
}) => {
  const inline = multiline === false;
  return (
    <div className={inline ? "inline-code" : ""}>
      <style jsx>{`
        div {
          width: 100%;
        }

        .inline-code {
          display: inline-flex;
        }
        .inline-code :global(.refractor) {
          margin: 0;
          padding: 0 0.2em;
        }
      `}</style>

      {/* Refactor requires language, so we pass there the most general one */}
      {/* https://github.com/wooorm/refractor/issues/49 */}
      <Refractor language={language ?? "bash"} value={stripIndent(children).trim()} />
    </div>
  );
};
