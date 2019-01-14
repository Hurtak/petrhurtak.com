import React from "react";
import { Link as ReachRouterLink } from "@reach/router";

interface ILinkProps extends React.HTMLProps<HTMLAnchorElement> {
  to: string;
  rawLink?: boolean;
  children: React.ReactNode;
}

const Link = (props: ILinkProps) => {
  const { to, rel, className, children } = props;

  const isLinkExternal = /^\w+:/.test(props.to);
  if (props.rawLink || isLinkExternal) {
    const relWrapped = (() => {
      if (rel) return rel;

      const targetBlank = props.target === "_blank";
      if (!targetBlank) return rel;

      return "noopener noreferrer";
    })();

    return (
      <a href={to} rel={relWrapped} className={className}>
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

export default Link;
