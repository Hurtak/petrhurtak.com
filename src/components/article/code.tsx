import clsx from "clsx";
import Refractor from "react-refractor";
import bash from "refractor/lang/bash";
import css from "refractor/lang/css";
import docker from "refractor/lang/docker";
import elm from "refractor/lang/elm";
import javascript from "refractor/lang/javascript";
import json from "refractor/lang/json";
import jsx from "refractor/lang/jsx";
import makefile from "refractor/lang/makefile";
import tsx from "refractor/lang/tsx";
import typescript from "refractor/lang/typescript";
import yaml from "refractor/lang/yaml";
import stripIndent from "strip-indent";

import { colors, gridCss, sizeCss } from "../../styles";

Refractor.registerLanguage(bash);
Refractor.registerLanguage(docker);
Refractor.registerLanguage(elm);
Refractor.registerLanguage(javascript);
Refractor.registerLanguage(json);
Refractor.registerLanguage(jsx);
Refractor.registerLanguage(makefile);
Refractor.registerLanguage(tsx);
Refractor.registerLanguage(typescript);
Refractor.registerLanguage(yaml);
Refractor.registerLanguage(css);

type LanguageType =
  //
  | "js"
  | "jsx"
  | "ts"
  | "tsx"
  | "elm"
  | "css"
  //
  | "yaml"
  | "json"
  //
  | "docker"
  | "bash"
  | "makefile";

export const Code = ({ language, children }: { language?: LanguageType; children: string }) => {
  const inline = !children.includes("\n");
  const Tag = inline ? "span" : "div";
  return (
    <Tag
      className={clsx({
        "code-inline": inline,
        "code-block": !inline,
        "no-highlight": !language,
      })}
    >
      <style jsx>{`
        :global(.refractor) {
          background: ${colors.gray} !important;
          border: 1px solid ${colors.grayDark};
          border-radius: 2px;
        }

        .code-inline {
          display: inline-flex;
          width: auto;
        }
        .code-inline :global(.refractor) {
          padding: ${sizeCss(1)} !important;
          font-size: 14px !important;
        }

        .code-block :global(.refractor) {
          padding: ${gridCss(1)} !important;
          font-size: 12px !important;
        }

        /*
          (highlight) Refactor requires language, so there is always syntax highlight.
          So this is workaround for around that.
        */
        .no-highlight :global(.token) {
          color: black !important;
          background: none !important;
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
