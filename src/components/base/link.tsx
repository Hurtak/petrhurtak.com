import cn from "clsx";
import NextLink from "next/link"; // eslint-disable-line no-restricted-imports
import { ReactNode } from "react";

import { colors, pxCss } from "../../styles";

export const Link = ({
  href,
  className,
  newTab,
  children,
}: {
  href?: string;
  className?: string;
  newTab?: boolean;
  children: ReactNode;
}) => {
  const hrefNormalized = href ?? (typeof children === "string" ? children : "");
  const openToNewTab =
    newTab ??
    // external links open to new tab by default
    (hrefNormalized.startsWith("http://") ||
      hrefNormalized.startsWith("https://") ||
      hrefNormalized.startsWith("mailto:"));

  return (
    <>
      <NextLink
        href={hrefNormalized}
        className={cn("link", className)}
        {...(openToNewTab && {
          rel: "noopener noreferrer",
          target: "_blank",
        })}
      >
        {children}
      </NextLink>

      <style jsx global>{`
        a.link {
          display: inline-flex;
          color: ${colors.blue};
          text-decoration-thickness: ${pxCss(0.5)};
          text-underline-offset: ${pxCss(1)};
        }
        a:visited {
          color: ${colors.purple};
        }
      `}</style>
    </>
  );
};
