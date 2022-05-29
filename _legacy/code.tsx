import React from "react";
import styled from "@emotion/styled/macro";
import css from "@emotion/css/macro";
import { Global } from "@emotion/core";
// TODO: is this duplicate code with or own metadata.description strip indent function?
import stripIndent from "strip-indent";
import * as s from "../../styles/styles";
import { highlightCss } from "../../../generated/raw-files";

// const ss = raw("highlight.js/styles/github.css");

// Only include used languages in the bundle
// TODO: make the register language with dynamic imports so we do not have
//       to register languages manually and so only needed languages are
//       downloaded?
// https://github.com/highlightjs/highlight.js/pull/1663
import highlight from "highlight.js/lib/highlight.js";

import highlightLanguageJavaScript from "highlight.js/lib/languages/javascript";
// TODO: until https://github.com/highlightjs/highlight.js/issues/1155 is resolved
import highlightLanguageTypeScript from "./highlight-ts-patch.js";
import highlightLanguageMakefile from "highlight.js/lib/languages/makefile";
import highlightLanguageJson from "highlight.js/lib/languages/json";
import highlightLanguageYaml from "highlight.js/lib/languages/yaml";
import highlightLanguageCss from "highlight.js/lib/languages/css";
import highlightLanguageXml from "highlight.js/lib/languages/xml"; // HTML
import highlightLanguageBash from "highlight.js/lib/languages/bash";
import highlightLanguageDockerfile from "highlight.js/lib/languages/dockerfile";
import highlightLanguageElm from "highlight.js/lib/languages/elm";
// import highlightShell from "highlight.js/lib/languages/shell";
// import highlightHttp from "highlight.js/lib/languages/http";
// import highlightPython from "highlight.js/lib/languages/python";
// import highlightSql from "highlight.js/lib/languages/sql";
// import highlightDiff from "highlight.js/lib/languages/diff";
// import highlightMarkdown from "highlight.js/lib/languages/markdown";

highlight.registerLanguage("javascript", highlightLanguageJavaScript);
highlight.registerLanguage("typescript", highlightLanguageTypeScript);
highlight.registerLanguage("dockerfile", highlightLanguageDockerfile);
highlight.registerLanguage("makefile", highlightLanguageMakefile);
highlight.registerLanguage("json", highlightLanguageJson);
highlight.registerLanguage("yaml", highlightLanguageYaml);
highlight.registerLanguage("css", highlightLanguageCss);
highlight.registerLanguage("xml", highlightLanguageXml);
highlight.registerLanguage("bash", highlightLanguageBash);
highlight.registerLanguage("elm", highlightLanguageElm);

const HighlightStyles = () => <Global styles={css(highlightCss)} />;

export const Code = ({
  children,
  multiline = false,
  language,
}: {
  children: string;
  multiline?: boolean;
  language?: "javascript" | "makefile" | "dockerfile" | "json" | "yaml" | "css" | "xml" | "bash";
}) => {
  const code = formatMultilineCode(children);

  const codeComponent = language ? (
    <CodeStyled
      dangerouslySetInnerHTML={{
        __html: highlight.highlight(language, code).value,
      }}
      multiline={multiline}
    />
  ) : (
    <CodeStyled multiline={multiline}>{code}</CodeStyled>
  );

  return (
    <>
      <HighlightStyles />
      {multiline ? <PreStyled>{codeComponent}</PreStyled> : codeComponent}
    </>
  );
};

export const Diagram = (props: { children: string }) => {
  const code = formatMultilineCode(props.children);

  return (
    <PreStyled>
      <CodeStyled diagram>{code}</CodeStyled>
    </PreStyled>
  );
};

const PreStyled = styled.pre({
  display: "block",
  margin: `${s.dimensions.paragraphSpacing} 0 0 0`,
});

const CodeStyled = styled.code(
  {
    backgroundColor: s.colors.grayLighter,
    border: s.borders.default,
    borderRadius: s.dimensions.borderRadius,
    boxDecorationBreak: "clone", // inline code snippets can be spread across 2 rows
    WebkitOverflowScrolling: "touch",
  },
  ({ multiline = false, diagram = false }: { multiline?: boolean; diagram?: boolean }) => {
    const innerPadding = s.grid(1);
    let styles = {};

    if (multiline || diagram) {
      styles = {
        ...styles,
        ...s.fonts.codeMultiline,
        display: "block",
        padding: innerPadding,
        overflow: "auto",
      };
    } else {
      styles = {
        ...styles,
        ...s.fonts.codeInline,
        display: "inline",
        padding: `${s.size(1)} ${s.size(2)}`,
      };
    }

    if (diagram) {
      styles = {
        ...styles,
        padding: `calc(1em + ${innerPadding})`,
        // At 0.9 box drawing characters are properly connected
        // https://en.wikipedia.org/wiki/Box-drawing_character
        lineHeight: 0.9,
      };
    }

    return styles;
  }
);

function formatMultilineCode(input: string): string {
  let inputLines = stripIndent(input).split("\n");

  const start = (() => {
    for (let i = 0; i < inputLines.length; i++) {
      if (inputLines[i].trim() !== "") return i;
    }
    return 0;
  })();

  const end = (() => {
    for (let i = inputLines.length - 1; i >= 0; i--) {
      if (inputLines[i].trim() !== "") return i;
    }
    return inputLines.length - 1;
  })();

  inputLines = inputLines.slice(start, end + 1);

  return inputLines.join("\n");
}
