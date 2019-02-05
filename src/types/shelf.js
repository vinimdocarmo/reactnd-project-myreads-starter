import PropTypes from "prop-types";

const shelfs = ["currentlyReading", "wantToRead", "read"];

export default PropTypes.oneOf(shelfs).isRequired;
