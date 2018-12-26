import React from "react";
import PropTypes from "prop-types";
// import { Link as GatsbyLink } from "gatsby";

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
  }

  return null;
  // return <GatsbyLink {...props} />;
};
Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Link;
