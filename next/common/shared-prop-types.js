import PropTypes from "prop-types";

export const article = PropTypes.shape({
  title: PropTypes.string.isRequired,

  description: PropTypes.string.isRequired,

  url: PropTypes.string.isRequired,

  datePublication: PropTypes.string.isRequired,
  dateLastUpdate: PropTypes.string.isRequired,

  id: PropTypes.string.isRequired
});
