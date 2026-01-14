import stripIndent from "strip-indent";

import { colors, gridCss } from "../../../styles";

export const Diagram = ({ children }: { children: string }) => {
  return (
    <>
      <pre>{trimEmptyEdgeLines(stripIndent(children))}</pre>

      <style jsx>{`
        pre {
          background: ${colors.gray};
          border: 1px solid ${colors.grayDark};
          border-radius: 2px;
          line-height: 1;
          padding: ${gridCss(1)};
          font-size: 14px;
          font-family: monospace;
          white-space: pre;
        }
      `}</style>
    </>
  );
};

export const trimEmptyEdgeLines = (string: string): string => {
  const lines = string.split("\n");

  return lines
    .filter((line, index) => {
      if (line.trim() === "" && index === 0) return false;
      if (line.trim() === "" && index === lines.length - 1) return false;

      return true;
    })
    .join("\n");
};
