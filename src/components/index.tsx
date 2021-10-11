import NextLink from "next/link"; // eslint-disable-line no-restricted-imports
import * as React from "react";

import { colors, pxCss } from "../styles";

export const P = ({ children }: { children: React.ReactNode }) => {
  return (
    <p>
      <style jsx>{``}</style>
      {children}
    </p>
  );
};

export const H1 = ({ children }: { children: string }) => {
  return (
    <h2>
      <style jsx>{``}</style>
      {children}
    </h2>
  );
};

export const H2 = ({ children }: { children: string }) => {
  return (
    <h3>
      <style jsx>{``}</style>
      {children}
    </h3>
  );
};

export const Link = ({
  href,
  newTab = false,
  children,
}: {
  href?: string;
  newTab?: boolean;
  children: React.ReactNode;
}) => {
  const hrefNormalized = href ?? (typeof children === "string" ? children : "");

  return (
    <>
      <NextLink href={hrefNormalized} passHref>
        <a
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
      quotes: "“" "”";
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
  children,
}: {
  heading?: boolean;
  noWrap?: boolean;
  children?: React.ReactNode;
}) => {
  const Component = heading ? "th" : "td";

  return (
    <Component className={`${noWrap ? "no-wrap" : ""}`}>
      <style jsx>{`
        .no-wrap {
          white-space: nowrap;
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

export const Video = ({ width, height, src }: { width: number; height: number; src: string }) => {
  return (
    <video width={width} height={height} controls autoPlay loop>
      <source src={src} type="video/mp4" />
    </video>
  );
};

export const Dash = ({ long = false }: { long?: boolean }) => (long === false ? <>&ndash;</> : <>&mdash;</>);
export const Br = () => <br />;

export { Code } from "./code";
