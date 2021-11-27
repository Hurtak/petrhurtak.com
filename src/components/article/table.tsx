import clsx from "clsx";
import * as React from "react";

import { colors, gridCss } from "../../styles";

export const Table = ({ heading, children }: { heading?: React.ReactNode; children: React.ReactNode }) => {
  const headingContent = (() => {
    const headingProp = heading;
    if (!headingProp) return null;

    const headingRow = React.Children.map(heading, (child) =>
      React.cloneElement(child as React.ReactElement<any>, { heading: true })
    );

    return headingRow;
  })();

  return (
    <table>
      {headingContent && <thead>{headingContent}</thead>}
      <tbody>{children}</tbody>
    </table>
  );
};

export const Tr = ({ heading = false, children }: { heading?: boolean; children: React.ReactNode }) => {
  const cells = React.Children.map(children, (child) =>
    React.cloneElement(child as React.ReactElement<any>, { heading })
  );

  return <tr>{cells}</tr>;
};

export const Tc = ({
  heading = false,
  noWrap = false,
  rowSpan,
  colSpan,
  children,
}: {
  heading?: boolean;
  noWrap?: boolean;
  rowSpan?: number;
  colSpan?: number;
  children?: React.ReactNode;
}) => {
  const Component = heading ? "th" : "td";

  return (
    <Component className={clsx({ ["no-wrap"]: noWrap })} rowSpan={rowSpan} colSpan={colSpan}>
      <style jsx>{`
        .no-wrap {
          white-space: nowrap;
        }
        th,
        td {
          padding: ${gridCss(0.25)} ${gridCss(0.5)};
        }
        th {
          background: ${colors.grayDark};
        }
        td {
          background: ${colors.gray};
        }
      `}</style>
      {children}
    </Component>
  );
};
