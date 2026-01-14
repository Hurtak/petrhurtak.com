import cn from "clsx";
import { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

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

  const isInternalLink = hrefNormalized.startsWith("/");

  return (
    <>
      {openToNewTab || !isInternalLink ? (
        <a
          href={hrefNormalized}
          className={cn("link", className)}
          {...(openToNewTab && {
            rel: "noopener noreferrer",
            target: "_blank",
          })}
        >
          {children}
        </a>
      ) : (
        <RouterLink to={hrefNormalized} className={cn("link", className)}>
          {children}
        </RouterLink>
      )}

      <style jsx global>{`
        a.link {
          display: inline-flex;
          color: ${colors.blue};
          text-decoration-thickness: ${pxCss(0.5)};
          text-underline-offset: ${pxCss(1)};
        }
        a.link:visited {
          color: ${colors.purple};
        }
      `}</style>
    </>
  );
};
