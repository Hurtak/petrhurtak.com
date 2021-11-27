import clsx from "clsx";
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

import { colors, gridCss, sizeCss } from "../../styles";

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
  const Tag = inline ? "span" : "div";
  return (
    <Tag
      className={clsx({
        ["code-inline"]: inline === true,
        ["code-block"]: inline === false,
        ["no-highlight"]: language == null,
      })}
    >
      <style jsx>{`
        .code-inline {
          display: inline-flex;
          width: auto;
        }
        .code-inline :global(.refractor) {
          padding: ${sizeCss(1)} !important;
          border: 1px solid ${colors.grayDark};
          border-radius: 2px;
          font-size: 14px !important;
          background: ${colors.gray};
        }

        /*
          (highlight) Refactor requires language, so there is always syntax highlight.
          So this is workaround for around that.
        */
        .no-highlight :global(.token) {
          color: black !important;
        }

        .code-block :global(.refractor) {
          padding: ${gridCss(1)} !important;
          background: ${colors.gray} !important;
        }
      `}</style>

      {/*
        (highlight) Refactor requires language, so we pass there the most general one
        Relevant ticket: https://github.com/wooorm/refractor/issues/49
      */}
      <Refractor inline={inline} language={language ?? "bash"} value={stripIndent(children).trim()} />
    </Tag>
  );
};
