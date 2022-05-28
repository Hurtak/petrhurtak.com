import clsx from "clsx";
import { Children, cloneElement, isValidElement, ReactNode } from "react";

import { colors, gridCss } from "../../styles";

export const Table = ({ heading, children }: { heading?: ReactNode; children: React.ReactNode }) => {
  const headingContent = (() => {
    const headingProp = heading;
    if (!headingProp) return null;

    const headingRow = Children.map(heading, (child) =>
      isValidElement(child) ? cloneElement(child, { heading: true }) : null
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
  const cells = Children.map(children, (child) => (isValidElement(child) ? cloneElement(child, { heading }) : null));

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
