import React from "react";
import styled from "@emotion/styled/macro";
import * as s from "../../styles/styles";
import { Link } from "../link";

export const Image: React.FC<{
  src: string;
  width: number;
  height: number;
  alt: string;
}> = props => {
  return (
    <Link to={props.src} rawLink>
      <ImageStyled
        src={props.src}
        width={props.width}
        height={props.height}
        alt={props.alt}
      />
    </Link>
  );
};

const ImageStyled = styled.img({
  display: "block",
  margin: `${s.dimensions.paragraphSpacing} 0 0 0`,
  maxWidth: "100%",
  height: "auto"
});
