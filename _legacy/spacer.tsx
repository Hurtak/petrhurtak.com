import { Children, ReactNode } from "react";
import styled from "@emotion/styled/macro";
import * as s from "../styles/styles";

export const Spacer = (props: { spacing: number; children: ReactNode }) => {
  const children = Children.toArray(props.children);

  return (
    <>
      {children.map((item: any, index) => (
        <SpacerStyled key={item.key} spacing={index === 0 ? 0 : props.spacing}>
          {item}
        </SpacerStyled>
      ))}
    </>
  );
};

const SpacerStyled = styled.div((props: { spacing: number }) => ({
  marginTop: s.grid(props.spacing),
}));
