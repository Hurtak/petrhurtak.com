import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import escapeHtml from "escape-html";

const HtmlComment = props => (
  <HtmlCommentStyled
    dangerouslySetInnerHTML={{
      __html: `<!-- ${escapeHtml(props.children)} -->`
    }}
    hidden
  />
);
HtmlComment.propTypes = {
  children: PropTypes.string.isRequired
};
export default HtmlComment;

const HtmlCommentStyled = styled.div`
  display: none;
`;
