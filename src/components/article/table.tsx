import clsx from "clsx";
import { Children, cloneElement, CSSProperties, isValidElement, ReactElement, ReactNode } from "react";

import { colors, gridCss } from "../../styles";

type TcProps = {
  heading?: boolean;
  noWrap?: boolean;
  rowSpan?: number;
  colSpan?: number;
  center?: boolean;
  style?: CSSProperties;
  children?: ReactNode;
};

type TrProps = {
  heading?: boolean;
  children: ReactElement<TcProps> | ReactElement<TcProps>[];
};

export const Table = ({
  heading,
  children,
}: {
  heading?: ReactElement<TrProps> | ReactElement<TrProps>[];
  children: ReactElement<TrProps> | ReactElement<TrProps>[];
}) => {
  const headingContent = (() => {
    const headingProp = heading;
    if (!headingProp) return;

    const headingRow = Children.map(heading, (child) =>
      isValidElement(child) ? cloneElement(child, { heading: true }) : undefined,
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

export const Tr = ({ heading = false, children }: TrProps) => {
  const cells = Children.map(children, (child) =>
    isValidElement(child) ? cloneElement(child, { heading }) : undefined,
  );

  return <tr>{cells}</tr>;
};

export const Tc = ({ heading = false, noWrap = false, rowSpan, colSpan, center = false, style, children }: TcProps) => {
  const Component = heading ? "th" : "td";

  return (
    <Component className={clsx({ "no-wrap": noWrap, center })} rowSpan={rowSpan} colSpan={colSpan} style={style}>
      <style jsx>{`
        .no-wrap {
          white-space: nowrap;
        }
        .center {
          text-align: center;
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
