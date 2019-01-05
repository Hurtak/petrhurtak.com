import React from "react";
import styled from "styled-components";
import escapeHtml from "escape-html";

interface IHtmlCommentProps {
  children: string;
}

const HtmlComment = (props: IHtmlCommentProps) => (
  <HtmlCommentStyled
    dangerouslySetInnerHTML={{
      __html: `<!-- ${escapeHtml(props.children)} -->`
    }}
    hidden
  />
);
export default HtmlComment;

const HtmlCommentStyled = styled.div({
  display: "none"
});
