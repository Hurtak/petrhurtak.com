import PropTypes from "prop-types";

export const articleId = PropTypes.string;

export const articleUrl = PropTypes.string;

export const articleMetadata = PropTypes.shape({
  url: articleUrl.isRequired,
  title: PropTypes.string.isRequired,
  dateLastUpdate: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
});

export const article = PropTypes.shape({
  id: articleId.isRequired,
  frontmatter: articleMetadata.isRequired
});
