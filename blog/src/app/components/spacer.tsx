import React from "react";
import styled from "styled-components";
import * as s from "../common/styles";

const Spacer = (props: { spacing: number; children: React.ReactNode }): any => {
  const children = React.Children.toArray(props.children);

  return children.map((item: any, index) => (
    <SpacerStyled key={item.key} spacing={index === 0 ? 0 : props.spacing}>
      {item}
    </SpacerStyled>
  ));
};
export default Spacer;

const SpacerStyled = styled.div((props: { spacing: number }) => ({
  marginTop: s.grid(props.spacing)
}));
