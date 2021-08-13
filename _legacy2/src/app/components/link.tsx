import React from "react";
import { Link as ReachRouterLink } from "@reach/router";

interface ILinkProps {
  to: string;
  rawLink?: boolean;
  className?: string;
  targetBlank?: boolean;
  children: React.ReactNode;
}

export const Link = (props: ILinkProps) => {
  const { to, className, targetBlank, children } = props;

  const isLinkExternal = /^\w+:/.test(props.to);
  if (props.rawLink || isLinkExternal) {
    const targetBlankProps = targetBlank
      ? {
          rel: "noopener noreferrer",
          target: "_blank"
        }
      : {};

    return (
      <a href={to} className={className} {...targetBlankProps}>
        {children}
      </a>
    );
  } else {
    return (
      <ReachRouterLink to={to} className={className}>
        {children}
      </ReachRouterLink>
    );
  }
};
