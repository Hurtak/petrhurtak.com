import React from "react";
import styled from "@emotion/styled/macro";
import * as s from "../../common/styles";

export const Video = (props: {
  width: number;
  height: number;
  src: string;
}) => {
  const ratio = props.width / props.height;

  return (
    <VideoWrapperStyled
      style={{
        maxHeight: props.height + "px",
        maxWidth: props.width + "px"
      }}
    >
      <VideoWrapperInnerStyled style={{ paddingBottom: 100 / ratio + "%" }}>
        <VideoStyled
          width={props.width}
          height={props.height}
          controls
          autoPlay
          loop
        >
          <source src={props.src} type="video/mp4" />
        </VideoStyled>
      </VideoWrapperInnerStyled>
    </VideoWrapperStyled>
  );
};

const VideoWrapperStyled = styled.div({
  marginTop: s.dimensions.paragraphSpacing,
  marginLeft: "auto",
  marginRight: "auto",
  border: s.borders.default,
  background: s.colors.grayLighter,
  borderRadius: s.dimensions.borderRadius,
  overflow: "hidden"
});

const VideoWrapperInnerStyled = styled.div({
  width: "100%",
  height: 0
});

const VideoStyled = styled.video({
  display: "block",
  maxWidth: "100%",
  height: "auto"
});
