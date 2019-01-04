import React from "react";
import { Link as ReachRouterLink } from "@reach/router";

const Link = props => {
  const isLinkExternal = /^\w+:/.test(props.to);
  if (isLinkExternal) {
    const { to, rel, children, ...restProps } = props;

    const relWrapped = (() => {
      if (rel) return rel;

      const targetBlank = props.target === "_blank";
      if (!targetBlank) return rel;

      return "noopener noreferrer";
    })();

    return (
      <a {...restProps} href={to} rel={relWrapped}>
        {children}
      </a>
    );
  } else {
    const { to, children, ...restProps } = props;
    return (
      <ReachRouterLink to={to} {...restProps}>
        {children}
      </ReachRouterLink>
    );
  }
};
// Link.propTypes = {
//   to: PropTypes.string.isRequired,
//   children: PropTypes.node.isRequired
// };

export default Link;
