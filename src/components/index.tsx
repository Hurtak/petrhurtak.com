import clsx from "clsx";
import NextLink from "next/link"; // eslint-disable-line no-restricted-imports
import * as React from "react";

import { colors, gridCss, pxCss } from "../styles";

export { Code } from "./code";
export { Video } from "./video";

export const P = ({ children }: { children: React.ReactNode }) => {
  return <p>{children}</p>;
};

export const H1 = ({ children }: { children: string }) => {
  return <h2>{children}</h2>;
};

export const H2 = ({ children }: { children: string }) => {
  return <h3>{children}</h3>;
};

export const Link = ({
  href,
  className,
  newTab = false,
  children,
}: {
  href?: string;
  className?: string;
  newTab?: boolean;
  children: React.ReactNode;
}) => {
  const hrefNormalized = href ?? (typeof children === "string" ? children : "");

  return (
    <>
      <NextLink href={hrefNormalized} passHref>
        <a
          className={className}
          {...(newTab && {
            rel: "noopener noreferrer",
            target: "_blank",
          })}
        >
          {children}
        </a>
      </NextLink>

      <style jsx>{`
        a {
          display: inline-flex;
          color: ${colors.blue};
          text-decoration-thickness: ${pxCss(0.5)};
          text-underline-offset: ${pxCss(1)};
        }
        a:visited {
          color: ${colors.blue};
        }
      `}</style>
    </>
  );
};

export const Italic = ({ children }: { children: string }) => {
  return <em>{children}</em>;
};

export const Strong = ({ children }: { children: React.ReactNode }) => {
  return <strong>{children}</strong>;
};

export const Quote = ({ children }: { children: string }) => (
  <q>
    <style jsx>{`
      q {
        quotes: "“" "”";
      }
    `}</style>

    {children}
  </q>
);

export const List = ({ children }: { children: React.ReactNode }) => {
  return <ul>{children}</ul>;
};

export const Li = ({ children }: { children: React.ReactNode }) => {
  return <li>{children}</li>;
};

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

export const Image = ({
  //
  src,
  width,
  height,
  alt,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
}) => {
  return (
    <Link href={src} newTab>
      <style jsx>{`
        img {
          display: block;
          max-width: 100%;
          height: auto;
        }
      `}</style>
      <img src={src} width={width} height={height} alt={alt} />
    </Link>
  );
};

export const Dash = ({ long = false }: { long?: boolean }) => (long === false ? <>&ndash;</> : <>&mdash;</>);
export const Br = () => <br />;
