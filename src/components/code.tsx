import Refractor from "react-refractor";
import bash from "refractor/lang/bash";
import docker from "refractor/lang/docker";
import javascript from "refractor/lang/javascript";
import jsx from "refractor/lang/jsx";
import makefile from "refractor/lang/makefile";
import tsx from "refractor/lang/tsx";
import typescript from "refractor/lang/typescript";
import yaml from "refractor/lang/yaml";
import stripIndent from "strip-indent";

Refractor.registerLanguage(bash);
Refractor.registerLanguage(docker);
Refractor.registerLanguage(javascript);
Refractor.registerLanguage(jsx);
Refractor.registerLanguage(makefile);
Refractor.registerLanguage(tsx);
Refractor.registerLanguage(typescript);
Refractor.registerLanguage(yaml);

type LanguageType =
  | "bash"
  //
  | "docker"
  | "js"
  | "jsx"
  | "makefile"
  | "ts"
  | "yaml"
  | "tsx";

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
          width: auto;
        }
        .inline-code :global(.refractor) {
          margin: 0;
          padding: 0 0.2em;
        }
      `}</style>

      {/* Refactor requires language, so we pass there the most general one */}
      {/* https://github.com/wooorm/refractor/issues/49 */}
      <Refractor inline={inline} language={language ?? "bash"} value={stripIndent(children).trim()} />
    </div>
  );
};
