import NextLink from "next/link"; // eslint-disable-line no-restricted-imports
import React from "react";

import { colors, pxCss } from "../../styles";

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
