import PropTypes from "prop-types";

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imageLinks: PropTypes.shape({
    thumbnail: PropTypes.string.isRequired
  }),
  shelf: PropTypes.string,
  authors: PropTypes.arrayOf(PropTypes.string)
});
