import clsx from "clsx";
import { Refractor, registerLanguage } from "react-refractor";
import bash from "refractor/bash";
import css from "refractor/css";
import docker from "refractor/docker";
import elm from "refractor/elm";
import javascript from "refractor/javascript";
import json from "refractor/json";
import jsx from "refractor/jsx";
import makefile from "refractor/makefile";
import tsx from "refractor/tsx";
import typescript from "refractor/typescript";
import yaml from "refractor/yaml";
import stripIndent from "strip-indent";

import { colors, gridCss, sizeCss } from "../../styles";

registerLanguage(bash);
registerLanguage(docker);
registerLanguage(elm);
registerLanguage(javascript);
registerLanguage(json);
registerLanguage(jsx);
registerLanguage(makefile);
registerLanguage(tsx);
registerLanguage(typescript);
registerLanguage(yaml);
registerLanguage(css);

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
