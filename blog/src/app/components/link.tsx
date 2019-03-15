import React from "react";
import { Link as ReachRouterLink } from "@reach/router";

interface ILinkProps extends React.HTMLProps<HTMLAnchorElement> {
  to: string;
  rawLink?: boolean;
  children: React.ReactNode;
}

export const Link = (props: ILinkProps) => {
  const { to, rel, className, children } = props;

  const isLinkExternal = /^\w+:/.test(props.to);
  if (props.rawLink || isLinkExternal) {
    const relEnhanced = (() => {
      if (rel) return rel;

      const targetBlank = props.target === "_blank";
      return targetBlank ? "noopener noreferrer" : "";
    })();

    return (
      <a href={to} rel={relEnhanced} className={className}>
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
