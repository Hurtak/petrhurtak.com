import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import * as s from "../common/styles.js";

const Spacer = props => {
  const children = React.Children.toArray(props.children);

  return children.map((item, index) => (
    <SpacerStyled key={item.key} spacing={index === 0 ? null : props.spacing}>
      {item}
    </SpacerStyled>
  ));
};
Spacer.propTypes = {
  spacing: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
};
export default Spacer;

const SpacerStyled = styled.div(props => ({
  marginTop: s.grid(props.spacing)
}));
