import stripIndent from "strip-indent";

import { colors, gridCss } from "../../styles";

export const Diagram = ({ children }: { children: string }) => {
  return (
    <>
      <div>{stripIndent(children)}</div>

      <style jsx>{`
        div {
          background: ${colors.gray};
          border: 1px solid ${colors.grayDark};
          border-radius: 2px;
          padding: ${gridCss(1)};
          font-size: 12px;
          font-family: monospace;
          white-space: pre;
        }
      `}</style>
    </>
  );
};
