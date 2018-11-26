import PropTypes from "prop-types";

export const article = PropTypes.shape({
  title: PropTypes.string.isRequired,

  description: PropTypes.string.isRequired,

  url: PropTypes.string.isRequired,

  datePublication: PropTypes.number.isRequired,
  dateLastUpdate: PropTypes.number.isRequired,

  id: PropTypes.string.isRequired
});
